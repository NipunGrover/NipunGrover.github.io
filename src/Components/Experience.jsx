import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { DetailsModal } from "./DetailsModal";
import { experience, resumeUrl } from "../data/experience";
import "./Experience.css";

export const Experience = () => {
  const [selected, setSelected] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const openDetails = (entry) => {
    setSelected(entry);
    setShowDetails(true);
  };

  return (
    <section className="experience-section" id="experience" aria-labelledby="experience-title">
      <Container>
        <header className="experience-heading">
          <div>
            <h2 className="skills-title" id="experience-title">Experience</h2>
            <p className="skills-subtitle">Analytics, automation & development</p>
          </div>
          <a className="view-all-btn experience-pdf" href={resumeUrl}
            target="_blank" rel="noopener noreferrer" aria-label="View PDF resume (opens in a new tab)">
            View PDF <span aria-hidden="true">↗</span>
          </a>
        </header>

        <div className="experience-primary">
          {experience.filter((entry) => entry.featured).map((entry) => (
            <article key={entry.id} className="experience-entry">
              <button type="button" className="experience-card" onClick={() => openDetails(entry)}
                aria-label={`View details: ${entry.role} at ${entry.company}`} aria-haspopup="dialog">
                <span className="experience-company">{entry.company}</span>
                <span className="experience-dates">{entry.dates}</span>
                <span className="experience-role">{entry.role}</span>
                <span className="experience-summary">{entry.summary}</span>
                <span className="experience-details-link">View details <span aria-hidden="true">→</span></span>
              </button>
            </article>
          ))}
        </div>

        <div className="experience-additional">
          <h3>Additional experience</h3>
          <ul>
            {experience.filter((entry) => !entry.featured).map((entry) => (
              <li key={entry.id}>
                <div>
                  <h4>{entry.company}</h4>
                  <p>{entry.role}</p>
                  {entry.summary && <p className="additional-summary">{entry.summary}</p>}
                </div>
                <span className="experience-dates">{entry.dates}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <DetailsModal show={showDetails} onHide={() => setShowDetails(false)} title="Experience Details">
        {selected && (
          <div className="experience-modal">
            <h2>{selected.company}</h2>
            <p className="experience-modal-role">{selected.role}</p>
            <p className="experience-modal-meta">{selected.dates} · {selected.location}</p>
            <Row>
              <Col md={6} className="modal-left-col">
                <h3>Overview</h3>
                <p className="project-description">{selected.overview}</p>
                <h3>Technologies</h3>
                <p className="project-description">{selected.technologies.join(" · ")}</p>
              </Col>
              <Col md={6} className="modal-right-col contributions-section">
                <h3>Selected work / impact</h3>
                <ul>{selected.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              </Col>
            </Row>
          </div>
        )}
      </DetailsModal>
    </section>
  );
};
