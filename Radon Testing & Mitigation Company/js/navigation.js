/**
 * NAVIGATION.JS — ClearGround Responsive Navigation & Glass Navbar Controller
 * Adhering strictly to Master Rules (Rule 1, 2, 3, 9, 11)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const siteHeader = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const drawerCloseBtn = document.querySelector('.drawer-close-btn');

  // 1. Sticky Header Blur and Shadow Effect on Scroll
  function handleScroll() {
    if (!siteHeader) return;
    if (window.scrollY > 15) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Drawer Open / Close (Rule 7)
  let lastFocusedTrigger = null;

  function openDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      lastFocusedTrigger = document.activeElement;
      mobileDrawer.classList.add('active');
      drawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
      if (drawerCloseBtn) {
        setTimeout(() => drawerCloseBtn.focus(), 50);
      }
    }
  }

  function closeDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.remove('active');
      drawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
        lastFocusedTrigger.focus();
      }
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      openDrawer();
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  // Close drawer on clicking navigation links (Rule 7)
  document.querySelectorAll('.drawer-link:not(.drawer-submenu-toggle), .drawer-sublink').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // 3. Mobile Drawer Home Submenu Toggle
  const submenuToggles = document.querySelectorAll('.drawer-submenu-toggle');
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = toggle.closest('.drawer-item-has-submenu');
      if (parent) {
        const submenu = parent.querySelector('.drawer-submenu');
        if (submenu) {
          const isOpen = submenu.classList.contains('show');
          submenu.classList.toggle('show');
          toggle.classList.toggle('expanded');
          toggle.setAttribute('aria-expanded', String(!isOpen));
        }
      }
    });
  });

  // 4. Desktop Home Dropdown Click / Keyboard Handling (Rule 3)
  const homeNavItem = document.querySelector('.nav-item:has(#home-dropdown-menu), .nav-item');
  const homeNavLink = document.getElementById('nav-link-home');
  const homeDropdown = document.getElementById('home-dropdown-menu');

  if (homeNavLink && homeDropdown) {
    // Click toggle on desktop
    homeNavLink.addEventListener('click', (e) => {
      // If screen is desktop, toggle on click as well
      if (window.innerWidth > 1024) {
        e.preventDefault();
        const isOpen = homeDropdown.classList.contains('show');
        homeDropdown.classList.toggle('show');
        homeNavLink.setAttribute('aria-expanded', String(!isOpen));
        if (homeNavItem) homeNavItem.classList.toggle('dropdown-open');
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!homeNavLink.contains(e.target) && !homeDropdown.contains(e.target)) {
        homeDropdown.classList.remove('show');
        homeNavLink.setAttribute('aria-expanded', 'false');
        if (homeNavItem) homeNavItem.classList.remove('dropdown-open');
      }
    });
  }

  // Close drawer and dropdowns on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      if (homeDropdown) {
        homeDropdown.classList.remove('show');
        if (homeNavLink) homeNavLink.setAttribute('aria-expanded', 'false');
        if (homeNavItem) homeNavItem.classList.remove('dropdown-open');
      }
      document.querySelectorAll('.profile-dropdown-menu.show').forEach(m => m.classList.remove('show'));
    }
  });

  // 5. Highlight Active Navigation Item Based on Current URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item, .drawer-link, .drawer-sublink');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.split('?')[0].split('#')[0].split('/').pop();

    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');

      // If active link is Home 1 or Home 2 in dropdown or submenu
      if (linkPath === 'index.html' || linkPath === 'home-2.html') {
        if (homeNavLink) homeNavLink.classList.add('active');
        const drawerHomeToggle = document.querySelector('.drawer-submenu-toggle');
        if (drawerHomeToggle) drawerHomeToggle.classList.add('active');
      }
    }
  });
});
