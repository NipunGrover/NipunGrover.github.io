import { Container } from "react-bootstrap";
import { resumeUrl } from "../data/experience";
import portrait from "../assets/me-firewatch-artstyle.webp";
import "./About.css";

// Started at Loblaw in May 2026; the intro counts up from here so it never goes stale
const ANALYST_START = new Date(2026, 4, 1);

const analystDuration = () => {
  const months = Math.max(1, Math.round((Date.now() - ANALYST_START) / (1000 * 60 * 60 * 24 * 30.44)));
  if (months < 12) return `${months} month${months === 1 ? "" : "s"}`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"}`;
};

export const About = () => {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <Container className="about-layout">
        <div className="about-content">
          <h2 className="about-title" id="about-title">Hi, I'm Nipun.</h2>

          <p className="about-lead">
            I've got <strong>1 year of full-stack development</strong> behind me
            and <strong>{analystDuration()} as a data analyst</strong>, and I like
            working where the two overlap.
          </p>

          <p>
            At Loblaw I build Power BI, SQL and Python workflows that have cut
            <strong> 240+ hours a year</strong> of manual reporting. At VARLab I
            built full-stack tools for AR/VR teams.
          </p>

          <div className="about-actions">
            <a className="view-all-btn" href={resumeUrl} target="_blank" rel="noopener noreferrer">
              View Resume <span aria-hidden="true">↗</span>
            </a>
            <a className="view-all-btn" href="#connect">Get in Touch</a>
          </div>
        </div>

        <div className="about-portrait">
          <img src={portrait} alt="Illustrated portrait of Nipun" width="800" height="800" loading="lazy" />
        </div>
      </Container>
    </section>
  );
};
