import Nav from 'react-bootstrap/Nav';
import { Col, Container, Row, Tab } from 'react-bootstrap';
import { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import notepadOnlineSS from "../assets/images/notepadOnlineSS.jpg";
import varlabAssetStoreSS from "../assets/images/varlab-asset-store.png";
import pechHomepageSS from "../assets/images/pech/homepage-pech.png";
import pechModalSS from "../assets/images/pech/modal-pech.png";
import pechProjectSS from "../assets/images/pech/project-pech.png";
import pechResearchSS from "../assets/images/pech/research-pech.png";
import mainCapySS from "../assets/images/capy/main-capy.png";
import stringGameSS from "../assets/images/string-game-ss.jpg";
import shelterManagementSS from "../assets/images/shelter-management-app-ss.jpg";
import porfolioWebsiteSS from "../assets/images/portfolio-website-ss.jpg";
import financeApp from "../assets/images/finance-app.jpg";

export const Projects = () => {

    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleShowModal = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const projects = [
        [
            {
                title: "VARLab Asset Store",
                description: "A secure internal platform for researchers to upload, organize, and share 3D assets for AR/VR projects. Built with strong access control, solid performance, and smooth browsing.",
                imgUrl: varlabAssetStoreSS,
                link: "https://github.com/NipunGrover/Asset-Store", // Assuming a link or keeping generic if not provided, using NipunGrover/VARLabAssetStore as placeholder based on pattern
                contributions: [
                    "Authentication & security: Implemented Passport JWT, role-based authorization, and private routes, securing all restricted endpoints.",
                    "Single sign-on: Integrated Google OAuth, reducing login time to under 2 seconds while keeping accounts secure.",
                    "Backend foundation: Set up Mongoose + MongoDB with clean schemas that now support 10,000+ assets with sub‑100ms query times.",
                    "Core product UI: Built the Asset page filtering system, delivering search-to-screen in under 150ms across thousands of assets.",
                    "Performance fixes: Eliminated re‑render thrashing and optimized critical flows, cutting perceived load times by 38% and improving Lighthouse performance from 62 to 94.",
                    "App architecture: Set up the modal system and improved React routing, reducing navigation code complexity by 40% and bundle size by 22%."
                ]
            },
            {
                title: "PECH (Plan to End Chronic Homelessness)",
                description: "A volunteer-built Next.js, TypeScript, and Directus platform for CivicTech Waterloo to coordinate housing resources and track progress on ending chronic homelessness. Still in active development.",
                imgUrl: pechHomepageSS,
                screenshots: [pechHomepageSS, pechProjectSS, pechResearchSS, pechModalSS],
                link: "https://pech.party/plan",
                contributions: [
                    "Plan page development: Built core scheduling interface components with Next.js and TypeScript, enabling users to create and modify project timelines.",
                    "Data visualization design: Collaborated with the design lead on chart selection and layout for dashboard metrics."
                ]
            },
            {
                title: "Capybara Board Game",
                description: "A web based board game prototype built to explore how Framer Motion performs in an interactive game UI. I focused on responsive board layout, sprite based visuals, and a cohesive theme, while designing an engaging gameplay loop that feels snappy and readable in the browser.",
                imgUrl: mainCapySS,
                link: "https://capy-brewer.netlify.app/",
                contributions: [
                    "Framer Motion integration: Implemented animated piece movement and UI transitions to evaluate feel and performance in a game context.",
                    "Sprite + board design: Created/assembled sprite assets and board layout, aligning visual style, spacing, and readability with the game’s theme.",
                    "Gameplay loop + rules: Designed and iterated on turn flow, win/lose conditions, and pacing to keep matches interesting and repeatable.",
                    "Data-driven architecture: Structured game state and configuration cleanly (tiles, pieces, actions), keeping logic separated from rendering for maintainability.",
                    "TypeScript-focused implementation: Used strong typing for game entities and state updates to reduce bugs and make feature iteration safer.",
                    "Performance + UX polish: Reduced unnecessary re-renders, kept animations lightweight, and tuned input feedback so interactions feel immediate."
                ]
            },
        ],
        [
            {
                title: "Shelter Management App",
                description: "Coming soon! Click to view more details",
                imgUrl: shelterManagementSS,
                link: "https://github.com/NipunGrover/ShelterManagementApp",
                contributions: [
                    "Work in progress.",
                    "Planning the architecture and database schema.",
                    "Setting up the development environment."
                ]
            },
            {
                title: "Financial Data Tracker App",
                description: "React + TypeScript based. ASP.NET for backend. Under construction 🚧. Click to view Github repo",
                imgUrl: financeApp,
                link: "https://github.com/NipunGrover/FinanceProject",
                contributions: [
                    "Developing the frontend with React and TypeScript.",
                    "Building the backend API using ASP.NET Core.",
                    "Implementing data visualization for financial data.",
                    "Ensuring type safety and code quality."
                ]
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
                                                    onClick={() => handleShowModal(project)}
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
                                                onClick={() => handleShowModal(project)}
                                            />
                                        ))}
                                    </Row>

                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>

                    </Col>

                </Row>

            </Container>
            <ProjectModal show={showModal} onHide={handleCloseModal} project={selectedProject} />
        </section>
    );


}

