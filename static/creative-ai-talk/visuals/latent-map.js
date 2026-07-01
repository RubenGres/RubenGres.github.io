// "It Interpolates, It Doesn't Originate" — a latent-space contour map with two deep
// basins (two input concepts). A dotted line interpolates between them; the midpoint is
// the merged result, marked with a red cross: the model averages, it doesn't originate.
// Expects <svg id="latentMap" viewBox="0 0 600 460">.
(window.deckVisuals = window.deckVisuals || []).push(function () {
  const svg = document.getElementById('latentMap');
  if (!svg) return;
  const W = 600, H = 460, padX = 20, padY = 20;
  const NS = 'http://www.w3.org/2000/svg';
  // Deep basins = attractors everything converges to ("cityscape", "pastoral"…)
  const basins = [
    { x: 0.30, y: 0.40, d: 1.00, s: 0.17 },
    { x: 0.72, y: 0.62, d: 0.95, s: 0.17 },
  ];
  const field = (x, y) => {
    let h = 0;
    for (const b of basins) {
      const dx = x - b.x, dy = y - b.y;
      h -= b.d * Math.exp(-(dx * dx + dy * dy) / (2 * b.s * b.s));
    }
    return h;
  };
  const px = x => padX + x * (W - 2 * padX);
  const py = y => padY + y * (H - 2 * padY);

  // sample grid + find range
  const cols = 90, rows = 70, grid = [];
  let min = Infinity, max = -Infinity;
  for (let j = 0; j <= rows; j++) {
    grid[j] = [];
    for (let i = 0; i <= cols; i++) {
      const v = field(i / cols, j / rows);
      grid[j][i] = v; if (v < min) min = v; if (v > max) max = v;
    }
  }

  // marching squares: one path per iso-level
  const contours = [];
  const levels = 13;
  for (let L = 0; L < levels; L++) {
    const t = L / (levels - 1);                 // 0 shallow … 1 deep
    const iso = max + (min - max) * (0.04 + 0.95 * t);
    let dStr = '';
    const ix = (a, b) => (iso - a) / (b - a);   // edge interpolation
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const tl = grid[j][i], tr = grid[j][i + 1], br = grid[j + 1][i + 1], bl = grid[j + 1][i];
        let c = 0;
        if (tl < iso) c |= 8; if (tr < iso) c |= 4; if (br < iso) c |= 2; if (bl < iso) c |= 1;
        if (c === 0 || c === 15) continue;
        const x0 = i / cols, x1 = (i + 1) / cols, y0 = j / rows, y1 = (j + 1) / rows;
        const top = [px(x0 + (x1 - x0) * ix(tl, tr)), py(y0)];
        const bot = [px(x0 + (x1 - x0) * ix(bl, br)), py(y1)];
        const lft = [px(x0), py(y0 + (y1 - y0) * ix(tl, bl))];
        const rgt = [px(x1), py(y0 + (y1 - y0) * ix(tr, br))];
        const seg = (a, b) => { dStr += `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`; };
        switch (c) {
          case 1: case 14: seg(lft, bot); break;
          case 2: case 13: seg(bot, rgt); break;
          case 3: case 12: seg(lft, rgt); break;
          case 4: case 11: seg(top, rgt); break;
          case 6: case 9:  seg(top, bot); break;
          case 7: case 8:  seg(lft, top); break;
          case 5:  seg(lft, top); seg(bot, rgt); break;
          case 10: seg(lft, bot); seg(top, rgt); break;
        }
      }
    }
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', dStr);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', '#7ab4f5');
    p.setAttribute('stroke-width', (0.5 + t * 1.4).toFixed(2));
    p.setAttribute('stroke-opacity', '0');
    svg.appendChild(p);
    contours.push({ el: p, op: 0.14 + t * 0.7, t });
  }

  const a = basins[0], b = basins[1];

  // dotted line interpolating between the two minima (passes over the saddle)
  const line = document.createElementNS(NS, 'line');
  line.setAttribute('x1', px(a.x).toFixed(1)); line.setAttribute('y1', py(a.y).toFixed(1));
  line.setAttribute('x2', px(a.x).toFixed(1)); line.setAttribute('y2', py(a.y).toFixed(1));
  line.setAttribute('stroke', '#f0b9c4'); line.setAttribute('stroke-width', '1.8');
  line.setAttribute('stroke-dasharray', '2 6'); line.setAttribute('stroke-linecap', 'round');
  line.setAttribute('stroke-opacity', '0');
  svg.appendChild(line);

  // the two local minima (inputs)
  const imgs = ['assets/min_crown.jpg', 'assets/min_cat.jpg'];
  const basinEls = [];
  basins.forEach((m, idx) => {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', px(m.x).toFixed(1)); c.setAttribute('cy', py(m.y).toFixed(1));
    c.setAttribute('r', '5'); c.setAttribute('fill', '#f0b9c4');
    c.setAttribute('stroke', '#0e0e0e'); c.setAttribute('stroke-width', '1');
    c.setAttribute('opacity', '0');
    svg.appendChild(c);
    const isz = 54;
    const im = document.createElementNS(NS, 'image');
    im.setAttribute('href', imgs[idx]);
    im.setAttribute('x', (px(m.x) - isz / 2).toFixed(1));
    im.setAttribute('y', (py(m.y) - isz - 10).toFixed(1));
    im.setAttribute('width', isz); im.setAttribute('height', isz);
    im.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    im.setAttribute('opacity', '0');
    svg.appendChild(im);
    basinEls.push(c, im);
  });

  // midpoint of the dotted line: the interpolated result + a cross icon
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, sz = 84;
  const midCx = px(mx), midCy = py(my);
  const mid = document.createElementNS(NS, 'image');
  mid.setAttribute('href', 'assets/min_crowncat.png');
  mid.setAttribute('width', sz); mid.setAttribute('height', sz);
  mid.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  mid.setAttribute('opacity', '0');
  svg.appendChild(mid);
  const cr = 9, cross = document.createElementNS(NS, 'path');
  cross.setAttribute('d', `M${(midCx-cr).toFixed(1)} ${(midCy-cr).toFixed(1)}L${(midCx+cr).toFixed(1)} ${(midCy+cr).toFixed(1)}M${(midCx+cr).toFixed(1)} ${(midCy-cr).toFixed(1)}L${(midCx-cr).toFixed(1)} ${(midCy+cr).toFixed(1)}`);
  cross.setAttribute('stroke', '#e0504a'); cross.setAttribute('stroke-width', '3.4'); cross.setAttribute('stroke-linecap', 'round');
  cross.setAttribute('opacity', '0');
  svg.appendChild(cross);

  // ---- static final state (no animation) ----
  const lx2 = px(b.x), ly2 = py(b.y);
  contours.forEach(c => c.el.setAttribute('stroke-opacity', c.op.toFixed(3)));
  basinEls.forEach(el => el.setAttribute('opacity', '1'));
  line.setAttribute('x2', lx2.toFixed(1));
  line.setAttribute('y2', ly2.toFixed(1));
  line.setAttribute('stroke-opacity', '0.9');
  mid.setAttribute('x', (midCx - sz / 2).toFixed(1));
  mid.setAttribute('y', (midCy - sz - 10).toFixed(1));
  mid.setAttribute('opacity', '1');
  cross.setAttribute('opacity', '1');
});
