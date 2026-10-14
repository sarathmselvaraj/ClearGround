/**
 * FORMS.JS — RadonShield Forms, Validation & Interactive Risk Gauge Calculator
 * Adhering strictly to Master Blueprint (Part 10, Part 20)
 */

(function () {
  'use strict';

  // 1. Toast Notification Helper
  function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${type === 'success' ? '#10B981' : '#EF4444'}" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
      <span style="font-size: 14px; font-weight: 500; color: var(--text-primary);">${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // 2. Interactive Radon Level Health Calculator & Needle Gauge
  function initRadonGaugeCalculator() {
    const input = document.getElementById('radon-level-input');
    const needle = document.getElementById('gauge-needle');
    const statusBadge = document.getElementById('gauge-status-badge');
    const riskLevelText = document.getElementById('gauge-risk-desc');
    const cancerRiskText = document.getElementById('gauge-cancer-risk');
    const actionRecommendation = document.getElementById('gauge-action-rec');

    if (!input || !needle) return;

    function updateGauge() {
      const val = parseFloat(input.value) || 0;
      // Gauge scale is from 0 to 20 pCi/L (capped at 100%)
      const percentage = Math.min(Math.max((val / 20) * 100, 2), 98);
      needle.style.left = `${percentage}%`;

      if (val < 2.0) {
        if (statusBadge) {
          statusBadge.className = 'badge-pill badge-epa-certified';
          statusBadge.textContent = 'LOW RISK (< 2.0 pCi/L)';
        }
        if (riskLevelText) riskLevelText.textContent = 'Normal ambient or post-mitigation baseline. Well below EPA action threshold.';
        if (cancerRiskText) cancerRiskText.textContent = 'Lifetime lung cancer risk is minimal (approx. 4 in 1,000 non-smokers).';
        if (actionRecommendation) actionRecommendation.textContent = 'Recommendation: Retest every 2 years or after major renovations.';
      } else if (val < 4.0) {
        if (statusBadge) {
          statusBadge.className = 'badge-pill badge-accent-tag';
          statusBadge.textContent = 'MODERATE RISK (2.0 – 3.9 pCi/L)';
        }
        if (riskLevelText) riskLevelText.textContent = 'Elevated levels. Exceeds World Health Organization (WHO) guideline of 2.7 pCi/L.';
        if (cancerRiskText) cancerRiskText.textContent = 'Equivalent to approx. 4 cigarettes per day. Long-term lung cellular damage risk.';
        if (actionRecommendation) actionRecommendation.textContent = 'Recommendation: Consider installing a mitigation system to drop below 1.5 pCi/L.';
      } else if (val < 10.0) {
        if (statusBadge) {
          statusBadge.className = 'badge-pill badge-warning-hazard';
          statusBadge.textContent = 'EPA ACTION LEVEL (4.0 – 9.9 pCi/L)';
        }
        if (riskLevelText) riskLevelText.textContent = 'DANGEROUS: Exceeds EPA federal action threshold of 4.0 pCi/L. Immediate mitigation required.';
        if (cancerRiskText) cancerRiskText.textContent = 'Radiation exposure equivalent to ~200 chest X-rays per year or 10-15 cigarettes/day.';
        if (actionRecommendation) actionRecommendation.textContent = 'Recommendation: Schedule active sub-slab depressurization mitigation immediately.';
      } else {
        if (statusBadge) {
          statusBadge.className = 'badge-pill badge-warning-hazard';
          statusBadge.textContent = 'CRITICAL RADIATION HAZARD (10.0+ pCi/L)';
        }
        if (riskLevelText) riskLevelText.textContent = 'SEVERE HAZARD: Unsafe for continuous occupancy without urgent mitigation.';
        if (cancerRiskText) cancerRiskText.textContent = 'Equivalent to smoking 20+ cigarettes/day. 5x higher lifetime lung cancer rate.';
        if (actionRecommendation) actionRecommendation.textContent = 'Recommendation: Priority mitigation dispatch required within 48–72 hours.';
      }
    }

    input.addEventListener('input', updateGauge);
    updateGauge(); // Initial calculation
  }

  // 3. Contact & Inspection Booking Form
  function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    if (!bookingForm) return;

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('bk-name');
      const email = document.getElementById('bk-email');
      const phone = document.getElementById('bk-phone');
      const service = document.getElementById('bk-service');
      const property = document.getElementById('bk-property');
      let isValid = true;

      // Validate required fields
      [name, email, phone].forEach(input => {
        if (input && !input.value.trim()) {
          input.closest('.form-group').classList.add('has-error');
          isValid = false;
        } else if (input) {
          input.closest('.form-group').classList.remove('has-error');
        }
      });

      if (!isValid) {
        showToast('Please fill out all required fields marked with *.', 'error');
        return;
      }

      // Submit simulation
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Scheduling Dispatch...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        bookingForm.reset();
        showToast('Your radon testing inspection request has been booked! Our certified specialist will call you shortly.');
      }, 1200);
    });
  }

  // 4. Newsletter subscription
  function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value) {
          showToast('Thank you for subscribing to RadonShield air quality updates!');
          input.value = '';
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initRadonGaugeCalculator();
    initBookingForm();
    initNewsletterForm();
  });

  window.RadonForms = {
    showToast,
    initRadonGaugeCalculator
  };
})();
