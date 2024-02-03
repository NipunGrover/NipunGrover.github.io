import {ArrowRightCircle} from 'react-bootstrap-icons';
import {Container, Row, Col} from 'react-bootstrap';
import headerImg from "../assets/images/banner.svg";
import {useState, useEffect} from 'react';


export const Banner = () => {
    //these are the words displayed on the banner
    const toRotate = ["Software Developer", "Web Developer", "OOP Programmer"]

    //this is to indicate if the word is being deleted or being typed
    const [isDeleting, setIsDeleting] = useState(false);

    //this is to indicate the index of the word in the array, 0 is the first word 
    const [loopNum, setLoopNum] = useState(0);

    //indicates the portion of the word being displayed
    const [text, setText] = useState('');

    //this is to indicate the speed of the typing
    const period = 2000;

    const [delta, setDelta] = useState(300 - Math.random() * 100 );

    useEffect(() => {
        // This function will be called every `delta` milliseconds
        let ticker = setInterval(() => {
            tick();
        }, delta )

        return () => { clearInterval(ticker)};
    }, [text]) 
    //text is the dependence, so when text changes, the ticker is umounted and use effect is called again

    const tick = () => {

        let i = loopNum % toRotate.length; //this is to get the index of the word in the array
        let fullText = toRotate[i]; //this is to get the word in the array
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1); //this is to get the portion of the word that is being displayed
        

        setText(updatedText); 

        if (isDeleting) {
            setDelta(prevDelta => prevDelta/2);
        
        }
        if (!isDeleting && updatedText === fullText) {
            setDelta( period );
            setIsDeleting(true);
        }
        else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(350);
        }
        

        
    }

    return (

        <section className="banner" id="home" >
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <span className="tagline">Welcome to my Portfolio</span>
                        <h1>Hi, I'm Nipun, {loopNum === 2 ? 'an' : 'a'}<span className="wrap" style={{minWidth: '500px', display: 'inline-block', height:"1em", overflow:"hidden"}}>{text}</span></h1>
                        <p>Just an aspiring Developer with enthusiasm to learn<br/> 🚀 Transforming ideas into code<br/>⌨ one keystroke at a time</p>
                        <a href="#connect">
                            <button onClick= {() => console.log('connect')}>Let's connect <ArrowRightCircle size={25}/>
                            </button>
                        </a>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt="Header Img"/>

                    </Col>
                </Row>
            
            
            </Container>

        </section>



    );
}

