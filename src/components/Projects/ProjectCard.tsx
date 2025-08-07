import React from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';
import './ProjectCard.css'; // Import the new styles

// Define the types based on your projectSlice structure
interface ClinicalQuestion {
    clinical_question_title: string;
    clinical_unique_abbr: string;
    clinical_question_id: string;
}

interface Project {
    project_title: string;
    abbr: string;
    project_id: string;
    clinical_questions: ClinicalQuestion[];
}

interface ProjectCardProps {
    project: Project;
    live?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, live }) => {
    return (
        <Card className="project-card">
            <Card.Header as="h5">{project.project_title}</Card.Header>
            <Card.Body className='project-card-body'>
                <ListGroup>
                    {project.clinical_questions.map((cq) => (
                        <ListGroup.Item className='project-card-item' key={cq.clinical_question_id || cq.clinical_question_title}>
                            <Link
                                to={`/public-web?projectId=${project.project_id}&cqId=${cq.clinical_question_id}${live ? '&live=true' : ''}`}
                            >    {cq.clinical_question_title || cq.clinical_unique_abbr}
                            </Link>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default ProjectCard; 