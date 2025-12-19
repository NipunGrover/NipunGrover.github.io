import { Container } from "react-bootstrap";
import jsLogo from "../assets/logo/js-logo.svg";
import reactLogo from "../assets/images/react-logo.svg";
import tsLogo from "../assets/logo/typescript.svg";
import tailwindLogo from "../assets/logo/tailwind.svg";
import expressLogo from "../assets/logo/expressjs.png";
import mongoLogo from "../assets/logo/MongoDB.svg";
import azureLogo from "../assets/logo/azure.svg";
import cshLogo from "../assets/logo/csh-logo.svg";
import nodeLogo from "../assets/logo/node.js.svg";
import skillsBg from "../assets/images/skills-bg.svg";

const skills = [
    { name: "TypeScript", icon: tsLogo },
    { name: "React", icon: reactLogo },
    { name: "Tailwind", icon: tailwindLogo },
    { name: "Express", icon: expressLogo, invert: true },
    { name: "MongoDB", icon: mongoLogo },
    { name: "Azure", icon: azureLogo },
    { name: "C#", icon: cshLogo },
    { name: "JavaScript", icon: jsLogo },
];

export const Skills = () => {
    return (
        <section className="skills-section" id="skills">
            {/* Background layers */}
            <div className="skills-bg-layer" style={{ backgroundImage: `url(${skillsBg})` }}></div>

            <Container className="skills-content">
                <h2 className="skills-title">SKILLS</h2>
                <p className="skills-subtitle">PRIMARY STACK</p>

                <div className="skills-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="skill-item">
                            <div className="skill-icon">
                                <img
                                    src={skill.icon}
                                    alt={skill.name}
                                    className={skill.invert ? "invert-icon" : ""}
                                />
                            </div>
                            <span className="skill-name">{skill.name}</span>
                        </div>
                    ))}
                </div>

                <button className="view-all-btn">
                    View Full Stack
                </button>
            </Container>
        </section>
    );
};