import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

export const Footer = () => {

    return (
        <footer className="footer">
            <Container>
                <Row className="align-items-center justify-content-center">
                    <Col>
                        <p>Copyright &copy; {new Date().getFullYear()} Nipun Grover</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
