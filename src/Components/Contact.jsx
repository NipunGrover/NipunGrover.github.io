import { useState, useRef } from "react";
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import gsap from 'gsap';

export const Contact = () => {
    const formInitialDetails = {
        name: '',
        email: '',
        phone: '',
        message: ''
    }

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Send Message');
    const [status, setStatus] = useState({});
    const buttonRef = useRef(null);
    const rippleRef = useRef(null);

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    }

    // Wobbly liquid effect on hover
    const handleMouseEnter = () => {
        if (!buttonRef.current) return;

        // Ripple expand animation
        gsap.fromTo(rippleRef.current,
            { scale: 0, opacity: 0.6 },
            { scale: 2.5, opacity: 0, duration: 0.8, ease: "power2.out" }
        );

        // Create wobbly liquid timeline
        const tl = gsap.timeline();

        // Initial squish
        tl.to(buttonRef.current, {
            scaleX: 1.08,
            scaleY: 0.92,
            borderRadius: "16px 12px 14px 10px",
            duration: 0.1,
            ease: "power2.out"
        })
            // Bounce back overshoot
            .to(buttonRef.current, {
                scaleX: 0.94,
                scaleY: 1.06,
                borderRadius: "10px 14px 12px 16px",
                duration: 0.12,
                ease: "power2.inOut"
            })
            // Wobble 1
            .to(buttonRef.current, {
                scaleX: 1.04,
                scaleY: 0.96,
                borderRadius: "14px 10px 16px 12px",
                duration: 0.1,
                ease: "power2.inOut"
            })
            // Wobble 2
            .to(buttonRef.current, {
                scaleX: 0.98,
                scaleY: 1.02,
                borderRadius: "13px 11px 13px 11px",
                duration: 0.1,
                ease: "power2.inOut"
            })
            // Settle
            .to(buttonRef.current, {
                scaleX: 1,
                scaleY: 1,
                borderRadius: "12px",
                duration: 0.25,
                ease: "elastic.out(1, 0.5)"
            });
    };

    const handleMouseLeave = () => {
        if (!buttonRef.current) return;
        gsap.to(buttonRef.current, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.4,
            ease: "elastic.out(1, 0.3)"
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText('Sending...');

        // Button click ripple burst
        if (buttonRef.current && rippleRef.current) {
            gsap.fromTo(rippleRef.current,
                { scale: 0.5, opacity: 0.8 },
                { scale: 3, opacity: 0, duration: 0.5, ease: "power2.out" }
            );
            gsap.to(buttonRef.current, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        }

        // 60 second timeout for Render cold starts
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        try {
            let response = await fetch("https://nipungrover-github-io.onrender.com/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(formDetails),
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            setButtonText("Send Message");
            let result = await response.json();
            if (response.ok) {
                setStatus({ success: true, message: 'Message sent successfully' });
            } else {
                setStatus({ success: false, message: 'Something went wrong, please try again later.' });
            }
        } catch (error) {
            clearTimeout(timeoutId);
            setButtonText("Send Message");
            if (error.name === 'AbortError') {
                setStatus({ success: false, message: 'Request timed out. The server may be waking up - please try again.' });
            } else {
                setStatus({ success: false, message: 'Something went wrong, please try again later.' });
            }
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
                                <p>Got a project? Let's talk about it.</p>
                                <div className="contact-decoration">
                                    <div className="deco-circle"></div>
                                </div>
                            </div>
                        </Col>
                        <Col size={12} md={6}>
                            <form onSubmit={handleSubmit}>
                                <Row>
                                    <Col size={12} sm={6} className="px-1">
                                        <input type="text" value={formDetails.name} placeholder="Name" onChange={(e) => onFormUpdate('name', e.target.value)} />
                                    </Col>
                                    <Col size={12} sm={6} className="px-1">
                                        <input type="email" value={formDetails.email} placeholder="Email" onChange={(e) => onFormUpdate('email', e.target.value)} />
                                    </Col>
                                    <Col size={12} sm={6} className="px-1">
                                        <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)} />
                                    </Col>
                                    <Col size={12} className="px-1">
                                        <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                                        <button
                                            ref={buttonRef}
                                            type="submit"
                                            className="contact-submit-btn"
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <span className="btn-ripple" ref={rippleRef}></span>
                                            <span className="btn-text">{buttonText}</span>
                                        </button>
                                    </Col>
                                    {
                                        status.message &&
                                        <Col>
                                            <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                                        </Col>
                                    }
                                </Row>
                            </form>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    )
}

