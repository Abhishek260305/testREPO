// Smooth scroll for nav links and login/signup button
const navLinks = document.querySelectorAll('.nav-links a, .btn-login, .btn-cta, .btn-card');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Highlight active section in navbar
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  let minDistance = Infinity;
  const viewportMiddle = window.innerHeight / 2;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionMiddle = rect.top + rect.height / 2;
    const distance = Math.abs(sectionMiddle - viewportMiddle);
    if (distance < minDistance) {
      minDistance = distance;
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
  // Update URL fragment for all main sections
  if (current) {
    if (window.location.hash !== `#${current}`) {
      history.replaceState(null, '', `#${current}`);
    }
  }
});

// Optional: Add 'active' class styling in CSS for .nav-links a.active

// Login logic
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const storedEmail = sessionStorage.getItem('signupEmail');
    const storedPassword = sessionStorage.getItem('signupPassword');
    if (email === storedEmail && password === storedPassword) {
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid credentials. Please try again or sign up.');
    }
  });
}
