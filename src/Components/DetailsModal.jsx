import { useId } from "react";
import { Modal } from "react-bootstrap";

// Shared shell: Bootstrap owns Escape, focus trapping, and focus restoration.
// eslint-disable-next-line react/prop-types
export const DetailsModal = ({ show, onHide, title, children }) => {
  const titleId = useId();
  return (
    <Modal show={show} onHide={onHide} size="xl" centered
      aria-labelledby={titleId} className="project-modal"
      contentClassName="project-modal-content">
      <Modal.Header closeButton>
        <Modal.Title id={titleId}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};
