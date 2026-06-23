/* ============================================================
   HAPPY 20TH BIRTHDAY — MAIN JAVASCRIPT
   Animations · Effects · Music · Interactions
   ============================================================ */

/* ── NIGHT SKY ── */
function initNightSky() {
  const canvas = document.getElementById('nightSky');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Stars
  const stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    alpha: Math.random(),
    speed: Math.random() * 0.005 + 0.002,
    phase: Math.random() * Math.PI * 2,
  }));

  function drawFrame(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.alpha = 0.3 + 0.7 * Math.abs(Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(drawFrame);
  }
  requestAnimationFrame(drawFrame);

  // Periodic shooting stars
  function shootingStar() {
    const el = document.createElement('div');
    el.className = 'shooting-star';
    el.style.top  = Math.random() * 60 + '%';
    el.style.left = Math.random() * 60 + '%';
    el.style.animationDuration = (Math.random() * 1 + 0.6) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }
  setInterval(shootingStar, 3500);
}

/* ── FLOATING HEARTS ── */
function initFloatingHearts(containerId) {
  const container = document.getElementById(containerId || 'floatingHearts');
  if (!container) return;
  const emojis = ['❤️','💕','💖','💗','💓','✨','🌸'];

  function spawnHeart() {
    const el = document.createElement('div');
    el.className = 'heart-float';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
    const dur = Math.random() * 6 + 7;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 2) * 1000);
  }
  for (let i = 0; i < 8; i++) setTimeout(spawnHeart, i * 400);
  setInterval(spawnHeart, 1200);
}

/* ── SPARKLE ON CLICK ── */
function initSparkleClick() {
  document.addEventListener('click', (e) => {
    const sparkles = ['✨','⭐','💫','🌟','❤️'];
    for (let i = 0; i < 6; i++) {
      const el = document.createElement('div');
      el.className = 'sparkle';
      el.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      el.style.position = 'fixed';
      el.style.left = (e.clientX + (Math.random() - 0.5) * 80) + 'px';
      el.style.top  = (e.clientY + (Math.random() - 0.5) * 80) + 'px';
      el.style.fontSize = (Math.random() * 14 + 10) + 'px';
      el.style.pointerEvents = 'none';
      el.style.zIndex = 9999;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 700);
    }
  });
}

/* ── CONFETTI ── */
function launchConfetti(duration = 4000) {
  const colors = ['#ff6b9d','#c084fc','#ffd700','#7c3aed','#f9c74f','#fff','#60a5fa'];
  const shapes = ['■','●','▲','♥','★'];
  const count  = 120;
  const end    = Date.now() + duration;

  function spawn() {
    if (Date.now() > end) return;
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
    el.style.fontSize = (Math.random() * 12 + 8) + 'px';
    el.style.animationDuration = (Math.random() * 2.5 + 1.5) + 's';
    el.style.animationDelay = Math.random() * 0.8 + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4500);
    setTimeout(spawn, 40);
  }
  for (let i = 0; i < 5; i++) setTimeout(spawn, i * 150);
}

/* ── TYPEWRITER ── */
function typeWriter(element, texts, opts = {}) {
  const { speed = 55, pause = 1800, onDone } = opts;
  let tIdx = 0, cIdx = 0;

  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  element.after(cursor);

  function typeNext() {
    if (tIdx >= texts.length) {
      cursor.remove();
      if (onDone) onDone();
      return;
    }
    const text = texts[tIdx];
    if (cIdx < text.length) {
      element.textContent += text[cIdx++];
      setTimeout(typeNext, speed + Math.random() * 30);
    } else {
      tIdx++; cIdx = 0;
      setTimeout(() => {
        if (tIdx < texts.length) {
          element.textContent = '';
          typeNext();
        } else {
          cursor.remove();
          if (onDone) onDone();
        }
      }, pause);
    }
  }
  element.textContent = '';
  typeNext();
}

/* ── MUSIC PLAYER ── */
function initMusicPlayer() {
  const audio = document.getElementById('bgMusic');
  const playBtn = document.getElementById('musicToggle');
  const label   = document.getElementById('musicLabel');
  if (!audio || !playBtn) return;

  audio.volume = 0.35;
  let playing = false;

  playBtn.addEventListener('click', () => {
    if (!playing) {
      audio.play().catch(() => {});
      playBtn.textContent = '⏸';
      if (label) label.textContent = 'Playing ♪';
      playing = true;
    } else {
      audio.pause();
      playBtn.textContent = '▶';
      if (label) label.textContent = 'Music';
      playing = false;
    }
  });

  // Auto-play attempt on first click anywhere
  document.addEventListener('click', function tryPlay() {
    if (!playing) {
      audio.play().catch(() => {});
      playBtn.textContent = '⏸';
      if (label) label.textContent = 'Playing ♪';
      playing = true;
    }
    document.removeEventListener('click', tryPlay);
  }, { once: true });
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    io.observe(el);
  });
}

/* ── PAGE NAV HIGHLIGHT ── */
function highlightNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-progress a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

/* ── INIT ON LOAD ── */
document.addEventListener('DOMContentLoaded', () => {
  initNightSky();
  initFloatingHearts();
  initSparkleClick();
  initMusicPlayer();
  initScrollReveal();
  highlightNav();
});
