import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Navbar} from 'react-bootstrap';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import {useEffect, useState} from "react";

import logo from '../assets/images/logo.svg';
import navIcon1 from '../assets/images/nav-icon1.svg';
import navIcon2 from '../assets/images/github-logo.svg';
import navIcon3 from '../assets/images/nav-icon3.svg';


/*
 * NavBar component - represents the navigation bar of the application.
 */
export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

//this is checking if the user has scrolled down the page, if they have, the navbar will change its style
//Navbar className has been set in the code below, then css is used to style the navbar acc to scrolled state
useEffect(() => {
  const onScroll = () => {
    if(window.scrollY > 50) {
      setScrolled(true);
    }
    else {
      setScrolled(false);
    }
  }
  window.addEventListener('scroll', onScroll);
  return () => window.removeEventListener('scroll', onScroll);
  }, [])

  const onUpdateActiveLink = (link) => {
    setActiveLink(link);
  }

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled": ""}>
      <Container>
      {/* Brand logo */}
        <Navbar.Brand href="#home"><img src={logo} alt="Logo" className="navbar-logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

         {/* Main navigation links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'}>Home</Nav.Link>
            <Nav.Link href="#skills"  className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'}>Skills</Nav.Link>
            <Nav.Link href="#project"  className={activeLink === 'project' ? 'active navbar-link' : 'navbar-link'}>Projects</Nav.Link>
          </Nav>
          <span className="navbar-text">
          {/*this is where all the social media icons will be */}
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/nipun-grover-450b83167/" target='_blank'><img src={navIcon1}/></a>
              <a href="https://github.com/NipunGrover" target="_blank"><img src={navIcon2}/></a>

            </div>
            {/*console log is just to be replaced later on for actual navigation to the contact form on our application*/}
            <a href="#connect">
              <button className="vvd">
                <span>Let's Connect</span>
              </button>
            </a>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
