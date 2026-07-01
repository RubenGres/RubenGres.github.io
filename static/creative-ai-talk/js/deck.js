// Render-only deck: fetches slides.md, turns it into slides, wires navigation,
// speaker notes, and PDF export. Content lives entirely in slides.md; visuals live
// in visuals/*.js and self-register on window.deckVisuals.

const SLIDES_URL = 'slides.md';

// --- markdown -> slides ----------------------------------------------------
// Slides are separated by a line containing only `---`.
// Per-slide directives (at the very top of a slide): `@class: slide-section`.
// Speaker notes go in a `:::notes ... :::` block anywhere in the slide.
function parseDeck(md) {
  return md
    .split(/^---[ \t]*$/m)
    .map(parseSlide)
    .filter(s => s && s.body.trim());
}

function parseSlide(raw) {
  let cls = '', notes = '';

  // drop HTML comments (e.g. the authoring guide at the top of slides.md) so they
  // don't sit in front of the @directives or render as an empty slide
  raw = raw.replace(/<!--[\s\S]*?-->/g, '');

  // pull out the notes block
  raw = raw.replace(/^:::notes[ \t]*\n([\s\S]*?)\n:::[ \t]*$/m, (_, body) => {
    notes = body.trim();
    return '';
  });

  // pull leading @directives
  const lines = raw.replace(/^\n+/, '').split('\n');
  while (lines.length) {
    const m = /^@(\w+):[ \t]*(.*)$/.exec(lines[0]);
    if (!m) break;
    if (m[1] === 'class') cls = m[2].trim();
    else if (m[1] === 'notes') notes = m[2].trim();
    lines.shift();
  }

  return { cls, notes, body: lines.join('\n') };
}

function buildSlides(deck, parsed) {
  parsed.forEach(s => {
    const el = document.createElement('div');
    el.className = 'slide' + (s.cls ? ' ' + s.cls : '');
    if (s.notes) el.dataset.notes = s.notes;
    el.innerHTML = marked.parse(s.body);
    deck.appendChild(el);
  });
  return Array.from(deck.querySelectorAll('.slide'));
}

// --- main ------------------------------------------------------------------
fetch(SLIDES_URL + '?t=' + Date.now())
  .then(r => { if (!r.ok) throw new Error('cannot load ' + SLIDES_URL); return r.text(); })
  .then(md => init(parseDeck(md)))
  .catch(err => {
    document.querySelector('.deck').innerHTML =
      '<div class="slide active"><h1>Could not load slides.md</h1><p>' + err.message +
      '</p><p>Serve this folder over HTTP (see README): <code>python3 serve.py</code></p></div>';
    console.error(err);
  });

function init(parsed) {
  const deck = document.querySelector('.deck');
  const slides = buildSlides(deck, parsed);
  const counter = document.getElementById('counter');
  const notesEl = document.getElementById('notes');
  let cur = 0;

  // run the registered visuals now that their placeholders exist in the DOM
  (window.deckVisuals || []).forEach(fn => { try { fn(); } catch (e) { console.error(e); } });

  setupLightbox(deck);

  function renderNotes() {
    const n = (slides[cur].dataset.notes || '').trim();
    notesEl.innerHTML = '<h2>Notes · slide ' + (cur + 1) + '</h2>' +
      (n ? '<p></p>' : '<p class="empty">No notes for this slide.</p>');
    if (n) notesEl.querySelector('p').textContent = n;
  }
  function show(n) {
    slides[cur].classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    counter.textContent = (cur + 1) + ' / ' + slides.length;
    localStorage.setItem('cai-slide', cur);
    renderNotes();
  }
  const go = dir => show(cur + dir);

  // navigation
  document.getElementById('prev').addEventListener('click', () => go(-1));
  document.getElementById('next').addEventListener('click', () => go(1));
  document.getElementById('notesBtn').addEventListener('click', () => notesEl.classList.toggle('show'));
  document.getElementById('pdfBtn').addEventListener('click', () => window.print());

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); go(1); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(-1); }
    else if (e.key === 'n' || e.key === 'N') notesEl.classList.toggle('show');
    else if (e.key === 'Home') show(0);
    else if (e.key === 'End') show(slides.length - 1);
  });

  show(Math.min(parseInt(localStorage.getItem('cai-slide'), 10) || 0, slides.length - 1));
}

// Click any slide image to view it fullscreen; click anywhere / Esc to close.
function setupLightbox(deck) {
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<img alt="">';
  document.body.appendChild(box);
  const big = box.querySelector('img');

  const close = () => box.classList.remove('show');

  deck.addEventListener('click', e => {
    const img = e.target.closest('img');
    // skip the deck's decorative corner logo
    if (!img || img.classList.contains('corner-logo')) return;
    big.src = img.currentSrc || img.src;
    big.alt = img.alt || '';
    box.classList.add('show');
  });

  box.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}