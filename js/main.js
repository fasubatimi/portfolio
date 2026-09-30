/**
 * Kunle's Editorial Portfolio — Multi-Page Interactive Controller
 * Features:
 *  - 3D CSS Phone Tilt Physics (Hero stage on home page)
 *  - IntersectionObserver Scroll Reveal
 *  - Accessible Mobile Navigation Drawer (Focus trap + Escape key)
 *  - One-Click Email Copy to Clipboard with Polite Feedback
 *  - Direct Email Composer (mailto protocol generator)
 *  - Prefers-Reduced-Motion Support
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 01. Motion & Accessibility Detection
  // --------------------------------------------------------------------------
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let prefersReducedMotion = reduceMotionQuery.matches;

  reduceMotionQuery.addEventListener('change', (e) => {
    prefersReducedMotion = e.matches;
  });

  // --------------------------------------------------------------------------
  // 01b. Theme Controller (dark / light, persisted; honors system preference)
  // --------------------------------------------------------------------------
  (function themeController() {
    const root = document.documentElement;
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    const colorMeta = document.querySelector('meta[name="theme-color"]');
    const systemQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const LIGHT_COLOR = '#F0EEE8';
    const DARK_COLOR = '#141B1C';

    function isDark() {
      return root.getAttribute('data-theme') === 'dark';
    }

    function syncToggles() {
      const dark = isDark();
      toggles.forEach((btn) => {
        btn.setAttribute('aria-pressed', String(dark));
        btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      });
      if (colorMeta) colorMeta.setAttribute('content', dark ? DARK_COLOR : LIGHT_COLOR);
    }
    function applyTheme(theme, persist) {
      if (theme === 'dark') root.setAttribute('data-theme', 'dark');
      else root.removeAttribute('data-theme');
      if (persist) {
        try { localStorage.setItem('theme', theme); } catch (e) {}
      }
      syncToggles();
    }

    // Sync against whatever the no-flash head script already applied.
    syncToggles();

    toggles.forEach((btn) => {
      btn.addEventListener('click', () => {
        applyTheme(isDark() ? 'light' : 'dark', true);
      });
    });

    // Track the OS setting only while the user hasn't chosen explicitly.
    systemQuery.addEventListener('change', (e) => {
      let stored = null;
      try { stored = localStorage.getItem('theme'); } catch (err) {}
      if (!stored) applyTheme(e.matches ? 'dark' : 'light', false);
    });
  })();

  // --------------------------------------------------------------------------
  // 02. Interactive 3D Phone Tilt (Home Hero Stage)
  // --------------------------------------------------------------------------
  const heroStage = document.getElementById('hero-phone-stage');
  const phoneChassis = document.getElementById('phone-chassis');

  if (heroStage && phoneChassis) {
    let isHovering = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    function updateTilt() {
      if (!isHovering || prefersReducedMotion) {
        phoneChassis.style.transform = '';
        return;
      }

      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      const rotY = -18 + currentX * 24;
      const rotX = 12 - currentY * 18;
      const rotZ = 6;

      phoneChassis.style.transform = `rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) rotateZ(${rotZ}deg)`;
      rafId = requestAnimationFrame(updateTilt);
    }

    heroStage.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'touch' || prefersReducedMotion) return;
      isHovering = true;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateTilt);
    });

    heroStage.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch' || prefersReducedMotion) return;
      const rect = heroStage.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
    });

    heroStage.addEventListener('pointerleave', () => {
      isHovering = false;
      targetX = 0;
      targetY = 0;
      if (rafId) cancelAnimationFrame(rafId);
      phoneChassis.style.transform = '';
    });

    heroStage.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.location.href = 'case-studies.html#safealert';
      }
    });

    heroStage.addEventListener('click', () => {
      window.location.href = 'case-studies.html#safealert';
    });
  }

  // --------------------------------------------------------------------------
  // 03. Scroll Reveal Animations (+ Staggered Groups)
  // --------------------------------------------------------------------------

  // Assign incremental --reveal-delay to reveal children inside [data-stagger]
  // containers so grouped items cascade in rather than snapping together.
  const staggerGroups = document.querySelectorAll('[data-stagger]');
  staggerGroups.forEach((group) => {
    const rawStep = parseFloat(group.getAttribute('data-stagger'));
    const step = Number.isFinite(rawStep) && rawStep > 0 ? rawStep : 0.09;
    const maxDelay = 0.6; // cap so long lists never feel sluggish
    const items = group.querySelectorAll(':scope > .reveal-on-scroll, :scope .reveal-on-scroll');
    items.forEach((item, index) => {
      const delay = Math.min(index * step, maxDelay);
      item.style.setProperty('--reveal-delay', `${delay.toFixed(2)}s`);
    });
  });

  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (revealElements.length > 0) {
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      });

      revealElements.forEach((el) => revealObserver.observe(el));
    } else {
      revealElements.forEach((el) => el.classList.add('is-visible'));
    }
  }

  // --------------------------------------------------------------------------
  // 04. Accessible Mobile Navigation Drawer
  // --------------------------------------------------------------------------
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    function toggleDrawer(open) {
      const willOpen = open !== undefined ? open : !mobileDrawer.classList.contains('is-open');
      mobileDrawer.classList.toggle('is-open', willOpen);
      mobileToggle.setAttribute('aria-expanded', String(willOpen));
      document.body.style.overflow = willOpen ? 'hidden' : '';

      if (willOpen) {
        const firstLink = mobileDrawer.querySelector('a');
        if (firstLink) firstLink.focus();
      } else {
        mobileToggle.focus();
      }
    }

    mobileToggle.addEventListener('click', () => toggleDrawer());

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggleDrawer(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        toggleDrawer(false);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 05. One-Click Copy Email to Clipboard
  // --------------------------------------------------------------------------
  const copyEmailButtons = document.querySelectorAll('[data-copy-email]');

  copyEmailButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = 'fasubatimi@gmail.com';

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const tempInput = document.createElement('textarea');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        const originalText = btn.textContent;
        btn.textContent = 'Copied to clipboard ✓';
        btn.setAttribute('aria-live', 'polite');

        setTimeout(() => {
          btn.textContent = originalText;
        }, 2500);
      } catch (err) {
        console.error('Failed to copy email:', err);
        window.location.href = `mailto:${email}`;
      }
    });
  });

  // --------------------------------------------------------------------------
  // 06. Direct Message Composer
  //     Optional hosted backend (fetch POST) with the honest mailto generator
  //     retained as the always-available fallback.
  // --------------------------------------------------------------------------

  // ▼ OPTIONAL: paste your own form endpoint to enable in-page sending. ▼
  //   Web3Forms: FORM_ENDPOINT  = 'https://api.web3forms.com/submit'
  //              FORM_ACCESS_KEY = 'your-access-key'  (from web3forms.com)
  //   Formspree: FORM_ENDPOINT  = 'https://formspree.io/f/your-id'
  //              FORM_ACCESS_KEY = ''
  //   Leave FORM_ENDPOINT empty ('') to keep pure mailto (no third party).
  const FORM_ENDPOINT = '';
  const FORM_ACCESS_KEY = '';

  const contactForm = document.getElementById('contact-composer-form');
  const formFeedback = document.getElementById('composer-feedback');

  function setComposerFeedback(msg, state) {
    if (!formFeedback) return;
    formFeedback.textContent = msg;
    formFeedback.classList.remove('is-success', 'is-error');
    if (state) formFeedback.classList.add(state);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('composer-name');
      const emailInput = document.getElementById('composer-email');
      const subjectInput = document.getElementById('composer-subject');
      const messageInput = document.getElementById('composer-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : 'Project Inquiry / Hello Kunle';
      const message = messageInput ? messageInput.value.trim() : '';
      if (!message) {
        setComposerFeedback('Please enter a message before sending.', 'is-error');
        if (messageInput) messageInput.focus();
        return;
      }

      const fullSubject = subject ? `[Portfolio] ${subject}` : '[Portfolio] Inquiry for Kunle';
      const bodyText = `Hi Kunle,\n\n${message}\n\nFrom: ${name || 'A visitor'}\nEmail: ${email || 'Not provided'}`;

      // Honest fallback: open the visitor's own mail client, prefilled.
      function launchMailto(note) {
        const mailtoUrl = `mailto:fasubatimi@gmail.com?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(bodyText)}`;
        window.location.href = mailtoUrl;
        setComposerFeedback(note || 'Opening your email client… you can also email fasubatimi@gmail.com directly.', 'is-success');
      }

      // No endpoint configured → pure mailto generator (unchanged, honest default).
      if (!FORM_ENDPOINT) {
        launchMailto();
        return;
      }

      // Endpoint configured → POST in-page; fall back to mailto on any failure.
      const payload = {
        name: name || 'A visitor',
        email: email || 'Not provided',
        subject: fullSubject,
        message: bodyText
      };
      if (FORM_ACCESS_KEY) payload.access_key = FORM_ACCESS_KEY;

      contactForm.classList.add('is-sending');
      setComposerFeedback('Sending your message…', null);

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then((res) => (res.ok ? res : Promise.reject(res)))
        .then(() => {
          contactForm.reset();
          setComposerFeedback('Thanks — your message was sent. I’ll reply by email soon.', 'is-success');
        })
        .catch(() => {
          launchMailto('Couldn’t send directly — opening your email client as a fallback.');
        })
        .finally(() => {
          contactForm.classList.remove('is-sending');
        });
    });
  }

  // --------------------------------------------------------------------------
  // 07. Connected Scroll-Controlled 3D Showcase (save.design reference)
  // --------------------------------------------------------------------------
  const showcaseTrack = document.getElementById('showcase-track');
  const showcaseSticky = document.getElementById('showcase-sticky-frame');
  const progressBar = document.getElementById('showcase-progress-bar');
  const stepButtons = document.querySelectorAll('.showcase-stepper .step-btn');
  const storyCards = document.querySelectorAll('.showcase-story-card');
  const stageViewport = document.getElementById('showcase-viewport-3d');
  
  const objPhone = document.getElementById('stage-obj-phone');
  const objTerminal = document.getElementById('stage-obj-terminal');
  const objDossier = document.getElementById('stage-obj-dossier');

  if (showcaseTrack && showcaseSticky && objPhone && objTerminal && objDossier) {
    // 5 Choreographed Keyframes for SafeAlert, Library Control, and Dansamdolly
    const keyframes = [
      {
        p: 0.00,
        phone:    { x: -90, y: 0,   z: 0,    scale: 0.92, ry: -16, rx: 10, rz: 4,  opacity: 1 },
        terminal: { x: 130, y: -45, z: -60,  scale: 0.78, ry: -20, rx: 6,  rz: 0,  opacity: 0.95 },
        dossier:  { x: 150, y: 110, z: -100, scale: 0.74, ry: -10, rx: 12, rz: -3, opacity: 0.9 }
      },
      {
        p: 0.25,
        phone:    { x: 0,   y: 0,   z: 60,   scale: 1.06, ry: -8,  rx: 8,  rz: 3,  opacity: 1 },
        terminal: { x: 210, y: -45, z: -120, scale: 0.65, ry: -26, rx: 6,  rz: 0,  opacity: 0.45 },
        dossier:  { x: 190, y: 135, z: -160, scale: 0.62, ry: -12, rx: 12, rz: -3, opacity: 0.35 }
      },
      {
        p: 0.52,
        phone:    { x: -210, y: 65,  z: -120, scale: 0.65, ry: 18, rx: 6,  rz: -3, opacity: 0.45 },
        terminal: { x: 0,    y: 0,   z: 60,   scale: 1.05, ry: -5, rx: 5,  rz: 0,  opacity: 1 },
        dossier:  { x: 210,  y: -65, z: -140, scale: 0.62, ry: -20, rx: 8, rz: 2,  opacity: 0.4 }
      },
      {
        p: 0.78,
        phone:    { x: -210, y: -65, z: -140, scale: 0.62, ry: 18, rx: 8,  rz: -2, opacity: 0.35 },
        terminal: { x: -190, y: 80,  z: -110, scale: 0.65, ry: 12, rx: 6,  rz: 0,  opacity: 0.45 },
        dossier:  { x: 0,    y: 0,   z: 60,   scale: 1.05, ry: -3, rx: 6,  rz: 0,  opacity: 1 }
      },
      {
        p: 1.00,
        phone:    { x: -210, y: 0,   z: 0,    scale: 0.80, ry: 0,   rx: 0,  rz: 0,  opacity: 1 },
        terminal: { x: 0,    y: 0,   z: 0,    scale: 0.80, ry: 0,   rx: 0,  rz: 0,  opacity: 1 },
        dossier:  { x: 210,  y: 0,   z: 0,    scale: 0.80, ry: 0,   rx: 0,  rz: 0,  opacity: 1 }
      }
    ];

    let targetProgress = 0;
    let currentProgress = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let activeStoryStep = -1;
    let isDesktopViewport = window.innerWidth > 820;

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function interpolateObject(objKey, p) {
      // Find keyframe interval
      let i = 0;
      while (i < keyframes.length - 2 && keyframes[i + 1].p < p) {
        i++;
      }
      const k0 = keyframes[i];
      const k1 = keyframes[i + 1];
      const range = k1.p - k0.p;
      const tRaw = range === 0 ? 0 : Math.max(0, Math.min(1, (p - k0.p) / range));
      // Smoothstep easing for silky transitions
      const t = tRaw * tRaw * (3 - 2 * tRaw);

      const o0 = k0[objKey];
      const o1 = k1[objKey];

      return {
        x: lerp(o0.x, o1.x, t),
        y: lerp(o0.y, o1.y, t),
        z: lerp(o0.z, o1.z, t),
        scale: lerp(o0.scale, o1.scale, t),
        ry: lerp(o0.ry, o1.ry, t),
        rx: lerp(o0.rx, o1.rx, t),
        rz: lerp(o0.rz, o1.rz, t),
        opacity: lerp(o0.opacity, o1.opacity, t)
      };
    }

    function calculateScrollProgress() {
      if (!isDesktopViewport || prefersReducedMotion) return 0;
      const rect = showcaseTrack.getBoundingClientRect();
      const headerOffset = 76;
      const totalScrollable = showcaseTrack.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return 0;
      const scrolled = headerOffset - rect.top;
      return Math.max(0, Math.min(1, scrolled / totalScrollable));
    }

    function updateActiveStory(p) {
      let step = 0;
      if (p < 0.12) {
        step = 0; // Collection intro
      } else if (p < 0.38) {
        step = 1; // SafeAlert
      } else if (p < 0.65) {
        step = 2; // Library Control
      } else if (p < 0.90) {
        step = 3; // Dansamdolly
      } else {
        step = 4; // Gather & Reveal
      }

      if (step !== activeStoryStep) {
        activeStoryStep = step;
        storyCards.forEach((card) => {
          const cardStep = parseInt(card.getAttribute('data-step'), 10);
          const isActive = cardStep === activeStoryStep;
          card.classList.toggle('is-active', isActive);
          card.setAttribute('aria-hidden', String(!isActive));
        });

        // Update step milestone indicators
        stepButtons.forEach((btn) => {
          const targetStep = parseInt(btn.getAttribute('data-target-step'), 10);
          const isButtonActive = targetStep === activeStoryStep;
          btn.classList.toggle('active', isButtonActive);
          btn.setAttribute('aria-selected', String(isButtonActive));
        });
      }

      // Update progress bar
      if (progressBar) {
        progressBar.style.width = `${(p * 100).toFixed(1)}%`;
      }
    }

    function applyTransforms() {
      if (!isDesktopViewport || prefersReducedMotion) {
        // Reset transforms for mobile/reduced motion
        objPhone.style.transform = '';
        objPhone.style.opacity = '';
        objTerminal.style.transform = '';
        objTerminal.style.opacity = '';
        objDossier.style.transform = '';
        objDossier.style.opacity = '';
        return;
      }

      // Smooth lerp progress
      currentProgress += (targetProgress - currentProgress) * 0.14;
      currentTiltX += (targetTiltX - currentTiltX) * 0.08;
      currentTiltY += (targetTiltY - currentTiltY) * 0.08;

      const p = currentProgress;
      const phoneState = interpolateObject('phone', p);
      const terminalState = interpolateObject('terminal', p);
      const dossierState = interpolateObject('dossier', p);

      // Add tilt physics based on which project is in primary focus
      const tiltMultPhone = (p >= 0.10 && p <= 0.38) ? 1.0 : 0.3;
      const tiltMultTerm  = (p > 0.38 && p <= 0.65) ? 1.0 : 0.3;
      const tiltMultDoss  = (p > 0.65 && p <= 0.90) ? 1.0 : 0.3;

      const pX = phoneState.x;
      const pY = phoneState.y;
      const pZ = phoneState.z;
      const pRy = phoneState.ry + currentTiltX * 16 * tiltMultPhone;
      const pRx = phoneState.rx - currentTiltY * 12 * tiltMultPhone;

      objPhone.style.transform = `translate3d(${pX.toFixed(1)}px, ${pY.toFixed(1)}px, ${pZ.toFixed(1)}px) scale(${phoneState.scale.toFixed(3)}) rotateY(${pRy.toFixed(1)}deg) rotateX(${pRx.toFixed(1)}deg) rotateZ(${phoneState.rz.toFixed(1)}deg)`;
      objPhone.style.opacity = phoneState.opacity.toFixed(2);

      const tX = terminalState.x;
      const tY = terminalState.y;
      const tZ = terminalState.z;
      const tRy = terminalState.ry + currentTiltX * 16 * tiltMultTerm;
      const tRx = terminalState.rx - currentTiltY * 12 * tiltMultTerm;

      objTerminal.style.transform = `translate3d(${tX.toFixed(1)}px, ${tY.toFixed(1)}px, ${tZ.toFixed(1)}px) scale(${terminalState.scale.toFixed(3)}) rotateY(${tRy.toFixed(1)}deg) rotateX(${tRx.toFixed(1)}deg) rotateZ(${terminalState.rz.toFixed(1)}deg)`;
      objTerminal.style.opacity = terminalState.opacity.toFixed(2);

      const dX = dossierState.x;
      const dY = dossierState.y;
      const dZ = dossierState.z;
      const dRy = dossierState.ry + currentTiltX * 16 * tiltMultDoss;
      const dRx = dossierState.rx - currentTiltY * 12 * tiltMultDoss;

      objDossier.style.transform = `translate3d(${dX.toFixed(1)}px, ${dY.toFixed(1)}px, ${dZ.toFixed(1)}px) scale(${dossierState.scale.toFixed(3)}) rotateY(${dRy.toFixed(1)}deg) rotateX(${dRx.toFixed(1)}deg) rotateZ(${dossierState.rz.toFixed(1)}deg)`;
      objDossier.style.opacity = dossierState.opacity.toFixed(2);

      updateActiveStory(p);

      requestAnimationFrame(applyTransforms);
    }

    // Scroll listener (passive for 60fps performance)
    window.addEventListener('scroll', () => {
      targetProgress = calculateScrollProgress();
    }, { passive: true });

    // Desktop Pointer Tilt Handler
    if (stageViewport) {
      stageViewport.addEventListener('pointerenter', (e) => {
        if (e.pointerType === 'touch' || prefersReducedMotion) return;
      });

      stageViewport.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch' || prefersReducedMotion || !isDesktopViewport) return;
        const rect = stageViewport.getBoundingClientRect();
        targetTiltX = (e.clientX - rect.left) / rect.width - 0.5;
        targetTiltY = (e.clientY - rect.top) / rect.height - 0.5;
      });

      stageViewport.addEventListener('pointerleave', () => {
        targetTiltX = 0;
        targetTiltY = 0;
      });
    }

    // Step Buttons Click Handler (Scroll to exact milestone)
    stepButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetStep = parseInt(btn.getAttribute('data-target-step'), 10);
        let targetP = 0;
        if (targetStep === 1) targetP = 0.25;
        else if (targetStep === 2) targetP = 0.52;
        else if (targetStep === 3) targetP = 0.78;

        const rect = showcaseTrack.getBoundingClientRect();
        const totalScrollable = showcaseTrack.offsetHeight - window.innerHeight;
        const targetY = window.scrollY + rect.top - 76 + targetP * totalScrollable;

        window.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });
      });
    });

    // Project Objects Click & Keyboard Actions
    function attachProjectNav(el, destination) {
      el.addEventListener('click', () => {
        window.location.href = destination;
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = destination;
        }
      });
    }

    attachProjectNav(objPhone, 'case-studies.html#safealert');
    attachProjectNav(objTerminal, 'case-studies.html#library-control');
    attachProjectNav(objDossier, 'case-studies.html#dansamdolly');

    // Resize listener
    window.addEventListener('resize', () => {
      isDesktopViewport = window.innerWidth > 820;
      targetProgress = calculateScrollProgress();
    });

    // Start RAF animation loop
    targetProgress = calculateScrollProgress();
    currentProgress = targetProgress;
    requestAnimationFrame(applyTransforms);
  }

  // --------------------------------------------------------------------------
  // 08. Page-to-Page Transition (Editorial Fade-Out on Internal Nav)
  // --------------------------------------------------------------------------
  const rootEl = document.documentElement;
  const LEAVE_DURATION = 520; // must clear the curtain wipe (CSS .page-curtain 0.52s)
  let isNavigating = false;

  // Persistent solid-panel "curtain" that sweeps up to cover before an internal
  // navigation, so moving between pages reads like a filmic scene cut. Injected
  // on every page; only ever animated when motion is allowed (see click handler).
  const pageCurtain = document.createElement('div');
  pageCurtain.className = 'page-curtain';
  pageCurtain.setAttribute('aria-hidden', 'true');
  document.body.appendChild(pageCurtain);

  function isInternalPageLink(anchor) {
    // Must be same-origin
    if (anchor.origin !== window.location.origin) return false;
    // Skip explicit new-tab / download links
    if (anchor.target && anchor.target !== '' && anchor.target !== '_self') return false;
    if (anchor.hasAttribute('download')) return false;
    const href = anchor.getAttribute('href') || '';
    // Skip protocols and pure-hash / same-page anchors
    if (href === '' || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return false;
    }
    // Same path + only a hash change = in-page anchor, let it scroll normally
    if (anchor.pathname === window.location.pathname && anchor.hash) return false;
    return true;
  }

  if (!prefersReducedMotion) {
    document.addEventListener('click', (e) => {
      // Only plain left-clicks with no modifier keys
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = e.target.closest('a[href]');
      if (!anchor || !isInternalPageLink(anchor)) return;

      e.preventDefault();
      if (isNavigating) return;
      isNavigating = true;

      const destination = anchor.href;
      rootEl.classList.add('is-leaving');
      pageCurtain.classList.add('is-covering');

      window.setTimeout(() => {
        window.location.href = destination;
      }, LEAVE_DURATION);
    });
  }

  // --------------------------------------------------------------------------
  // 10. Project Screenshot Lightbox (Case Study Galleries)
  // --------------------------------------------------------------------------
  const galleries = Array.from(document.querySelectorAll('[data-lightbox-gallery]'));
  if (galleries.length) {
    // One shared overlay, reused by every gallery on the page.
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-label', 'Screenshot viewer');
    overlay.innerHTML = [
      '<button type="button" class="lightbox-close" aria-label="Close viewer (Esc)">Close &#10005;</button>',
      '<button type="button" class="lightbox-nav prev" aria-label="Previous screenshot">&#8592; Prev</button>',
      '<button type="button" class="lightbox-nav next" aria-label="Next screenshot">Next &#8594;</button>',
      '<figure class="lightbox-figure">',
      '  <img class="lightbox-img" alt="">',
      '  <figcaption class="lightbox-caption"></figcaption>',
      '</figure>',
      '<span class="lightbox-counter" aria-hidden="true"></span>'
    ].join('');
    document.body.appendChild(overlay);

    const imgEl = overlay.querySelector('.lightbox-img');
    const capEl = overlay.querySelector('.lightbox-caption');
    const counterEl = overlay.querySelector('.lightbox-counter');
    const btnClose = overlay.querySelector('.lightbox-close');
    const btnPrev = overlay.querySelector('.lightbox-nav.prev');
    const btnNext = overlay.querySelector('.lightbox-nav.next');

    let currentItems = [];
    let currentIndex = 0;
    let lastFocused = null;

    // __LIGHTBOX_INSERT__

    function render() {
      const item = currentItems[currentIndex];
      if (!item) return;
      imgEl.src = item.src;
      imgEl.alt = item.caption || 'Project screenshot';
      capEl.textContent = item.caption || '';
      counterEl.textContent = (currentIndex + 1) + ' / ' + currentItems.length;
      const multi = currentItems.length > 1;
      btnPrev.style.display = multi ? '' : 'none';
      btnNext.style.display = multi ? '' : 'none';
    }

    function openAt(items, index) {
      currentItems = items;
      currentIndex = index;
      lastFocused = document.activeElement;
      render();
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      btnClose.focus();
    }

    function close() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      imgEl.removeAttribute('src');
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    function step(delta) {
      if (currentItems.length < 2) return;
      currentIndex = (currentIndex + delta + currentItems.length) % currentItems.length;
      render();
    }

    // Wire every gallery: each trigger opens the shared overlay scoped to its set.
    galleries.forEach((gallery) => {
      const triggers = Array.from(gallery.querySelectorAll('[data-lightbox-src]'));
      const items = triggers.map((t) => ({
        src: t.getAttribute('data-lightbox-src'),
        caption: t.getAttribute('data-lightbox-caption') || ''
      }));
      triggers.forEach((trigger, i) => {
        trigger.addEventListener('click', () => openAt(items, i));
      });
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', () => step(-1));
    btnNext.addEventListener('click', () => step(1));

    overlay.addEventListener('click', (e) => {
      // Clicking the backdrop (not the image or a control) closes the viewer.
      if (e.target === overlay || e.target.classList.contains('lightbox-figure')) close();
    });

    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      else if (e.key === 'Tab') {
        // Contain focus within the overlay's visible controls.
        const focusables = [btnClose, btnPrev, btnNext].filter((b) => b.style.display !== 'none');
        const idx = focusables.indexOf(document.activeElement);
        e.preventDefault();
        const nextIdx = e.shiftKey
          ? (idx <= 0 ? focusables.length - 1 : idx - 1)
          : (idx === focusables.length - 1 ? 0 : idx + 1);
        focusables[nextIdx].focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 11. Cinematic Layer — scroll progress, staged intro, magnetic CTAs
  // --------------------------------------------------------------------------

  // 11a. Global scroll-progress bar (top of viewport; tracks whole-page scroll)
  (function scrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    const fill = document.createElement('div');
    fill.className = 'scroll-progress__bar';
    bar.appendChild(fill);
    document.body.appendChild(bar);

    let ticking = false;
    function update() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const pct = scrollable > 0 ? (window.scrollY || doc.scrollTop) / scrollable : 0;
      fill.style.width = (Math.max(0, Math.min(1, pct)) * 100).toFixed(2) + '%';
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  })();

  // 11b. Staged intro reveal — index each child so the CSS cascade delays cleanly
  document.querySelectorAll('[data-cinematic-intro]').forEach((intro) => {
    Array.prototype.forEach.call(intro.children, (child, i) => {
      child.style.setProperty('--intro-i', String(i));
    });
  });

  // 11c. Magnetic primary CTAs (fine pointer + motion allowed; touch-safe)
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if (finePointer && !prefersReducedMotion) {
    const STRENGTH = 0.28;  // subtle, editorial pull
    const MAX_OFFSET = 7;   // px cap
    document.querySelectorAll('.btn-primary').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch') return;
        const rect = btn.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * STRENGTH;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * STRENGTH;
        const cx = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, dx));
        const cy = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, dy));
        btn.style.transform = 'translate(' + cx.toFixed(1) + 'px, ' + cy.toFixed(1) + 'px)';
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 12. Cinematic Scenes — opening title sequence + scroll parallax depth
  // --------------------------------------------------------------------------

  // 12a. Opening title sequence (homepage only · once per session · motion-on)
  (function titleSequence() {
    if (prefersReducedMotion) return;
    if (!document.body.hasAttribute('data-home-intro')) return;
    try { if (sessionStorage.getItem('kunle:intro') === '1') return; } catch (_) {}
    try { sessionStorage.setItem('kunle:intro', '1'); } catch (_) {}

    const seq = document.createElement('div');
    seq.className = 'title-seq';
    seq.setAttribute('aria-hidden', 'true');
    seq.innerHTML = [
      '<div class="title-seq__inner">',
      '<span class="title-seq__chapter">Portfolio — 2026</span>',
      '<span class="title-seq__name">Fasuba <span>/</span> Olukunle</span>',
      '<span class="title-seq__role">Software Developer · Lagos, Nigeria</span>',
      '<span class="title-seq__rule"></span>',
      '</div>',
      '<span class="title-seq__skip">Click or press any key to skip</span>'
    ].join('');
    document.body.appendChild(seq);
    rootEl.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    let dismissed = false;
    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      window.clearTimeout(autoTimer);
      seq.classList.add('is-leaving');
      rootEl.style.overflow = '';
      document.body.style.overflow = '';
      window.removeEventListener('keydown', dismiss, true);
      window.removeEventListener('wheel', dismiss, { passive: true });
      window.removeEventListener('touchstart', dismiss, { passive: true });
      seq.addEventListener('transitionend', () => { if (seq.parentNode) seq.remove(); }, { once: true });
      window.setTimeout(() => { if (seq.parentNode) seq.remove(); }, 1100);
    }
    const autoTimer = window.setTimeout(dismiss, 2500);
    seq.addEventListener('click', dismiss);
    window.addEventListener('keydown', dismiss, true);
    window.addEventListener('wheel', dismiss, { passive: true });
    window.addEventListener('touchstart', dismiss, { passive: true });
  })();
  // 12b. Scroll parallax depth — cinematic drift on the hero stage + work thumbs
  (function scrollParallax() {
    if (prefersReducedMotion) return;
    const items = [];
    const stage = document.querySelector('.hero-stage-wrapper');
    if (stage && window.matchMedia('(min-width: 881px)').matches) {
      stage.setAttribute('data-parallax', '');
      items.push({ el: stage, factor: 0.05, cap: 34, scale: 1 });
    }
    document.querySelectorAll('.work-card-thumb img').forEach((img) => {
      img.setAttribute('data-parallax', '');
      items.push({ el: img, factor: 0.06, cap: 12, scale: 1.12 });
    });
    if (!items.length) return;

    let ticking = false;
    function update() {
      const h = window.innerHeight || rootEl.clientHeight;
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        const r = it.el.getBoundingClientRect();
        if (r.bottom < -140 || r.top > h + 140) continue;   // skip well-offscreen
        const center = r.top + r.height / 2;
        let ty = (h / 2 - center) * it.factor;
        if (ty > it.cap) ty = it.cap; else if (ty < -it.cap) ty = -it.cap;
        it.el.style.transform =
          'translate3d(0,' + ty.toFixed(1) + 'px,0)' +
          (it.scale !== 1 ? ' scale(' + it.scale + ')' : '');
      }
      ticking = false;
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  })();
  // Reset leave-state when navigating back via bfcache (avoids blank/faded page)
  window.addEventListener('pageshow', () => {
    isNavigating = false;
    rootEl.classList.remove('is-leaving');
    pageCurtain.classList.remove('is-covering');
  });
});
