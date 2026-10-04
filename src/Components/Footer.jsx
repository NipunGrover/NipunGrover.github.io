import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { openCookieSettings } from '../analyticsConsent';

export const Footer = () => {

    return (
        <footer className="footer">
            <Container>
                <Row className="align-items-center justify-content-center">
                    <Col>
                        <p>2026 Nipun Grover</p>
                        <button type="button" className="cookie-text-link" onClick={openCookieSettings}>
                            Cookie settings
                        </button>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
