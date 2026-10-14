/**
 * AUTH.JS — ClearGround Authentication & Profile Controller
 * Adhering strictly to Master Rules (Rule 4, 5, 6, 7, 8)
 */

(function () {
  'use strict';

  const AUTH_STORAGE_KEY = 'clearground_auth_user';

  // Demo user data
  const DEMO_USER = {
    name: 'Dr. Sarah Mitchell',
    email: 'sarah.m@clearground.io',
    initials: 'SM',
    role: 'Homeowner & Certified Inspector'
  };

  function getCurrentUser() {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setCurrentUser(user) {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    updateAuthUI();
  }

  function updateAuthUI() {
    const user = getCurrentUser();
    const guestActions = document.querySelectorAll('.auth-actions-guest');
    const loggedProfiles = document.querySelectorAll('.auth-profile-logged');

    if (user) {
      guestActions.forEach(el => {
        el.classList.add('auth-state-hidden');
        el.style.display = '';
      });
      loggedProfiles.forEach(el => {
        el.classList.remove('auth-state-hidden');
        el.style.display = '';
        const nameEl = el.querySelector('.user-name-label');
        const nameFullEl = el.querySelector('.user-name-full');
        const emailFullEl = el.querySelector('.user-email-full');
        const avatarEl = el.querySelector('.user-avatar-circle');

        if (nameEl) nameEl.textContent = user.name.split(' ')[0];
        if (nameFullEl) nameFullEl.textContent = user.name;
        if (emailFullEl) emailFullEl.textContent = user.email;
        if (avatarEl) avatarEl.textContent = user.initials || 'CG';
      });
    } else {
      guestActions.forEach(el => {
        el.classList.remove('auth-state-hidden');
        el.style.display = '';
      });
      loggedProfiles.forEach(el => {
        el.classList.add('auth-state-hidden');
        el.style.display = '';
      });
    }
  }

  // Premium authentication notice modal used instead of native browser alerts.
  function showAuthNotice(options = {}) {
    const type = options.type === 'error' ? 'error' : 'success';
    const titleText = options.title || (type === 'error' ? 'Please check your details' : 'Signed in successfully');
    const messageText = options.message || (type === 'error' ? 'Complete the required fields and try again.' : 'Your account is ready.');
    const kickerText = options.kicker || (type === 'error' ? 'Sign in required' : 'Secure sign in');

    let backdrop = document.getElementById('social-success-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'social-success-backdrop';
      backdrop.className = 'social-success-backdrop';
      backdrop.innerHTML = `
        <div class="social-success-modal" role="dialog" aria-modal="true" aria-labelledby="social-success-title" aria-describedby="social-success-message">
          <div class="social-success-icon" aria-hidden="true"></div>
          <span class="social-success-kicker" id="social-success-kicker"></span>
          <h3 id="social-success-title"></h3>
          <p id="social-success-message"></p>
          <button type="button" class="btn btn-primary btn-block" id="social-success-continue">Got it</button>
        </div>
      `;
      document.body.appendChild(backdrop);
      backdrop.querySelector('#social-success-continue').addEventListener('click', () => {
        backdrop.classList.remove('active');
      });
      backdrop.addEventListener('click', (event) => {
        if (event.target === backdrop) backdrop.classList.remove('active');
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && backdrop.classList.contains('active')) {
          backdrop.classList.remove('active');
        }
      });
    }

    const modal = backdrop.querySelector('.social-success-modal');
    const icon = backdrop.querySelector('.social-success-icon');
    const kicker = backdrop.querySelector('#social-success-kicker');
    const title = backdrop.querySelector('#social-success-title');
    const message = backdrop.querySelector('#social-success-message');
    const button = backdrop.querySelector('#social-success-continue');

    modal.classList.toggle('is-error', type === 'error');
    modal.classList.toggle('is-success', type !== 'error');
    if (icon) {
      icon.innerHTML = type === 'error'
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 2.9 1.8 17.1A2 2 0 0 0 3.5 20h17a2 2 0 0 0 1.7-2.9L13.7 2.9a2 2 0 0 0-3.4 0Z"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
    }
    if (kicker) kicker.textContent = kickerText;
    if (title) title.textContent = titleText;
    if (message) message.textContent = messageText;
    if (button) button.textContent = type === 'error' ? 'Check details' : 'Done';

    backdrop.classList.add('active');
    window.setTimeout(() => button && button.focus(), 80);
  }

  function showSocialSuccess(provider) {
    const providerName = provider === 'Apple' ? 'Apple' : (provider === 'Google' ? 'Google' : 'Email');
    const socialUser = {
      name: 'Sarah Mitchell',
      email: 'sarah.m@clearground.io',
      initials: 'SM',
      role: 'Client'
    };

    if (providerName !== 'Email') {
      setCurrentUser(socialUser);
    }

    showAuthNotice({
      type: 'success',
      kicker: 'Secure sign in',
      title: providerName === 'Email' ? 'Sign in successful' : `${providerName} sign in successful`,
      message: providerName === 'Email'
        ? 'Welcome back. Your account has been signed in successfully.'
        : `Welcome back, Sarah. You are now signed in securely with ${providerName}.`
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();

    // 1. Login Form Submission (Rule 7)
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('login-email');
        const passInput = document.getElementById('login-password');

        if (!emailInput || !passInput) return;

        const email = emailInput.value.trim();
        const password = passInput.value.trim();

        if (!email || !password) {
          showAuthNotice({
            type: 'error',
            kicker: 'Sign in required',
            title: 'Email and password needed',
            message: 'Please enter your email address and password to continue securely.'
          });
          return;
        }

        // Demo login simulation
        const loggedUser = {
          name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
          email: email,
          initials: email.substring(0, 2).toUpperCase(),
          role: 'Client'
        };
        setCurrentUser(loggedUser);

        showSocialSuccess('Email');
      });
    }

    // 2. Registration Form Submission (Rule 8)
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('reg-name');
        const emailInput = document.getElementById('reg-email');
        const passInput = document.getElementById('reg-password');
        const confirmInput = document.getElementById('reg-confirm');

        if (!nameInput || !emailInput || !passInput || !confirmInput) return;

        const fullName = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passInput.value;
        const confirmPass = confirmInput.value;

        if (password !== confirmPass) {
          showAuthNotice({
            type: 'error',
            kicker: 'Password check',
            title: 'Passwords do not match',
            message: 'Re-enter the confirmation password so both password fields match.'
          });
          return;
        }

        const newUser = {
          name: fullName,
          email: email,
          initials: fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
          role: 'Client'
        };
        setCurrentUser(newUser);

        if (window.RadonForms && window.RadonForms.showToast) {
          window.RadonForms.showToast('Account created successfully! Welcome to ClearGround.');
        }

        setTimeout(() => {
          window.location.href = 'index.html';
        }, 700);
      });
    }

    // 3. Social OAuth Click Handlers (Rule 6)
    document.querySelectorAll('.btn-google-auth').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showSocialSuccess('Google');
      });
    });

    document.querySelectorAll('.btn-apple-auth').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showSocialSuccess('Apple');
      });
    });

    // 4. Profile Dropdown Toggle & Sign Out (Rule 5)
    document.addEventListener('click', (e) => {
      const clickedMenu = e.target.closest('.profile-dropdown-menu');
      const profileBtn = e.target.closest('.user-profile-badge');
      if (profileBtn && !clickedMenu) {
        const dropdown = profileBtn.querySelector('.profile-dropdown-menu');
        if (dropdown) {
          const willOpen = !dropdown.classList.contains('show');
          document.querySelectorAll('.profile-dropdown-menu.show').forEach(m => m.classList.remove('show'));
          dropdown.classList.toggle('show', willOpen);
          profileBtn.setAttribute('aria-expanded', String(willOpen));
        }
      } else if (!clickedMenu) {
        document.querySelectorAll('.profile-dropdown-menu.show').forEach(m => m.classList.remove('show'));
        document.querySelectorAll('.user-profile-badge[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
      }

      // Logout handler
      if (e.target.closest('.logout-trigger')) {
        e.preventDefault();
        setCurrentUser(null);
        if (window.RadonForms && window.RadonForms.showToast) {
          window.RadonForms.showToast('You have been signed out.');
        }
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 400);
      }
    });

    // 5. Password Visibility Toggle Buttons
    const togglePassBtns = document.querySelectorAll('.toggle-password-vis');
    togglePassBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (input) {
          const isPassword = input.type === 'password';
          input.type = isPassword ? 'text' : 'password';
          btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
          btn.innerHTML = isPassword
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
        }
      });
    });
  });

  window.ClearGroundAuth = {
    getUser: getCurrentUser,
    setUser: setCurrentUser,
    logout: () => setCurrentUser(null)
  };
})();
