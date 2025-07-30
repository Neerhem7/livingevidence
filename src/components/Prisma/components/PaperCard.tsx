import React from 'react';
import { Badge } from 'react-bootstrap';
import { PaperCardProps } from '../types';
import '../prisma.css';

const PaperCard: React.FC<PaperCardProps> = React.memo(({ paper, onViewDetails }) => {
  const getYear = (dateStr: string) => {
    // Split by space and get the first part that's a 4-digit number
    const parts = dateStr.split(' ');
    const year = parts.find(part => /^\d{4}$/.test(part));
    return year || dateStr; // Return the year if found, otherwise return original string
  };

  const getPaperLink = (paper_id_type: string) => {
    if (paper_id_type === "pubmed" && paper?.paper_id) {
      return `https://pubmed.ncbi.nlm.nih.gov/${paper.paper_id}`;
    } else if (paper_id_type === "DOI" && paper?.paper_id) {
      return `https://doi.org/${paper.paper_id}`;
    } else if (paper_id_type === "NCT" && paper?.paper_id) {
      return `https://clinicaltrials.gov/study/${paper.paper_id}`;
    }
  };

  const getPaperType = (paper_id_type: string) => {
    if (paper_id_type?.toLowerCase() === "pubmed") {
      return "Pubmed Id";
    } else if (paper_id_type?.toLowerCase() === "doi") {
      return "DOI Id";
    } else if (paper_id_type?.toLowerCase() === "nct") {
      return "Clinical Trial Id";
    }
    return "";
  };

  return (
    <div className="d-flex align-items-center border-bottom py-3 prisma-text col-12 col-md-12">
      <div className="d-flex justify-content-center">
        <small className="date-circle">{getYear(paper?.publish_date)}</small>
      </div>

      <div className="flex-grow-1 px-3">
        <div className="text-truncate-2 paper-title">{paper?.title}</div>
        <div className="paper-type mt-2">
          <span>
          {paper?.paper_id_type && getPaperType(paper?.paper_id_type)}:{" "}
          </span>
          {paper?.paper_id_type && (
            <a
              href={getPaperLink(paper?.paper_id_type)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {paper?.id}
            </a>
          )}
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