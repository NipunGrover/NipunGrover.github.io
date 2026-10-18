import { useState } from "react";
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { resumeUrl } from "../data/experience";

const EMAIL = "nipungrover2002@gmail.com";

export const Contact = () => {
    const [copied, setCopied] = useState(false);

    // Not everyone has a mail app set up, so make the address easy to copy
    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    return (
        <section className="contact" id="connect">
            <Container>
                <div className="contact-box">
                    <Row className="align-items-center">
                        <Col size={12} md={6}>
                            <div className="contact-info">
                                <h2>Let's Connect</h2>
                                <p>Hiring for analytics, automation or development? Let's talk.</p>
                                <div className="contact-decoration">
                                    <div className="deco-circle"></div>
                                </div>
                            </div>
                        </Col>
                        <Col size={12} md={6}>
                            <div className="contact-actions">
                                <div className="contact-email">
                                    <span>{EMAIL}</span>
                                    <button type="button" onClick={copyEmail} aria-label="Copy email address">
                                        {copied ? "Copied" : "Copy"}
                                    </button>
                                </div>
                                <span className="visually-hidden" aria-live="polite">{copied ? "Email address copied" : ""}</span>

                                <a href={`mailto:${EMAIL}`} className="contact-primary-btn">
                                    <span className="btn-text">Email Me</span>
                                    <span className="btn-arrow" aria-hidden="true">→</span>
                                </a>

                                <div className="contact-links">
                                    <a href="https://www.linkedin.com/in/nipun-grover-450b83167/" target="_blank" rel="noreferrer">LinkedIn</a>
                                    <a href="https://github.com/NipunGrover" target="_blank" rel="noreferrer">GitHub</a>
                                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer">Resume</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    )
}
