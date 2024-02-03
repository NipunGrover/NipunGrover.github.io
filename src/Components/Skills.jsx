import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Row, Col } from "react-bootstrap";
import jsLogo from "../assets/images/js-logo.svg";
import cssLogo from "../assets/images/css-logo.svg";
import xamlLogo from "../assets/images/xaml.svg";
import cshLogo from "../assets/images/csh-logo.svg";
import reactLogo from "../assets/images/react-logo.svg";
import cppLogo from "../assets/images/cpp-logo.svg";
import cLogo from "../assets/images/c-logo.svg";
import bootstrapLogo from "../assets/images/bootstrap-logo.svg";
import aspLogo from "../assets/images/asp-net-logo.svg";
import sqlLogo from "../assets/images/database-logo.svg";
import htmlLogo from "../assets/images/html-logo.svg";
import { useEffect, useRef } from "react";


import colorSharp from "../assets/images/color-sharp.png";

export const Skills = () => {
    const responsive = {
        superLargeDesktop: {
          
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

    const carouselRef = useRef();
    const observerRef = useRef();
    const wrapperRef = useRef();

    useEffect(() => {
      let autoScroll;
  
      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          // Start auto-scrolling when the carousel becomes visible
          autoScroll = setInterval(() => {
            const currentIndex = carouselRef.current.state.currentSlide;
            const nextIndex = (currentIndex + 1) % carouselRef.current.state.totalItems;
            carouselRef.current.goToSlide(nextIndex);
          }, 2800);
        } else if (autoScroll) {
          // Stop auto-scrolling when the carousel is not visible
          clearInterval(autoScroll);
        }
      });
  
      // Start observing the carousel
      observerRef.current.observe(wrapperRef.current);
  
      return () => {
        // Stop observing and clear the interval when the component is unmounted
        observerRef.current.unobserve(wrapperRef.current);
        clearInterval(autoScroll);
      };
    }, []);

    return (
        <section className="skill" id="skills">
            <Container> 
                <div className="row">
                    <div className="col-12">
                        <div className="skill-bx wow zoomIn">
                        
                            <h2>
                                Skills
                            </h2>
                            <p>
                            Versatile software developer with a strong foundation in C# and hands-on experience in JavaScript, 
                            React, ASP.NET, WPF, XAML, C, C++, SQL, and HTML/CSS. Proficient in database management 
                            and Azure cloud services. Striving for crafting efficient and scalable solutions with a keen eye for 
                            UI/UX design.
                            </p>
                            <div ref={wrapperRef}> 
                            <Carousel ref={carouselRef} responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                                
                                <div className="item">
                                    <img src={jsLogo} alt="Image"/>
                                    <h5>JavaScript</h5>
                                </div>
                                <div className="item">
                                    <img src={cssLogo} alt="Image"/>
                                    <h5>CSS</h5>
                                </div>
                                <div className="item">
                                    <img src={cshLogo} alt="Image"/>
                                    <h5>C#</h5>
                                </div>
                                <div className="item">
                                    <img src={reactLogo} alt="Image"/>
                                    <h5>React</h5>
                                </div>
                                <div className="item">
                                    <img src={sqlLogo} alt="Image" className="white-logo"/>
                                    <h5 style={{ marginTop: '12px' }}>SQL</h5>
                                </div>
                                <div className="item">
                                    <img src={aspLogo} alt="Image" className="white-logo" style={{ marginTop: '40px' }}/>
                                    <h5>.Net Framework and Core</h5>
                                </div>
                                <div className="item">
                                    <img src={bootstrapLogo} alt="Image" style={{ marginTop: '21px' }}/>
                                    <h5>Bootstrap CSS</h5>
                                </div>
                                <div className="item">
                                    <img src={cppLogo} alt="Image"/>
                                    <h5>C++</h5>
                                </div>
                                <div className="item">
                                    <img src={cLogo} alt="Image"/>
                                    <h5>C Development</h5>
                                </div>
                                <div className="item">
                                    <img src={xamlLogo} alt="Image" className="white-logo"/>
                                    <h5>XAML (WPF)</h5>
                                </div>
                                <div className="item">
                                    <img src={htmlLogo} alt="Image"/>
                                    <h5>HTML</h5>
                                </div>
                                
                            </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <img className="background-image-left" src={colorSharp} />
        </section>


    )


}