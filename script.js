/* ══════════════════════════════════════════════
   APEX FITNESS — script.js v4
══════════════════════════════════════════════ */
'use strict';

/* ── LOADER ── */
(function () {
  const bar = document.getElementById('ldBar');
  const pct = document.getElementById('ldPct');
  const el  = document.getElementById('loader');
  let p = 0;
  const tick = setInterval(() => {
    p += Math.random() * 16 + 2;
    if (p >= 100) p = 100;
    bar.style.width = p + '%';
    pct.textContent = Math.floor(p) + '%';
    if (p === 100) { clearInterval(tick); setTimeout(() => el.classList.add('out'), 400); }
  }, 75);
})();

/* ── LOADER CANVAS PARTICLES ── */
(function () {
  const c = document.getElementById('loaderCanvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  c.width  = window.innerWidth;
  c.height = window.innerHeight;
  const pts = Array.from({ length: 80 }, () => ({
    x: Math.random() * c.width, y: Math.random() * c.height,
    r: Math.random() * 2 + .3,
    dx: (Math.random() - .5) * .6, dy: (Math.random() - .5) * .6,
    a: Math.random() * .7 + .1
  }));
  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,45,85,${p.a * .5})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > c.width)  p.dx *= -1;
      if (p.y < 0 || p.y > c.height) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── CUSTOM CURSOR ── */
const cur   = document.getElementById('cursor');
const curDot = document.getElementById('cursorDot');
let mx = 0, my = 0, tx = 0, ty = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animCursor() {
  tx += (mx - tx) * .18;
  ty += (my - ty) * .18;
  cur.style.left    = mx + 'px';
  cur.style.top     = my + 'px';
  curDot.style.left = tx + 'px';
  curDot.style.top  = ty + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button, .stab, .tc, .plan, .gf-item, .mc').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
});

/* ── NAVBAR ── */
const navbar = document.getElementById('navbar');
const updateNav = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
updateNav();

function setActiveLinks() {
  const y = window.scrollY + 130;
  document.querySelectorAll('section[id]').forEach(sec => {
    const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
    if (link) link.classList.toggle('active', y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight);
  });
}

/* ── HAMBURGER ── */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  navLinks.classList.remove('open');
}));

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── BACK TO TOP ── */
const btt = document.getElementById('btt');
const toggleBtt = () => btt.classList.toggle('show', window.scrollY > 500);
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── SCROLL REVEAL ── */
function reveal() {
  document.querySelectorAll('[data-r]').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 50)
      el.classList.add('revealed');
  });
}

/* ── COUNTER ── */
let counted = false;
function runCounters() {
  if (counted) return;
  const first = document.querySelector('.cnt');
  if (!first) return;
  if (first.getBoundingClientRect().top < window.innerHeight) {
    counted = true;
    document.querySelectorAll('.cnt[data-t]').forEach(el => {
      const target = +el.dataset.t, dur = 2400;
      let cur = 0;
      const step = target / (dur / 16);
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(t); }
        el.textContent = Math.floor(cur);
      }, 16);
    });
  }
}

/* ── MASTER SCROLL HANDLER ── */
window.addEventListener('scroll', () => {
  updateNav(); setActiveLinks(); reveal(); runCounters(); toggleBtt();
}, { passive: true });
reveal(); runCounters();

/* ── SCHEDULE DATA ── */
const schedule = {
  seg:[
    {t:'06:00',n:'Spinning',i:'Carlos Silva',v:20},
    {t:'07:30',n:'Musculação Orientada',i:'Carlos Silva',v:30},
    {t:'09:00',n:'Yoga',i:'Ana Costa',v:15},
    {t:'12:00',n:'CrossFit',i:'Rafael Mendes',v:18},
    {t:'17:00',n:'Boxe',i:'Rafael Mendes',v:12},
    {t:'18:30',n:'Spinning',i:'Carlos Silva',v:20},
    {t:'20:00',n:'Pilates',i:'Ana Costa',v:15},
  ],
  ter:[
    {t:'06:00',n:'CrossFit',i:'Rafael Mendes',v:18},
    {t:'07:30',n:'Musculação Orientada',i:'Carlos Silva',v:30},
    {t:'10:00',n:'Pilates',i:'Ana Costa',v:15},
    {t:'12:00',n:'Spinning',i:'Carlos Silva',v:20},
    {t:'18:00',n:'Yoga',i:'Ana Costa',v:15},
    {t:'19:30',n:'CrossFit',i:'Rafael Mendes',v:18},
  ],
  qua:[
    {t:'06:00',n:'Spinning',i:'Carlos Silva',v:20},
    {t:'07:30',n:'Musculação Orientada',i:'Carlos Silva',v:30},
    {t:'09:00',n:'Yoga',i:'Ana Costa',v:15},
    {t:'12:00',n:'CrossFit',i:'Rafael Mendes',v:18},
    {t:'17:00',n:'Boxe',i:'Rafael Mendes',v:12},
    {t:'20:00',n:'Pilates',i:'Ana Costa',v:15},
  ],
  qui:[
    {t:'06:00',n:'CrossFit',i:'Rafael Mendes',v:18},
    {t:'08:00',n:'Pilates',i:'Ana Costa',v:15},
    {t:'12:00',n:'Spinning',i:'Carlos Silva',v:20},
    {t:'18:00',n:'Musculação Orientada',i:'Carlos Silva',v:30},
    {t:'19:30',n:'Yoga',i:'Ana Costa',v:15},
  ],
  sex:[
    {t:'06:00',n:'Spinning',i:'Carlos Silva',v:20},
    {t:'07:30',n:'CrossFit',i:'Rafael Mendes',v:18},
    {t:'09:00',n:'Yoga',i:'Ana Costa',v:15},
    {t:'12:00',n:'Musculação Orientada',i:'Carlos Silva',v:30},
    {t:'18:00',n:'Boxe',i:'Rafael Mendes',v:12},
    {t:'19:30',n:'Pilates',i:'Ana Costa',v:15},
  ],
  sab:[
    {t:'07:00',n:'CrossFit',i:'Rafael Mendes',v:18},
    {t:'08:30',n:'Spinning',i:'Carlos Silva',v:20},
    {t:'10:00',n:'Yoga & Meditação',i:'Ana Costa',v:15},
    {t:'11:30',n:'Pilates',i:'Ana Costa',v:15},
  ],
};

function renderSchedule(day) {
  const grid = document.getElementById('schedGrid');
  grid.innerHTML = (schedule[day] || []).map(s => `
    <div class="sched-item">
      <div class="sched-time">${s.t}</div>
      <div class="sched-detail">
        <h4>${s.n}</h4>
        <p>${s.i} · ${s.v} vagas</p>
      </div>
    </div>`).join('');
}
document.querySelectorAll('.stab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderSchedule(btn.dataset.day);
  });
});
renderSchedule('seg');

/* ── PRICING TOGGLE ── */
document.getElementById('ptToggle').addEventListener('change', function () {
  const annual = this.checked;
  document.querySelectorAll('.pv.m').forEach(e => e.classList.toggle('hidden', annual));
  document.querySelectorAll('.pv.a').forEach(e => e.classList.toggle('hidden', !annual));
});

/* ── TESTIMONIALS ── */
const tCards  = Array.from(document.querySelectorAll('#tSlider .tcard'));
const tDotsEl = document.getElementById('tDots');
let tIdx = 0, tAuto;

tCards.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'td' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => { goT(i); resetT(); });
  tDotsEl.appendChild(d);
});

function goT(i) {
  tCards[tIdx].classList.remove('active');
  tIdx = (i + tCards.length) % tCards.length;
  tCards[tIdx].classList.add('active');
  tDotsEl.querySelectorAll('.td').forEach((d, j) => d.classList.toggle('active', j === tIdx));
}
function resetT() { clearInterval(tAuto); tAuto = setInterval(() => goT(tIdx + 1), 5500); }
document.getElementById('tPrev').addEventListener('click', () => { goT(tIdx - 1); resetT(); });
document.getElementById('tNext').addEventListener('click', () => { goT(tIdx + 1); resetT(); });
resetT();

/* ── GALLERY LIGHTBOX ── */
const lb      = document.getElementById('lb');
const lbImg   = document.getElementById('lbI');
const lbCap   = document.getElementById('lbC');
const gfItems = Array.from(document.querySelectorAll('.gf-item'));
const gfData  = gfItems.map(el => ({
  src: el.querySelector('img')?.src || '',
  cap: el.querySelector('.gf-ov s')?.textContent || ''
}));
let lbI = 0;

function lbOpen(i) {
  lbI = i;
  lbImg.src = gfData[i].src;
  lbCap.textContent = gfData[i].cap;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function lbClose() { lb.classList.remove('open'); document.body.style.overflow = ''; }
function lbNav(d)  {
  lbI = (lbI + d + gfData.length) % gfData.length;
  lbImg.src = gfData[lbI].src;
  lbCap.textContent = gfData[lbI].cap;
}

gfItems.forEach((el, i) => el.addEventListener('click', () => lbOpen(i)));
document.querySelector('.lb-x').addEventListener('click', lbClose);
document.querySelector('.lb-l').addEventListener('click', () => lbNav(-1));
document.querySelector('.lb-r').addEventListener('click', () => lbNav(1));
lb.addEventListener('click', e => { if (e.target === lb) lbClose(); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape')     lbClose();
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'ArrowLeft')  lbNav(-1);
});

/* ── VIDEO MODAL ── */
const vModal  = document.getElementById('vModal');
const vIframe = document.getElementById('vmIframe');
document.getElementById('btnPlay').addEventListener('click', () => {
  vIframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0';
  vModal.classList.add('open');
  document.body.style.overflow = 'hidden';
});
function closeV() { vModal.classList.remove('open'); vIframe.src = ''; document.body.style.overflow = ''; }
document.getElementById('vmClose').addEventListener('click', closeV);
vModal.addEventListener('click', e => { if (e.target === vModal) closeV(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && vModal.classList.contains('open')) closeV(); });

/* ── CONTACT FORM ── */
const cForm = document.getElementById('contactForm');
const cOk   = document.getElementById('formOk');
cForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = cForm.querySelector('.btn-submit');
  btn.innerHTML = '<span>Enviando...</span> <i class="fas fa-spinner fa-spin"></i>';
  btn.disabled = true;
  setTimeout(() => { cForm.classList.add('hidden'); cOk.classList.remove('hidden'); }, 1800);
});

/* ── PHONE MASK ── */
const cp = document.getElementById('cp');
if (cp) {
  cp.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '');
    if (v.length <= 2)      v = v.replace(/(\d{0,2})/, '($1');
    else if (v.length <= 7) v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    else                    v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    this.value = v;
  });
}

/* ── PARALLAX ORBS ── */
window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth  - .5) * 30;
  const y = (e.clientY / window.innerHeight - .5) * 20;
  document.querySelector('.orb.a')?.style.setProperty('transform', `translate(${x * .5}px, ${y * .5}px)`);
  document.querySelector('.orb.b')?.style.setProperty('transform', `translate(${-x * .3}px, ${-y * .3}px)`);
  document.querySelector('.orb.c')?.style.setProperty('transform', `translate(${x * .25}px, ${-y * .25}px)`);
}, { passive: true });

/* ── MAGNETIC BUTTON EFFECT ── */
document.querySelectorAll('.mag-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width  / 2;
    const y = e.clientY - r.top  - r.height / 2;
    btn.style.transform = `translate(${x * .25}px, ${y * .3}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
  });
  btn.addEventListener('mouseenter', () => { btn.style.transition = 'transform .15s ease'; });
});

/* ── HERO TITLE ENTRANCE ── */
window.addEventListener('load', () => {
  const spans = document.querySelectorAll('.ht-line em');
  spans.forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(60px)';
    s.style.display = 'inline-block';
  });
  setTimeout(() => {
    spans.forEach((s, i) => {
      setTimeout(() => {
        s.style.transition = 'opacity .8s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1)';
        s.style.opacity = '1';
        s.style.transform = 'translateY(0)';
      }, 1600 + i * 160);
    });
  }, 100);
});

/* ── GALLERY STAGGER ── */
document.querySelectorAll('.gf-item').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.06) + 's';
});

/* ── 3D PLAN CARD TILT ── */
document.querySelectorAll('.plan').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - .5;
    const y = (e.clientY - r.top)  / r.height - .5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    card.style.transition = 'transform .1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
  });
});

/* ── SCROLL PROGRESS BAR ── */
const progressBar = document.createElement('div');
progressBar.id = 'progress-bar';
document.body.prepend(progressBar);
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = Math.min(pct, 100) + '%';
}, { passive: true });

/* ── CURSOR TRAIL PARTICLES ── */
(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'cursorCanvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
  const pts = [];
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < .45) {
      pts.push({ x: mx, y: my, r: Math.random() * 3 + 1, a: .55, dx: (Math.random() - .5) * 1.8, dy: (Math.random() - .5) * 1.8 - .8 });
    }
    for (let i = pts.length - 1; i >= 0; i--) {
      const p = pts[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,45,85,${p.a})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy; p.a -= .022; p.r -= .04;
      if (p.a <= 0 || p.r <= 0) pts.splice(i, 1);
    }
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ── BUTTON RIPPLE ── */
document.querySelectorAll('.btn-fill, .btn-nav, .plan-btn-f, .btn-submit').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const r   = this.getBoundingClientRect();
    const rip = document.createElement('span');
    const d   = Math.max(r.width, r.height);
    rip.className = 'ripple';
    rip.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d/2}px;top:${e.clientY - r.top - d/2}px;position:absolute;`;
    this.appendChild(rip);
    setTimeout(() => rip.remove(), 600);
  });
});

/* ── SECTION WATERMARKS ── */
const wmMap = {
  'sobre':       'SOBRE',
  'modalidades': 'TREINO',
  'resultados':  'RESULTS',
  'horarios':    'HORÁRIO',
  'instrutores': 'EQUIPE',
  'galeria':     'GALLERY',
  'planos':      'PLANOS',
  'depoimentos': 'STORIES',
  'contato':     'CONTATO',
};
Object.entries(wmMap).forEach(([id, text]) => {
  const sec = document.getElementById(id);
  if (!sec) return;
  const wm = document.createElement('div');
  wm.className = 'sec-wm';
  wm.textContent = text;
  wm.setAttribute('aria-hidden', 'true');
  sec.appendChild(wm);
});

/* ── GRADIENT DIVIDERS between sections ── */
document.querySelectorAll('.section, .section-alt, .features-bar, .marquee-wrap').forEach((sec, i, arr) => {
  if (i === 0) return;
  const d = document.createElement('div');
  d.className = 'grad-divider';
  sec.parentNode.insertBefore(d, sec);
});

/* ── 3D TILT on trainer cards ── */
document.querySelectorAll('.tc').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - .5;
    const y = (e.clientY - r.top)  / r.height - .5;
    card.style.transform    = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    card.style.transition   = 'transform .1s ease';
    card.style.perspective  = '800px';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
  });
});

/* ── RC CARD TILT ── */
document.querySelectorAll('.rc').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - .5;
    const y = (e.clientY - r.top)  / r.height - .5;
    card.style.transform  = `translateY(-8px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    card.style.transition = 'transform .1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
  });
});

/* ── SCROLL-TRIGGERED INDEPENDENT COUNTERS (impact bar) ── */
const impactBar = document.querySelector('.impact-bar');
if (impactBar) {
  let impactCounted = false;
  const impactObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !impactCounted) {
      impactCounted = true;
      impactBar.querySelectorAll('.cnt[data-t]').forEach(el => {
        const target = +el.dataset.t;
        let cur = 0;
        const step = target / 150;
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(t); }
          el.textContent = Math.floor(cur);
        }, 16);
      });
    }
  }, { threshold: .3 });
  impactObs.observe(impactBar);
}

/* ── STAGGER HERO METRICS on load ── */
window.addEventListener('load', () => {
  document.querySelectorAll('.hm').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.16,1,.3,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 2200 + i * 120);
  });
});
