import Nav from 'react-bootstrap/Nav';
import {Col, Container, Row, Tab} from 'react-bootstrap';
import { ProjectCard } from './ProjectCard';
import notepadOnlineSS from "../assets/images/notepadOnlineSS.jpg";
import stringGameSS from "../assets/images/string-game-ss.jpg";
import shelterManagementSS from "../assets/images/shelter-management-app-ss.jpg";
import porfolioWebsiteSS from "../assets/images/portfolio-website-ss.jpg";
import financeApp from "../assets/images/finance-app.jpg";

export const Projects = () => {

    const  projects = [
        [
            {
                title: "Notepad Online",
                description: "Simple web based notepad using JS and .NET. Stores files on cloud. Click to see more details!",
                imgUrl: notepadOnlineSS,
                link: "https://github.com/NipunGrover/NotepadOnline"
                
            },
            {
                title: "Word Search Game",
                description: "WPF based word search game with C# backend and TCP connection. Supports multiple clients. Click to check out more details!",
                imgUrl: stringGameSS,
                link: "https://github.com/nipun-grover/word-search-game"
            },
            {
                title: "This Portfolio Website",
                description: "React based portfolio website. Click for more!",
                imgUrl: porfolioWebsiteSS,
                link: "https://github.com/NipunGrover/NipunGrover.github.io"
            },
        ],
        [
            {
                title: "Shelter Management App",
                description: "Coming soon! Click to view more details",
                imgUrl: shelterManagementSS,
                link: "https://github.com/NipunGrover/ShelterManagementApp"
            },
            {
                title: "Financial Data Tracker App",
                description: "React + TypeScript based. ASP.NET for backend. Under construction 🚧. Click to view Github repo",
                imgUrl: financeApp,
                link: "https://github.com/NipunGrover/FinanceProject"
            },
    ],
    ];

    return (
        <section className="project" id="project">
            <Container>
                <Row>
                    <Col>
                    {/* <img classname="background-image-right" src={ColorSharp2}></img> */}
                        <Tab.Container defaultActiveKey="first">
                            <Nav variant="pills">
                                <Nav.Item id="projects-tabs-tab-first">
                                <Nav.Link eventKey="first" >Featured Projects</Nav.Link>
                                </Nav.Item>
                                <Nav.Item id="projects-tabs-tab-second">
                                <Nav.Link eventKey="second" >Other work</Nav.Link>
                                </Nav.Item>
              
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Row>
                                    {
                                        
                                        projects[0].map((project, index) => (
                                                <ProjectCard
                                                    key={index}
                                                    {...project}
                                                    />
                                            )
                                            )
                                    
                                    } 
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <Row>
                                        {projects[1].map((project, index) => (
                                            <ProjectCard key={index} 
                                            {...project} 
                                            />
                                        ))}
                                    </Row>

                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                        
                    </Col>
                    
                </Row>
           
            </Container>
          
        </section>
      );


}

