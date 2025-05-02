import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../redux/store';
import './chart.css';
import { Modal } from 'react-bootstrap';
import CustomNode from './CustomeNode';
import { PRISMA_NODES } from './Constants';
import {
  fetchCurrentPapers,
  fetchInitialPapers,
  fetchLivingPapers,
} from "../../../redux/prismaPaperSlice";

type PrismaStats = {
  total: 0,
  living: 0,
  initial: 0,
  manual: 0,
  duplicate: 0,
  unique: 0,
  unscreened: 0,
  screened: 0,
  excluded_by_title: 0,
  excluded_by_abstract: 0,
  fulltext_review: 0,
  excluded_by_fulltext: 0,
  include: 0,
  analysis: 0,
  include_n: 0,
  analysis_n: 0
};

interface CurrentStateChartProps {
  activeTab: string,
  nodeList: Array<any>;
  connections: Array<any>;
  onStateChange?: (activeState: string) => void;
  onStateTextChange?: (stateText: string) => void;
  activeState: string;
  stats?: PrismaStats;
}

const CurrentStateChart: React.FC<CurrentStateChartProps> = ({ activeTab, connections, nodeList, stats, onStateChange, onStateTextChange }) => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [paths, setPaths] = useState<string[]>([]);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const currentYearMonth = `${currentYear}-${currentMonth}`;

  const nodeData = nodeList.map(node => ({
    ...node,
    onClick: () => handleNodeClick(node.id, node.label),
  }));

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNodeClick = (nodeId: string, nodeLabel: string) => {
    const clickableNodes = ['analysis', 'include', 'manual'];
    const parsedLabel = nodeLabel.replace(/\$(\w+)\$/g, (_: string, key: string) => {
      const value = stats?.[key as keyof PrismaStats];
      return value !== undefined ? String(value) : `0`;
    });
    if (nodeId === 'excluded_by_fulltext') {
      handleOpenModal()
    }
    else {
      if (activeTab === "Current State") {

        dispatch(fetchCurrentPapers({ stage: nodeId, page: 1, size: 10 }));
      } else if (activeTab === "Initial Search") {
        dispatch(fetchInitialPapers({ stage: nodeId, page: 1, size: 10 }));
      } else if (activeTab === "Living Search") {
        dispatch(fetchLivingPapers({ stage: nodeId, month: currentYearMonth, page: 1, size: 10 }));
      }
    }
    onStateChange?.(nodeId);
    onStateTextChange?.(parsedLabel);
    console.info("onStateChange", nodeId, nodeLabel, parsedLabel)
  };

  const createSVGPath = () => {
    const svg = svgRef.current;
    if (!svg) return;

    const svgBox = svg.getBoundingClientRect();
    const newPaths: string[] = [];

    connections.forEach(({ from, to, type }) => {
      const fromEl = nodeRefs.current[from];
      const toEl = nodeRefs.current[to];

      if (fromEl && toEl) {
        const fromBox = fromEl.getBoundingClientRect();
        const toBox = toEl.getBoundingClientRect();

        const fromCenterX = (fromBox.left + fromBox.right) / 2;
        const fromBottomY = fromBox.bottom;

        const toCenterX = (toBox.left + toBox.right) / 2;
        const toCenterY = (toBox.top + toBox.bottom) / 2;
        const toTopY = toBox.top;
        const toLeftX = toBox.left;

        const fromX = fromCenterX - svgBox.left;
        const fromY = fromBottomY - svgBox.top - 20;
        const toX = toCenterX - svgBox.left;
        const toY = toTopY - svgBox.top;
        const toCenterYAdjusted = toCenterY - svgBox.top;
        const toLeftXAdjusted = toLeftX - svgBox.left;

        if (type === 'straight') {
          const straightLine = `M ${fromX},${fromY} L ${toX},${toY - 20}`;
          newPaths.push(straightLine);
        }

        else if (type === 'left-right-bottom') {
          const verticalGap = Math.abs(toY - fromY);
          const verticalPart = verticalGap / 3;
          const horizontalMoveX = toX;

          const leftToRightPath = `
            M ${fromX},${fromY} 
            L ${fromX},${fromY + verticalPart} 
            H ${horizontalMoveX}  
            V ${toY}  
          `;

          newPaths.push(leftToRightPath);
        }

        else if (type === 'left-to-center-right') {
          const verticalGap = Math.abs(toCenterYAdjusted - fromY);
          const verticalPart = verticalGap / 2;

          const leftToCenterRightPath = `
            M ${fromX},${fromY} 
            L ${fromX},${fromY + verticalPart} 
            H ${toLeftXAdjusted} 
          `;
          newPaths.push(leftToCenterRightPath);
        }

        else if (type === '2-left-to-center-right') {
          const fromCenterX = (fromBox.left + fromBox.right) / 2;
          const fromBottomY = fromBox.bottom;

          const toLeftX = toBox.left;
          const toCenterY = (toBox.top + toBox.bottom) / 2;

          const fromX = fromCenterX - svgBox.left;
          const fromY = fromBottomY - svgBox.top;
          const toX = toLeftX - svgBox.left;

          const midPoint = (fromX + toX) / 2;
          const toHeightCenter = toCenterY - 20 - svgBox.top
          const path = `
            M ${fromX},${fromY + 10} 
            H ${midPoint + 55}   
            V ${toHeightCenter} 
            H ${toBox.left - 40}    
          `;
          newPaths.push(path);
        }
      }
    });

    setPaths(newPaths);
  }




  useEffect(() => {
    const parsedLabel = PRISMA_NODES.INITIAL_SEARCH.replace(/\$(\w+)\$/g, (_: string, key: string) => {
      const value = stats?.[key as keyof PrismaStats];
      return value !== undefined ? String(value) : `0`;
    });
    onStateTextChange?.(parsedLabel);
    createSVGPath();
  }, []);

  return (
    <>
      <div className="org-chart-wrapper position-relative w-100 h-100">
        <svg ref={svgRef} className="org-chart-lines position-absolute w-100 h-100" style={{

        }}>
          {paths.map((d, i) => (
            <path key={i} d={d} stroke="#4F959D" strokeWidth="4" fill="none" className="animated-path" />
          ))}
        </svg>

        <div className="org-chart container text-center">
          <div className="justify-content-center position-relative w-100 h-100">
            {nodeData.map((node) => {
              const parsedLabel = node.label.replace(/\$(\w+)\$/g, (_: string, key: string) => {
                const value = stats?.[key as keyof PrismaStats];
                return value !== undefined ? String(value) : `0`;
              });

              return (
                <CustomNode
                  key={node.id}
                  ref={(el) => { nodeRefs.current[node.id] = el }}
                  nodeId={node.id}
                  label={parsedLabel}
                  x={node.x}
                  y={node.y}
                  styleType={node.styleType}
                  onClick={node.onClick}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Excluded by full text review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Full-text articles were excluded by the following reasons:
        </Modal.Body>

      </Modal>
    </>
  );
};

export default CurrentStateChart;
