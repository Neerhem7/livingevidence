import React from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';
import './ProjectCard.css'; // Import the new styles

// Define the types based on your projectSlice structure
interface ClinicalQuestion {
    name: string;
    abbr: string;
    id: string;
}

interface Project {
    name: string;
    abbr: string;
    id: string;
    clinical_questions: ClinicalQuestion[];
}

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <Card className="project-card">
            <Card.Header as="h5">{project.name}</Card.Header>
            <Card.Body>
                <ListGroup variant="flush">
                    {project.clinical_questions.map((cq) => (
                        <ListGroup.Item key={cq.id || cq.name}>
                            <Link to={`/public-web?projectId=${project.id}&cqId=${cq.id}`}>
                                {cq.name || cq.abbr }
                            </Link>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default ProjectCard; 