import { Modal, Button, Row, Col } from "react-bootstrap";

export const ProjectModal = ({ show, onHide, project }) => {
  if (!project) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="project-modal"
      contentClassName="project-modal-content"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Project Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6} className="modal-left-col">
            <h2>{project.title}</h2>
            <p className="project-description">
              {project.details || project.description}
            </p>

            {project.contributions && (
              <div className="contributions-section">
                <h3>My Contributions</h3>
                <ul>
                  {project.contributions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {project.link && (
              <div className="mt-4">
                <Button
                  variant="primary"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-visit-btn"
                >
                  View Project
                </Button>
              </div>
            )}
          </Col>
          <Col md={6} className="modal-right-col">
            <h3>Screenshots</h3>
            {project.screenshots && project.screenshots.length > 0 ? (
              <div className="screenshots-grid-stack">
                {project.screenshots.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="img-fluid mb-3"
                  />
                ))}
              </div>
            ) : (
              project.imgUrl && (
                <img
                  src={project.imgUrl}
                  alt={project.title}
                  className="img-fluid"
                />
              )
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
