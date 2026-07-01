document.addEventListener('DOMContentLoaded', function () {
  function isMobile() { return window.innerWidth <= 800; }

  document.querySelectorAll('.has-dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (!isMobile()) return;
      e.preventDefault();
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
  });
});
