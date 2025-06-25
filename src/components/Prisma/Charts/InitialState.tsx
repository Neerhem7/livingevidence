import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { Modal } from 'react-bootstrap';
import './chart.css';
import CustomNode from './CustomeNode';
import { RootState } from '../../../redux/store';
import { usePrismaPapers } from '../hooks/usePrismaPapers';

interface PrismaStats {
  total: number;
  living: number;
  initial: number;
  manual: number;
  duplicate: number;
  unique: number;
  unscreened: number;
  screened: number;
  excluded_by_title: number;
  excluded_by_abstract: number;
  fulltext_review: number;
  excluded_by_fulltext: number;
  include: number;
  analysis: number;
  include_n: number;
  analysis_n: number;
}

interface InitialStateChartProps {
  activeTab: string,
  nodeList: Array<any>;
  connections: Array<any>;
  stats?: PrismaStats;
  activeMonth?:string;
  onStateChange?: (activeState:string)=> void;
  onStateTextChange?: (stateText: string)=> void;
  activeState: string;
}

const InitialStateChart: React.FC<InitialStateChartProps> = ({activeTab, connections, nodeList, stats, activeMonth, activeState, onStateChange, onStateTextChange }) => {
  const dispatch = useAppDispatch();
  const { projectId, cqId } = useAppSelector((state: RootState) => state.projects.activeProject);
  const [showModal, setShowModal] = useState(false);
  const { searchPapers } = usePrismaPapers(activeTab, activeMonth || '', activeState);

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
    if (!projectId || !cqId) return;

    const parsedLabel = nodeLabel.replace(/\$(\w+)\$/g, (_: string, key: string) => {
      const value = stats?.[key as keyof PrismaStats];
      return value !== undefined ? String(value) : `0`;
    });

    if (nodeId === 'excluded_by_fulltext') {
      handleOpenModal();
    }
    
    onStateChange?.(nodeId);
    onStateTextChange?.(parsedLabel);
  };

  useEffect(() => {
    console.info("hello state chage in initial state chart", activeState)
    const isValidId = (id: string | null) => {
      if (!id) return false;
      if (id === '0') return false;
      return id !== '';
    };

    const hasValidIds = isValidId(projectId) && isValidId(cqId);
    
    if (activeState && hasValidIds) {
      searchPapers('');
    }
  }, [activeState]);

  useEffect(() => {
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
            M ${fromX},${fromY + 30} 
            H ${midPoint + 55}   
            V ${toHeightCenter} 
            H ${toBox.left - 40}    
          `;
          newPaths.push(path);
        }
      }
    });

    setPaths(newPaths);
  }, []);

  // Calculate dynamic content height and width
  const maxY = Math.max(...nodeList.map(node => node.y));
  const contentHeight = maxY + 120;
  const maxX = Math.max(...nodeList.map(node => node.x));
  const contentWidth = maxX + 250;

  // For scroll tracking
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState({ left: 0, top: 0 });
  useEffect(() => {
    const handleScroll = () => {
      if (chartRef.current) {
        setScroll({
          left: chartRef.current.scrollLeft,
          top: chartRef.current.scrollTop,
        });
      }
    };
    const chart = chartRef.current;
    if (chart) {
      chart.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (chart) {
        chart.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <>
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
      <div className="org-chart-wrapper position-relative h-100" style={{ width: contentWidth, margin: '0 auto' }}>
        <div style={{ position: 'absolute', left: -scroll.left, top: -scroll.top, pointerEvents: 'none', height: contentHeight, width: contentWidth, zIndex: 1 }}>
          <svg ref={svgRef} className="org-chart-lines" style={{ height: contentHeight, width: contentWidth }}>
            {paths.map((d, i) => (
              <path key={i} d={d} stroke="#4F959D" strokeWidth="4" fill="none" />
            ))}
          </svg>
        </div>
        <div
          className="org-chart text-center mx-auto"
          ref={chartRef}
          style={{ maxHeight: contentHeight, width: contentWidth }}
        >
          <div className="justify-content-center position-relative w-100" style={{ height: contentHeight }}>
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
                  x={node.x - scroll.left}
                  y={node.y - scroll.top}
                  styleType={node.styleType}
                  onClick={node.onClick}
                />
              );
            })}
          </div>
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

export default InitialStateChart;
