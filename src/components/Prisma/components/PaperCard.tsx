import React from 'react';
import { Badge } from 'react-bootstrap';
import { PaperCardProps } from '../types';
import '../prisma.css';

const PaperCard: React.FC<PaperCardProps> = React.memo(({ paper, onViewDetails }) => {
  return (
    <div className="d-flex align-items-center border-bottom py-3 prisma-text">
      <div className="d-flex justify-content-center" style={{ width: '100px' }}>
        <small className="date-circle">{paper.publish_date.split(' ')[0]}</small>
      </div>

      <div className="flex-grow-1 px-3">
        <div className="text-truncate-2 paper-title">{paper.title}</div>
        <div>
          <Badge bg="secondary" className="me-2">Full text publications</Badge>
          <Badge bg="success">Abstracts presentations</Badge>
        </div>
      </div>

      <button 
        className="btn btn-primary ms-3"
        onClick={() => onViewDetails(paper)}
        aria-label="View paper details"
      >
        <i className="fa-solid fa-ellipsis" />
      </button>
    </div>
  );
});

PaperCard.displayName = 'PaperCard';

export default PaperCard; 