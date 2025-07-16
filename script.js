// ---------- Google Analytics Page Load Tracking ----------
window.addEventListener('load', () => {
  if (typeof gtag === 'function') {
    gtag('event', 'page_loaded', {
      event_category: 'Page',
      event_label: window.location.pathname
    });
  }
  if (typeof amplitude !== 'undefined') {
    amplitude.logEvent('page_loaded', { page: window.location.pathname });
  }
});

// ---------- Smooth scroll for nav links and login/signup button ----------
const navLinks = document.querySelectorAll('.nav-links a, .btn-login, .btn-cta, .btn-card');
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });

        // Track navigation click
        if (typeof gtag === 'function') {
          gtag('event', 'section_navigation', {
            event_category: 'Navigation',
            event_label: href
          });
        }
        if (typeof amplitude !== 'undefined') {
          amplitude.logEvent('section_navigation', { section: href });
        }
      }
    }
  });
});

// ---------- Highlight active section in navbar ----------
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');
let lastTrackedSection = null;

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

  if (current && window.location.hash !== `#${current}`) {
    history.replaceState(null, '', `#${current}`);

    // Track section view only if changed
    if (typeof gtag === 'function' && lastTrackedSection !== current) {
      gtag('event', 'section_viewed', {
        event_category: 'Scroll',
        event_label: current
      });
    }
    if (typeof amplitude !== 'undefined' && lastTrackedSection !== current) {
      amplitude.logEvent('section_viewed', { section: current });
    }
    lastTrackedSection = current;
  }
});

// ---------- Login logic ----------
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const storedEmail = sessionStorage.getItem('signupEmail');
    const storedPassword = sessionStorage.getItem('signupPassword');

    if (email === storedEmail && password === storedPassword) {
      // Track login success
      if (typeof gtag === 'function') {
        gtag('event', 'login_success', {
          event_category: 'Authentication',
          event_label: email
        });
      }
      if (typeof amplitude !== 'undefined') {
        amplitude.logEvent('login_success', { email });
      }
      window.location.href = 'dashboard.html';
    } else {
      // Track login failure
      if (typeof gtag === 'function') {
        gtag('event', 'login_failed', {
          event_category: 'Authentication',
          event_label: email
        });
      }
      if (typeof amplitude !== 'undefined') {
        amplitude.logEvent('login_failed', { email });
      }
      alert('Invalid credentials. Please try again or sign up.');
    }
  });
}

// ---------- Optional: Like / Dislike / Play / Pause Button Handlers ----------
document.querySelectorAll('.btn-like').forEach(btn =>
  btn.addEventListener('click', () => {
    if (typeof gtag === 'function') {
      gtag('event', 'video_like', {
        event_category: 'Video',
        event_label: 'Like Clicked'
      });
    }
    if (typeof amplitude !== 'undefined') {
      amplitude.logEvent('video_like', { label: 'Like Clicked' });
    }
  })
);

document.querySelectorAll('.btn-dislike').forEach(btn =>
  btn.addEventListener('click', () => {
    if (typeof gtag === 'function') {
      gtag('event', 'video_dislike', {
        event_category: 'Video',
        event_label: 'Dislike Clicked'
      });
    }
    if (typeof amplitude !== 'undefined') {
      amplitude.logEvent('video_dislike', { label: 'Dislike Clicked' });
    }
  })
);

document.querySelectorAll('.btn-play').forEach(btn =>
  btn.addEventListener('click', () => {
    if (typeof gtag === 'function') {
      gtag('event', 'video_play', {
        event_category: 'Video',
        event_label: 'Play Clicked'
      });
    }
    if (typeof amplitude !== 'undefined') {
      amplitude.logEvent('video_play', { label: 'Play Clicked' });
    }
  })
);

document.querySelectorAll('.btn-pause').forEach(btn =>
  btn.addEventListener('click', () => {
    if (typeof gtag === 'function') {
      gtag('event', 'video_pause', {
        event_category: 'Video',
        event_label: 'Pause Clicked'
      });
    }
    if (typeof amplitude !== 'undefined') {
      amplitude.logEvent('video_pause', { label: 'Pause Clicked' });
    }
  })
);
