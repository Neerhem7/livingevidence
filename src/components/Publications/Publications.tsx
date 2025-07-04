import React from 'react'
import { Row, Col, Card } from 'react-bootstrap';
import '../../styles/style.css';

interface PublicationsProps {
  types: Array<any>,
  publications: Array<any>,
  description: string,
  title: string
}

const Publications: React.FC<PublicationsProps> = ({ types, publications, description, title }) => {
  // Group publications by type
  const grouped = publications.reduce((acc, pub) => {
    acc[pub.type] = acc[pub.type] || [];
    acc[pub.type].push(pub);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(grouped).map(([typeName, pubs]) => (
        <React.Fragment key={typeName}>
          <div className='bottom-full-line'></div>
          <Row className='d-flex m-5 justify-content-between'>
            <Col sm={3} className="">
              {typeName}
            </Col>
            <Col sm={9}>
           
              {(pubs as any[]).map((pub: any, idx: number) => (
                <Card
                  className={`project-card project-section-card mb-4 shadow-sm card-${idx+1}`}
                  key={pub.DOI || pub.title || idx+1}
                  style={{height: '400px !important'}}
                >
                  <Card.Body className={`card-${idx}`}>
                    <h5 className="card-title mb-2">{pub.title}</h5>
                    <hr />
                    <div><strong>Authors:</strong> {pub.Author}</div>
                    <div><strong>Date:</strong> {pub.Date}</div>
                    {pub.Journal_Conference && (
                      <div><strong>Journal/Conference:</strong> {pub.Journal_Conference}</div>
                    )}
                    {pub.DOI && (
                      <div>
                        <strong>DOI:</strong>{' '}
                        <a href={pub.DOI_Link} target="_blank" rel="noopener noreferrer">
                          {pub.DOI}
                        </a>
                      </div>
                    )}
                    {pub.PMID && (
                      <div>
                        <strong>PMID:</strong>{' '}
                        <a href={pub.PMID_Link} target="_blank" rel="noopener noreferrer">
                          {pub.PMID}
                        </a>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              ))}
                </Col>
            
          </Row>
        </React.Fragment>
      ))}

      <div className='bottom-full-line'></div>
      <Row className='d-flex m-5 justify-content-between align-items-center'>


      </Row>
    </div>
  )
}

export default Publications
