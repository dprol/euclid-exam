// An examination in classical education: twenty lessons on the syllabus,
// thirteen of them drawn for the paper, one question each. Every answer draws
// the next step of Euclid I.47: in colour if it was right, in pencil if not.

(function () {
  'use strict';

  const L = window.LESSONS;
  const Q = window.QUESTIONS;
  const STEPS = window.STEPS;
  const DRAW = 13;               // questions per paper, one per step of I.47
  const PASS = 10;               // right answers for the figure to end in Q.E.D. (the prize opens whatever the score)
  const STORE = 'schools-forget-exam-v1';

  const RANKS = [
    [13, 'Q.E.D.', 'Every step justified. Euclid would sign the diploma himself.'],
    [12, 'Summa cum laude', 'Scientia: you could do it again on a blank sheet of paper.'],
    [11, 'Magna cum laude', 'The bridge of donkeys, crossed at a canter.'],
    [10, 'Cum laude', 'Over the bar, and not a step to spare.'],
    [7, 'Back to the definitions', 'Well begun is half done. This was the other half.'],
    [4, 'Invert and multiply', 'The answers came out, but nobody could say why.'],
    [0, 'Logistike', 'Servile mathematics. There is no royal road.'],
  ];

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const roman = (n) => {
    let s = '';
    for (const [v, r] of [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]) while (n >= v) { s += r; n -= v; }
    return s;
  };
  const shuffled = (list) => {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const lessonOf = (qi) => L.find((l) => l.id === Q[qi].lesson);

  const el = {
    rail: $('#rail'), syllabus: $('#syllabus'), overture: $('#overture'), finale: $('#finale'),
    caption: $('#caption'),
  };

  // ---- state ------------------------------------------------------------------

  // draw: indexes into QUESTIONS for this paper, in order (null before the first)
  let state = load();
  let qi = 0;   // which question of the paper is on screen

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(STORE));
      if (s && s.answers && s.order && (!s.draw || s.draw.every((i) => Q[i]))) return s;
    } catch (e) { /* private window, blocked storage: start fresh */ }
    return { draw: null, answers: {}, order: {}, begun: false };
  }
  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) { /* works unsaved too */ }
  }
  function orderFor(i) {
    if (!state.order[i]) { state.order[i] = shuffled([0, 1, 2, 3]); save(); }
    return state.order[i];
  }
  const asked = () => (state.draw || []).filter((i) => state.answers[i]).length;
  const right = () => (state.draw || []).filter((i) => state.answers[i] && state.answers[i].ok).length;
  const finished = () => !!state.draw && asked() === state.draw.length;
  const firstOpen = () => state.draw.findIndex((i) => !state.answers[i]);

  // Thirteen different lessons, one question from each.
  function drawPaper() {
    return shuffled(L.map((l) => l.id)).slice(0, DRAW).map((id) => {
      const pool = Q.map((q, i) => (q.lesson === id ? i : -1)).filter((i) => i >= 0);
      return pool[Math.floor(Math.random() * pool.length)];
    });
  }

  // ---- the figure ----------------------------------------------------------------

  // mode 'full': the finished figure in colour (decoration behind the cards)
  // mode 'paper': step k drawn as answer k went; `upto` is the step being asked
  // Lines are drawn in with a dash animation, so each one needs its length.
  $$('#figure .step.line > *').forEach((p) => p.style.setProperty('--len', p.getTotalLength().toFixed(1)));

  function paintFigure(mode, upto) {
    $$('#figure .step').forEach((g) => {
      const s = +g.dataset.s;
      let want = '';
      if (mode === 'full') want = 'on ok';
      else {
        const qid = state.draw && state.draw[s];
        const a = qid != null ? state.answers[qid] : null;
        if (a) want = a.ok ? 'on ok' : 'on no';
        else if (s === upto) want = 'next';
      }
      // only touch steps that change, so the ones already drawn don't redraw
      if (!g.dataset.base) g.dataset.base = g.getAttribute('class');
      const cls = (g.dataset.base + ' ' + want).trim();
      if (g.getAttribute('class') !== cls) g.setAttribute('class', cls);
    });
    const qed = mode === 'paper' && finished() && right() >= PASS;
    document.body.classList.toggle('qed', mode === 'full' || qed);
    if (mode === 'full') { el.caption.textContent = 'Euclid, Elements I.47'; return; }
    const shown = Math.min(asked(), DRAW) - 1;
    const k = upto != null && upto >= 0 && !state.answers[state.draw[upto]] ? upto : shown;
    el.caption.innerHTML = k >= 0
      ? `<span class="n">${roman(k + 1)}.</span> ${esc(STEPS[k])}${finished() ? (right() >= PASS ? ' <b>Q.E.D.</b>' : ' <i>(in pencil)</i>') : ''}`
      : '';
  }

  // ---- views ------------------------------------------------------------------------

  function setView(name) {
    document.body.className = 'view-' + name;
    el.syllabus.hidden = name !== 'syllabus';
    el.overture.hidden = name !== 'overture';
    el.finale.hidden = name !== 'finale';
    el.rail.innerHTML = '';
    if (name !== 'finale') paintFigure('full');
    window.scrollTo(0, 0);
    const c = $('.confetti');
    if (c && name !== 'finale') c.remove();
  }

  // Who the exam is for: { name, first, photo } from local/config.js, if present.
  let who = null;
  // Questions say {author} where a hosted copy puts the first name; the published one says 'the author'.
  const say = (t) => esc(String(t).replace(/\{author\}/g, who ? who.first : 'the author'));
  const cameo = (cls) => (who && who.photo
    ? `<div class="cameo ${cls || ''}"><img src="${esc(who.photo)}" alt="${esc(who.name)}"></div>`
    : `<div class="cameo blank ${cls || ''}" aria-hidden="true"><span>I.47</span></div>`);

  function showOverture() {
    setView('overture');
    el.overture.innerHTML = `
      <div class="card">
        ${cameo()}
        <div class="eyebrow">${who ? 'An examination in classical education for' : 'An examination in classical education'}</div>
        <h1 class="brand">${who ? esc(who.name) : 'What Schools Forget'}</h1>
        <p class="lede">Twenty lessons from <i>What Schools Forget</i> are on the syllabus, and thirteen questions are on the paper. Every answer draws the next step of Euclid I.47 – in colour if you are right, in pencil if you are not.</p>
        <ul class="kinds">
          <li><span class="n">20</span><div><b>Lessons on the syllabus</b><span>From perfect numbers to the Declaration.</span></div></li>
          <li><span class="n">13</span><div><b>Questions on the paper</b><span>A different paper every time.</span></div></li>
          <li><span class="n">4</span><div><b>Answers to choose from</b><span>Then the next step of the proof.</span></div></li>
          <li><span class="n">1</span><div><b>Prize, still wrapped</b><span>Opened when the paper is handed in.</span></div></li>
        </ul>
        <button class="btn go" data-act="syllabus">To the syllabus</button>
      </div>`;
  }

  function showSyllabus() {
    setView('syllabus');
    state.begun = true; save();
    const done = finished(), a = asked(), r = right();
    const onPaper = new Map((state.draw || []).map((qid) => [Q[qid].lesson, qid]));
    const cards = L.map((l, i) => {
      const qid = onPaper.get(l.id);
      const ans = qid != null ? state.answers[qid] : null;
      const mark = ans ? `<span class="mark ${ans.ok ? 'ok' : 'no'}">${ans.ok ? '✓' : '✗'}</span>` : '';
      const inner = `<span class="num">${roman(i + 1)}</span><span class="date">${esc(l.date)}</span><span class="title">${esc(l.title)}</span><span class="about">${esc(l.about)}</span>${mark}`;
      return done
        ? `<a class="lesson" style="--cloth:${l.cloth}" href="${esc(l.url)}" target="_blank" rel="noopener">${inner}<span class="open">Read it ↗</span></a>`
        : `<div class="lesson shut" style="--cloth:${l.cloth}">${inner}</div>`;
    }).join('');

    let lede, tally, main;
    if (!state.draw) {
      lede = 'Twenty lessons, in the order they were written. Thirteen of them are on today’s paper.';
      tally = 'The lessons can be read once the paper is handed in.';
      main = '<button class="btn" data-act="start">Begin the exam</button>';
    } else if (!done) {
      lede = 'Twenty lessons, in the order they were written. Thirteen of them are on today’s paper.';
      tally = `<b>${a}</b> of ${DRAW} answered · <b>${r}</b> right`;
      main = `<button class="btn" data-act="resume">Continue: question ${a + 1} of ${DRAW}</button><button class="linkish" data-act="reset">Start over</button>`;
    } else {
      lede = 'The paper is in, and the lessons are open. Every one of them links to the article.';
      tally = `<b>${r}</b> right of ${DRAW}`;
      main = '<button class="btn" data-act="finale">Read the report</button><button class="btn ghost" data-act="start">Sit it again</button>';
    }
    el.syllabus.innerHTML = `
      <div class="card wide">
        <div class="eyebrow">The syllabus</div>
        <h1 class="brand">${who ? 'Mr. ' + esc(who.name.split(' ').slice(-1)[0]) + '’s Lessons' : 'What Schools Forget'}</h1>
        <p class="lede">${lede}</p>
        <p class="tally">${tally}</p>
        <div class="lessons">${cards}</div>
        <div class="foot">${main}</div>
      </div>`;
  }

  function showFinale() {
    setView('finale');
    paintFigure('paper', null);
    const r = right(), won = r >= PASS;
    const [, rank, line] = RANKS.find(([min]) => r >= min);
    const rows = state.draw.map((qid, n) => {
      const ok = state.answers[qid].ok;
      return `<li class="${ok ? 'ok' : 'no'}"><span class="m">${roman(n + 1)}</span><span><b>${esc(lessonOf(qid).title)}</b> <i>– ${esc(Q[qid].options[0])}</i></span></li>`;
    }).join('');
    // The prize is given whatever the score.
    const prize = `<div class="prize" id="prize">
           <button class="gift" data-act="unwrap" aria-label="Open the prize"><span class="lid"></span><span class="box"></span><span class="tag">Open me</span></button>
           <div class="book" hidden>
             <img src="img/prize.jpg" alt="Math with Bad Drawings, by Ben Orlin">
             <div><div class="eyebrow">The prize</div><p class="booktitle">Math with Bad Drawings</p><p class="byline">Ben Orlin · Illuminating the ideas that shape our reality</p>
             <p class="note">${won ? `Plenty of pictures, as ${say('{author}')} would want. Not one of them in Byrne’s colours.` : `Not every step went down in colour – but the prize was never in doubt. Plenty of pictures, as ${say('{author}')} would want.`}</p></div>
           </div>
         </div>`;
    el.finale.innerHTML = `
      <div class="card">
        ${cameo('small')}
        <div class="eyebrow">The examiners’ report</div>
        <p class="score">${r}<small> / ${DRAW}</small></p>
        <p class="rank">${esc(rank)}</p>
        <p class="rankline">${esc(line)}</p>
        ${prize}
        <ol class="results">${rows}</ol>
        <p class="wish">${who ? `Thank you for the lessons, ${esc(who.first)}.` : 'Quod erat demonstrandum.'}</p>
        <div class="foot">
          <button class="btn" data-act="start">Sit it again</button>
          <button class="btn ghost" data-act="syllabus">The syllabus</button>
        </div>
      </div>`;
    confetti();
  }

  function confetti() {
    const colours = ['#d9531e', '#2f65a7', '#f2bc20', '#1b1b1b'];
    let bits = '';
    for (let i = 0; i < 46; i++) {
      const d = 5 + Math.random() * 6;
      const shape = i % 3 === 0 ? 'tri' : i % 3 === 1 ? 'sq' : '';
      bits += `<i class="${shape}" style="left:${(Math.random() * 100).toFixed(1)}%;--c:${colours[i % colours.length]};animation-duration:${d.toFixed(1)}s;animation-delay:${(-Math.random() * d).toFixed(1)}s"></i>`;
    }
    const c = document.createElement('div');
    c.className = 'confetti';
    c.innerHTML = bits;
    document.body.append(c);
  }

  function unwrap() {
    const p = $('#prize');
    if (!p || p.classList.contains('open')) return;
    p.classList.add('open');
    setTimeout(() => { $('.gift', p).hidden = true; $('.book', p).hidden = false; }, 650);
  }

  // ---- the paper ------------------------------------------------------------------------

  function startGame() {
    state = { draw: drawPaper(), answers: {}, order: {}, begun: true };
    save();
    openQuestion(0);
  }

  function openQuestion(n) {
    qi = n;
    el.syllabus.hidden = el.overture.hidden = el.finale.hidden = true;
    const c = $('.confetti'); if (c) c.remove();
    document.body.className = 'view-question';
    window.scrollTo(0, 0);
    renderRail();
  }

  function answer(k) {
    const qid = state.draw[qi];
    if (state.answers[qid]) return;
    const pick = orderFor(qid)[k];
    state.answers[qid] = { pick, ok: pick === 0 };
    save();
    renderRail();
    const rv = $('.reveal');
    if (rv && !wide()) rv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function onward() {
    if (finished()) showFinale(); else openQuestion(firstOpen());
  }

  const wide = () => window.matchMedia('(min-width: 861px)').matches;

  function renderRail() {
    const qid = state.draw[qi], q = Q[qid], l = lessonOf(qid), ans = state.answers[qid], order = orderFor(qid);
    paintFigure('paper', qi);
    const pips = state.draw.map((id, n) => {
      const a = state.answers[id];
      return `<i class="${a ? (a.ok ? 'ok' : 'no') : ''} ${n === qi ? 'now' : ''}"></i>`;
    }).join('');
    const opts = order.map((oi, k) => {
      let cls = '';
      if (ans) cls = oi === 0 ? 'correct' : oi === ans.pick ? 'wrong' : 'other';
      return `<button class="opt ${cls}" data-act="answer" data-k="${k}" ${ans ? 'disabled' : ''}><span class="key">${'ABCD'[k]}</span><span>${esc(q.options[oi])}</span></button>`;
    }).join('');
    let reveal = '';
    if (ans) {
      reveal = `
        <section class="panel reveal">
          <div class="verdict ${ans.ok ? 'good' : 'bad'}">${ans.ok ? 'Quite right – drawn in colour' : 'Not this time – drawn in pencil'}</div>
          <p class="why">${say(q.why)}</p>
          <div class="actions">
            <button class="btn" data-act="onward">${finished() ? 'Hand in the paper' : 'Next question →'}</button>
            <a class="linkish" href="${esc(l.url)}" target="_blank" rel="noopener">Read the lesson ↗</a>
          </div>
        </section>`;
    }
    el.rail.innerHTML = `
      <header class="panel masthead" style="--cloth:${l.cloth}">
        <div class="top"><button class="back" data-act="syllabus">← The syllabus</button><span class="sofar">Question ${qi + 1} of ${DRAW}</span></div>
        <div class="pips">${pips}</div>
        <div class="eyebrow">Lesson · ${esc(l.date)}</div>
        <h1 class="lessontitle">${esc(l.title)}</h1>
        <p class="ask">${say(q.text)}</p>
      </header>
      <section class="panel options">${opts}</section>
      ${reveal}`;
  }

  // ---- input -------------------------------------------------------------------------------

  function act(name, data) {
    switch (name) {
      case 'syllabus': showSyllabus(); break;
      case 'start': startGame(); break;
      case 'resume': openQuestion(Math.max(0, firstOpen())); break;
      case 'onward': onward(); break;
      case 'finale': showFinale(); break;
      case 'answer': answer(+data.k); break;
      case 'unwrap': unwrap(); break;
      case 'reset':
        if (window.confirm('Tear up this paper and start again?')) {
          state = { draw: null, answers: {}, order: {}, begun: false };
          save();
          showOverture();
        }
        break;
    }
  }

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (b && !b.disabled) act(b.dataset.act, b.dataset);
  });

  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const view = document.body.className.match(/view-(\w+)/)[1];
    const k = e.key;
    if (view === 'overture' && k === 'Enter') { showSyllabus(); return; }
    if (view !== 'question') return;
    if (k === 'Escape') { showSyllabus(); return; }
    const ans = state.answers[state.draw[qi]];
    const pick = '1234'.indexOf(k) >= 0 ? +k - 1 : 'abcd'.indexOf(k.toLowerCase());
    if (!ans && k.length === 1 && pick >= 0) { answer(pick); e.preventDefault(); return; }
    if (ans && (k === 'Enter' || k === 'ArrowRight')) { onward(); e.preventDefault(); }
  });

  // ---- go ------------------------------------------------------------------------------------

  // A name and a photograph are optional and live in local/config.js, which is
  // never published; GitHub Pages is not even asked for it.
  function loadLocal() {
    return new Promise((done) => {
      if (/(^|\.)github\.io$/.test(location.hostname)) { done(); return; }
      const s = document.createElement('script');
      s.src = 'local/config.js';
      s.onload = s.onerror = () => done();
      document.head.append(s);
    });
  }

  loadLocal().then(() => {
    who = window.HONOREE || null;
    if (who) document.title = `${who.first}’s final exam`;
    if (state.begun) showSyllabus(); else showOverture();
  });
})();
