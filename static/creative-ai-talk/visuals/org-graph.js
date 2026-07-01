// "Our internal organization" — the 5-person fully-connected team (10 links) plus a
// hub node in the middle, where every person also commands a cluster of 5 agents.
// Expects <svg id="orgViz">.
(window.deckVisuals = window.deckVisuals || []).push(function () {
  const svg = document.getElementById('orgViz');
  if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg';

  const cx = 380, cy = 350;   // pentagon centre
  const R = 150;              // pentagon radius
  const SAT_D = 78;           // distance of agents from their person
  const SAT_SPREAD = 1.5;     // angular fan width (radians) for the 5 agents
  const N = 5, SATS = 5;

  const line = (x1, y1, x2, y2, color, w, op) => {
    const l = document.createElementNS(NS, 'line');
    l.setAttribute('x1', x1.toFixed(1)); l.setAttribute('y1', y1.toFixed(1));
    l.setAttribute('x2', x2.toFixed(1)); l.setAttribute('y2', y2.toFixed(1));
    l.setAttribute('stroke', color); l.setAttribute('stroke-width', w); l.setAttribute('stroke-opacity', op);
    svg.appendChild(l);
  };
  const node = (x, y, r, fill, stroke) => {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', y.toFixed(1));
    c.setAttribute('r', r); c.setAttribute('fill', fill);
    c.setAttribute('stroke', stroke); c.setAttribute('stroke-width', '1.5');
    svg.appendChild(c);
  };

  // people positions (pentagon)
  const people = [];
  for (let i = 0; i < N; i++) {
    const a = (2 * Math.PI * i) / N - Math.PI / 2;
    people.push([cx + R * Math.cos(a), cy + R * Math.sin(a), a]);
  }

  // --- links first, so nodes sit on top ---
  // pentagon: all 10 inter-person links
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++)
    line(people[i][0], people[i][1], people[j][0], people[j][1], '#7ab4f5', '1.5', '0.5');
  // hub in the middle connected to every person
  for (let i = 0; i < N; i++)
    line(cx, cy, people[i][0], people[i][1], '#7ab4f5', '1.5', '0.4');

  // each person's 5 agents, fanned outward (away from the centre)
  people.forEach(([px, py, a]) => {
    for (let k = 0; k < SATS; k++) {
      const off = (k / (SATS - 1) - 0.5) * SAT_SPREAD; // -spread/2 .. +spread/2
      const sa = a + off;
      const sx = px + SAT_D * Math.cos(sa);
      const sy = py + SAT_D * Math.sin(sa);
      line(px, py, sx, sy, '#7ab4f5', '1.2', '0.45');
      node(sx, sy, 7, '#7ab4f5', '#4f86c6');
    }
  });

  // --- nodes ---
  people.forEach(([px, py]) => node(px, py, 11, '#f0b9c4', '#c97f90'));
  node(cx, cy, 20, '#7ab4f5', '#4f86c6'); // centre hub
});
