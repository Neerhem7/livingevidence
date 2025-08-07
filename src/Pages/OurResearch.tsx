import React, { useEffect } from 'react';
import '../styles/style.css'
import { Row, Col } from 'react-bootstrap';
import useMediaQuery from '../hooks/useMediaQuery';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchProjects } from '../redux/projectSlice';
import ProjectCard from '../components/Projects/ProjectCard';

const OurResearch = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const dispatch = useAppDispatch();
    const { projects, projectsLoading, projectsError } = useAppSelector((state) => state.projects);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);
    return (
        <>
            {isMobile ?
                <Row className='d-flex justify-content-between align-items-center'>
                    <Col sm={12} className='full-bg-container'>
                        <h3>Our Research</h3>
                        <div className='bottom-line bottom-white-line'></div>
                        <h5>
                            Pioneering living evidence reviews, collaborative research, and transformative projects to support healthcare professionals, researchers, policymakers, and patients worldwide.            </h5>
                    </Col>
                </Row>
                :
                <Row className='d-flex  m-5 justify-content-between align-items-center'>
                    <Col sm={2} className=''>
                        <h3>Our Research</h3>
                        <div className='bottom-line'></div>
                    </Col>
                    <Col sm={9} className='left-border-container'>
                        <h5>
                            Pioneering living evidence reviews, collaborative research, and transformative projects to support healthcare professionals, researchers, policymakers, and patients worldwide.            </h5>
                    </Col>

                </Row>}
            <Row className='m-5'>
                <Col sm={12} className='mt-5 mb-5'>
                    <p>
                        We foster multidisciplinary collaboration by actively engaging with guideline developers, healthcare professionals, consumers, and policymakers. This ongoing dialogue ensures our team remains attuned to the most pressing unanswered questions in healthcare — and committed to addressing them through focused research.
                        Our projects and initiatives generate critical, high-quality evidence that informs decision-making and improves health outcomes. By delivering timely, trustworthy insights, we support better care, policy, and practice.
                    </p>
                </Col>
                <Col sm={12} className='mb-4'>
                    <h4>Major Projects</h4>
                    <div className='bottom-line'></div>
                </Col>
                {projectsLoading === 'pending' && <p>Loading projects...</p>}
                {projectsError && <p>Error: {projectsError}</p>}
                {projectsLoading === 'succeeded' && projects.map(project => (
                    <Col lg={3} md={4} sm={6} xs={12} key={project.id} className="mb-4">
                        <ProjectCard project={project} />
                    </Col>
                ))}
            </Row>
        </>


    )
}

export default OurResearch
