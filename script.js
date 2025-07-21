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
  if (typeof mixpanel !== 'undefined') {
    mixpanel.track('page_loaded', { page: window.location.pathname });
  }
  const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
  if (typeof amplitude !== 'undefined') {
    amplitude.logEvent('page_loaded', {
      page: window.location.pathname,
      load_time_ms: loadTime,
      device: navigator.userAgent,
      os: navigator.platform
    });
  }
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track('page_loaded', { page: window.location.pathname });
  }
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track('page_loaded', {
      page: window.location.pathname,
      load_time_ms: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
      device: navigator.userAgent,
      os: navigator.platform
    });
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
        if (typeof mixpanel !== 'undefined') {
          mixpanel.track('section_navigation', { section: href });
        }
        if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
          thriveStack.track('section_navigation', { section: href });
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
    if (typeof mixpanel !== 'undefined' && lastTrackedSection !== current) {
      mixpanel.track('section_viewed', { section: current });
    }
    if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function' && lastTrackedSection !== current) {
      thriveStack.track('section_viewed', { section: current });
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
      if (typeof mixpanel !== 'undefined') {
        mixpanel.track('login_success', { email });
      }
      if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
        thriveStack.track('login_success', { email });
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
      if (typeof mixpanel !== 'undefined') {
        mixpanel.track('login_failed', { email });
      }
      if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
        thriveStack.track('login_failed', { email });
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
    if (typeof mixpanel !== 'undefined') {
      mixpanel.track('video_like', { label: 'Like Clicked' });
    }
    if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
      thriveStack.track('video_like', { label: 'Like Clicked' });
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
    if (typeof mixpanel !== 'undefined') {
      mixpanel.track('video_dislike', { label: 'Dislike Clicked' });
    }
    if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
      thriveStack.track('video_dislike', { label: 'Dislike Clicked' });
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
    if (typeof mixpanel !== 'undefined') {
      mixpanel.track('video_play', { label: 'Play Clicked' });
    }
    if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
      thriveStack.track('video_play', { label: 'Play Clicked' });
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
    if (typeof mixpanel !== 'undefined') {
      mixpanel.track('video_pause', { label: 'Pause Clicked' });
    }
    if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
      thriveStack.track('video_pause', { label: 'Pause Clicked' });
    }
  })
);

let sectionStartTime = {};
let currentSection = null;

window.addEventListener('scroll', () => {
  let minDistance = Infinity;
  let newSection = '';
  const viewportMiddle = window.innerHeight / 2;
  document.querySelectorAll('section').forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionMiddle = rect.top + rect.height / 2;
    const distance = Math.abs(sectionMiddle - viewportMiddle);
    if (distance < minDistance) {
      minDistance = distance;
      newSection = section.getAttribute('id');
    }
  });

  if (newSection !== currentSection) {
    // End previous section
    if (currentSection && sectionStartTime[currentSection]) {
      const duration = Date.now() - sectionStartTime[currentSection];
      if (typeof mixpanel !== 'undefined') {
        mixpanel.track('section_time_spent', { section: currentSection, duration_ms: duration });
      }
      if (typeof amplitude !== 'undefined') {
        amplitude.logEvent('section_time_spent', { section: currentSection, duration_ms: duration });
      }
      if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
        thriveStack.track('section_time_spent', { section: currentSection, duration_ms: duration });
      }
    }
    // Start new section
    sectionStartTime[newSection] = Date.now();
    currentSection = newSection;
  }
});

let sessionStart = Date.now();
window.addEventListener('beforeunload', () => {
  const duration = Date.now() - sessionStart;
  if (typeof mixpanel !== 'undefined') {
    mixpanel.track('session_end', { duration_ms: duration });
  }
  if (typeof amplitude !== 'undefined') {
    amplitude.logEvent('session_end', { duration_ms: duration });
  }
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track('session_end', { duration_ms: duration });
  }
});

function getUTMParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign')
  };
}
const utms = getUTMParams();
if (typeof amplitude !== 'undefined' && utms.utm_source) {
  amplitude.setUserProperties(utms);
}
if (typeof thriveStack !== 'undefined' && utms.utm_source) {
  setThriveStackUserProperties(utms);
}

// ---------- ThriveStack Cleaned and Fixed with Scroll Tracking Context Fix ----------
function getCurrentUserId() {
  return sessionStorage.getItem("signupEmail") || "anonymous_user";
}

function getCurrentAccountId() {
  return sessionStorage.getItem("accountId") || "default_account";
}

function getDeviceId() {
  let id = localStorage.getItem("device_id");
  if (!id) {
    id = 'dev_' + crypto.randomUUID();
    localStorage.setItem("device_id", id);
  }
  return id;
}

function setThriveStackUserProperties(properties) {
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.setUserProperties === 'function') {
    thriveStack.setUserProperties(properties);
  }
}

function trackFeatureAndThriveStack(feature, userRole) {
  const userId = getCurrentUserId();
  const accountId = getCurrentAccountId();

  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track([
      {
        event_name: 'feature_used',
        properties: {
          feature_name: feature,
          user_role: userRole
        },
        user_id: userId,
        timestamp: new Date().toISOString(),
        context: {
          group_id: accountId
        }
      }
    ]); // Always batch format
  }
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    if (!inThrottle) {
      func.apply(this, arguments);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Attach scroll listener with throttle
document.addEventListener('scroll', throttle(trackScrollDepth, 500));

document.querySelectorAll('.btn-feature').forEach(btn => {
  btn.addEventListener('click', e => {
    if (!e.target.dataset.feature) return;
    const feature = e.target.dataset.feature || 'unknown_feature';
    const userRole = e.target.dataset.role || 'guest';
    trackFeatureAndThriveStack(feature, userRole);
  });
});

// Optional: track user properties safely if defined
if (typeof genre !== 'undefined' && typeof actor !== 'undefined' && typeof country !== 'undefined') {
  setThriveStackUserProperties({
    favorite_genre: genre,
    favorite_actor: actor,
    preferred_country: country
  });
}

function trackError(errorType, errorMessage) {
  if (typeof amplitude !== 'undefined') {
    amplitude.logEvent('error_event', {
      error_type: errorType,
      error_message: errorMessage,
      page: window.location.pathname
    });
  }
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    const userId = getCurrentUserId();
    const accountId = getCurrentAccountId();
    thriveStack.track([
      {
        event_name: 'error_event',
        properties: {
          error_type: errorType,
          error_message: errorMessage,
          page: window.location.pathname
        },
        user_id: userId,
        timestamp: new Date().toISOString(),
        context: accountId ? { group_id: accountId } : undefined
      }
    ]);
  }
}
// Example usage:
trackError('signup_failed', 'Email already exists');

function trackCrash(errorType) {
  if (typeof amplitude !== 'undefined') {
    console.log("Hi")
    amplitude.logEvent('crash_event', {
      error_type: errorType,
      device: navigator.userAgent,
      os: navigator.platform
    });
  }
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    const userId = getCurrentUserId();
    const accountId = getCurrentAccountId();
    thriveStack.track([
      {
        event_name: 'crash_event',
        properties: {
          error_type: errorType,
          device: navigator.userAgent,
          os: navigator.platform
        },
        user_id: userId,
        timestamp: new Date().toISOString(),
        context: accountId ? { group_id: accountId } : undefined
      }
    ]);
  }
}

function trackSupportTicket(page, feature) {
  if (typeof amplitude !== 'undefined') {
    amplitude.logEvent('support_ticket_created', { page, feature });
  }
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    const userId = getCurrentUserId();
    const accountId = getCurrentAccountId();
    thriveStack.track([
      {
        event_name: 'support_ticket_created',
        properties: { page, feature },
        user_id: userId,
        timestamp: new Date().toISOString(),
        context: accountId ? { group_id: accountId } : undefined
      }
    ]);
  }
}

console.log("Debug")

// Scroll depth tracking with batch format for ThriveStack
let maxScrollDepth = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight > 0) {
    const percent = Math.round((scrollTop / docHeight) * 100);
    if (percent > maxScrollDepth) {
      maxScrollDepth = percent;
      [25, 50, 75, 100].forEach(threshold => {
        if (percent >= threshold && !window[`amplitude_scroll_${threshold}`]) {
          window[`amplitude_scroll_${threshold}`] = true;
          if (typeof amplitude !== 'undefined') {
            amplitude.logEvent('scroll_depth', { percent: threshold, page: window.location.pathname });
          }
          if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
            const userId = getCurrentUserId();
            const accountId = getCurrentAccountId();
            thriveStack.track([
              {
                event_name: 'scroll_depth',
                properties: { percent: threshold, page: window.location.pathname },
                user_id: userId,
                timestamp: new Date().toISOString(),
                context: accountId ? { group_id: accountId } : undefined
              }
            ]);
          }
        }
      });
    }
  }
});

// ---------- Onboarding Event Tracking for Amplitude ----------
function trackOnboardingStart() {
  if (typeof amplitude !== 'undefined') {
    amplitude.logEvent('onboarding_start');
  }
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track('onboarding_start');
  }
}

function trackOnboardingStep(stepName) {
  if (typeof amplitude !== 'undefined') {
    amplitude.logEvent('onboarding_step', { step_name: stepName });
  }
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track('onboarding_step', { step_name: stepName });
  }
}

function trackOnboardingComplete() {
  if (typeof amplitude !== 'undefined') {
    amplitude.logEvent('onboarding_complete');
  }
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track('onboarding_complete');
  }
}

function trackOnboardingSkip() {
  if (typeof amplitude !== 'undefined') {
    amplitude.logEvent('onboarding_skip');
  }
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track('onboarding_skip');
  }
}
// Example usage:
// trackOnboardingStep('profile_setup');
// trackOnboardingStep('choose_plan');
// trackOnboardingStep('add_payment');
// trackOnboardingComplete();

// ---------- ThriveStack Event Tracking ----------
function trackThriveStackEvent(event, props) {
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track(event, props);
  }
}
function setThriveStackUserProperties(props) {
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.setUserProperties === 'function') {
    thriveStack.setUserProperties(props);
  }
}
// Example: Replace amplitude.logEvent('event', { ... }) with trackThriveStackEvent('event', { ... })
// Example: Replace amplitude.setUserProperties({ ... }) with setThriveStackUserProperties({ ... })

// Add ThriveStack calls alongside Amplitude for all tracked events:
// Page load
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
  if (typeof mixpanel !== 'undefined') {
    mixpanel.track('page_loaded', { page: window.location.pathname });
  }
  const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
  if (typeof amplitude !== 'undefined') {
    amplitude.logEvent('page_loaded', {
      page: window.location.pathname,
      load_time_ms: loadTime,
      device: navigator.userAgent,
      os: navigator.platform
    });
  }
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track('page_loaded', { page: window.location.pathname });
  }
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track('page_loaded', {
      page: window.location.pathname,
      load_time_ms: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
      device: navigator.userAgent,
      os: navigator.platform
    });
  }
});
// Section navigation
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
        if (typeof mixpanel !== 'undefined') {
          mixpanel.track('section_navigation', { section: href });
        }
        if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
          thriveStack.track('section_navigation', { section: href });
        }
      }
    }
  });
});
// Section viewed
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
    if (typeof mixpanel !== 'undefined' && lastTrackedSection !== current) {
      mixpanel.track('section_viewed', { section: current });
    }
    if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function' && lastTrackedSection !== current) {
      thriveStack.track('section_viewed', { section: current });
    }
    lastTrackedSection = current;
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm'); // Ensure this ID exists in your HTML

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
        if (typeof mixpanel !== 'undefined') {
          mixpanel.track('login_success', { email });
        }
        if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
          thriveStack.track([{ event: 'login_success', properties: { email } }]); // Batch format!
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
        if (typeof mixpanel !== 'undefined') {
          mixpanel.track('login_failed', { email });
        }
        if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
          thriveStack.track([{ event: 'login_failed', properties: { email } }]); // Batch format!
        }
        alert('Invalid credentials. Please try again or sign up.');
      }
    });
  }

  // Like/Dislike/Play/Pause
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
      if (typeof mixpanel !== 'undefined') {
        mixpanel.track('video_like', { label: 'Like Clicked' });
      }
      if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
        thriveStack.track([{ event: 'video_like', properties: { label: 'Like Clicked' } }]); // Batch format!
      }
    })
  );
});
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
    if (typeof mixpanel !== 'undefined') {
      mixpanel.track('video_dislike', { label: 'Dislike Clicked' });
    }
    if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
      thriveStack.track('video_dislike', { label: 'Dislike Clicked' });
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
    if (typeof mixpanel !== 'undefined') {
      mixpanel.track('video_play', { label: 'Play Clicked' });
    }
    if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
      thriveStack.track('video_play', { label: 'Play Clicked' });
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
    if (typeof mixpanel !== 'undefined') {
      mixpanel.track('video_pause', { label: 'Pause Clicked' });
    }
    if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
      thriveStack.track('video_pause', { label: 'Pause Clicked' });
    }
  })
);
// Section time spent
window.addEventListener('scroll', () => {
  let minDistance = Infinity;
  let newSection = '';
  const viewportMiddle = window.innerHeight / 2;
  document.querySelectorAll('section').forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionMiddle = rect.top + rect.height / 2;
    const distance = Math.abs(sectionMiddle - viewportMiddle);
    if (distance < minDistance) {
      minDistance = distance;
      newSection = section.getAttribute('id');
    }
  });

  if (newSection !== currentSection) {
    // End previous section
    if (currentSection && sectionStartTime[currentSection]) {
      const duration = Date.now() - sectionStartTime[currentSection];
      if (typeof mixpanel !== 'undefined') {
        mixpanel.track('section_time_spent', { section: currentSection, duration_ms: duration });
      }
      if (typeof amplitude !== 'undefined') {
        amplitude.logEvent('section_time_spent', { section: currentSection, duration_ms: duration });
      }
      if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
        thriveStack.track('section_time_spent', { section: currentSection, duration_ms: duration });
      }
    }
    // Start new section
    sectionStartTime[newSection] = Date.now();
    currentSection = newSection;
  }
});
// Session end
window.addEventListener('beforeunload', () => {
  const duration = Date.now() - sessionStart;
  if (typeof mixpanel !== 'undefined') {
    mixpanel.track('session_end', { duration_ms: duration });
  }
  if (typeof amplitude !== 'undefined') {
    amplitude.logEvent('session_end', { duration_ms: duration });
  }
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track('session_end', { duration_ms: duration });
  }
});
// UTM properties
setThriveStackUserProperties(utms);
// CTA click
document.querySelectorAll('.btn-cta').forEach(btn => {
  btn.addEventListener('click', () => {
    if (typeof amplitude !== 'undefined') {
      amplitude.logEvent('cta_click', { location: window.location.pathname });
    }
    if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
      thriveStack.track('cta_click', { location: window.location.pathname });
    }
  });
});
// Content click
document.querySelectorAll('.poster').forEach(el => {
  el.addEventListener('click', () => {
    amplitude.logEvent('content_click', { content_type: 'poster' });
    if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
      thriveStack.track('content_click', { content_type: 'poster' });
    }
  });
});
document.querySelectorAll('.trailer').forEach(el => {
  el.addEventListener('click', () => {
    amplitude.logEvent('content_click', { content_type: 'trailer' });
    if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
      thriveStack.track('content_click', { content_type: 'trailer' });
    }
  });
});
// Feature use
trackFeatureAndThriveStack('watch_trailer', 'user');
trackFeatureAndThriveStack('add_to_watchlist', 'user');
// Error/Crash/Support
trackError('signup_failed', 'Email already exists');
trackCrash('signup_failed');
trackSupportTicket('signup_page', 'signup_failed');
// Onboarding events
trackOnboardingStart();
trackOnboardingStep('profile_setup');
trackOnboardingStep('choose_plan');
trackOnboardingStep('add_payment');
trackOnboardingComplete();
trackOnboardingSkip();
// Onboarding user properties
if (typeof genre !== 'undefined' && typeof actor !== 'undefined' && typeof country !== 'undefined') {
  setThriveStackUserProperties({ favorite_genre: genre, favorite_actor: actor, preferred_country: country });
}
// ---------- ThriveStack Advanced Event Tracking ----------
function trackThriveStackAccountAddedUser({ accountName, userEmail, userId, accountId }) {
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track([
      {
        event_name: 'account_added_user',
        properties: {
          account_name: accountName,
          user_email: userEmail
        },
        user_id: userId,
        timestamp: new Date().toISOString(),
        context: {
          group_id: accountId
        }
      }
    ]);
  }
}

function trackThriveStackFeatureUsed({ featureName, userRole, userId, accountId }) {
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track([
      {
        event_name: 'feature_used',
        properties: {
          feature_name: featureName,
          user_role: userRole
        },
        user_id: userId,
        timestamp: new Date().toISOString(),
        context: {
          group_id: accountId
        }
      }
    ]);
  }
}

function trackThriveStackInviteSent({ featureName, inviteeEmail, inviteeRole, inviteeRoleId, inviteeTeamId, inviteeTeam, inviteeUserId, subFeatureName, sourceUrl, userId, accountId }) {
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track([
      {
        event_name: 'invite_sent',
        properties: {
          feature_name: featureName,
          invitee_email: inviteeEmail,
          invitee_role: inviteeRole,
          invitee_role_id: inviteeRoleId,
          invitee_team_id: inviteeTeamId,
          invitee_team: inviteeTeam,
          invitee_user_id: inviteeUserId,
          sub_feature_name: subFeatureName,
          source_url: sourceUrl
        },
        user_id: userId,
        timestamp: new Date().toISOString(),
        context: {
          group_id: accountId
        }
      }
    ]);
  }
}
// Example usage:
// trackThriveStackAccountAddedUser({ accountName: 'Acme', userEmail: 'john.doe@acme.xyz', userId: '18f716ac-37a4-464f-adb7-3cc30032308c', accountId: 'ac8db7ba-5139-4911-ba6e-523fd9c4704b' });
// trackThriveStackFeatureUsed({ featureName: 'export_report', userRole: 'admin', userId: '18f716ac-37a4-464f-adb7-3cc30032308c', accountId: 'ac8db7ba-5139-4911-ba6e-523fd9c4704b' });
// trackThriveStackInviteSent({ featureName: 'report', inviteeEmail: 'jane.doe@acme.xyz', inviteeRole: 'Admin', inviteeRoleId: 'ADMIN', inviteeTeamId: '6d56db83-509d-4764-a929-ab886ff929e0', inviteeTeam: 'Finance Team', inviteeUserId: 'ed1adb3a-9772-48ef-b620-e5e6d438fb82', subFeatureName: 'export_report', sourceUrl: 'https://yourDomainName.com/dashboard', userId: '18f716ac-37a4-464f-adb7-3cc30032308c', accountId: 'ac8db7ba-5139-4911-ba6e-523fd9c4704b' });

// ---------- ThriveStack Batch Event Tracking (Fixed) ----------
function getUserContext() {
  // Replace with your actual user/device ID logic
  return {
    user_id: sessionStorage.getItem('signupEmail') || 'anonymous_user',
    device_id: localStorage.getItem('device_id') || 'anonymous_device_' + Math.random().toString(36).substring(2),
  };
}

function trackScrollDepth(scrollDepth) {
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track([
      {
        event_name: 'scroll_depth',
        properties: {
          percent: scrollDepth,
        },
        context: getUserContext(),
      },
    ]);
  }
}

function trackOnboardingStart() {
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track([
      {
        event_name: 'onboarding_start',
        properties: {},
        context: getUserContext(),
      },
    ]);
  }
}

function trackOnboardingStep(stepNumber) {
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track([
      {
        event_name: 'onboarding_step',
        properties: {
          step: stepNumber,
        },
        context: getUserContext(),
      },
    ]);
  }
}

function trackOnboardingComplete() {
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track([
      {
        event_name: 'onboarding_complete',
        properties: {},
        context: getUserContext(),
      },
    ]);
  }
}

function trackOnboardingSkip() {
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track([
      {
        event_name: 'onboarding_skip',
        properties: {},
        context: getUserContext(),
      },
    ]);
  }
}

// Usage example: attach to scroll listener
window.addEventListener('scroll', function () {
  const scrollPercent =
    (window.scrollY + window.innerHeight) / document.body.scrollHeight;
  trackScrollDepth(Math.round(scrollPercent * 100));
});

// Usage example: onboarding flow (call these at appropriate times)
// trackOnboardingStart();
// trackOnboardingStep(1);
// trackOnboardingStep(2);
// trackOnboardingComplete();
// trackOnboardingSkip(); // Uncomment if skip is triggered

// ---------- ThriveStack Safe Batch Event Tracking ----------
function getUserContext() {
  return {
    user_id: sessionStorage.getItem('signupEmail') || 'anonymous_user',
    device_id: localStorage.getItem('device_id') || 'anonymous_device_' + Math.random().toString(36).substring(2),
  };
}

function safeTrack(events) {
  if (!Array.isArray(events)) {
    console.error('thriveStack.track expected an array, got:', events);
    return;
  }
  if (typeof thriveStack !== 'undefined' && typeof thriveStack.track === 'function') {
    thriveStack.track(events);
  }
}

function trackFeatureAndThriveStack(feature, userRole) {
  safeTrack([
    {
      event_name: 'feature_used',
      properties: {
        feature_name: feature,
        user_role: userRole
      },
      context: getUserContext(),
    },
  ]);
}

// Only keep feature tracking
const featureButtons = document.querySelectorAll('[data-feature]');
featureButtons.forEach(button => {
  button.addEventListener('click', () => {
    const feature = button.getAttribute('data-feature');
    const userRole = button.getAttribute('data-role') || 'guest';
    if (feature) trackFeatureAndThriveStack(feature, userRole);
  });
});

// Example: Fix other thriveStack.track calls (login, video_like, etc.)
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const storedEmail = sessionStorage.getItem('signupEmail');
      const storedPassword = sessionStorage.getItem('signupPassword');
      if (email === storedEmail && password === storedPassword) {
        safeTrack([{ event_name: 'login_success', properties: { email } }]);
        window.location.href = 'dashboard.html';
      } else {
        safeTrack([{ event_name: 'login_failed', properties: { email } }]);
        alert('Invalid credentials. Please try again or sign up.');
      }
    });
  }
  document.querySelectorAll('.btn-like').forEach(btn =>
    btn.addEventListener('click', () => {
      safeTrack([{ event_name: 'video_like', properties: { label: 'Like Clicked' } }]);
    })
  );
  document.querySelectorAll('.btn-dislike').forEach(btn =>
    btn.addEventListener('click', () => {
      safeTrack([{ event_name: 'video_dislike', properties: { label: 'Dislike Clicked' } }]);
    })
  );
  document.querySelectorAll('.btn-play').forEach(btn =>
    btn.addEventListener('click', () => {
      safeTrack([{ event_name: 'video_play', properties: { label: 'Play Clicked' } }]);
    })
  );
  document.querySelectorAll('.btn-pause').forEach(btn =>
    btn.addEventListener('click', () => {
      safeTrack([{ event_name: 'video_pause', properties: { label: 'Pause Clicked' } }]);
    })
  );
});
