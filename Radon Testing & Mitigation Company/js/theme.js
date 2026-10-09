/**
 * THEME.JS — RadonShield Dark/Light Theme & RTL Compatibility Controller
 * Adhering strictly to Master Blueprint (Part 16 & Prompt Requirements)
 */

(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'radon_theme';
  const DIR_STORAGE_KEY = 'radon_dir';

  // SVG Icons for Theme Toggle
  const SUN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
  const MOON_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

  function getStoredTheme() {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
  }

  function getStoredDir() {
    return localStorage.getItem(DIR_STORAGE_KEY) || 'ltr';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Update all theme toggle buttons across the page
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      const label = btn.querySelector('.pref-theme-label');
      const iconBox = btn.querySelector('.pref-icon-box');
      if (label && iconBox) {
        iconBox.innerHTML = theme === 'dark' ? SUN_ICON : MOON_ICON;
        label.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
      } else {
        btn.innerHTML = theme === 'dark' ? SUN_ICON : MOON_ICON;
      }
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function applyDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(DIR_STORAGE_KEY, dir);

    // Update all RTL toggle buttons
    const rtlBtns = document.querySelectorAll('.rtl-toggle-btn');
    rtlBtns.forEach(btn => {
      const label = btn.querySelector('.pref-rtl-label');
      if (label) {
        label.textContent = dir === 'rtl' ? 'LTR Layout' : 'RTL Layout';
      } else {
        btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to Left to Right' : 'Switch to Right to Left');
      btn.setAttribute('title', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
    });
  }

  // Initialize immediately to prevent flash
  const initialTheme = getStoredTheme();
  const initialDir = getStoredDir();
  applyTheme(initialTheme);
  applyDir(initialDir);

  document.addEventListener('DOMContentLoaded', () => {
    // Re-apply icons once DOM is ready
    applyTheme(getStoredTheme());
    applyDir(getStoredDir());

    // Theme toggle click listener
    document.addEventListener('click', (e) => {
      const target = e.target.closest('.theme-toggle-btn');
      if (target) {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      }
    });

    // RTL toggle click listener
    document.addEventListener('click', (e) => {
      const target = e.target.closest('.rtl-toggle-btn');
      if (target) {
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        applyDir(nextDir);
      }
    });
  });

  // Expose helpers globally
  window.RadonTheme = {
    applyTheme,
    applyDir,
    getTheme: getStoredTheme,
    getDir: getStoredDir
  };
})();
