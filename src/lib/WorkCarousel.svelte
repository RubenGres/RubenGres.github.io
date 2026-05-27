<script>
    import { onMount, onDestroy } from 'svelte';

    const imagePaths = [
        "img/snipit.png",
        "img/eyes-on-the-field/dinner_2.jpg",
        "img/bitz/workshop_2.jpg",
        "img/emotional-baggage.jpg",
    ];

    const MAX_BOIDS = 32;
    const FADE_DURATION = 1400; // ms
    const SLIDE_INTERVAL = 5000; // ms
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
    const GRID_W = isMobile ? 48 : 96;
    const GRID_H = isMobile ? 27 : 54;

    const boidPositions = new Float32Array(MAX_BOIDS * 2);
    const boidStrengths = new Float32Array(MAX_BOIDS);

    /** @type {HTMLCanvasElement} */
    let canvas;
    /** @type {WebGLRenderingContext | null} */
    let gl = null;
    /** @type {WebGLProgram | null} */
    let program = null;
    /** @type {Array<{tex: WebGLTexture, aspect: number} | null>} */
    let textures = [];
    let texturesLoaded = 0;

    let current = imagePaths.length - 1;
    let next = 0;
    let fadeStart = 0;
    /** @type {ReturnType<typeof setInterval> | undefined} */
    let slideTimer;
    let rafId = 0;
    let startTime = 0;

    /** @type {Array<{x: number, y: number, isPred: boolean}>} */
    let boidList = [];
    let frameW = 1;
    let frameH = 1;
    /** normalized 0..1 mouse position over the canvas; null when inactive */
    /** @type {{x: number, y: number} | null} */
    let mouseUV = null;
    let mouseLastSeen = 0;

    /** @type {{ [k: string]: WebGLUniformLocation | null }} */
    let u = {};
    let indexCount = 0;

    const vertSrc = `
        attribute vec2 a_position;
        varying vec2 v_uvA;
        varying vec2 v_uvB;
        varying float v_highlight;
        uniform float u_aspectA;
        uniform float u_aspectB;
        uniform float u_canvasAspect;
        uniform float u_time;
        uniform int u_boidCount;
        uniform vec2 u_boids[${MAX_BOIDS}];
        uniform float u_boidStrength[${MAX_BOIDS}];

        vec2 coverUV(vec2 uv, float imgAspect, float canvasAspect) {
            vec2 scale = vec2(1.0);
            vec2 offset = vec2(0.0);
            if (imgAspect > canvasAspect) {
                scale.x = canvasAspect / imgAspect;
                offset.x = (1.0 - scale.x) * 0.5;
            } else {
                scale.y = imgAspect / canvasAspect;
                offset.y = (1.0 - scale.y) * 0.5;
            }
            return vec2(uv.x * scale.x + offset.x, uv.y * scale.y + offset.y);
        }

        void main() {
            vec2 uv = a_position * 0.5 + 0.5;
            vec2 displaced = uv;
            float highlight = 0.0;

            for (int i = 0; i < ${MAX_BOIDS}; i++) {
                if (i >= u_boidCount) break;
                vec2 boid = u_boids[i];
                vec2 d = uv - boid;
                d.x *= u_canvasAspect;
                float dist = length(d);
                float strength = u_boidStrength[i];
                float falloff = exp(-dist * 22.0);
                vec2 dir = dist > 0.0001 ? normalize(d) : vec2(0.0);
                displaced -= dir * falloff * 0.040 * strength;
                highlight += falloff * strength;
            }

            displaced.y = 1.0 - displaced.y; // flip Y for image orientation

            v_uvA = coverUV(displaced, u_aspectA, u_canvasAspect);
            v_uvB = coverUV(displaced, u_aspectB, u_canvasAspect);
            v_highlight = highlight;

            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    `;

    const fragSrc = `
        precision mediump float;
        varying vec2 v_uvA;
        varying vec2 v_uvB;
        varying float v_highlight;
        uniform sampler2D u_texA;
        uniform sampler2D u_texB;
        uniform float u_progress;

        void main() {
            vec4 colA = texture2D(u_texA, v_uvA);
            vec4 colB = texture2D(u_texB, v_uvB);
            vec4 col = mix(colA, colB, u_progress);
            col.rgb *= 0.5;
            col.rgb += vec3(0.08, 0.10, 0.12) * v_highlight;
            gl_FragColor = col;
        }
    `;

    /** @param {WebGLRenderingContext} gl @param {number} type @param {string} src */
    function compileShader(gl, type, src) {
        const sh = gl.createShader(type);
        if (!sh) return null;
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', gl.getShaderInfoLog(sh));
            gl.deleteShader(sh);
            return null;
        }
        return sh;
    }

    function initGL() {
        gl = canvas.getContext('webgl', { premultipliedAlpha: false, antialias: false });
        if (!gl) return false;

        const vs = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
        const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
        if (!vs || !fs) return false;

        program = gl.createProgram();
        if (!program) return false;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
            return false;
        }
        gl.useProgram(program);

        const verts = new Float32Array(GRID_W * GRID_H * 2);
        for (let y = 0; y < GRID_H; y++) {
            for (let x = 0; x < GRID_W; x++) {
                const i = (y * GRID_W + x) * 2;
                verts[i] = (x / (GRID_W - 1)) * 2 - 1;
                verts[i + 1] = (y / (GRID_H - 1)) * 2 - 1;
            }
        }
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
        const posLoc = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        const indices = new Uint16Array((GRID_W - 1) * (GRID_H - 1) * 6);
        let p = 0;
        for (let y = 0; y < GRID_H - 1; y++) {
            for (let x = 0; x < GRID_W - 1; x++) {
                const a = y * GRID_W + x;
                const b = a + 1;
                const c = a + GRID_W;
                const d = c + 1;
                indices[p++] = a; indices[p++] = b; indices[p++] = c;
                indices[p++] = c; indices[p++] = b; indices[p++] = d;
            }
        }
        const ibo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
        indexCount = indices.length;

        u.texA = gl.getUniformLocation(program, 'u_texA');
        u.texB = gl.getUniformLocation(program, 'u_texB');
        u.aspectA = gl.getUniformLocation(program, 'u_aspectA');
        u.aspectB = gl.getUniformLocation(program, 'u_aspectB');
        u.progress = gl.getUniformLocation(program, 'u_progress');
        u.canvasAspect = gl.getUniformLocation(program, 'u_canvasAspect');
        u.time = gl.getUniformLocation(program, 'u_time');
        u.boidCount = gl.getUniformLocation(program, 'u_boidCount');
        u.boids = gl.getUniformLocation(program, 'u_boids');
        u.boidStrength = gl.getUniformLocation(program, 'u_boidStrength');

        gl.uniform1i(u.texA, 0);
        gl.uniform1i(u.texB, 1);

        return true;
    }

    /** @param {string} url @param {number} index */
    function loadTexture(url, index) {
        if (!gl) return;
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            if (!gl) return;
            const tex = gl.createTexture();
            if (!tex) return;
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            textures[index] = { tex, aspect: img.width / img.height };
            texturesLoaded++;
        };
        img.src = url;
    }

    function resize() {
        if (!canvas || !gl) return;
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.max(1, Math.floor(rect.width * dpr));
        const h = Math.max(1, Math.floor(rect.height * dpr));
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
            gl.viewport(0, 0, w, h);
        }
    }

    function render(t) {
        rafId = requestAnimationFrame(render);
        if (!gl || !program) return;
        resize();

        const a = textures[current];
        const b = textures[next];
        if (!a || !b) return;

        const elapsed = (t - fadeStart);
        const progress = Math.min(1, Math.max(0, elapsed / FADE_DURATION));

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, a.tex);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, b.tex);

        gl.uniform1f(u.aspectA, a.aspect);
        gl.uniform1f(u.aspectB, b.aspect);
        gl.uniform1f(u.progress, progress);
        gl.uniform1f(u.canvasAspect, canvas.width / canvas.height);
        gl.uniform1f(u.time, (t - startTime) / 1000);

        const mouseActive = mouseUV !== null && (t - mouseLastSeen) < 1500;
        const boidSlots = mouseActive ? MAX_BOIDS - 1 : MAX_BOIDS;
        let count = Math.min(boidList.length, boidSlots);
        for (let i = 0; i < count; i++) {
            boidPositions[i * 2] = boidList[i].x / frameW;
            boidPositions[i * 2 + 1] = 1.0 - boidList[i].y / frameH;
            boidStrengths[i] = boidList[i].isPred ? 1.6 : 1.0;
        }
        if (mouseActive && mouseUV) {
            boidPositions[count * 2] = mouseUV.x;
            boidPositions[count * 2 + 1] = 1.0 - mouseUV.y;
            boidStrengths[count] = 4.0;
            count++;
        }
        gl.uniform1i(u.boidCount, count);
        gl.uniform2fv(u.boids, boidPositions);
        gl.uniform1fv(u.boidStrength, boidStrengths);

        gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0);
    }

    function advance() {
        current = next;
        next = (next + 1) % imagePaths.length;
        fadeStart = performance.now();
    }

    function goPrev() {
        current = next;
        next = (next - 1 + imagePaths.length) % imagePaths.length;
        fadeStart = performance.now();
        restartTimer();
    }

    function goNext() {
        advance();
        restartTimer();
    }

    function restartTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(advance, SLIDE_INTERVAL);
    }

    /** @param {KeyboardEvent} e */
    function onKeyDown(e) {
        if (e.key === 'ArrowLeft') goPrev();
        else if (e.key === 'ArrowRight') goNext();
    }

    /** @param {MessageEvent} e */
    function onMessage(e) {
        const data = e.data;
        if (!data || data.type !== 'boids') return;
        boidList = data.positions;
        frameW = data.w || 1;
        frameH = data.h || 1;
        if (data.mouseInside && typeof data.mx === 'number') {
            mouseUV = { x: data.mx / frameW, y: data.my / frameH };
            mouseLastSeen = performance.now();
        }
    }

    /** @param {PointerEvent} e */
    function onPointerMove(e) {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        if (x < 0 || x > 1 || y < 0 || y > 1) return;
        mouseUV = { x, y };
        mouseLastSeen = performance.now();
    }

    function onVisibility() {
        if (document.hidden) {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = 0;
            clearInterval(slideTimer);
        } else if (!rafId) {
            rafId = requestAnimationFrame(render);
            slideTimer = setInterval(advance, SLIDE_INTERVAL);
        }
    }

    onMount(() => {
        if (!initGL()) return;
        imagePaths.forEach((path, i) => loadTexture(path, i));
        startTime = performance.now();
        fadeStart = startTime - FADE_DURATION; // start fully on first image
        rafId = requestAnimationFrame(render);
        slideTimer = setInterval(advance, SLIDE_INTERVAL);
        window.addEventListener('message', onMessage);
        window.addEventListener('resize', resize);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('keydown', onKeyDown);
        document.addEventListener('visibilitychange', onVisibility);
    });

    onDestroy(() => {
        if (rafId) cancelAnimationFrame(rafId);
        clearInterval(slideTimer);
        if (typeof window !== 'undefined') {
            window.removeEventListener('message', onMessage);
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('visibilitychange', onVisibility);
        }
        if (gl) {
            textures.forEach((t) => t && gl && gl.deleteTexture(t.tex));
            if (program) gl.deleteProgram(program);
        }
    });
</script>

<div class="bg_carousel" aria-hidden="true">
    <canvas bind:this={canvas} class="ripple_canvas"></canvas>
</div>

<style>
    .bg_carousel {
        position: absolute;
        inset: 0;
        z-index: 0;
        overflow: hidden;
        background: #000;
    }

    .ripple_canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
    }
</style>
