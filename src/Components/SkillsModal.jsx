import React from "react";
import { Modal, Button } from "react-bootstrap";

const SkillCategory = ({ title, skills }) => (
    <div className="skill-category-row">
        <h4 className="skill-category-title">{title}</h4>
        <p className="skill-category-list">{skills}</p>
    </div>
);

export const SkillsModal = ({ show, onHide }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="skills-modal-title"
            centered
            className="skills-modal premium-modal"
            contentClassName="skills-modal-content premium-content"
        >
            <Modal.Body>
                {/* HUD Decoration Lines */}
                <div className="modal-hud-line top-left"></div>
                <div className="modal-hud-line top-right"></div>
                <div className="modal-hud-line bottom-left"></div>
                <div className="modal-hud-line bottom-right"></div>

                <div className="skills-modal-header text-center">
                    <h2 className="title-glow premium-title">SKILLS</h2>
                    <div className="subtitle-wrapper">
                        <span className="subtitle-line"></span>
                        <p className="subtitle-gold">FULL STACK</p>
                        <span className="subtitle-line"></span>
                    </div>
                </div>

                <div className="premium-skills-container">
                    <SkillCategory
                        title="LANGUAGES & RUNTIMES"
                        skills="TypeScript, JavaScript, C#"
                    />
                    <SkillCategory
                        title="WEB FRAMEWORKS"
                        skills="React, Express, Next.js, NestJS, ASP.NET"
                    />
                    <SkillCategory
                        title="DATABASES & BACKEND"
                        skills="MongoDB, MSSQL, PostgreSQL, Prisma, Drizzle, Socket.io"
                    />
                    <SkillCategory
                        title="UI & STYLING"
                        skills="Tailwind, CSS, GSAP, Three.js, React Three Fiber"
                    />
                    <SkillCategory
                        title="DEVOPS & TOOLS"
                        skills="Git, Docker, Azure, Nginx, Postman, GraphQL"
                    />
                    <SkillCategory
                        title="ADDITIONAL EXPERIENCE"
                        skills="C, C++, Python, Java, Figma"
                    />
                </div>

                <div className="text-center mt-5">
                    <Button className="modal-close-btn premium-btn" onClick={onHide}>
                        :wq
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};
