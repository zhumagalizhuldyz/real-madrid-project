
(function () {
  'use strict';

  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (contactForm.checkValidity() === false) {
        contactForm.classList.add('was-validated');
        document.getElementById('contact-success').classList.add('d-none');
        return;
      }

      contactForm.classList.add('was-validated');
      document.getElementById('contact-success').classList.remove('d-none');
    });
  }

  const registerForm = document.getElementById('registerForm');
  const passwordField = document.getElementById('reg-password');
  const confirmField = document.getElementById('reg-confirm-password');
  const confirmFeedback = document.getElementById('confirm-password-feedback');
  const registerSuccess = document.getElementById('register-success');

  function checkPasswordsMatch() {
    if (confirmField.value === '') {
      confirmField.setCustomValidity('');
      confirmFeedback.textContent = 'Please confirm your password.';
      return;
    }

    if (passwordField.value !== confirmField.value) {
      confirmField.setCustomValidity('Passwords do not match');
      confirmFeedback.textContent = 'Passwords do not match. Please check and try again.';
    } else {
      confirmField.setCustomValidity('');
    }
  }

  if (registerForm) {
    passwordField.addEventListener('input', checkPasswordsMatch);
    confirmField.addEventListener('input', checkPasswordsMatch);

    registerForm.addEventListener('submit', function (event) {
      checkPasswordsMatch();

      event.preventDefault();
      event.stopPropagation();

      if (registerForm.checkValidity() === false) {
        registerForm.classList.add('was-validated');
        registerSuccess.classList.add('d-none');
        return;
      }

      registerForm.classList.add('was-validated');
      registerSuccess.classList.remove('d-none');
    });

    registerForm.addEventListener('reset', function () {
      setTimeout(function () {
        registerForm.classList.remove('was-validated');
        confirmField.setCustomValidity('');
        confirmFeedback.textContent = 'Please confirm your password.';
        registerSuccess.classList.add('d-none');
      }, 0);
    });
  }
})();
