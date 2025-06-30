import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import './chart.css';
import { Modal } from 'react-bootstrap';
import CustomNode from './CustomeNode';
import { PRISMA_NODES } from './Constants';
import { fetchFullTextExcludeReasons } from '../../../redux/prismaDiagramSlice';
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

type ExcludeReason = {
  reason: string;
  count: number;
};

interface CurrentStateChartProps {
  activeTab: string,
  nodeList: Array<any>;
  connections: Array<any>;
  onStateChange?: (activeState: string) => void;
  onStateTextChange?: (stateText: string) => void;
  activeState: string;
  stats?: PrismaStats;
  fullTextExcludeReason: ExcludeReason[];
}

const CurrentStateChart: React.FC<CurrentStateChartProps> = ({
  activeTab,
  connections,
  nodeList,
  stats,
  onStateChange,
  onStateTextChange,
  fullTextExcludeReason,
  activeState
}) => {
  const dispatch = useAppDispatch();
  const { projectId, cqId } = useAppSelector((state: RootState) => state.projects.activeProject);
  const [showModal, setShowModal] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const { searchPapers } = usePrismaPapers(activeTab, '', activeState);

  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [paths, setPaths] = useState<string[]>([]);

  // Find the max y position among nodes for dynamic height
  const maxY = Math.max(...nodeList.map(node => node.y));
  const contentHeight = maxY + 120; // Add padding for node height and spacing

  // Find the max x position among nodes for dynamic width
  const maxX = Math.max(...nodeList.map(node => node.x));
  const contentWidth = maxX + 250; // Add padding for node width and spacing

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
      dispatch(fetchFullTextExcludeReasons({ projectId, cqId }));
      handleOpenModal();
    }
    
    onStateChange?.(nodeId);
    onStateTextChange?.(parsedLabel);
  };

  useEffect(() => {
    console.info("hello state chage in current state chart", activeState)
    const isValidId = (id: string | null) => {
      if (!id) return false;
      if (id === '0') return false;
      return id !== '';
    };

    const hasValidIds = isValidId(projectId) && isValidId(cqId);
    
    if (activeState && hasValidIds) {
      searchPapers('');
    }
  }, [activeState, projectId, cqId]);

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

          const leftToRightPath = `\n            M ${fromX},${fromY} \n            L ${fromX},${fromY + verticalPart} \n            H ${horizontalMoveX}  \n            V ${toY}  \n          `;

          newPaths.push(leftToRightPath);
        }
        else if (type === 'left-to-center-right') {
          const verticalGap = Math.abs(toCenterYAdjusted - fromY);
          const verticalPart = verticalGap / 2;

          const leftToCenterRightPath = `\n            M ${fromX},${fromY} \n            L ${fromX},${fromY + verticalPart} \n            H ${toLeftXAdjusted+20} \n          `;
          newPaths.push(leftToCenterRightPath);
        }
        else if (type === '2-left-to-center-right') {
          const fromCenterX = (fromBox.left + fromBox.right) / 2;
          const fromBottomY = fromBox.bottom;
            console.info("toleft box", toBox)
          const toLeftX = toBox.left;
          const toCenterY = (toBox.top + toBox.bottom) / 2;

          const fromX = fromCenterX - svgBox.left;
          const fromY = fromBottomY - svgBox.top;
          const toX = toLeftX - svgBox.left;

          const midPoint = (fromX + toX) / 2;
          const toHeightCenter = toCenterY - 20 - svgBox.top;
          const path = `\n            M ${fromX},${fromY + 10} \n            H ${midPoint + 55}   \n            V ${toHeightCenter} \n            H ${toBox.left}    \n          `;
          newPaths.push(path);
        }
      }
    });

    setPaths(newPaths);
  };

  useEffect(() => {
    if (projectId && cqId && stats && !hasInitialized) {
      const parsedLabel = PRISMA_NODES.INITIAL_SEARCH.replace(/\$(\w+)\$/g, (_: string, key: string) => {
        const value = stats?.[key as keyof PrismaStats];
        return value !== undefined ? String(value) : `0`;
      });
      onStateTextChange?.(parsedLabel);
      setHasInitialized(true);
    }
  }, [projectId, cqId, stats, hasInitialized, onStateTextChange]);

  useEffect(() => {
    if (nodeRefs.current && Object.keys(nodeRefs.current).length > 0) {
      createSVGPath();
    }
  }, [nodeRefs.current, connections]);

  // Add a ref to the org-chart div to track scroll position
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState({ left: 0, top: 0 });

  // Update scroll position state on scroll
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
        <div className="org-chart-wrapper position-relative h-100" style={{ width: contentWidth }}>
          <div style={{ position: 'absolute', left: -scroll.left, top: -scroll.top, pointerEvents: 'none', height: contentHeight, width: contentWidth, zIndex: 1 }}>
            <svg ref={svgRef} className="org-chart-lines" style={{ height: contentHeight, width: contentWidth }}>
              {paths.map((d, i) => (
                <path key={i} d={d} stroke="#4F959D" strokeWidth="4" fill="none" className="animated-path" />
              ))}
            </svg>
          </div>
          <div
            className="org-chart text-center mx-auto"
            ref={chartRef}
            style={{ maxHeight: contentHeight, width: contentWidth-60 }}
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
      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal-width">
        <Modal.Header closeButton>
          <Modal.Title>Excluded by full text review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Full-text articles were excluded by the following reasons:</p>
          <ul style={{ paddingLeft: '20px' }}>
            {fullTextExcludeReason.map((item, index) => (
              <li key={index}>
                <strong>{item.reason}</strong>: {item.count}
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CurrentStateChart;