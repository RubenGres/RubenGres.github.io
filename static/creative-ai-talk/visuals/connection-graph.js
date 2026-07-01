// "Roles Still Matter" — three fully-connected groups (3, 4, 5 people) showing how
// communication links explode with team size (Brooks' Law). Expects <svg id="connViz">.
(window.deckVisuals = window.deckVisuals || []).push(function () {
  const svg = document.getElementById('connViz');
  if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg';
  const groups = [{ n: 3, cx: 130, cy: 150 }, { n: 4, cx: 370, cy: 150 }, { n: 5, cx: 610, cy: 150 }];
  const r = 74;
  groups.forEach(g => {
    const pts = [];
    for (let i = 0; i < g.n; i++) {
      const a = (2 * Math.PI * i) / g.n - Math.PI / 2;
      pts.push([g.cx + r * Math.cos(a), g.cy + r * Math.sin(a)]);
    }
    for (let i = 0; i < g.n; i++) for (let j = i + 1; j < g.n; j++) {
      const l = document.createElementNS(NS, 'line');
      l.setAttribute('x1', pts[i][0].toFixed(1)); l.setAttribute('y1', pts[i][1].toFixed(1));
      l.setAttribute('x2', pts[j][0].toFixed(1)); l.setAttribute('y2', pts[j][1].toFixed(1));
      l.setAttribute('stroke', '#7ab4f5'); l.setAttribute('stroke-width', '1.5'); l.setAttribute('stroke-opacity', '0.5');
      svg.appendChild(l);
    }
    pts.forEach(p => {
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', p[0].toFixed(1)); c.setAttribute('cy', p[1].toFixed(1));
      c.setAttribute('r', '9'); c.setAttribute('fill', '#f0b9c4'); c.setAttribute('stroke', '#c97f90'); c.setAttribute('stroke-width', '1.5');
      svg.appendChild(c);
    });
    const edges = g.n * (g.n - 1) / 2;
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('x', g.cx); t.setAttribute('y', g.cy + r + 50);
    t.setAttribute('text-anchor', 'middle'); t.setAttribute('fill', '#bbb');
    t.setAttribute('font-size', '17'); t.setAttribute('font-family', 'sans-serif');
    t.textContent = g.n + ' people · ' + edges + ' links';
    svg.appendChild(t);
  });
});
