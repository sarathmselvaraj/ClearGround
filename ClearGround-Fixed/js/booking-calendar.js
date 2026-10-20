/** ClearGround contact page: open browser date picker from icon or input click. */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('bk-date');
    const trigger = document.getElementById('booking-calendar-trigger');
    if (!dateInput || !trigger) return;

    let lastOpen = 0;
    function openCalendar() {
      // Ignore duplicate pointer/click events from mobile browsers.
      const now = Date.now();
      if (now - lastOpen < 350) return;
      lastOpen = now;
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
    // Native date inputs already open their own picker when tapped.
    // Do not attach a second showPicker to input clicks: it can double-open
    // or immediately close the popup on some mobile browsers.
  });
})();
