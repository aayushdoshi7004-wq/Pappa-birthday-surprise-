/* =====================================================
   ⚙️ येथे फक्त हा भाग बदला — फोटोंची नावे, वाक्ये, संदेश
   फोटो "photos" (किंवा "Images") फोल्डरमध्ये pappa1.jpg ... pappa15.jpg नावाने ठेवा.
   फोटो सापडला नाही तर तेथे आपोआप जागा-चित्र दिसते (त्यावर शोधलेला रस्ता दिसतो).
   सूचना: प्रत्येक फोटो साधारण १ MB पेक्षा लहान (रुंदी सुमारे १०८० px) ठेवा.
   ===================================================== */

// ४. आठवणींची पेटी — सर्व फोटो पाहिल्यावरच "पुढे चला" दिसते
const CHEST_PHOTOS = [
  { src: "photos/pappa1.jpg", cap: "तुमचं हसू आमचं सर्वांत आवडतं!" },
  { src: "photos/pappa2.jpg", cap: "माझ्या आयुष्यातील खरा हिरो म्हणजे माझे पप्पा." },
  { src: "photos/pappa3.jpg", cap: "माझं संपूर्ण जग म्हणजे माझे पप्पा" },
  { src: "photos/pappa4.jpg", cap: "आमच्या घरचे आधारस्तंभ — आमचे पप्पा!" }
];

// ५. फोटोचे गुपित — प्रत्येक फोटोचा स्वतःचा उघडण्याचा प्रकार (effect)
// effect पर्याय: "lines" (रेषांची कलाकृती), "rangoli" (रांगोळी), "particles" (प्रकाशकण),
//                "geometry" (भूमितीय रचना), "curtain" (प्रकाशाचा पडदा), "pieces" (तुकडे)
const REVEAL_PHOTOS = [
  { src: "photos/pappa5.jpg",  effect: "lines",     cap: "हेच ते आमचे लाडके पप्पा!" },
  { src: "photos/pappa11.jpg", effect: "rangoli",   cap: "माझ्या प्रत्येक यशामागे माझ्या पप्पांचे आशीर्वाद आहेत." },
  { src: "photos/pappa12.jpg", effect: "particles", cap: "माझ्यासाठी तुम्ही घेतलेल्या कष्टांची परतफेड कधीच करू शकणार नाही, पण तुमचा अभिमान नक्की बनेन." },
  { src: "photos/pappa13.jpg", effect: "geometry",  cap: "देवाकडे एकच प्रार्थना आहे, पप्पा, तुम्हाला उदंड आयुष्य आणि भरपूर आनंद मिळो." },
  { src: "photos/pappa14.jpg", effect: "curtain",   cap: "माझ्या आयुष्यातील सर्वात अनमोल व्यक्ती म्हणजे माझे पप्पा." },
  { src: "photos/pappa15.jpg", effect: "pieces",    cap: "आमचे सुपरहिरो — पप्पा!" }
];

// ६. खास क्षण — ४ फोटो + आठवण; १-४ क्रमांकाची बटणे दाबून फोटो पाहता येतात
const MOMENTS = [
  { src: "photos/pappa6.jpg",  cap: "पप्पा, तुमचं प्रेम शब्दांत व्यक्त करणं माझ्यासाठी कधीच शक्य नाही." },
  { src: "photos/pappa7.jpg",  cap: "पप्पा तुमचं असणंच माझ्यासाठी जगातील सर्वात मोठी भेट आहे." },
  { src: "photos/pappa8.jpg",  cap: "माझ्या आयुष्यात कितीही लोक आले तरी तुमची जागा कोणीच घेऊ शकणार नाही." },
  { src: "photos/pappa9.jpg",  cap: "पप्पा तुमची सावली कायम माझ्या डोक्या वर राहो एवढीच देवा कडे प्रार्थना आहे." }
];

// ८. शेवट — पप्पांचा सर्वांत आवडता फोटो
const FINAL_PHOTO = "photos/pappa10.jpg";

// ८. शेवटचा संदेश (रिकाम्या ओळीने नवा परिच्छेद सुरू होतो) — येथे वैयक्तिक संदेश लिहा
const FINAL_MESSAGE = "दिवाळीच्या प्रकाशासारखाच\nतुमचा आनंद सदैव उजळत राहो!\n\nवाढदिवसाच्या हार्दिक शुभेच्छा,\nपप्पा! ❤️";

// 🎆 आकाशातील फटाके — दोन फटाक्यांमधील वेळ (सेकंद). कमी आकडे = जास्त फटाके
const SKY = { gap: [1.3, 2.6] };

/* ===================== येथून पुढे बदलण्याची गरज नाही ===================== */

const $ = id => document.getElementById(id);
const $$ = s => [...document.querySelectorAll(s)];
const mr = n => String(n).replace(/\d/g, d => "०१२३४५६७८९"[d]);
const wait = ms => new Promise(r => setTimeout(r, ms));
const rand = (a, b) => a + Math.random() * (b - a);

/* ---- फोटो शोधक: फोल्डर (photos/Images) आणि प्रकार (.jpg/.jpeg/.png/.webp) आपोआप शोधतो ---- */
function photoTries(src) {
  const m = String(src).match(/([^\/]+?)(\.[a-zA-Z0-9]+)?$/);
  const file = m ? m[1] : String(src);
  const dirs = ["photos/", "Images/", "images/", "Photos/"];
  const exts = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG", "WEBP"];
  const list = [src];
  dirs.forEach(d => exts.forEach(e => list.push(d + file + "." + e)));
  return list.filter((s, i) => list.indexOf(s) === i);
}
function placeholder(label, src) {
  const p = src ? String(src).replace(/[<>&']/g, "") : "";
  const hint = p ? `<text x='300' y='500' font-size='26' fill='#ffffff99' text-anchor='middle'>${p}</text><text x='300' y='545' font-size='26' fill='#ffffff99' text-anchor='middle'>सापडला नाही</text>` : "";
  return "data:image/svg+xml;utf8," + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='700'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#2b1c5a'/><stop offset='1' stop-color='#0f1438'/></linearGradient></defs><rect width='600' height='700' fill='url(#g)'/><text x='300' y='330' font-size='110' text-anchor='middle'>🪔</text><text x='300' y='430' font-size='38' fill='#e8b84a' text-anchor='middle'>${label}</text>${hint}</svg>`);
}
function setImg(img, src, label) {
  if (!src) { img.src = placeholder(label); return; }
  const tries = photoTries(src); let k = 0;
  img.onerror = () => {
    if (img.getAttribute("src") !== tries[k]) return;
    k++;
    if (k < tries.length) img.src = tries[k];
    else { img.onerror = null; img.src = placeholder(label, src); }
  };
  img.src = tries[0];
}

/* ---- आवाज (डिफॉल्ट: बंद; बटण दाबल्यावरच सुरू) ---- */
let ac, master, soundOn = false, musicT;
function audio() {
  if (!ac) { ac = new (window.AudioContext || window.webkitAudioContext)(); master = ac.createGain(); master.gain.value = .5; master.connect(ac.destination); }
  if (ac.state === "suspended") ac.resume();
}
function tone(f, d = .6, v = .12, type = "sine", when = 0) {
  if (!soundOn) return;
  const t = ac.currentTime + when, o = ac.createOscillator(), g = ac.createGain();
  o.type = type; o.frequency.value = f;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .02); g.gain.exponentialRampToValueAtTime(.001, t + d);
  o.connect(g); g.connect(master); o.start(t); o.stop(t + d + .05);
}
function puff() {
  if (!soundOn) return;
  const n = ac.sampleRate * .6, b = ac.createBuffer(1, n, ac.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
  s.buffer = b; f.type = "lowpass"; f.frequency.value = 900;
  g.gain.setValueAtTime(.25, ac.currentTime); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + .6);
  s.connect(f); f.connect(g); g.connect(master); s.start();
}
const SFX = {
  tick: () => tone(660, .15, .06),
  light: () => { tone(523, .9, .1); tone(784, 1.2, .08, "sine", .18); },
  col: k => tone([392, 440, 523, 587, 659][k % 5], 1, .1),
  creak: () => { tone(110, .9, .06, "sawtooth"); tone(98, .9, .05, "sawtooth", .2); },
  puff,
  ta: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 1.2, .08, "sine", i * .15))
};
const SCALE = [392, 440, 494, 587, 659, 784];
function music() {
  if (!soundOn) return;
  [0, 2, 4, 3, 2, 1, 2, 4, 5, 4, 2, 3, 1, 2, 0, 1].forEach((n, i) => tone(SCALE[n], 1.4, .05, "sine", .1 + i * .55));
  tone(196, 8, .03, "sine", .1);
  musicT = setTimeout(music, 16 * 550);
}
$("soundBtn").onclick = () => {
  audio(); soundOn = !soundOn; clearTimeout(musicT);
  $("soundBtn").textContent = soundOn ? "🔊 संगीत बंद करा" : "🔇 संगीत सुरू करा";
  if (soundOn) { SFX.tick(); music(); }
};

/* ---- स्क्रीन-नेव्हिगेशन (एका वेळी एकच स्क्रीन) ---- */
const screens = $$(".screen");
let idx = 0, busy = false;
const prog = $("progress");
screens.forEach(() => prog.appendChild(document.createElement("i")));
function paint() {
  [...prog.children].forEach((d, i) => d.className = i < idx ? "done" : i === idx ? "cur" : "");
  $("backBtn").hidden = idx === 0;
}
function go(n) {
  if (busy || n < 0 || n >= screens.length) return;
  busy = true; setTimeout(() => busy = false, 700);
  $("app").classList.remove("clean");
  screens[idx].classList.remove("active"); idx = n; screens[idx].classList.add("active");
  const last = idx === screens.length - 1;
  $("app").classList.toggle("fxtop", last);
  paint();
  if (last) {                                   // शेवटची स्क्रीन: फटाके + ४ सेकंदांनी "पुन्हा पाहा" बटण
    setTimeout(() => sky.finale(), 900);
    setTimeout(() => $("s7").classList.add("seen"), 4000);
  }
}
document.addEventListener("click", e => { if (e.target.closest("[data-next]")) { SFX.tick(); go(idx + 1); } });
$("backBtn").onclick = () => { SFX.tick(); go(idx - 1); };
paint();

/* ---- फोटो-स्क्रीनवर स्पर्श केल्यास मजकूर आणि बटणे लपतात (पुन्हा स्पर्श = परत दिसतात) ---- */
$$(".screen.photo").forEach(s => s.addEventListener("click", e => {
  if (e.target.closest("button, .bottom")) return;
  if ((s.id === "s3" || s.id === "s4") && !s.classList.contains("done")) return;   // फोटो दिसल्यावरच
  $("app").classList.toggle("clean");
}));

/* ---- दिवे ---- */
const diyaSVG = () => `<svg viewBox="0 0 240 150" aria-hidden="true">
<ellipse cx="120" cy="138" rx="92" ry="9" fill="rgba(0,0,0,.35)"/>
<path d="M214 70 Q234 66 242 46 Q240 76 220 92Z" fill="url(#gTerra)"/>
<path d="M18 74 C34 134 206 134 222 74 Z" fill="url(#gTerra)"/>
<ellipse cx="120" cy="74" rx="102" ry="14" fill="#d97a35"/>
<ellipse cx="120" cy="74" rx="86" ry="9" fill="#3b1608"/>
<path d="M44 96 Q120 122 196 96" stroke="url(#gGold)" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M70 108 Q120 126 170 108" stroke="#e8b84a" stroke-width="2" fill="none" stroke-dasharray="2 7" stroke-linecap="round"/>
<rect x="116" y="56" width="8" height="20" rx="3" fill="#1a0d08"/>
<g class="flame"><path d="M120 10 C142 32 138 54 120 60 C102 54 98 32 120 10Z" fill="url(#gFlame)"/><path d="M120 30 C128 40 127 52 120 56 C113 52 112 40 120 30Z" fill="#fff6d0"/></g>
</svg>`;
$$("[data-diya]").forEach(el => el.innerHTML = diyaSVG());
$("litBtn").onclick = () => { $("bigDiya").dataset.diya = "lit"; $("s1").classList.add("done"); SFX.light(); };

/* ---- रांगोळी (५ टप्पे) ---- */
const rparts = []; let rk = 0;
(function buildRangoli() {
  const P = ["", "", "", "", ""];
  P[0] = `<circle r="28" style="--c:#e8b84a"/><circle r="15" style="--c:#c9304f"/>`;
  for (let a = 0; a < 8; a++) {
    P[1] += `<ellipse cy="-54" rx="13" ry="25" transform="rotate(${a * 45})" style="--c:#ff7a3d"/>`;
    P[2] += `<ellipse cy="-98" rx="11" ry="25" transform="rotate(${a * 45 + 22.5})" style="--c:${a % 2 ? "#e8447a" : "#a259e6"}"/>`;
  }
  for (let a = 0; a < 16; a++) {
    const r = a * 22.5 * Math.PI / 180;
    P[3] += `<circle cx="${(Math.sin(r) * 136).toFixed(1)}" cy="${(-Math.cos(r) * 136).toFixed(1)}" r="6" style="--c:${a % 2 ? "#2ec4b6" : "#e8b84a"}"/>`;
    P[4] += `<path d="M0 -146 L8 -157 L0 -168 L-8 -157Z" transform="rotate(${a * 22.5})" style="--c:${a % 2 ? "#f08a2c" : "#8f5bd6"}"/>`;
  }
  $("rg").innerHTML = `<circle r="172" fill="rgba(255,255,255,.035)"/>` + P.map(p => `<g class="part">${p}</g>`).join("");
  rparts.push(...$$("#rg .part"));
})();
function addPart() {
  if (rk >= 5) return;
  rparts[rk].classList.add("on"); SFX.col(rk); rk++;
  $("rgBtn").textContent = `रंग भरा (${mr(Math.min(rk + 1, 5))}/${mr(5)})`;
  if (rk === 5) setTimeout(() => $("s2").classList.add("done"), 1300);
}
$("rgBtn").onclick = addPart;
$("rg").onclick = addPart;

/* ---- आठवणींची पेटी (पूर्ण-स्क्रीन; सर्व फोटो पाहिल्यावर "पुढे चला") ---- */
let ci = 0; const cSeen = new Set();
function showChest(i) {
  ci = (i + CHEST_PHOTOS.length) % CHEST_PHOTOS.length;
  const img = $("cImg"); img.classList.remove("in"); void img.offsetWidth;
  setImg(img, CHEST_PHOTOS[ci].src, "येथे पप्पांचा फोटो " + mr(ci + 1));
  img.classList.add("in");
  $("cCap").textContent = CHEST_PHOTOS[ci].cap;
  $("cCount").textContent = `${mr(ci + 1)} / ${mr(CHEST_PHOTOS.length)}`;
  cSeen.add(ci);
  const all = cSeen.size >= CHEST_PHOTOS.length;
  $("s3").classList.toggle("seen", all);
  $("cHint").textContent = all ? "फोटोवर स्पर्श करा — मजकूर लपवा/दाखवा" : `सर्व फोटो पाहा (${mr(cSeen.size)}/${mr(CHEST_PHOTOS.length)})`;
}
$("openBtn").onclick = async () => {
  SFX.creak(); $("chest").classList.add("open");
  await wait(1400); showChest(0); $("s3").classList.add("done"); SFX.ta();
};
$("cPrev").onclick = () => { SFX.tick(); showChest(ci - 1); };
$("cNext").onclick = () => { SFX.tick(); showChest(ci + 1); };

/* ---- खास क्षण (पूर्ण-स्क्रीन; क्रमांकाची बटणे, फोटो आधी दिसत नाहीत) ---- */
const mSeen = new Set();
function selMoment(i) {
  const m = MOMENTS[i];
  $$("#thumbs .th").forEach((t, j) => t.classList.toggle("sel", j === i));
  const img = $("mImg"); img.classList.remove("in"); void img.offsetWidth;
  setImg(img, m.src, "येथे फोटो " + mr(i + 1));
  img.classList.add("in");
  $("mTitle").textContent = m.title; $("mText").textContent = m.cap;
  mSeen.add(i);
  $$("#thumbs .th").forEach((t, j) => t.classList.toggle("vis", mSeen.has(j)));
  const all = mSeen.size >= MOMENTS.length;
  $("s5").classList.toggle("seen", all);
  $("mHint").textContent = all ? "फोटोवर स्पर्श करा — मजकूर लपवा/दाखवा" : `सर्व क्रमांक दाबा (${mr(mSeen.size)}/${mr(MOMENTS.length)})`;
  SFX.tick();
}
MOMENTS.forEach((m, i) => {
  const b = document.createElement("button");
  b.className = "th"; b.setAttribute("aria-label", "फोटो " + mr(i + 1));
  b.textContent = mr(i + 1);
  b.onclick = () => selMoment(i);
  $("thumbs").appendChild(b);
});
selMoment(0);

/* ---- केक ---- */
(function buildCake() {
  let c = "", f = "", s = "";
  [112, 131, 150, 169, 188].forEach((x, i) => {
    c += `<rect x="${x - 3}" y="70" width="6" height="36" rx="2" fill="${i % 2 ? "#ffe08a" : "#fff"}"/>
<path d="M${x - 3} 80 L${x + 3} 76 M${x - 3} 90 L${x + 3} 86 M${x - 3} 100 L${x + 3} 96" stroke="#e8447a" stroke-width="2.2" opacity=".75"/>
<line x1="${x}" y1="70" x2="${x}" y2="66" stroke="#222" stroke-width="1.4"/>`;
    f += `<g class="fl" style="animation-delay:-${(i * .37).toFixed(2)}s"><circle cx="${x}" cy="58" r="15" fill="rgba(255,190,80,.28)"/><ellipse cx="${x}" cy="59" rx="4.6" ry="9" fill="url(#cFlame)"/></g>`;
    s += `<path class="sm" d="M${x} 62 q-5 -8 0 -15 q5 -7 0 -14"/>`;
  });
  $("candles").innerHTML = c + s + f;
})();
function sparkles() {
  const w = $("cakeWrap");
  for (let i = 0; i < 14; i++) {
    const e = document.createElement("i");
    e.className = "spk"; e.style.left = rand(12, 88) + "%"; e.style.top = rand(20, 70) + "%"; e.style.animationDelay = rand(0, 1.6) + "s";
    w.appendChild(e);
  }
  setTimeout(() => $$("#cakeWrap .spk").forEach(e => e.remove()), 5500);
}
$("blowBtn").onclick = () => {
  SFX.puff(); $("s6").classList.add("done");
  setTimeout(() => { sparkles(); SFX.ta(); }, 900);
};

/* ---- शेवट ---- */
setImg($("finImg"), FINAL_PHOTO, "येथे पप्पांचा आवडता फोटो");
$("finMsg").innerHTML = FINAL_MESSAGE.split("\n\n").map(p => "<p>" + p.split("\n").join("<br>") + "</p>").join("");

function resetAll() {
  screens.forEach(s => s.classList.remove("done", "seen"));
  $("app").classList.remove("clean");
  $("bigDiya").dataset.diya = "unlit";
  rk = 0; rparts.forEach(p => p.classList.remove("on")); $("rgBtn").textContent = "रंग भरा (१/५)";
  $("chest").classList.remove("open");
  cSeen.clear(); $("cHint").textContent = "";
  mSeen.clear();
  resetReveal();
  selMoment(0);
}
$("restartBtn").onclick = () => { SFX.tick(); go(0); setTimeout(resetAll, 900); };

/* ========== 🖼️ फोटो प्रकटीकरणाचे ६ प्रकार (पूर्ण-स्क्रीन) ========== */
const cvR = $("revCv"), cr = cvR.getContext("2d");
let RW = 0, RH = 0, RD = 1, base = null, curImg = null, ri = 0, rBusy = false, rAnim = 0, rDone = false, rTok = 0;

const r01 = t => Math.max(0, Math.min(1, t));
const rEase = t => { t = r01(t); return t * t * (3 - 2 * t); };
const rOut = t => 1 - Math.pow(1 - r01(t), 3);
const rBack = t => { t = r01(t); const s = 1.4; return 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2); };
const rSeg = (t, a, b) => r01((t - a) / (b - a));
const rBg = () => { cr.globalAlpha = 1; cr.fillStyle = "#0a0d26"; cr.fillRect(0, 0, RW, RH); };
const rFull = a => { cr.globalAlpha = a; cr.drawImage(base, 0, 0, RW, RH); cr.globalAlpha = 1; };
const rTile = (x, y, w, h, dx, dy, dw, dh) => cr.drawImage(base, x * RD, y * RD, w * RD, h * RD, dx, dy, dw, dh);

function loadReveal(i) {
  const src = REVEAL_PHOTOS[i].src, tries = photoTries(src);
  return new Promise(res => {
    let k = 0;
    const next = () => {
      if (k >= tries.length) {
        const p = new Image(); p.onload = () => res(p); p.onerror = () => res(canvasPlaceholder(i));
        p.src = placeholder("येथे पप्पांचा खास फोटो " + mr(i + 1), src); return;
      }
      const im = new Image(); im.onload = () => res(im); im.onerror = () => { k++; next(); }; im.src = tries[k];
    };
    next();
  });
}
function canvasPlaceholder(i) {
  const c = document.createElement("canvas"); c.width = 600; c.height = 800;
  const x = c.getContext("2d"), g = x.createLinearGradient(0, 0, 600, 800);
  g.addColorStop(0, "#2b1c5a"); g.addColorStop(1, "#0f1438");
  x.fillStyle = g; x.fillRect(0, 0, 600, 800);
  x.textAlign = "center"; x.font = "110px serif"; x.fillText("🪔", 300, 380);
  x.fillStyle = "#e8b84a"; x.font = "38px 'Tiro Devanagari Marathi',serif";
  x.fillText("येथे पप्पांचा खास फोटो " + mr(i + 1), 300, 470);
  return c;
}
function fitReveal() {
  RD = Math.min(devicePixelRatio || 1, 2);
  RW = cvR.clientWidth; RH = cvR.clientHeight;
  if (!RW) return;
  cvR.width = RW * RD; cvR.height = RH * RD; cr.setTransform(RD, 0, 0, RD, 0, 0);
}
function buildBase(im) {
  base = document.createElement("canvas"); base.width = cvR.width; base.height = cvR.height;
  const b = base.getContext("2d"), W = base.width, H = base.height;
  const s = Math.max(W / im.width, H / im.height), w = im.width * s, h = im.height * s;
  b.drawImage(im, (W - w) / 2, (H - h) * .3, w, h);   // वरचा भाग (चेहरा) जास्त दिसावा
}
function drawIdle() {
  rBg();   // उघडण्याआधी फोटोची सावलीही दिसू नये — फक्त गडद पार्श्वभूमी आणि "?"
  cr.fillStyle = "#e8b84a"; cr.font = "80px 'Tiro Devanagari Marathi',serif"; cr.textAlign = "center"; cr.textBaseline = "middle";
  cr.fillText("?", RW / 2, RH / 2);
}
function drawDone() { cr.clearRect(0, 0, RW, RH); if (base && base.width) cr.drawImage(base, 0, 0, RW, RH); }

/* --- १. रेषांची कलाकृती --- */
function fxLines(t) {
  rBg();
  const x = RW / 2, y = RH / 2, R = Math.hypot(RW, RH) / 2, N = 24, P = Math.PI * 2;
  const p = rSeg(t, 0, .6), ph = rEase(rSeg(t, .5, 1));
  if (ph > 0) { cr.save(); cr.beginPath(); cr.arc(x, y, R * 1.05 * ph, 0, P); cr.clip(); cr.drawImage(base, 0, 0, RW, RH); cr.restore(); }
  const pt = (i, rr) => [x + Math.cos(i / N * P) * R * rr, y + Math.sin(i / N * P) * R * rr];
  const L = [];
  for (let i = 0; i < N; i++) L.push([[x, y], pt(i, .5)]);
  for (let i = 0; i < N; i++) L.push([pt(i, .5), pt((i + 9) % N, .5)]);
  for (let i = 0; i < N; i++) L.push([pt(i, .5), pt(i, .98)]);
  for (let i = 0; i < N; i++) L.push([pt(i, .98), pt((i + 1) % N, .98)]);
  cr.save();
  cr.strokeStyle = `rgba(255,214,120,${1 - ph * .8})`; cr.lineWidth = 1.4; cr.shadowColor = "#ffb43a"; cr.shadowBlur = 8;
  cr.beginPath();
  L.forEach(([a, b], i) => {
    const lp = r01((p * (L.length + 10) - i) / 10); if (lp <= 0) return;
    cr.moveTo(a[0], a[1]); cr.lineTo(a[0] + (b[0] - a[0]) * lp, a[1] + (b[1] - a[1]) * lp);
  });
  cr.stroke(); cr.restore();
}

/* --- २. रांगोळी रिव्हील --- */
function flower(x, y, R, petals) {
  cr.beginPath();
  for (let i = 0; i <= 120; i++) {
    const a = i / 120 * Math.PI * 2, rr = R * (1 + .22 * Math.cos(a * petals));
    i ? cr.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr) : cr.moveTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  cr.closePath();
}
function fxRangoli(t) {
  rBg();
  const x = RW / 2, y = RH / 2, M = Math.hypot(RW, RH) / 2, P = Math.PI * 2;
  const p = rSeg(t, 0, .5), ph = rOut(rSeg(t, .4, 1));
  const cols = ["#ff7a3d", "#e8447a", "#a259e6", "#2ec4b6", "#e8b84a"];
  for (let ring = 0; ring < 4; ring++) {
    const rp = rEase(rSeg(p, ring * .2, ring * .2 + .45)); if (!rp) continue;
    const n = 8 + ring * 4, rad = M * (.16 + ring * .2);
    for (let i = 0; i < n; i++) {
      cr.save(); cr.translate(x, y); cr.rotate(i / n * P + ring * .26);
      cr.globalAlpha = .92; cr.fillStyle = cols[(i + ring) % 5];
      cr.beginPath(); cr.ellipse(0, -rad * rp, M * .06 * (1 + ring * .25) * rp, M * .12 * rp, 0, 0, P); cr.fill();
      cr.restore();
    }
  }
  if (ph > 0) {
    cr.save(); flower(x, y, M * 1.4 * ph, 12); cr.clip(); cr.drawImage(base, 0, 0, RW, RH); cr.restore();
    cr.save(); flower(x, y, M * 1.4 * ph, 12); cr.strokeStyle = `rgba(255,214,120,${1 - ph})`; cr.lineWidth = 3; cr.stroke(); cr.restore();
  }
}

/* --- ३. कणांमधून रिव्हील --- */
let rP = [];
function initParticles() {
  const cols = 16, rows = Math.max(1, Math.round(cols * RH / RW)), w = RW / cols, h = RH / rows; rP = [];
  for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++)
    rP.push({ x: c * w, y: r * h, w, h, sx: rand(-.1, 1.1) * RW, sy: rand(-.1, 1.1) * RH, d: rand(0, .35) });
}
function fxParticles(t) {
  rBg();
  rP.forEach(p => {
    const e = rOut(rSeg(t, p.d, p.d + .55)), x = p.sx + (p.x - p.sx) * e, y = p.sy + (p.y - p.sy) * e;
    if (e < .97) { cr.fillStyle = `rgba(255,222,140,${.25 + .7 * (1 - e)})`; cr.beginPath(); cr.arc(x + p.w / 2, y + p.h / 2, 2, 0, 6.283); cr.fill(); }
    if (e > .35) { cr.globalAlpha = rSeg(e, .35, 1); rTile(p.x, p.y, p.w, p.h, x, y, p.w + .5, p.h + .5); cr.globalAlpha = 1; }
  });
  if (t > .9) rFull(rSeg(t, .9, 1));
}

/* --- ४. भूमितीय रचना (त्रिकोण) --- */
let rG = [];
function initGeo() {
  const cols = 6, rows = Math.max(1, Math.round(cols * RH / RW)), w = RW / cols, h = RH / rows; rG = [];
  for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
    const x0 = c * w, y0 = r * h, x1 = x0 + w, y1 = y0 + h;
    const T = (c + r) % 2
      ? [[[x0, y0], [x1, y0], [x1, y1]], [[x0, y0], [x1, y1], [x0, y1]]]
      : [[[x0, y0], [x1, y0], [x0, y1]], [[x1, y0], [x1, y1], [x0, y1]]];
    T.forEach(v => rG.push({ v, x0, y0, w, h, cx: (v[0][0] + v[1][0] + v[2][0]) / 3, cy: (v[0][1] + v[1][1] + v[2][1]) / 3,
      ang: rand(-2, 2), ox: rand(-.8, .8) * RW, oy: rand(-.8, .8) * RH, d: rand(0, .38) }));
  }
}
function fxGeo(t) {
  rBg();
  rG.forEach(g => {
    const e = rOut(rSeg(t, g.d, g.d + .5)); if (e <= 0) return;
    cr.save();
    cr.translate(g.cx + g.ox * (1 - e), g.cy + g.oy * (1 - e)); cr.rotate(g.ang * (1 - e)); cr.scale(.2 + .8 * e, .2 + .8 * e); cr.translate(-g.cx, -g.cy);
    cr.beginPath(); cr.moveTo(g.v[0][0], g.v[0][1]); cr.lineTo(g.v[1][0], g.v[1][1]); cr.lineTo(g.v[2][0], g.v[2][1]); cr.closePath();
    cr.save(); cr.clip(); cr.globalAlpha = Math.min(1, e * 1.6);
    cr.drawImage(base, g.x0 * RD, g.y0 * RD, g.w * RD, g.h * RD, g.x0, g.y0, g.w, g.h); cr.restore();
    cr.strokeStyle = `rgba(255,214,120,${(1 - e) * .9})`; cr.lineWidth = 1.2; cr.stroke();
    cr.restore();
  });
  if (t > .9) rFull(rSeg(t, .9, 1));
}

/* --- ५. प्रकाशाचा पडदा --- */
function fxCurtain(t) {
  rBg();
  const x = -40 + rEase(t) * (RW + 120);
  cr.save(); cr.beginPath(); cr.rect(0, 0, Math.max(0, x), RH); cr.clip(); cr.drawImage(base, 0, 0, RW, RH); cr.restore();
  let g = cr.createLinearGradient(x - 110, 0, x, 0);
  g.addColorStop(0, "rgba(255,214,120,0)"); g.addColorStop(1, "rgba(255,226,150,.5)");
  cr.fillStyle = g; cr.fillRect(x - 110, 0, 110, RH);
  g = cr.createLinearGradient(x - 8, 0, x + 8, 0);
  g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(.5, "rgba(255,255,255,.95)"); g.addColorStop(1, "rgba(255,255,255,0)");
  cr.save(); cr.shadowColor = "#ffb43a"; cr.shadowBlur = 22; cr.fillStyle = g; cr.fillRect(x - 8, 0, 16, RH); cr.restore();
}

/* --- ६. तुकड्यांमधून रिव्हील --- */
let rPc = [];
function initPieces() {
  const cols = 4, rows = Math.max(1, Math.round(cols * RH / RW)), w = RW / cols, h = RH / rows;
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]; rPc = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const d = dirs[(c + r) % 4];
    rPc.push({ x: c * w, y: r * h, w, h, ox: d[0] * RW * 1.1, oy: d[1] * RH * 1.1, ang: (Math.random() - .5) * .8, d: (c + r) * .04 + rand(0, .1) });
  }
}
function fxPieces(t) {
  rBg();
  rPc.forEach(p => {
    const e = rSeg(t, p.d, p.d + .5), b = rBack(e), o = rOut(e);
    cr.save(); cr.globalAlpha = Math.min(1, e * 3);
    cr.translate(p.x + p.w / 2 + p.ox * (1 - b), p.y + p.h / 2 + p.oy * (1 - b)); cr.rotate(p.ang * (1 - o));
    cr.drawImage(base, p.x * RD, p.y * RD, p.w * RD, p.h * RD, -p.w / 2, -p.h / 2, p.w + .5, p.h + .5);
    cr.strokeStyle = `rgba(255,214,120,${(1 - o) * .9})`; cr.lineWidth = 2; cr.strokeRect(-p.w / 2, -p.h / 2, p.w, p.h);
    cr.restore();
  });
  if (t > .9) rFull(rSeg(t, .9, 1));
}

/* --- चालक (काही चूक झाली तरी अडकत नाही) --- */
const FX = { lines: fxLines, rangoli: fxRangoli, particles: fxParticles, geometry: fxGeo, curtain: fxCurtain, pieces: fxPieces };
const FX_INIT = { particles: initParticles, geometry: initGeo, pieces: initPieces };
function runReveal(name, ms) {
  return new Promise(res => {
    try { if (FX_INIT[name]) FX_INIT[name](); } catch (e) { console.error(e); return res(); }
    const t0 = performance.now();
    const step = now => {
      const t = r01((now - t0) / ms);
      try { FX[name](t); } catch (e) { console.error(e); return res(); }
      t < 1 ? rAnim = requestAnimationFrame(step) : res();
    };
    rAnim = requestAnimationFrame(step);
  });
}
async function showReveal(i) {
  const tok = ++rTok, r = REVEAL_PHOTOS[i];
  base = null; curImg = null; rDone = false;
  $("app").classList.remove("clean");
  $("revTitle").textContent = REVEAL_PHOTOS.length > 1 ? `एक खास गुपित (${mr(i + 1)}/${mr(REVEAL_PHOTOS.length)})` : "एक खास गुपित";
  $("revCap").textContent = r.cap; $("revNext").hidden = true;
  $("revBtn").disabled = true; $("revBtn").textContent = "फोटो येत आहे…";
  try { drawIdle(); } catch (e) { console.error(e); }
  const im = await Promise.race([loadReveal(i), wait(12000).then(() => canvasPlaceholder(i))]);
  if (tok !== rTok) return;
  try { curImg = im; fitReveal(); buildBase(curImg); drawIdle(); } catch (e) { console.error(e); }
  $("revBtn").disabled = false; $("revBtn").textContent = "गुपित उघडा ✨";
}
$("revBtn").onclick = async () => {
  if (rBusy || !base) return;
  rBusy = true; SFX.light();
  const name = FX[REVEAL_PHOTOS[ri].effect] ? REVEAL_PHOTOS[ri].effect : "lines";
  try {
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) await Promise.race([runReveal(name, 3600), wait(6500)]);
  } catch (e) { console.error(e); }
  cancelAnimationFrame(rAnim);
  drawDone(); rDone = true;
  $("s4").classList.add("done"); SFX.ta();       // "पुढे चला" आणि "पुढचे गुपित" दोन्ही दिसतात
  const lastOne = ri >= REVEAL_PHOTOS.length - 1;
  $("revNext").hidden = lastOne;
  if (lastOne) $("s4").classList.add("seen");
  rBusy = false;
};
$("revNext").onclick = async () => {
  if (rBusy) return;
  ri = Math.min(ri + 1, REVEAL_PHOTOS.length - 1); SFX.tick();
  $("s4").classList.remove("done");
  await showReveal(ri);
};
function resetReveal() {
  cancelAnimationFrame(rAnim); rBusy = false; ri = 0;
  $("s4").classList.remove("done", "seen"); showReveal(0);
}
addEventListener("resize", () => {
  if (!curImg || rBusy) return;
  try { fitReveal(); buildBase(curImg); rDone ? drawDone() : drawIdle(); } catch (e) { console.error(e); }
});
showReveal(0);

/* ========== 🎆 आकाशातील फटाके ========== */
const sky = (() => {
  const cv = $("sky"), cx = cv.getContext("2d");
  const COLORS = [[255,200,80],[255,120,60],[255,90,140],[160,120,255],[90,220,255],[120,255,170],[255,255,255]];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W = 0, H = 0, rockets = [], sparks = [], timer = 0, next = .8, last = performance.now();

  function fit() {
    const d = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * d; cv.height = H * d;
    cx.setTransform(d, 0, 0, d, 0, 0);
  }
  addEventListener("resize", fit); fit();

  function crack(big) {                       // फटाक्याचा आवाज (संगीत सुरू असेल तरच)
    if (!soundOn || !ac) return;
    tone(big ? 70 : 90, .7, big ? .12 : .08, "sine");
    puff();
    for (let i = 0; i < 7; i++) tone(rand(1800, 3200), .05, .015, "square", rand(.08, .5));
  }

  function explode(x, y, big) {
    const A = COLORS[Math.floor(rand(0, COLORS.length))];
    const B = COLORS[Math.floor(rand(0, COLORS.length))];
    const n = big ? 120 : 80, ring = Math.random() < .4;
    const sc = Math.max(.75, Math.min(W, H) / 650) * (big ? 1.25 : 1);
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2, sp = (ring ? 3 : rand(1, 3.6)) * sc;
      sparks.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, decay: rand(.009, .017), c: i % 3 ? A : B, r: rand(1.2, 2.2) });
    }
    if (sparks.length > 900) sparks.splice(0, sparks.length - 900);
    crack(big);
  }

  function launch(big) {
    rockets.push({ x: rand(W * .1, W * .9), y: H + 10, vx: rand(-.5, .5), vy: -rand(H * .55, H * .75), ty: rand(H * .12, H * .45), big });
  }

  function loop(now) {
    const dt = Math.min((now - last) / 1000, .05); last = now;
    const k = dt * 60;
    cx.globalCompositeOperation = "destination-out";
    cx.fillStyle = "rgba(0,0,0,.3)"; cx.fillRect(0, 0, W, H);      // मागे उजेडाची रेघ (ट्रेल)
    cx.globalCompositeOperation = "lighter";

    timer += dt;
    if (timer > next) {
      timer = 0; next = rand(SKY.gap[0], SKY.gap[1]);
      launch(false);
      if (Math.random() < .3) setTimeout(() => launch(false), 250);
    }

    rockets = rockets.filter(r => {
      r.x += r.vx * k; r.y += r.vy * dt;
      cx.fillStyle = "rgba(255,230,160,.95)";
      cx.beginPath(); cx.arc(r.x, r.y, 2.2, 0, 6.283); cx.fill();
      if (Math.random() < .7) sparks.push({ x: r.x, y: r.y, vx: rand(-.3, .3), vy: rand(.2, .8), life: .6, decay: .05, c: [255, 170, 70], r: 1.2 });
      if (r.y <= r.ty) { explode(r.x, r.y, r.big); return false; }
      return true;
    });

    sparks = sparks.filter(s => {
      s.vx *= Math.pow(.985, k);
      s.vy = s.vy * Math.pow(.985, k) + .045 * k;                   // हळूहळू खाली पडतात
      s.x += s.vx * k; s.y += s.vy * k; s.life -= s.decay * k;
      if (s.life <= 0) return false;
      cx.fillStyle = `rgba(${s.c[0]},${s.c[1]},${s.c[2]},${s.life})`;
      cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 6.283); cx.fill();
      return true;
    });
    requestAnimationFrame(loop);
  }
  if (!reduce) requestAnimationFrame(loop);

  return {
    celebrate() { if (!reduce) [0, 350, 750].forEach(t => setTimeout(() => launch(true), t)); },
    finale() { if (!reduce) for (let i = 0; i < 6; i++) setTimeout(() => launch(true), i * 450); }
  };
})();

// केक विझवल्यावर जास्त फटाके
$("blowBtn").addEventListener("click", () => setTimeout(sky.celebrate, 700));