document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
      });
  });
});

// Hamburger menu toggle
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// Create particle effect
function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.classList.add('sparkle');
  particle.innerHTML = '✨';
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  particle.style.animationDelay = `${Math.random() * 2}s`;
  document.querySelector('.particles').appendChild(particle);
  setTimeout(() => particle.remove(), 6000);
}

// Reveal animation on scroll for sections with particles
const revealElements = () => {
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              const rect = entry.target.getBoundingClientRect();
              for (let i = 0; i < 5; i++) {
                const x = rect.left + Math.random() * rect.width;
                const y = rect.top + Math.random() * rect.height;
                createParticle(x, y);
              }
          }
      });
  }, { threshold: 0.2 });

  sections.forEach(section => {
      observer.observe(section);
  });
};

// Reveal animation for cards and images with scale effect
const revealItems = (elements, className) => {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add(className);
              entry.target.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
              entry.target.style.transform = 'scale(1.05)';
              setTimeout(() => {
                  entry.target.style.transform = 'scale(1)';
              }, 500);
          }
      });
  }, { threshold: 0.2 });

  elements.forEach(element => {
      observer.observe(element);
  });
};

// Add scroll event for continuous particle effects
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  if (Math.abs(currentScrollY - lastScrollY) > 50) {
    const x = Math.random() * window.innerWidth;
    const y = window.scrollY + Math.random() * window.innerHeight;
    createParticle(x, y);
    lastScrollY = currentScrollY;
  }
});

// Animate sound effects on scroll
const animateSoundEffects = () => {
  const soundEffects = document.querySelectorAll('.sound-effect');
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
              entry.target.style.transform = 'scale(1.2) rotate(-20deg)';
              entry.target.style.opacity = '1';
              setTimeout(() => {
                  entry.target.style.transform = 'scale(1) rotate(-15deg)';
              }, 300);
          }
      });
  }, { threshold: 0.5 });

  soundEffects.forEach(effect => {
      observer.observe(effect);
  });
};

// Initialize animations
revealElements();
revealItems(document.querySelectorAll('.detail-card'), 'visible');
revealItems(document.querySelectorAll('.story-image'), 'visible');
revealItems(document.querySelectorAll('.tokenomics-item'), 'visible');
revealItems(document.querySelectorAll('.activity'), 'visible');
revealItems(document.querySelectorAll('.roadmap-item'), 'visible');
animateSoundEffects();