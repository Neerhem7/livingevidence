import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useAppDispatch, useAppSelector,RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { fetchActiveProjectWeb } from '../redux/projectSlice';
import Prisma from '../components/Prisma/Prisma';
import ITable from '../components/SummaryTables/ITable';
import Introduction from '../components/Introduction/Introduction';
import '../styles/style.css';
import ProjectSectionCard from '../components/Projects/ProjectSectionCard';

const sectionComponents: { [key: string]: React.ComponentType<any> } = {
  home: Introduction,
  introduction: Introduction,
  prisma: Prisma,
  itable: ITable,
  // Add more mappings as needed
};

const PublicWeb: React.FC = () => {
  const [searchParams] = useSearchParams();
  const activeProjectWeb = useAppSelector((state) => state.projects.activeProjectWeb);
  const dispatch = useAppDispatch();

  const projectId = searchParams.get('projectId');
  const cqId = searchParams.get('cqId');
  const projects = useSelector((state: RootState) => state.projects.projects);
  const project = projects.find((p: any) => String(p.id) === String(projectId));
  const navigation = activeProjectWeb?.navigation || [];
  const mainContent = activeProjectWeb?.main_content || {};


  useEffect(() => {
    if (projectId && cqId) {
      dispatch(fetchActiveProjectWeb({ projectId, cqId }));
    }
  }, [dispatch, projectId, cqId]);

  if (!activeProjectWeb || !activeProjectWeb.main_content) {
    return <div>Loading...</div>;
  }

  return (

    <div className="m-5">
      <Row className='d-flex  m-5 justify-content-between align-items-center'>
        <Col sm={3} className=''>
        <span className="project-logo-name">{project?.name}</span>
        </Col>
        <Col sm={9} className='left-border-container'>
          <h5>
            {mainContent.introduction.title}
           </h5>
        </Col>
      </Row>
      <Row  className='d-flex  m-5'>
      {navigation.filter((item: any) => item.isvisible).map((item: any, idx: number) => (
        <Col className='mb-5' sm={3} id={item.section} key={item.section}>
           <ProjectSectionCard projectId={projectId || ''} cqId={cqId || ''} title={item.title} sectionName={item.section} section={mainContent[item.section]} cardNumber={idx + 1} />
        </Col>
      ))}
       </Row>
    </div>
  );
};

export default PublicWeb;
