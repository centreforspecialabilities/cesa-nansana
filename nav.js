document.addEventListener('DOMContentLoaded', function () {
  function isMobile() { return window.innerWidth <= 800; }

  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  function closeMobileNav() {
    if (!navToggle || !navLinks) return;
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.querySelectorAll('.has-dropdown.open').forEach(function (el) {
      el.classList.remove('open');
    });
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (!isOpen) {
        document.querySelectorAll('.has-dropdown.open').forEach(function (el) {
          el.classList.remove('open');
        });
      }
    });

    navLinks.querySelectorAll('li:not(.has-dropdown) > a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (isMobile()) closeMobileNav();
      });
    });

    window.addEventListener('resize', function () {
      if (!isMobile()) closeMobileNav();
    });
  }

  document.querySelectorAll('.has-dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (!isMobile()) return;
      e.preventDefault();
      e.stopPropagation();
      var parent = this.closest('.has-dropdown');
      var wasOpen = parent.classList.contains('open');
      document.querySelectorAll('.has-dropdown.open').forEach(function (el) {
        el.classList.remove('open');
      });
      if (!wasOpen) parent.classList.add('open');
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.has-dropdown.open').forEach(function (el) {
        el.classList.remove('open');
      });
    }
    if (isMobile() && navLinks && navLinks.classList.contains('open') && !e.target.closest('.nav')) {
      closeMobileNav();
    }
  });
});
