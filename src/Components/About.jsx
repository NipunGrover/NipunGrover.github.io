import { Container } from "react-bootstrap";
import { resumeUrl } from "../data/experience";
import portrait from "../assets/me-firewatch-artstyle.webp";
import "./About.css";

export const About = () => {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <Container className="about-layout">
        <div className="about-content">
          <h2 className="about-title" id="about-title">Hi, I'm Nipun.</h2>

          <p className="about-lead">
            I'm a <strong>data analyst</strong> who has <strong>built and shipped
            software</strong>.
          </p>

          <p>
            At Loblaw I build ETL pipelines into BigQuery and Power BI analysis
            for transportation operations. I also automate the team's manual
            reporting and workflows, saving <strong>240+ hours a year</strong>. At
            VARLab I built full-stack tools for AR/VR teams and deployed them myself.
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
