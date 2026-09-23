/* ==========================================================================
   NOAH - HERO ORBIT PHYSICS & PARALLAX
   Interactive 3D tilt, orbital motion, and cursor responsiveness
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.querySelector('.hero-section');
  const character = document.querySelector('.character-img');
  const testimonialCard = document.querySelector('.testimonial-card-hero');

  if (!heroSection) return;

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  const canUseParallax = window.matchMedia('(pointer: fine)').matches;

  if (canUseParallax) {
    // Track cursor relative to screen center
    window.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      mouseY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    }, { passive: true });

    // Smooth lerp rendering loop
    function renderParallax() {
      targetX += (mouseX - targetX) * 0.06;
      targetY += (mouseY - targetY) * 0.06;

      // 3D character tilt and translation
      if (character) {
        const rotY = targetX * 12;
        const rotX = -targetY * 10;
        const transX = targetX * 18;
        const transY = targetY * 14;
        character.style.transform = `translate3d(${transX}px, ${transY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }

      requestAnimationFrame(renderParallax);
    }
    requestAnimationFrame(renderParallax);
  }

  // 3D Card Tilt Effect on Testimonial Card
  if (testimonialCard) {
    testimonialCard.addEventListener('mousemove', (e) => {
      const rect = testimonialCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      testimonialCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    testimonialCard.addEventListener('mouseleave', () => {
      testimonialCard.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  }
});
