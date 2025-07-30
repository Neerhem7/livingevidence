import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup, Button } from 'react-bootstrap';
import './ProjectCard.css';



interface ClinicalQuestion {
    name: string;
    abbr: string;
    id: string;
}

interface Section {
    title?: string;
    description?: string;
    isvisible?: boolean;
}

interface ProjectSectionCardProps {
    section: { title?: string; [key: string]: any };
    title: string;
    sectionName: string;
    cardNumber?: number;
    projectId: string;
    cqId: string;
    extraComponent?: React.ReactNode;
    isProtected?: string;
}

const ProjectSectionCard: React.FC<ProjectSectionCardProps> = ({isProtected, sectionName, section, title, cardNumber = 1, projectId, cqId, extraComponent }) => {
    const [expanded, setExpanded] = useState(false);
    const [isClamped, setIsClamped] = useState(false);
    const contentRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const el = contentRef.current;
        if (el) {
            setIsClamped(el.scrollHeight > el.clientHeight);
        }
    }, [section?.title]);

    return (
        <Card
            className={`project-card project-section-card mb-4 shadow-sm card-${cardNumber}`}
        >
            <Card.Body className={`card-${cardNumber}`}>
                <h5 className={`card-title mb-2  `}>{title}</h5>
                <hr />
                <p
                    ref={contentRef}
                    className={`card-section-content ${expanded ? 'expanded' : 'clamped'}`}
                    dangerouslySetInnerHTML={{ __html: section?.description }}
                />

                <div className="d-flex justify-content-end mt-3">
                    <Link
                        to={`/public-web/${sectionName}?projectId=${projectId}&cqId=${cqId}${isProtected === 'true' ? '&live=true' : '&false'}`}
                        className={`btn btn-primary btn-sm learn-more-btn card-${cardNumber}`}
                    >
                        Learn More
                    </Link>
                </div>
                {extraComponent && <div className="mt-3">{extraComponent}</div>}
            </Card.Body>
        </Card>
    );
};

export default ProjectSectionCard; 