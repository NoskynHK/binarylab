/* Binary Lab — by Noskyn */
(function () {
  'use strict';

  // Cambia qui se l'indirizzo della Project Hub è diverso
  const HUB_URL = 'https://noskynhk.github.io/projecthub';

  /* ---------------- traduzioni ---------------- */
  const I18N = {
    it: {
      title: 'Binary Lab', back: 'Torna alla Project Hub',
      subtitle: 'Converti numeri e testo tra binario, ottale, decimale ed esadecimale.',
      tabNum: 'Numeri', tabText: 'Testo', tabBits: 'Bit',
      inputLabel: 'Valore', numPh: 'es. 1011 0110', fromBase: 'Base di partenza',
      customOpt: 'Personalizzata…', customFrom: 'Base personalizzata di partenza (2–36)',
      customTo: 'Base personalizzata di arrivo (2–36)',
      bin: 'Binario', oct: 'Ottale', dec: 'Decimale', hex: 'Esadecimale', custom: 'Base',
      copy: 'Copia', copied: 'Copiato!',
      hintNum: 'Puoi usare spazi, prefissi (0b, 0o, 0x) e il segno meno. Nessun limite di grandezza.',
      invalid: 'Carattere non valido per questa base.', badBase: 'La base deve essere tra 2 e 36.',
      mode: 'Direzione', textToCode: 'Testo → codice', codeToText: 'Codice → testo',
      codeBase: 'Formato del codice', textIn: 'Il tuo testo', codeIn: 'Il tuo codice',
      textPh: 'Ciao 👋', codePh: 'es. 01000011 01101001',
      swap: '⇅ Scambia', result: 'Risultato',
      hintText: 'Il testo viene codificato in UTF-8: emoji e lettere accentate occupano più byte.',
      badByte: 'Ogni valore deve essere un byte valido (0–255) nella base scelta.',
      width: 'Larghezza', actions: 'Operazioni', clear: 'Azzera', invert: 'NOT',
      hintBits: 'Clicca sui bit per accenderli o spegnerli (1 = acceso).',
      bitsUsed: 'Bit usati', footer: 'Fatto da NoskynHK'
    },
    en: {
      title: 'Binary Lab', back: 'Back to Project Hub',
      subtitle: 'Convert numbers and text between binary, octal, decimal and hexadecimal.',
      tabNum: 'Numbers', tabText: 'Text', tabBits: 'Bits',
      inputLabel: 'Value', numPh: 'e.g. 1011 0110', fromBase: 'Source base',
      customOpt: 'Custom…', customFrom: 'Custom source base (2–36)',
      customTo: 'Custom target base (2–36)',
      bin: 'Binary', oct: 'Octal', dec: 'Decimal', hex: 'Hexadecimal', custom: 'Base',
      copy: 'Copy', copied: 'Copied!',
      hintNum: 'You can use spaces, prefixes (0b, 0o, 0x) and a minus sign. No size limit.',
      invalid: 'Invalid character for this base.', badBase: 'Base must be between 2 and 36.',
      mode: 'Direction', textToCode: 'Text → code', codeToText: 'Code → text',
      codeBase: 'Code format', textIn: 'Your text', codeIn: 'Your code',
      textPh: 'Hello 👋', codePh: 'e.g. 01001000 01101001',
      swap: '⇅ Swap', result: 'Result',
      hintText: 'Text is encoded as UTF-8: emoji and accented letters take more than one byte.',
      badByte: 'Each value must be a valid byte (0–255) in the chosen base.',
      width: 'Width', actions: 'Operations', clear: 'Clear', invert: 'NOT',
      hintBits: 'Click the bits to toggle them on or off (1 = on).',
      bitsUsed: 'Bits used', footer: 'Made by NoskynHK'
    },
    de: {
      title: 'Binary Lab', back: 'Zurück zum Project Hub',
      subtitle: 'Zahlen und Text zwischen Binär, Oktal, Dezimal und Hexadezimal umrechnen.',
      tabNum: 'Zahlen', tabText: 'Text', tabBits: 'Bits',
      inputLabel: 'Wert', numPh: 'z. B. 1011 0110', fromBase: 'Ausgangsbasis',
      customOpt: 'Eigene…', customFrom: 'Eigene Ausgangsbasis (2–36)',
      customTo: 'Eigene Zielbasis (2–36)',
      bin: 'Binär', oct: 'Oktal', dec: 'Dezimal', hex: 'Hexadezimal', custom: 'Basis',
      copy: 'Kopieren', copied: 'Kopiert!',
      hintNum: 'Leerzeichen, Präfixe (0b, 0o, 0x) und Minuszeichen sind erlaubt. Keine Größenbegrenzung.',
      invalid: 'Ungültiges Zeichen für diese Basis.', badBase: 'Die Basis muss zwischen 2 und 36 liegen.',
      mode: 'Richtung', textToCode: 'Text → Code', codeToText: 'Code → Text',
      codeBase: 'Code-Format', textIn: 'Dein Text', codeIn: 'Dein Code',
      textPh: 'Hallo 👋', codePh: 'z. B. 01001000 01101001',
      swap: '⇅ Tauschen', result: 'Ergebnis',
      hintText: 'Text wird als UTF-8 kodiert: Emojis und Umlaute belegen mehr als ein Byte.',
      badByte: 'Jeder Wert muss ein gültiges Byte (0–255) in der gewählten Basis sein.',
      width: 'Breite', actions: 'Operationen', clear: 'Leeren', invert: 'NOT',
      hintBits: 'Klicke auf die Bits, um sie ein- oder auszuschalten (1 = an).',
      bitsUsed: 'Genutzte Bits', footer: 'Erstellt von NoskynHK'
    }
  };

  // Etichette dei <option> di base (cambiano con la lingua)
  const BASE_NAMES = {
    it: { 2: 'Binario', 8: 'Ottale', 10: 'Decimale', 16: 'Esadecimale' },
    en: { 2: 'Binary', 8: 'Octal', 10: 'Decimal', 16: 'Hexadecimal' },
    de: { 2: 'Binär', 8: 'Oktal', 10: 'Dezimal', 16: 'Hexadezimal' }
  };

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  let lang = 'it';
  try {
    lang = localStorage.getItem('bl-lang') || '';
  } catch (e) {}
  if (!I18N[lang]) {
    const nav = (navigator.language || 'it').slice(0, 2).toLowerCase();
    lang = I18N[nav] ? nav : 'it';
  }
  const t = (k) => (I18N[lang] && I18N[lang][k]) || k;

  /* ---------------- matematica ---------------- */
  const DIGITS = '0123456789abcdefghijklmnopqrstuvwxyz';

  function parseBig(str, base) {
    let s = String(str).trim().toLowerCase().replace(/[\s_,]/g, '');
    if (!s) return null;
    let neg = false;
    if (s[0] === '-' || s[0] === '+') { neg = s[0] === '-'; s = s.slice(1); }
    const prefix = { 2: '0b', 8: '0o', 16: '0x' }[base];
    if (prefix && s.startsWith(prefix)) s = s.slice(2);
    if (!s) throw new Error('invalid');
    const B = BigInt(base);
    let v = 0n;
    for (const ch of s) {
      const d = DIGITS.indexOf(ch);
      if (d < 0 || d >= base) throw new Error('invalid');
      v = v * B + BigInt(d);
    }
    return neg ? -v : v;
  }

  function group(str, size, pad) {
    const neg = str[0] === '-';
    let s = neg ? str.slice(1) : str;
    if (pad) s = s.padStart(Math.ceil(s.length / size) * size, '0');
    const out = [];
    for (let i = 0; i < s.length; i += size) out.push(s.slice(i, i + size));
    return (neg ? '-' : '') + out.join(' ');
  }

  function makeRow(label, value, plain) {
    const row = document.createElement('div');
    row.className = 'res';
    row.innerHTML = '<span class="lab"></span><code></code><button type="button" class="copy"></button>';
    row.children[0].textContent = label;
    row.children[1].textContent = value;
    const btn = row.children[2];
    btn.textContent = t('copy');
    btn.addEventListener('click', () => copyText(plain != null ? plain : value, btn));
    return row;
  }

  async function copyText(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e2) {}
      ta.remove();
    }
    const old = btn.textContent;
    btn.textContent = t('copied');
    btn.classList.add('done');
    setTimeout(() => { btn.textContent = btn.dataset.label || t('copy'); btn.classList.remove('done'); }, 1100);
  }

  function renderResults(container, v, customBase) {
    container.innerHTML = '';
    const bin = v.toString(2);
    const rows = [
      [t('bin'), group(bin, 4, true), bin.replace('-', '-')],
      [t('oct'), v.toString(8), null],
      [t('dec'), v.toString(10), null],
      [t('hex'), v.toString(16).toUpperCase(), null]
    ];
    rows.forEach(([l, val, plain]) => container.appendChild(makeRow(l, val, plain)));
    if (customBase) {
      container.appendChild(makeRow(t('custom') + ' ' + customBase, v.toString(customBase).toUpperCase()));
    }
  }

  /* ---------------- tab NUMERI ---------------- */
  const numInput = $('#numInput');
  const numBase = $('#numBase');
  const customFrom = $('#customFrom');
  const customTo = $('#customTo');
  const numMsg = $('#numMsg');
  const numResults = $('#numResults');

  function readBase(el) {
    const n = parseInt(el.value, 10);
    return n >= 2 && n <= 36 ? n : null;
  }

  function updateNum() {
    $('#customFromRow').hidden = numBase.value !== 'custom';
    numMsg.textContent = '';
    numInput.classList.remove('bad');
    numResults.innerHTML = '';

    let base = numBase.value === 'custom' ? readBase(customFrom) : parseInt(numBase.value, 10);
    if (!base) { numMsg.textContent = t('badBase'); return; }
    const to = readBase(customTo);

    try {
      const v = parseBig(numInput.value, base);
      if (v === null) return;
      renderResults(numResults, v, to);
    } catch (e) {
      numInput.classList.add('bad');
      numMsg.textContent = t('invalid');
    }
  }
  [numInput, numBase, customFrom, customTo].forEach((el) => el.addEventListener('input', updateNum));

  /* ---------------- tab TESTO ---------------- */
  const textInput = $('#textInput');
  const textBase = $('#textBase');
  const textOutput = $('#textOutput');
  const textMsg = $('#textMsg');
  let textMode = 'enc';

  function fmtByte(b, base) {
    const s = b.toString(base);
    if (base === 2) return s.padStart(8, '0');
    if (base === 8) return s.padStart(3, '0');
    if (base === 16) return s.padStart(2, '0').toUpperCase();
    return s;
  }

  function updateText() {
    const base = parseInt(textBase.value, 10);
    textMsg.textContent = '';
    textInput.classList.remove('bad');

    if (textMode === 'enc') {
      const bytes = new TextEncoder().encode(textInput.value);
      textOutput.textContent = Array.from(bytes, (b) => fmtByte(b, base)).join(' ');
    } else {
      const parts = textInput.value.trim().split(/[\s,;]+/).filter(Boolean);
      const bytes = [];
      try {
        for (let p of parts) {
          p = p.toLowerCase();
          const prefix = { 2: '0b', 8: '0o', 16: '0x' }[base];
          if (prefix && p.startsWith(prefix)) p = p.slice(2);
          const v = parseBig(p, base);
          if (v === null || v < 0n || v > 255n) throw new Error('byte');
          bytes.push(Number(v));
        }
        textOutput.textContent = new TextDecoder('utf-8').decode(new Uint8Array(bytes));
      } catch (e) {
        textOutput.textContent = '';
        textInput.classList.add('bad');
        textMsg.textContent = e.message === 'byte' ? t('badByte') : t('invalid');
      }
    }
  }

  function setTextMode(mode) {
    textMode = mode;
    $$('#textMode button').forEach((b) => b.classList.toggle('on', b.dataset.mode === mode));
    $('#textInLabel').textContent = t(mode === 'enc' ? 'textIn' : 'codeIn');
    textInput.placeholder = t(mode === 'enc' ? 'textPh' : 'codePh');
    updateText();
  }

  $$('#textMode button').forEach((b) =>
    b.addEventListener('click', () => { textInput.value = ''; setTextMode(b.dataset.mode); }));
  textInput.addEventListener('input', updateText);
  textBase.addEventListener('input', updateText);
  $('#textSwap').addEventListener('click', () => {
    const out = textOutput.textContent;
    const next = textMode === 'enc' ? 'dec' : 'enc';
    textInput.value = out;
    setTextMode(next);
  });
  $('#textCopy').addEventListener('click', (e) => copyText(textOutput.textContent, e.currentTarget));

  /* ---------------- tab BIT ---------------- */
  let width = 8;
  let value = 0n;
  const bitGrid = $('#bitGrid');
  const bitResults = $('#bitResults');
  const mask = () => (1n << BigInt(width)) - 1n;

  function renderBits() {
    bitGrid.innerHTML = '';
    for (let n = width / 4 - 1; n >= 0; n--) {
      const nib = document.createElement('div');
      nib.className = 'nibble';
      for (let b = 3; b >= 0; b--) {
        const i = n * 4 + b;
        const on = ((value >> BigInt(i)) & 1n) === 1n;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'bit' + (on ? ' on' : '');
        btn.innerHTML = (on ? '1' : '0') + '<small>' + i + '</small>';
        btn.setAttribute('aria-pressed', on);
        btn.addEventListener('click', () => { value ^= (1n << BigInt(i)); renderBits(); });
        nib.appendChild(btn);
      }
      bitGrid.appendChild(nib);
    }
    bitResults.innerHTML = '';
    bitResults.appendChild(makeRow(t('dec'), value.toString(10)));
    bitResults.appendChild(makeRow(t('hex'), '0x' + value.toString(16).toUpperCase().padStart(width / 4, '0')));
    bitResults.appendChild(makeRow(t('oct'), value.toString(8)));
    bitResults.appendChild(makeRow(t('bin'), group(value.toString(2).padStart(width, '0'), 4, false),
      value.toString(2).padStart(width, '0')));
  }

  $$('#bitWidth button').forEach((b) => b.addEventListener('click', () => {
    width = parseInt(b.dataset.w, 10);
    value &= mask();
    $$('#bitWidth button').forEach((x) => x.classList.toggle('on', x === b));
    renderBits();
  }));
  $('#opClear').addEventListener('click', () => { value = 0n; renderBits(); });
  $('#opNot').addEventListener('click', () => { value = ~value & mask(); renderBits(); });
  $('#opShl').addEventListener('click', () => { value = (value << 1n) & mask(); renderBits(); });
  $('#opShr').addEventListener('click', () => { value >>= 1n; renderBits(); });

  /* ---------------- tab ---------------- */
  $$('.tab').forEach((tab) => tab.addEventListener('click', () => {
    $$('.tab').forEach((x) => x.classList.toggle('active', x === tab));
    ['num', 'text', 'bits'].forEach((n) => { $('#panel-' + n).hidden = n !== tab.dataset.tab; });
  }));

  /* ---------------- lingua ---------------- */
  function applyLang() {
    document.documentElement.lang = lang;
    document.title = t('title');
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    $$('#langSeg button').forEach((b) => b.classList.toggle('on', b.dataset.lang === lang));

    const names = BASE_NAMES[lang];
    [numBase, textBase].forEach((sel) => {
      Array.from(sel.options).forEach((o) => {
        if (names[o.value]) o.textContent = (sel === numBase ? o.value + ' · ' : '') + names[o.value];
      });
    });

    setTextMode(textMode);
    updateNum();
    renderBits();
  }

  $$('#langSeg button').forEach((b) => b.addEventListener('click', () => {
    lang = b.dataset.lang;
    try { localStorage.setItem('bl-lang', lang); } catch (e) {}
    applyLang();
  }));

  /* ---------------- tema ---------------- */
  $('#themeBtn').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('bl-theme', next); } catch (e) {}
  });

  /* ---------------- link hub ---------------- */
  $('#backBtn').href = HUB_URL;
  $('#backBtn2').href = HUB_URL;

  /* ---------------- pioggia di 0 e 1 ---------------- */
  (function rain() {
    const cv = $('#rain');
    const ctx = cv.getContext('2d');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const size = 18;
    let cols, drops;

    function resize() {
      cv.width = innerWidth;
      cv.height = innerHeight;
      cols = Math.ceil(cv.width / size);
      drops = Array.from({ length: cols }, () => Math.random() * -40);
    }
    resize();
    addEventListener('resize', resize);
    if (reduce) return;

    function frame() {
      const rgb = getComputedStyle(document.documentElement).getPropertyValue('--rain').trim() || '169,155,255';
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.font = '600 ' + (size - 3) + 'px monospace';
      for (let i = 0; i < cols; i++) {
        const y = drops[i] * size;
        for (let k = 0; k < 6; k++) {
          ctx.fillStyle = 'rgba(' + rgb + ',' + (0.55 - k * 0.09) + ')';
          ctx.fillText(Math.random() < 0.5 ? '0' : '1', i * size, y - k * size);
        }
        if (y > cv.height + 6 * size && Math.random() > 0.975) drops[i] = Math.random() * -20;
        drops[i] += 0.12;
      }
    }
    setInterval(frame, 60);
  })();

  applyLang();
})();
