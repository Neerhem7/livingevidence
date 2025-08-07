import React from "react";
import { Alert, Row, Spinner } from "react-bootstrap";
import { PaperCardProps } from "../types";
import "../prisma.css";
import { getPaperLink, getPaperType } from "../../../utils/utils";

const PaperCard: React.FC<PaperCardProps> = React.memo(
  ({ paper, onViewDetails }) => {
    const [verifyingLink, setVerifyingLink] = React.useState<boolean>(false);
    const [verificationFailed, setVerificationFailed] =
      React.useState<boolean>(false);

    const fetchPaperLink = () => {
      if (paper && paper?.paper_id_type && paper?.paper_id) {
        setVerifyingLink(true);
        getPaperLink(paper?.paper_id_type, paper?.paper_id).then((link) => {
          if (link && link.length > 0) {
            window.open(link, "_blank");
          } else {
            setVerificationFailed(!link);
          }
          setVerifyingLink(false);
          setTimeout(() => {
            setVerificationFailed(false);
          }, 5000);
        });
      }
    };

    const getYear = (dateStr: string) => {
      const yearFromDate = new Date(dateStr);
      if (
        yearFromDate &&
        yearFromDate?.getFullYear() &&
        !isNaN(yearFromDate.getFullYear())
      ) {
        return yearFromDate?.getFullYear()?.toString();
      }
      return dateStr;
    };

    return (
      <>
        <Row className="d-flex align-items-center justify-content-center">
          <Alert
            variant="danger"
            role="alert"
            className="d-flex justify-content-center text-center mt-2 mb-0 w-50"
            show={verificationFailed}
            onClose={() => setVerificationFailed(false)}
            dismissible
          >
            No Paper Found with this PMID
          </Alert>
        </Row>
        <div className="d-flex align-items-center border-bottom py-3 prisma-text col-12 col-md-12">
          <div className="d-flex justify-content-center">
            <small className="date-circle">
              {getYear(paper?.publish_date)}
            </small>
          </div>

          <div className="flex-grow-1 px-3">
            <div className="text-truncate-2 paper-title">{paper?.title}</div>
            <div className="paper-type d-flex align-items-start mt-2">
              <span className="doi-pm">
                <span>
                  {paper?.paper_id_type && getPaperType(paper?.paper_id_type)}:{" "}
                </span>
                {paper?.paper_id_type && (
                  <span
                    style={{ cursor: "pointer", color: "#007bff" }}
                    onClick={() => {
                      !verifyingLink &&
                        paper?.paper_id_type?.toLowerCase() !== "doi" &&
                        fetchPaperLink();
                    }}
                  >
                    {verifyingLink ? (
                      <>
                        Verifying Link...{" "}
                        <Spinner animation="border" size="sm" />
                      </>
                    ) : (
                      paper?.paper_id
                    )}
                  </span>
                )}
              </span>
              {paper?.nct_number ? (
                <span className="ms-2 nct-number">
                  <span>{"NCT"}: </span>
                  {
                    <a
                      href={`https://clinicaltrials.gov/study/${paper.nct_number}`}
                      target="_blank"
                      style={{
                        outline: "none",
                        textDecoration: "none",
                        color: "#007bff",
                      }}
                      rel="noopener noreferrer"
                    >
                      {paper?.nct_number}
                    </a>
                  }
                </span>
              ) : null}
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
      </>
    );
  }
);

PaperCard.displayName = "PaperCard";

export default PaperCard;
