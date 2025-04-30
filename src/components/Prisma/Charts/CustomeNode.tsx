import React, { useEffect, useState, forwardRef } from 'react';
import { Card } from 'react-bootstrap';
import './chart.css';

interface CustomNodeProps {
  nodeId: string;
  label: string;
  x: number;
  y: number;
  styleType: string;
  onClick?: () => void;
}

const CustomNode = forwardRef<HTMLDivElement, CustomNodeProps>(({
  nodeId,
  label,
  x,
  y,
  styleType = 'primary',
  onClick,
}, ref) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card
      ref={ref}
      id={nodeId}
      className={`node-${styleType} position-absolute org-node`}
      onClick={onClick}
      title={label}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        opacity: visible ? 1 : 0,
        cursor: 'pointer',
      }}
    >
      <Card.Body
        className={`p-2 text-center d-flex align-items-center justify-content-center`}
        style={{
          height: '100%',
          fontSize: '12px',
          whiteSpace: 'normal',
          overflow: 'hidden',
        }}
      >
        {label.split('\n').map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </Card.Body>
    </Card>
  );
});

export default CustomNode;
