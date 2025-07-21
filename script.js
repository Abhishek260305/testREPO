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
    lastTrackedSection = current;
    if (window.thriveStack?.track) {
            window.thriveStack.track([{
              event_name: "feature_used",
              properties: {
                feature_name: "scroll_depth",
                scroll_percentage: threshold,
                page: window.location.pathname
              },
              user_id: localStorage.getItem('userId') || 'anonymous',
              timestamp: new Date().toISOString(),
              context: {
                group_id: localStorage.getItem('accountId') || 'unassigned'
              }
            }]);
          }
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
    console.log("like")
    if (typeof amplitude !== 'undefined') {
      amplitude.logEvent('video_like', { label: 'Like Clicked' });
    }
    if (typeof mixpanel !== 'undefined') {
      mixpanel.track('video_like', { label: 'Like Clicked' });
    }
    console.log("like")
    if (window.thriveStack?.track) {
      const videoId = btn.closest('.video-item')?.dataset.id || 'unknown';
      window.thriveStack.track([{
        event_name: "feature_used",
        properties: {
          feature_name: "content_like",
          content_id: videoId,
          content_type: "movie" // or "tv_show" if applicable
        },
        user_id: localStorage.getItem('userId') || 'anonymous',
        timestamp: new Date().toISOString(),
        context: {
          group_id: localStorage.getItem('accountId') || 'unassigned'
        }
      }]);
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
    if (window.thriveStack?.track) {
      window.thriveStack.track([{
        event_name: "feature_used",
        properties: {
          feature_name: "content_dislike",
          content_id: btn.closest('.video-item')?.dataset.id || 'unknown'
        },
        // ... same user/account IDs as above ...
      }]);
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
    if (window.thriveStack?.track) {
      const userId = localStorage.getItem('userId') || 'anonymous';
      const accountId = localStorage.getItem('accountId') || 'unassigned';
      
      window.thriveStack.track([{
        event_name: "feature_used",
        properties: {
          feature_name: "video_play",
          content_id: btn.closest('.video-container')?.dataset.videoId || 'unknown',
          user_role: localStorage.getItem('userTier') || 'guest'
        },
        user_id: userId,
        timestamp: new Date().toISOString(),
        context: {
          group_id: accountId
        }
      }]);
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
    if (window.thriveStack?.track) {
      window.thriveStack.track([{
        event_name: "feature_used",
        properties: {
          feature_name: "video_pause",
          content_id: btn.closest('.video-container')?.dataset.videoId || 'unknown'
        },
        user_id: localStorage.getItem('userId') || 'anonymous',
        timestamp: new Date().toISOString(),
        context: {
          group_id: localStorage.getItem('accountId') || 'unassigned'
        }
      }]);
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

document.querySelectorAll('.btn-cta').forEach(btn => {
  btn.addEventListener('click', () => {
    if (typeof amplitude !== 'undefined') {
      amplitude.logEvent('cta_click', { location: window.location.pathname });
    }
  });
});

document.querySelectorAll('.poster').forEach(el => {
  el.addEventListener('click', () => {
    amplitude.logEvent('content_click', { content_type: 'poster' });
  });
});
document.querySelectorAll('.trailer').forEach(el => {
  el.addEventListener('click', () => {
    amplitude.logEvent('content_click', { content_type: 'trailer' });
  });
});

function trackFeatureUse(feature) {
  if (typeof amplitude !== 'undefined') {
    amplitude.logEvent('feature_used', { feature_name: feature });
  }
}
// Example usage:
trackFeatureUse('watch_trailer');
trackFeatureUse('add_to_watchlist');

function trackError(errorType, errorMessage) {
  if (typeof amplitude !== 'undefined') {
    amplitude.logEvent('error_event', {
      error_type: errorType,
      error_message: errorMessage,
      page: window.location.pathname
    });
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
}

function trackSupportTicket(page, feature) {
  if (typeof amplitude !== 'undefined') {
    amplitude.logEvent('support_ticket_created', { page, feature });
  }
}

console.log("Debug")

let maxScrollDepth = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight > 0) {
    const percent = Math.round((scrollTop / docHeight) * 100);
    if (percent > maxScrollDepth) {
      maxScrollDepth = percent;
      // Fire events at 25%, 50%, 75%, 100%
      [25, 50, 75, 100].forEach(threshold => {
        if (percent >= threshold && !window[`amplitude_scroll_${threshold}`]) {
          window[`amplitude_scroll_${threshold}`] = true;
          if (typeof amplitude !== 'undefined') {
            amplitude.logEvent('scroll_depth', { percent: threshold, page: window.location.pathname });
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
}

function trackOnboardingStep(stepName) {
  if (typeof amplitude !== 'undefined') {
    amplitude.logEvent('onboarding_step', { step_name: stepName });
  }
}

function trackOnboardingComplete() {
  if (typeof amplitude !== 'undefined') {
    amplitude.logEvent('onboarding_complete');
  }
}

function trackOnboardingSkip() {
  if (typeof amplitude !== 'undefined') {
    amplitude.logEvent('onboarding_skip');
  }
}
// Example usage:
// trackOnboardingStep('profile_setup');
// trackOnboardingStep('choose_plan');
// trackOnboardingStep('add_payment');
// trackOnboardingComplete();
