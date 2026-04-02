/**
 * Open Dataroom — Slide Navigation Engine
 *
 * Handles keyboard, touch, and dot navigation between slides.
 * Integrates with auth.js and tracking.js for session management.
 */
(function () {
  'use strict';

  function init() {
    var slides = document.querySelectorAll('.slide');
    var dotsContainer = document.getElementById('navDots');
    var counter = document.getElementById('slideCounter');
    var watermark = document.querySelector('.pres-watermark');
    var navBar = document.querySelector('.nav-bar');
    var logoutBtn = document.querySelector('.pres-logout');
    var backLink = document.querySelector('.pres-back-link');
    var total = slides.length;
    var current = 0;
    var isTransitioning = false;

    // ── Theme Management ────────────────────────────────────────

    function updateNavTheme(theme) {
      navBar.className = 'nav-bar nav-bar--' + theme;
      counter.className = 'slide-counter slide-counter--' + theme;
      watermark.className = 'pres-watermark watermark--' + theme;
      logoutBtn.className = 'pres-logout logout--' + theme;
      if (backLink) backLink.className = 'pres-back-link back-link--' + theme;
    }

    updateNavTheme(slides[0].dataset.theme || 'dark');

    // ── Dot Navigation ──────────────────────────────────────────

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'nav-dot' + (i === 0 ? ' nav-dot--active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', function () { goToSlide(i, 'dot_click'); });
      dotsContainer.appendChild(dot);
    });

    var dots = dotsContainer.querySelectorAll('.nav-dot');

    // ── Slide Transition ────────────────────────────────────────

    function goToSlide(n, navMethod) {
      if (n === current || n < 0 || n >= total || isTransitioning) return;
      isTransitioning = true;

      if (window.InvestorTracking) {
        InvestorTracking.trackSlideTransition(current, n, navMethod || 'unknown');
      }

      slides[current].classList.remove('slide--active');
      dots[current].classList.remove('nav-dot--active');

      slides[current].querySelectorAll('.reveal').forEach(function (el) {
        el.style.animation = 'none';
        el.offsetHeight;
        el.style.animation = '';
        el.style.opacity = '0';
        el.style.transform = 'translateY(14px)';
      });

      current = n;

      slides[current].classList.add('slide--active');
      dots[current].classList.add('nav-dot--active');
      counter.textContent = (current + 1) + ' / ' + total;

      var theme = slides[current].dataset.theme || 'light';
      updateNavTheme(theme);

      slides[current].querySelectorAll('.reveal').forEach(function (el) {
        el.style.animation = 'none';
        el.style.opacity = '';
        el.style.transform = '';
        el.offsetHeight;
        el.style.animation = '';
      });

      setTimeout(function () { isTransitioning = false; }, 500);
    }

    // ── Keyboard Navigation ─────────────────────────────────────

    document.addEventListener('keydown', function (e) {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          goToSlide(current + 1, 'keyboard');
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          goToSlide(current - 1, 'keyboard');
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0, 'keyboard');
          break;
        case 'End':
          e.preventDefault();
          goToSlide(total - 1, 'keyboard');
          break;
      }
    });

    // ── Touch / Swipe Navigation ────────────────────────────────

    var touchStartX = 0;
    var touchStartY = 0;

    document.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].screenX - touchStartX;
      var dy = e.changedTouches[0].screenY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) goToSlide(current + 1, 'swipe');
        else goToSlide(current - 1, 'swipe');
      }
    }, { passive: true });

    // ── Logout Button ───────────────────────────────────────────

    logoutBtn.addEventListener('click', async function () {
      logoutBtn.disabled = true;
      logoutBtn.textContent = 'Signing out...';
      if (window.InvestorTracking) {
        await InvestorTracking.endSession('logout');
      }
      await InvestorAuth.signOut();
      window.location.href = '/dataroom/';
    });

    // ── Tab Close ───────────────────────────────────────────────

    window.addEventListener('beforeunload', function () {
      if (window.InvestorTracking) {
        InvestorTracking.endSessionBeacon('tab_close');
      }
    });
  }

  // ── Expose deferred init ────────────────────────────────────

  window.InvestorPresentation = { init: init };

})();
