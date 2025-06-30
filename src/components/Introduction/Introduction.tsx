import React from 'react'
import { Row, Col } from 'react-bootstrap';
import '../../styles/style.css'

interface IntroductionProps {
  concept_diagram: string,
  description: string,
  title: string
}


const Introduction: React.FC<IntroductionProps> = ({concept_diagram, description, title}) => {
  return (
    <>
      <Row className='d-flex  m-5 justify-content-between align-items-center'>
        <Col sm={3} className=''>
          <img src="/pub/logo.png" alt="Logo" className="logo" />
        </Col>
        <Col sm={9} className='left-border-container'>
          <h5>
            {title}
           </h5>
        </Col>
      </Row>
      <Row className='d-flex m-5 justify-content-between align-items-center'>
        <Col sm={12} className='mt-4'>
        {concept_diagram && (
            <div className="concept-diagram-container">
              <img src={concept_diagram} alt="Concept Diagram" className="img-fluid" />
            </div>
          )}
        </Col>
        <Col className='mt-5'>
        {description && (
             <p dangerouslySetInnerHTML={{ __html: description }} />
           )}
        </Col>

      </Row>
    </>
  )
}

export default Introduction
