import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { PaperDetailsModalProps } from '../types';

const PaperDetailsModal: React.FC<PaperDetailsModalProps> = React.memo(({ paper, show, onClose }) => {
  if (!paper) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title className="h5">Paper Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <h5 className="text-primary mb-4">{paper.title}</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <p className="mb-2">
              <strong className="text-secondary">Authors:</strong>
              <span className="ms-2">{paper.authors}</span>
            </p>
            <p className="mb-2">
              <strong className="text-secondary">Publish Date:</strong>
              <span className="ms-2">{paper.publish_date}</span>
            </p>
          </div>
          <div className="col-md-6">
            <p className="mb-2">
              <strong className="text-secondary">Decision:</strong>
              <span className="ms-2">{paper.decision}</span>
            </p>
            <p className="mb-2">
              <strong className="text-secondary">Source:</strong>
              <span className="ms-2">{paper.upload_source}</span>
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h6 className="text-secondary mb-3">Abstract</h6>
          <p className="mb-0 text-justify">{paper.abstract}</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-top">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

PaperDetailsModal.displayName = 'PaperDetailsModal';

export default PaperDetailsModal; 