/* ==========================================================================
   NOAH - HERO ORBIT PHYSICS & PARALLAX
   Interactive 3D tilt, orbital motion, and cursor responsiveness
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.querySelector('.hero-section');
  const character = document.querySelector('.character-img');
  const orbitSystem = document.querySelector('.orbit-system');
  const badges = document.querySelectorAll('.floating-badge');
  const testimonialCard = document.querySelector('.testimonial-card-hero');
  const shardTop = document.querySelector('.lightning-shard-top');
  const shardBottom = document.querySelector('.lightning-shard-bottom');

  if (!heroSection) return;

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  // Track cursor relative to screen center
  window.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    mouseX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
    mouseY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
  });

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

    // Orbit rings subtle skew/depth
    if (orbitSystem) {
      const orbitX = targetX * -10;
      const orbitY = targetY * -10;
      orbitSystem.style.transform = `translate(calc(-50% + ${orbitX}px), calc(-50% + ${orbitY}px)) rotateX(${targetY * 8}deg) rotateY(${targetX * 8}deg)`;
    }

    // Shards depth
    if (shardTop) {
      shardTop.style.transform = `translate3d(${targetX * -25}px, ${targetY * -20}px, 0) rotate(${targetX * 5}deg)`;
    }
    if (shardBottom) {
      shardBottom.style.transform = `translate3d(${targetX * 15}px, ${targetY * 15}px, 0) rotate(${targetY * -4}deg)`;
    }

    // Floating badges subtle dynamic counter-movement
    badges.forEach((badge, index) => {
      const factor = (index + 1) * 6;
      const bx = targetX * factor;
      const by = targetY * factor;
      badge.style.transform = `translate3d(${bx}px, ${by}px, 0)`;
    });

    requestAnimationFrame(renderParallax);
  }
  requestAnimationFrame(renderParallax);

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
