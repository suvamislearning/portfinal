/* ==========================================================================
   NOAH - MODALS & TOAST NOTIFICATIONS
   Hire Me Modal, Resume Preview & Download, and Notification Toasts
   ========================================================================== */

function showToast(message, icon = '✓') {
  let toast = document.querySelector('.toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span style="color: var(--accent-orange); font-size: 18px;">${icon}</span> <span>${message}</span>`;
  toast.classList.add('show');

  // Trigger sound effect if audio is on
  if (window.soundFx) {
    window.soundFx.playToast();
  }

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

document.addEventListener('DOMContentLoaded', () => {
  // Modal Elements
  const hireModal = document.getElementById('modal-hire');
  const resumeModal = document.getElementById('modal-resume');
  const btnHire = document.getElementById('btn-hire-me');
  const btnResume = document.getElementById('btn-download-resume');
  const btnContactMail = document.getElementById('btn-contact-mail');
  const closeButtons = document.querySelectorAll('.modal-close-btn, .modal-backdrop');

  // Open Hire Modal
  if (btnHire && hireModal) {
    btnHire.addEventListener('click', (e) => {
      e.preventDefault();
      hireModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (window.soundFx) window.soundFx.playClick();
    });
  }

  // Open Resume Modal
  if (btnResume && resumeModal) {
    btnResume.addEventListener('click', (e) => {
      e.preventDefault();
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (window.soundFx) window.soundFx.playClick();
    });
  }

  // Close modals on click outside container
  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modals on close button click
  document.querySelectorAll('.modal-close-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Escape key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.active').forEach((modal) => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = '';
    }
  });

  // Quick Mail Button copies address & notifies
  if (btnContactMail) {
    btnContactMail.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'suvamislearning@gmail.com';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard!`);
        });
      } else {
        showToast(`Contact: ${email}`);
      }
    });
  }

  // Handle Hire Me Form Submission
  const hireForm = document.getElementById('form-hire-modal');
  if (hireForm) {
    hireForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const clientName = document.getElementById('hire-name')?.value || 'Friend';
      showToast(`Thank you ${clientName}! Noah will get back to you within 24 hours.`, '🚀');
      hireForm.reset();
      setTimeout(() => {
        hireModal.classList.remove('active');
        document.body.style.overflow = '';
      }, 1000);
    });
  }

  // Handle Resume Print/Download Trigger
  const btnPrintResume = document.getElementById('btn-print-resume');
  if (btnPrintResume) {
    btnPrintResume.addEventListener('click', () => {
      showToast('Preparing Noah\'s Resume for printing / PDF download...', '📄');
      setTimeout(() => {
        window.print();
      }, 600);
    });
  }
});
