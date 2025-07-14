import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { Row, Col } from "react-bootstrap";
import ProjectCard from '../Projects/ProjectCard';
interface Props {}




const DashboardProjects: React.FC<Props> = () => {
    const { userProjects, userProjectsLoading, userProjectsError } = useAppSelector((state) => state.projects);

    return (
        <Row className='m-5'>
    
        {userProjectsLoading === 'pending' && <p>Loading projects...</p>}
        {userProjectsError && <p>Error: {userProjectsError}</p>}
        {userProjectsLoading === 'succeeded' && userProjects.map(project => (
            <Col lg={3} md={4} sm={6} xs={12} key={project.id} className="mb-4">
                <ProjectCard project={project}  live={true}/>
            </Col>
        ))}
    </Row>
    );
};

export default DashboardProjects;