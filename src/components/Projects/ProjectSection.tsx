import React from 'react';
import { Row, Col } from 'react-bootstrap';

interface ProjectSectionProps {
  component?: React.ReactNode;
  title?: string;
  project?: { project_title?: string };
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ component, title, project }) => {
  return (
    <>
    <Row className='d-flex  m-5 justify-content-between align-items-center'>
        <Col sm={3} className=''>
        {project?.project_title && <span className="project-logo-name">{project.project_title}</span>}
    
        </Col>
        <Col sm={9} className='left-border-container'>
          <h5>
            {title}
          </h5>
         
        </Col>
      </Row>
      <Row >
         {component && <div className="mt-3">{component}</div>}
      </Row>
      </>
  )
}

export default ProjectSection
