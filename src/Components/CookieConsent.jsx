import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { applyConsent, CONSENT_KEY, readConsent, saveConsent, SETTINGS_EVENT } from '../analyticsConsent';
import './CookieConsent.css';

export function CookieConsent() {
  const [choice, setChoice] = useState(readConsent);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      const saved = readConsent();
      setChoice(saved);
      applyConsent(saved);
    };
    const openSettings = () => setSettingsOpen(true);
    const onStorage = (event) => {
      if (event.key === CONSENT_KEY || event.key === null) syncConsent();
    };
    syncConsent();
    window.addEventListener(SETTINGS_EVENT, openSettings);
    window.addEventListener('storage', onStorage);
    // Recheck expiration when a visitor returns to a long-lived tab.
    window.addEventListener('focus', syncConsent);
    return () => {
      window.removeEventListener(SETTINGS_EVENT, openSettings);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', syncConsent);
    };
  }, []);

  const choose = (value) => {
    saveConsent(value);
    setChoice(value);
    setSettingsOpen(false);
  };

  const actions = (
    <div className="cookie-actions">
      <button type="button" aria-label="Accept analytics" onClick={() => choose('accepted')}>Accept</button>
      <button type="button" aria-label="Reject analytics" onClick={() => choose('rejected')}>Reject</button>
    </div>
  );

  return (
    <>
      {!choice && !settingsOpen && (
        <section className="cookie-banner" aria-label="Analytics cookie consent">
          <div className="cookie-banner-copy">
            <p>Allow Google Analytics to improve this site?{' '}
              <button className="cookie-text-link" type="button" onClick={() => setSettingsOpen(true)}>
                Details
              </button>
            </p>
          </div>
          {actions}
        </section>
      )}
      <Modal show={settingsOpen} onHide={() => setSettingsOpen(false)} centered scrollable
        className="cookie-settings-modal" backdropClassName="cookie-settings-backdrop"
        aria-labelledby="cookie-settings-title">
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title id="cookie-settings-title">Analytics &amp; cookies</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Nipun Grover uses Google Analytics to understand how visitors use this portfolio
            and to improve its content. It is optional: you can use the site if you reject it.</p>
          <h3>What is collected?</h3>
          <p>If you accept, Google receives information such as pages visited, interactions,
            referral sources, browser and device details, and approximate location.
            Analytics cookies distinguish browsers and visits. This site does not enable
            Google Signals or personalized advertising through this tag.</p>
          <p>Google processes this information to provide analytics reports.
            Read <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">
              how Google uses information from sites that use its services
            </a> and <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
              Google’s Privacy Policy
            </a>.</p>
          <h3>Your choice</h3>
          <p>Your choice is saved in this browser for six months, if browser storage is available.
            The site also remembers your chosen theme. Google Analytics is not loaded before acceptance.</p>
          <p>Use “Cookie settings” in the footer to change your choice. Rejecting after acceptance
            stops future collection, clears this site’s Analytics cookies, and reloads the page.
            It does not erase information already sent to Google.</p>
          <p className="cookie-current-choice">Analytics: {choice === 'accepted' ? 'on' : 'off'}</p>
        </Modal.Body>
        <Modal.Footer>{actions}</Modal.Footer>
      </Modal>
    </>
  );
}
