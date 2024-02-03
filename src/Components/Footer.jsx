import {Container} from 'react-bootstrap';
import {Row, Col} from 'react-bootstrap';

export const Footer = () => {

    return (
        <footer className="footer">
        <Container>
            <Row className="align-items-center justify-content-center">
                <Col>
                    <p>Made with <span className="heart">❤</span> by Nipun</p>
                </Col>
            </Row>
        </Container>
        </footer>
    )
}
