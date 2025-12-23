import React from "react";
import { Modal, Container, Row, Col, Button } from "react-bootstrap";
import jsLogo from "../assets/logo/js-logo.svg";
import reactLogo from "../assets/images/react-logo.svg";
import tsLogo from "../assets/logo/typescript.svg";
import tailwindLogo from "../assets/logo/tailwind.svg";
import expressLogo from "../assets/logo/expressjs.png";
import mongoLogo from "../assets/logo/MongoDB.svg";
import azureLogo from "../assets/logo/azure.svg";
import cshLogo from "../assets/logo/csh-logo.svg";
import nodeLogo from "../assets/logo/node.js.svg";
import mssqlLogo from "../assets/logo/microsoft-sql-server.svg";
import postgresLogo from "../assets/logo/postgresqlsvg.svg";

// Placeholder for missing icons - using a generic function to render text if icon missing
const SkillItem = ({ name, icon, invert }) => (
    <div className="skill-modal-item">
        <div className="skill-modal-icon">
            {icon ? (
                <img src={icon} alt={name} className={invert ? "invert-icon" : ""} />
            ) : (
                <div className="skill-placeholder-icon">{name.charAt(0)}</div>
            )}
        </div>
        <span className="skill-modal-name">{name}</span>
    </div>
);

export const SkillsModal = ({ show, onHide }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="xl"
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
                    {/* CORE STACK */}
                    <div className="skills-section-primary">
                        <h3 className="category-title premium-category">CORE STACK</h3>
                        <div className="skills-flex-row justify-content-center">
                            <SkillItem name="TypeScript" icon={tsLogo} />
                            <SkillItem name="React" icon={reactLogo} />
                            <SkillItem name="JavaScript" icon={jsLogo} />
                            <SkillItem name="Next.js" />
                            <SkillItem name="Node.js" icon={nodeLogo} />
                            <SkillItem name="Tailwind" icon={tailwindLogo} />
                            <SkillItem name="Express" icon={expressLogo} invert />
                            <SkillItem name="MongoDB" icon={mongoLogo} />
                            <SkillItem name="C#" icon={cshLogo} />
                            <SkillItem name="Azure" icon={azureLogo} />
                        </div>
                    </div>

                    <div className="premium-divider"></div>

                    {/* Detailed Specs Grid */}
                    <Row className="skills-specs-grid">
                        <Col lg={4} className="spec-col">
                            <div className="spec-header">
                                <span className="spec-icon">01</span>
                                <h4 className="subcategory-title">DATA & BACKEND</h4>
                            </div>
                            <div className="skills-grid-compact">
                                <SkillItem name="MSSQL" icon={mssqlLogo} />
                                <SkillItem name="PostgreSQL" icon={postgresLogo} />
                                <SkillItem name="Prisma" />

                            </div>
                        </Col>

                        <Col lg={4} className="spec-col borders-col">
                            <div className="spec-header">
                                <span className="spec-icon">02</span>
                                <h4 className="subcategory-title">UI & VISUALIZATION</h4>
                            </div>
                            <div className="skills-grid-compact">
                                <SkillItem name="Tailwind" icon={tailwindLogo} />
                                <SkillItem name="CSS" />
                                <SkillItem name="Three.js" />
                                <SkillItem name="React Three Fiber" />
                            </div>
                        </Col>

                        <Col lg={4} className="spec-col">
                            <div className="spec-header">
                                <span className="spec-icon">03</span>
                                <h4 className="subcategory-title">DEVOPS & TOOLING</h4>
                            </div>
                            <div className="skills-grid-compact">
                                <SkillItem name="Git" />
                                <SkillItem name="Docker" />
                                <SkillItem name="Nginx" />
                                <SkillItem name="Postman" />
                            </div>
                        </Col>
                    </Row>

                    <div className="premium-divider"></div>

                    <div className="project-exposure-section">
                        <h3 className="category-title premium-category text-start mb-4">PROJECT EXPERIENCE</h3>
                        <div className="exposure-grid">
                            <div className="exposure-item"><span className="dot"></span>Python</div>
                            <div className="exposure-item"><span className="dot"></span>Flask</div>
                            <div className="exposure-item"><span className="dot"></span>Java</div>
                            <div className="exposure-item"><span className="dot"></span>Android (Java)</div>
                            <div className="exposure-item"><span className="dot"></span>Unity</div>
                            <div className="exposure-item"><span className="dot"></span>C</div>
                            <div className="exposure-item"><span className="dot"></span>C++</div>
                        </div>
                    </div>
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
