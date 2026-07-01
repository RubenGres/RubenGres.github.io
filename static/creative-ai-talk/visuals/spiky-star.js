// "The Shape of AI" — a spiky star (AI intelligence) that grows spike-by-spike,
// unevenly, holds, then snaps back, overlaid on a smooth circle (human intelligence).
// Expects an <svg id="shapeViz"> containing <polygon id="aiStar"> in the slide markup.
(window.deckVisuals = window.deckVisuals || []).push(function () {
  const star = document.getElementById('aiStar');
  if (!star) return;
  const cx = 200, cy = 200, spikes = 8;
  const growMs = 14000, holdMs = 5000, resetMs = 1500, cycle = growMs + holdMs + resetMs;
  const smooth = x => { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); };
  // Per-spike traits (fixed, uneven): max length, when it starts growing, angle jitter
  const lenMul    = [1.00, 0.48, 0.82, 0.36, 1.18, 0.60, 0.92, 0.44];
  const startFrac = [0.00, 0.46, 0.14, 0.62, 0.06, 0.70, 0.30, 0.52];
  const angJit    = [0.00, 0.09, -0.06, 0.11, -0.09, 0.05, -0.12, 0.07];
  const growWindow = 0.34, span = 168;

  function starPoints(prog, collapse) {
    const inner = (12 + prog * 28) * collapse;
    const pts = [];
    for (let i = 0; i < spikes; i++) {
      const localP = smooth((prog - startFrac[i]) / growWindow) * collapse;
      const outer = inner + localP * span * lenMul[i];
      const aSpike  = (2 * Math.PI * i) / spikes - Math.PI / 2 + angJit[i];
      const aValley = (2 * Math.PI * (i + 0.5)) / spikes - Math.PI / 2;
      pts.push((cx + outer * Math.cos(aSpike)).toFixed(1) + ',' + (cy + outer * Math.sin(aSpike)).toFixed(1));
      pts.push((cx + inner * Math.cos(aValley)).toFixed(1) + ',' + (cy + inner * Math.sin(aValley)).toFixed(1));
    }
    return pts.join(' ');
  }
  function frame(t) {
    const tt = t % cycle;
    let prog, collapse;
    if (tt < growMs) { prog = smooth(tt / growMs); collapse = 1; }          // slow staggered growth
    else if (tt < growMs + holdMs) { prog = 1; collapse = 1; }              // hold at full for 5s
    else { prog = 1; collapse = 1 - (tt - growMs - holdMs) / resetMs; }     // fast reset
    star.setAttribute('points', starPoints(prog, collapse));
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
});
