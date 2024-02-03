import {useState} from "react";
import Container from 'react-bootstrap/Container';
import contactImg from '../assets/images/contact-img.svg';
import {Row, Col} from 'react-bootstrap';

export const Contact = () => { 
    const formInitialDetails = {
        name: '',
        email: '',
        phone: '',
        message: ''
    }

    //form details, will be updated as the user types
    const [formDetails, setFormDetails] = useState(formInitialDetails);

    //button for submit, will change to sent when clicked
    const [buttonText, setButtonText] = useState('Send');

    //status of the form, if the message is sent successfully, or not
    const [status, setStatus] = useState('');

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails, 
            [category]: value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText('Sending...');
        let response = await fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(formDetails),
        });
        setButtonText("Send");
        let result = response.json();
        setFormDetails(formInitialDetails);
        if (result.code === 200){
            setStatus({
                sucess: true,
                message: "Message Sent"
            });
            setStatus({
                success: false, 
                message: "Message Failed to send, Please Try Again"
            });

        }

    }

    return (
        <section className="contact" id="connect">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <img src={contactImg} alt="Contact Me"/>
                    </Col>
                    <Col md={6}>
                        <h2>Get In Touch</h2>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={6} className="px-1">
                                    <input type="text" value={formDetails.name} placeholder="Name" 
                                    onChange={(e) => onFormUpdate('name', e.target.value)}/>
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type="email" value={formDetails.email} placeholder="Email Address" 
                                    onChange={(e) => onFormUpdate('email', e.target.value)}/>
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type="tel" value={formDetails.phone} placeholder="phone" 
                                    onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                                </Col>
                                <Col sm={6} className="px-1">
                                    <textarea row="6" value={formDetails.message} placeholder="Message" 
                                    onChange={(e) => onFormUpdate('message', e.target.value)}/>
                                    <button type="submit"><span>{buttonText}</span></button>
                                </Col>
                                {
                                    //this conditional statement will display the status of the form if the status.message exists
                                    //if the status.message does not exist, nothing will be rendered
                                    status.message &&
                                    <Col>
                                        <p className={status.sucess === false ? "danger" : "sucess"}>{status.message}</p>
                                    </Col>
                                }
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>

    )

} 