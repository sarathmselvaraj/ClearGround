/** ClearGround contact page: open browser date picker from icon or input click. */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('bk-date');
    const trigger = document.getElementById('booking-calendar-trigger');
    if (!dateInput || !trigger) return;

    function openCalendar() {
      if (typeof dateInput.showPicker === 'function') {
        try {
          // Must run synchronously in a genuine click activation event.
          dateInput.showPicker();
          return;
        } catch (error) {
          // Fall back to native focus/click behavior in restricted browsers.
        }
      }
      dateInput.focus();
      dateInput.click();
    }

    trigger.addEventListener('click', openCalendar);
    dateInput.addEventListener('click', function () {
      if (typeof dateInput.showPicker !== 'function') return;
      try { dateInput.showPicker(); } catch (error) { /* Native control remains usable. */ }
    });
  });
})();
