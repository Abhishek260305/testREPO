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
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
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
