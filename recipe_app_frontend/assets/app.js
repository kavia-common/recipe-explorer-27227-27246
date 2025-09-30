(function () {
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return (root || document).querySelectorAll(sel); }

  // Scale .scaler-inner to fit parent width while maintaining 375x812
  function rescale() {
    var inner = qs('.scaler-inner');
    var wrap = qs('.scaler');
    if (!inner || !wrap) return;
    var targetWidth = wrap.clientWidth;
    var scale = targetWidth / 375;
    inner.style.transform = 'scale(' + scale + ')';
    wrap.style.height = (812 * scale) + 'px';
  }

  window.addEventListener('resize', rescale);
  window.addEventListener('orientationchange', rescale);
  document.addEventListener('DOMContentLoaded', function () {
    rescale();

    // Input focus handlers to add focus class for CSS
    var emailInput = qs('#email-input');
    var passInput = qs('#password-input');
    [emailInput, passInput].forEach(function (el) {
      if (!el) return;
      el.addEventListener('focus', function () { el.classList.add('is-focus'); });
      el.addEventListener('blur', function () { el.classList.remove('is-focus'); });
    });

    // Basic form validation stub
    var form = qs('#signin-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = qs('#email-input').value.trim();
        var pass = qs('#password-input').value.trim();
        var errs = [];
        if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
          errs.push('Please enter a valid email address.');
        }
        if (!pass || pass.length < 6) {
          errs.push('Password must be at least 6 characters.');
        }
        if (errs.length) {
          alert(errs.join('\n'));
          return false;
        }
        // TODO: replace with actual submission
        alert('Sign In submitted!');
        return true;
      });
    }

    // Social buttons stubs
    var g = qs('#btn-google');
    var f = qs('#btn-facebook');
    if (g) g.addEventListener('click', function () { alert('Google signin clicked'); });
    if (f) f.addEventListener('click', function () { alert('Facebook signin clicked'); });
  });
})();
