import React from "react";
import { Row, Col } from "react-bootstrap";

interface ProjectSectionProps {
  component?: React.ReactNode;
  title?: string;
  project?: { project_title?: string };
  clinicalQuestion?: {
    clinical_question_title?: string;
    clinical_unique_abbr?: string;
  };
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  component,
  title,
  project,
  clinicalQuestion,
}) => {
  return (
    <>
      <Row className="d-flex  m-5 justify-content-between align-items-center">
        <Col sm={3} className="">
          {project?.project_title && (
            <span className="project-logo-name">
              {project.project_title}
              {clinicalQuestion?.clinical_question_title && (
                <span style={{ marginTop: "5px", fontSize: "0.9em" }}>
                  ({clinicalQuestion.clinical_question_title})
                </span>
              )}
            </span>
          )}
        </Col>
        <Col sm={9} className="left-border-container">
          <h5>{title}</h5>
        </Col>
      </Row>
      <Row>{component && <div className="mt-3">{component}</div>}</Row>
    </>
  );
};

export default ProjectSection;
