/**
 * MAIN.JS — RadonShield Interactions, Accordions, Filters & Counter Animations
 * Adhering strictly to Master Blueprint (Part 18, 20)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. FAQ Accordion Toggle
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.closest('.accordion-item');
      if (!parent) return;

      const wasActive = parent.classList.contains('active');
      // Close sibling items in the same container
      const container = parent.closest('.accordion-container');
      if (container) {
        container.querySelectorAll('.accordion-item').forEach(item => {
          item.classList.remove('active');
        });
      }

      if (!wasActive) {
        parent.classList.add('active');
      }
    });
  });

  // 1B. Unified FAQ cards used on Home 1, Home 2 and Service Details.
  // Event delegation is intentional because service-detail FAQs are injected dynamically.
  document.addEventListener('click', (event) => {
    const faqButton = event.target.closest('.faq-question-btn');
    if (!faqButton) return;

    const item = faqButton.closest('.faq-item');
    if (!item) return;

    const container = item.closest('.faq-accordion-wrap');
    const isOpen = item.classList.contains('open');

    if (container) {
      container.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          const button = openItem.querySelector('.faq-question-btn');
          if (button) button.setAttribute('aria-expanded', 'false');
        }
      });
    }

    item.classList.toggle('open', !isOpen);
    faqButton.setAttribute('aria-expanded', String(!isOpen));
  });

  // Open the first compact FAQ item on home sections to make the interaction obvious.
  document.querySelectorAll('.faq-accordion-wrap').forEach(wrap => {
    const first = wrap.querySelector('.faq-item');
    if (first && !wrap.id.includes('detail-faq-wrap')) {
      first.classList.add('open');
      const firstButton = first.querySelector('.faq-question-btn');
      if (firstButton) firstButton.setAttribute('aria-expanded', 'true');
    }
  });

  // 1C. FAQ page live search and category filtering.
  const faqSearchInput = document.getElementById('faq-search-input');
  const faqFilterButtons = document.querySelectorAll('.pill-filter[data-category]');
  const faqPageItems = document.querySelectorAll('#faq-accordion-container .accordion-item');

  function filterFaqItems() {
    if (!faqPageItems.length) return;
    const query = faqSearchInput ? faqSearchInput.value.trim().toLowerCase() : '';
    const activeButton = document.querySelector('.pill-filter[data-category].active');
    const activeCategory = activeButton ? activeButton.dataset.category : 'all';
    let firstVisible = null;

    faqPageItems.forEach(item => {
      const category = item.dataset.category || '';
      const text = item.textContent.toLowerCase();
      const categoryMatch = activeCategory === 'all' || category === activeCategory;
      const queryMatch = !query || text.includes(query);
      const visible = categoryMatch && queryMatch;
      item.style.display = visible ? '' : 'none';
      if (!visible) item.classList.remove('active');
      if (visible && !firstVisible) firstVisible = item;
    });

    if (firstVisible && !document.querySelector('#faq-accordion-container .accordion-item.active:not([style*="display: none"])')) {
      firstVisible.classList.add('active');
    }
  }

  if (faqSearchInput) faqSearchInput.addEventListener('input', filterFaqItems);
  faqFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      faqFilterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterFaqItems();
    });
  });

  // 2. Animated Counters for Metrics (15,000+, 99.8%, <0.8, etc.)
  const metricValues = document.querySelectorAll('.metric-val[data-count]');
  if (metricValues.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseFloat(target.getAttribute('data-count'));
          const suffix = target.getAttribute('data-suffix') || '';
          const prefix = target.getAttribute('data-prefix') || '';
          const isDecimal = target.getAttribute('data-decimal') === 'true';
          let start = 0;
          const duration = 1600;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = (start + (endValue - start) * ease);

            target.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          }

          requestAnimationFrame(updateCounter);
          obs.unobserve(target);
        }
      });
    }, { threshold: 0.3 });

    metricValues.forEach(el => observer.observe(el));
  }

  // 3. Blog Filter & Live Search
  const blogSearchInput = document.getElementById('blog-search');
  const blogFilterTabs = document.querySelectorAll('.blog-filter-btn');
  const blogCards = document.querySelectorAll('.blog-card-item');

  function filterBlogPosts() {
    const query = blogSearchInput ? blogSearchInput.value.toLowerCase().trim() : '';
    const activeTab = document.querySelector('.blog-filter-btn.active');
    const category = activeTab ? activeTab.getAttribute('data-category') : 'all';

    let visibleCount = 0;
    blogCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const title = card.querySelector('h3').textContent.toLowerCase();
      const excerpt = card.querySelector('p').textContent.toLowerCase();

      const matchesCat = category === 'all' || cardCategory === category;
      const matchesQuery = !query || title.includes(query) || excerpt.includes(query);

      if (matchesCat && matchesQuery) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const noResultsMsg = document.getElementById('no-blog-results');
    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (blogSearchInput) {
    blogSearchInput.addEventListener('input', filterBlogPosts);
  }

  blogFilterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      blogFilterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterBlogPosts();
    });
  });

  // 4. Pricing Switcher (Standard vs Commercial / Annual)
  const pricingToggle = document.getElementById('pricing-billing-toggle');
  if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
      const isAnnual = pricingToggle.checked;
      const standardPrices = document.querySelectorAll('.price-val-residential');
      const annualPrices = document.querySelectorAll('.price-val-commercial');

      standardPrices.forEach(el => el.style.display = isAnnual ? 'none' : 'inline');
      annualPrices.forEach(el => el.style.display = isAnnual ? 'inline' : 'none');
    });
  }

  // 5. Admin Dashboard IoT Radon Telemetry Simulator
  const telemetryDisplay = document.getElementById('live-iot-reading');
  if (telemetryDisplay) {
    setInterval(() => {
      // Fluctuates slightly between 0.72 and 0.88 pCi/L to simulate real CRM
      const randomFluc = (0.75 + Math.random() * 0.12).toFixed(2);
      telemetryDisplay.textContent = `${randomFluc} pCi/L`;
    }, 3500);
  }

  // 6. Dashboard Sidebar Toggle on Mobile
  const dashSidebarToggle = document.getElementById('dash-sidebar-toggle');
  const dashSidebar = document.querySelector('.dashboard-sidebar');
  if (dashSidebarToggle && dashSidebar) {
    dashSidebarToggle.addEventListener('click', () => {
      dashSidebar.classList.toggle('open');
    });
  }
});
