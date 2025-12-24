import { useState } from "react";
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';

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

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText('Sending...');

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
                                        <button type="submit"><span>{buttonText}</span></button>
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
