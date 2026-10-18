import { Container } from 'react-bootstrap';
import { openCookieSettings } from '../analyticsConsent';

export const Footer = () => {

    return (
        <footer className="footer">
            <Container className="footer-inner">
                <p>2026 Nipun Grover</p>
                <button type="button" className="cookie-text-link" onClick={openCookieSettings}>
                    Cookie settings
                </button>
            </Container>
        </footer>
    )
}
