import { Container } from "react-bootstrap";
import pythonLogo from "../assets/logo/Python.svg";
import reactLogo from "../assets/images/react-logo.svg";
import tsLogo from "../assets/logo/typescript.svg";
import expressLogo from "../assets/logo/expressjs.png";
import azureLogo from "../assets/logo/azure.svg";
import powerBiLogo from "../assets/logo/Microsoft-Power-Bi--Streamline-Svg-Logos.svg";
import bigQueryLogo from "../assets/logo/BigQuery.svg";
import postgresLogo from "../assets/logo/PostgresSQL.svg";
import skillsBg from "../assets/images/skills-bg.svg";
import skillsBgWinter from "../assets/images/skills-bg-winter.svg";
import { useTheme, THEMES } from "../ThemeContext";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { SkillsModal } from "./SkillsModal";

gsap.registerPlugin(Flip);

const skills = [
  { name: "Power BI", icon: powerBiLogo },
  { name: "BigQuery", icon: bigQueryLogo },
  { name: "PostgreSQL", icon: postgresLogo },
  { name: "React", icon: reactLogo },
  { name: "TypeScript", icon: tsLogo },
  { name: "Azure", icon: azureLogo },
  { name: "Express", icon: expressLogo, invert: true },
  { name: "Python", icon: pythonLogo },
];

export const Skills = () => {
  const [skillsOrder, setSkillsOrder] = useState(skills);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const gridRef = useRef(null);
  const isFlippingRef = useRef(false);
  const { theme } = useTheme();
  const bg = theme === THEMES.winter ? skillsBgWinter : skillsBg;

  const handleSkillClick = (index) => {
    if (isFlippingRef.current) return;

    // First click - just select, don't swap
    if (selectedIndex === null) {
      setSelectedIndex(index);
      return;
    }

    // Clicked same one - deselect
    if (selectedIndex === index) {
      setSelectedIndex(null);
      return;
    }

    isFlippingRef.current = true;

    // Lock grid height before animation to prevent layout collapse
    if (gridRef.current) {
      gridRef.current.classList.add("is-flipping");
      gridRef.current.style.height = `${gridRef.current.offsetHeight}px`;
    }

    // Capture state BEFORE the swap
    const targets = gridRef.current?.querySelectorAll("[data-flip-id]") ?? [];
    const state = Flip.getState(targets);

    // Swap the two items in the array
    const newOrder = [...skillsOrder];
    [newOrder[selectedIndex], newOrder[index]] = [
      newOrder[index],
      newOrder[selectedIndex],
    ];

    // Force synchronous DOM update
    flushSync(() => {
      setSkillsOrder(newOrder);
      setSelectedIndex(null);
    });

    const cleanupFlip = () => {
      requestAnimationFrame(() => {
        if (gridRef.current) {
          gridRef.current.style.height = "";
          gridRef.current.classList.remove("is-flipping");
        }
        isFlippingRef.current = false;
      });
    };

    // Now animate from old positions to new
    Flip.from(state, {
      duration: 0.6,
      ease: "power2.inOut",
      // absolute: true, // I might need this for if the swap goes outside the grid at any point
      onComplete: cleanupFlip,
      onInterrupt: cleanupFlip,
    });
  };

  return (
    <section className="skills-section" id="skills">
      {/* Background layers */}
      <div
        className="skills-bg-layer"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      <Container className="skills-content">
        <h2 className="skills-title">SKILLS</h2>
        <p className="skills-subtitle">PRIMARY STACK</p>

        <div className="skills-grid" ref={gridRef}>
          {skillsOrder.map((skill, index) => (
            <div
              key={skill.name}
              data-flip-id={skill.name}
              className={`skill-item ${selectedIndex === index ? "selected" : ""
                }`}
              onClick={() => handleSkillClick(index)}
            >
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

        <button className="view-all-btn" onClick={() => setShowModal(true)}>
          View Full Stack
        </button>
      </Container>
      <SkillsModal show={showModal} onHide={() => setShowModal(false)} />
    </section>
  );
};
