import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { resumeUrl } from "../data/experience";

const EMAIL = "nipungrover2002@gmail.com";
const BTN_LABEL = "Email Me";

// One line of the rolling label; each letter is its own span so GSAP can stagger them
const RollLine = ({ className }) => (
    <span className={`btn-roll-line ${className}`}>
        {[...BTN_LABEL].map((ch, i) => (
            <span className="btn-roll-char" key={i}>{ch}</span>
        ))}
    </span>
);

export const Contact = () => {
    const [copied, setCopied] = useState(false);
    const btnRef = useRef(null);
    const hoverTl = useRef(null);

    // Hover: label rolls up letter by letter while a copy rolls in from below; the arrow swaps out and back in
    useEffect(() => {
        const btn = btnRef.current;
        if (!btn || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ctx = gsap.context(() => {
            gsap.set(".btn-arrow-next", { xPercent: -160 });
            hoverTl.current = gsap.timeline({ paused: true, defaults: { duration: 0.45, ease: "power3.inOut" } })
                .to(".btn-roll-main .btn-roll-char", { yPercent: -100, stagger: 0.025 }, 0)
                .to(".btn-roll-next .btn-roll-char", { yPercent: -100, stagger: 0.025 }, 0)
                .to(".btn-arrow-main", { xPercent: 160, duration: 0.3, ease: "power2.in" }, 0)
                .fromTo(".btn-arrow-next", { xPercent: -160 }, { xPercent: 0, duration: 0.35, ease: "power2.out" }, 0.22);
        }, btn);

        return () => ctx.revert();
    }, []);

    const playHover = () => hoverTl.current?.timeScale(1).play();
    const reverseHover = () => hoverTl.current?.timeScale(1.4).reverse();
    const press = () => gsap.to(btnRef.current, { scale: 0.97, duration: 0.12, ease: "power2.out" });
    const release = () => gsap.to(btnRef.current, { scale: 1, duration: 0.4, ease: "back.out(3)" });

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

                                <a
                                    ref={btnRef}
                                    href={`mailto:${EMAIL}`}
                                    className="contact-primary-btn"
                                    aria-label={BTN_LABEL}
                                    onMouseEnter={playHover}
                                    onMouseLeave={() => { reverseHover(); release(); }}
                                    onFocus={playHover}
                                    onBlur={reverseHover}
                                    onPointerDown={press}
                                    onPointerUp={release}
                                >
                                    <span className="btn-roll" aria-hidden="true">
                                        <RollLine className="btn-roll-main" />
                                        <RollLine className="btn-roll-next" />
                                    </span>
                                    <span className="btn-arrow-wrap" aria-hidden="true">
                                        <span className="btn-arrow btn-arrow-main">→</span>
                                        <span className="btn-arrow btn-arrow-next">→</span>
                                    </span>
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
