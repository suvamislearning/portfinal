/* ==========================================================================
   NOAH - MAIN APPLICATION CONTROLLER
   flag, Scroll Spy, Dynamic Rendering, and Form Handlers
   ========================================================================== */

// Web Audio API Synthesizer for Sleek Micro-Interactions
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playToast() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1040, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

window.soundFx = new SoundEffects();

document.addEventListener('DOMContentLoaded', () => {
  const typewriterText = document.querySelector('.typewriter-text');
  const typeCursor = document.querySelector('.type-cursor');
  const descTypewriter = document.querySelector('.desc-typewriter');
  const descCursor = document.querySelector('.desc-cursor');
  const testimonialCard = document.querySelector('.testimonial-card-hero');
  const themeOptions = document.querySelectorAll('.theme-option');

  const updateThemeToggle = () => {
    const isLight = document.documentElement.dataset.theme === 'light';
    themeOptions.forEach((option) => {
      const isActive = option.dataset.themeChoice === (isLight ? 'light' : 'dark');
      option.classList.toggle('active', isActive);
      option.setAttribute('aria-pressed', String(isActive));
    });
  };

  updateThemeToggle();

  themeOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const isLight = option.dataset.themeChoice === 'light';
      document.documentElement.dataset.theme = isLight ? 'light' : 'dark';
      localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
      updateThemeToggle();
    });
  });

  if (typewriterText && typeCursor) {
    const text = typewriterText.dataset.text || 'Web Developer';
    let index = 0;

    const typeNext = () => {
      const char = document.createElement('span');
      const currentChar = text[index] || ' ';
      char.className = 'char';
      char.style.setProperty('--char-index', index);
      char.textContent = currentChar === ' ' ? '\u00A0' : currentChar;
      typewriterText.appendChild(char);
      index += 1;

      if (index < text.length) {
        setTimeout(typeNext, 110);
      } else {
        typeCursor.style.display = 'none';
        if (testimonialCard) {
          testimonialCard.classList.add('is-visible', 'is-auto-flipping');
          testimonialCard.addEventListener('animationend', () => {
            testimonialCard.classList.remove('is-auto-flipping');
          }, { once: true });
          testimonialCard.removeAttribute('aria-hidden');
        }
      }
    };

    typewriterText.innerHTML = '';
    typeNext();
  } else if (testimonialCard) {
    testimonialCard.classList.add('is-visible');
    testimonialCard.removeAttribute('aria-hidden');
  }

  if (descTypewriter && descCursor) {
    const text = descTypewriter.dataset.text || '';
    let index = 0;

    const typeNext = () => {
      descTypewriter.textContent = text.slice(0, index);
      index += 1;

      if (index <= text.length) {
        setTimeout(typeNext, 24);
      } else {
        descCursor.style.display = 'none';
      }
    };

    const startDescriptionTyping = () => {
      setTimeout(typeNext, 700);
    };

    if (typewriterText && typeCursor) {
      const textLength = (typewriterText.dataset.text || '').length;
      const titleDuration = textLength * 110 + 300;
      setTimeout(startDescriptionTyping, titleDuration);
    } else {
      startDescriptionTyping();
    }
  }

  // Render Skills
  renderSkills('all');
  renderProjects();

  // Scroll Header Shadow & Scroll Spy
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy active state
    let currentId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Scroll reveal effect
  const revealItems = document.querySelectorAll('.section-header, .skill-card, .project-card, .testimonial-box, .contact-container-grid, .contact-info-col, .contact-form');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealItems.forEach((item, index) => {
    item.classList.add('reveal-item');
    item.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
    revealObserver.observe(item);
  });

  // Skills Tab Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderSkills(cat);
      if (window.soundFx) window.soundFx.playClick();
    });
  });


  // Mobile Hamburger Menu
  const hamburger = document.querySelector('.hamburger-btn');
  const navPills = document.querySelector('.nav-pill-group');
  if (hamburger && navPills) {
    hamburger.addEventListener('click', () => {
      const isOpen = navPills.classList.toggle('mobile-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.nav-link').forEach((l) => {
      l.addEventListener('click', () => {
        navPills.classList.remove('mobile-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('portfolio-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('contact-name')?.value || 'Friend';
      showToast(`Thank you, ${senderName}! Your message has been sent to Noah.`, '🚀');
      contactForm.reset();
    });
  }

  // Copy Email Card Trigger
  const copyEmailCard = document.getElementById('card-copy-email');
  if (copyEmailCard) {
    copyEmailCard.addEventListener('click', () => {
      const email = 'hello@noahdev.design';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!', '📋');
      });
    });
  }
});

// Render Skills Helper
function renderSkills(category = 'all') {
  const container = document.getElementById('skills-container');
  if (!container || !PORTFOLIO_DATA.skills) return;

  const filtered = category === 'all' 
    ? PORTFOLIO_DATA.skills 
    : PORTFOLIO_DATA.skills.filter(s => s.category === category);

  container.innerHTML = filtered.map(skill => `
    <div class="skill-card" data-category="${skill.category}">
      <div class="skill-header">
        <div class="skill-icon-wrapper">
          <img src="${skill.icon}" alt="${skill.name}">
        </div>
        <div>
          <div class="skill-title">${skill.name}</div>
          <div class="skill-level-text">${skill.level} &bull; ${skill.percent}%</div>
        </div>
      </div>
      <div class="skill-desc">${skill.desc}</div>
      <div class="skill-bar-bg">
        <div class="skill-bar-fill" style="width: ${skill.percent}%"></div>
      </div>
    </div>
  `).join('');
}

// Render Projects Helper
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container || !PORTFOLIO_DATA.projects) return;

  container.innerHTML = PORTFOLIO_DATA.projects.map(proj => `
    <div class="project-card">
      <div class="project-preview">
        <div class="project-preview-graphic" style="background-image: url('${proj.image}'); background-size: cover; background-position: center; background-repeat: no-repeat;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-orange)" stroke-width="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
        <div class="project-overlay-badge">${proj.category}</div>
      </div>
      <div class="project-body">
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.desc}</p>
        <div class="project-tags">
          ${proj.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
        <div class="project-actions">
          <button class="btn-project-primary" onclick="showToast('Launching live demo preview...', '🚀')">Live Demo</button>
          <button class="btn-project-secondary" onclick="showToast('Opening repository...', '📂')" aria-label="View Code">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}
