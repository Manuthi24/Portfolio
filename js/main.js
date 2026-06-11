/* ─────────────────────────────────────────────────
   Portfolio — main.js
   ───────────────────────────────────────────────── */

'use strict';

/* ── Mobile navigation toggle ── */
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-links');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');

    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── Cursor orb ── */
const orb = document.getElementById('orb');

if (orb) {
  document.addEventListener('mousemove', e => {
    orb.style.left = e.clientX + 'px';
    orb.style.top = e.clientY + 'px';
  });
}

/* ── Scroll reveal animation ── */
const revealEls = document.querySelectorAll('.reveal');

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);

      revealObs.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObs.observe(el));

/* ── Skill bar fill on scroll ── */
const barFills = document.querySelectorAll('.bar-fill');

const barObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const width = parseFloat(el.dataset.w || '1') * 100;

      el.style.width = width + '%';
      barObs.unobserve(el);
    }
  });
}, {
  threshold: 0.4
});

barFills.forEach(el => barObs.observe(el));

/* ── Stagger project card reveal delays ── */
document.querySelectorAll('.work-grid .card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.07) + 's';
});

/* ── Project filter ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.work-grid .card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      if (filter === 'all') {
        card.classList.remove('hidden');
      } else {
        const categories = (card.dataset.category || '').split(' ');
        card.classList.toggle('hidden', !categories.includes(filter));
      }
    });
  });
});

/* ── Contact form demo ── */
const form = document.getElementById('contact-form');
const sendBtn = document.getElementById('send-btn');

if (form && sendBtn) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      showToast('⚠️ Please fill in all required fields.', 'error');
      return;
    }

    /* Demo only — this does not send real emails yet */
    sendBtn.textContent = 'Sending…';
    sendBtn.disabled = true;
    sendBtn.style.opacity = '.7';

    setTimeout(() => {
      sendBtn.textContent = 'Sent! ✓';
      showToast('✅ Message sent — I\'ll be in touch soon!');
      form.reset();

      setTimeout(() => {
        sendBtn.textContent = 'Send Message →';
        sendBtn.disabled = false;
        sendBtn.style.opacity = '1';
      }, 1200);
    }, 1400);
  });
}

/* ── Toast notification helper ── */
function showToast(msg, type = 'success') {
  let toast = document.querySelector('.toast');

  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.style.borderColor = type === 'error' ? 'var(--gold)' : 'var(--mint)';
  toast.style.color = type === 'error' ? 'var(--gold)' : 'var(--mint)';
  toast.textContent = msg;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ── Active nav highlight on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, {
  threshold: 0.45
});

sections.forEach(section => sectionObs.observe(section));