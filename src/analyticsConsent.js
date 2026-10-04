const MEASUREMENT_ID = 'G-1RYZ1M409N';
export const CONSENT_KEY = 'portfolio-analytics-consent-v1';
export const SETTINGS_EVENT = 'open-cookie-settings';
const CHOICE_LIFETIME = 180 * 24 * 60 * 60 * 1000;
let started = false;

export function readConsent() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONSENT_KEY));
    if (saved && ['accepted', 'rejected'].includes(saved.choice)
      && Number.isFinite(saved.expiresAt) && saved.expiresAt > Date.now()) {
      return saved.choice;
    }
  } catch {
    // Unavailable or invalid storage must never enable tracking.
  }
  return null;
}

function clearAnalyticsCookies() {
  const domains = location.hostname.split('.');
  const scopes = [''];
  for (let index = 0; index < domains.length; index += 1) {
    const domain = domains.slice(index).join('.');
    scopes.push(`; domain=${domain}`, `; domain=.${domain}`);
  }
  for (const name of ['_ga', `_ga_${MEASUREMENT_ID.slice(2)}`]) {
    for (const scope of scopes) {
      document.cookie = `${name}=; Max-Age=0; path=/${scope}`;
    }
  }
}

export function applyConsent(choice) {
  const accepted = choice === 'accepted';
  window[`ga-disable-${MEASUREMENT_ID}`] = !accepted;
  if (!accepted) {
    clearAnalyticsCookies();
    // Reload to remove an already-running Google library and its listeners.
    // The persisted rejection prevents it from loading on the next page.
    if (started) window.location.reload();
    return;
  }
  if (started) return;
  started = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('consent', 'update', { analytics_storage: 'granted' });
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const script = document.createElement('script');
  script.id = 'google-analytics-tag';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function saveConsent(choice) {
  if (!['accepted', 'rejected'].includes(choice)) return;
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      choice,
      expiresAt: Date.now() + CHOICE_LIFETIME,
    }));
  } catch {
    // The choice still applies to this page when storage is blocked.
  }
  applyConsent(choice);
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}
