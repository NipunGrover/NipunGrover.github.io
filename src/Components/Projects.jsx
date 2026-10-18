import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import varlabAssetStoreSS from "../assets/images/asset-store/store-homepage.png";
import pechHomepageSS from "../assets/images/pech/homepage-pech.png";
import pechModalSS from "../assets/images/pech/modal-pech.png";
import pechProjectSS from "../assets/images/pech/project-pech.png";
import pechResearchSS from "../assets/images/pech/research-pech.png";
import mainCapySS from "../assets/images/capy/main-capy.png";

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
                "Performance fixes: Eliminated re‑render thrashing and optimized critical flows, cutting perceived load times and improving Lighthouse performance.",
                "App architecture: Set up the modal system and improved React routing, simplifying navigation code and reducing bundle size."
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
    ];

    return (
        <section className="project" id="project">
            <Container>
                <Row>
                    <Col>
                        <div className="projects-heading">
                            <h2 className="skills-title">Projects</h2>
                            <p className="skills-subtitle">Selected work</p>
                        </div>
                        <Row>
                            {projects.map((project, index) => (
                                <ProjectCard
                                    key={index}
                                    {...project}
                                    onClick={() => handleShowModal(project)}
                                />
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
            <ProjectModal show={showModal} onHide={handleCloseModal} project={selectedProject} />
        </section>
    );
}
