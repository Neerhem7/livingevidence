import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch } from "../../redux/store";
import { useSearchParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import PrismaDiagram from './PrismaDiagram';
import PrismaPapers from './PrismaPapers';
import {
  fetchCurrentStats,
  fetchInitialStats,
  fetchLivingStats,
} from "../../redux/prismaDiagramSlice";
import useMediaQuery from '../../hooks/useMediaQuery';
import './prisma.css';

interface PrismaProps {
  description?: string,
  title?: string
}

const Prisma: React.FC<PrismaProps> = ({ description, title }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isNarrow = useMediaQuery('(max-width: 1299px)');
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');
  const cqId = searchParams.get('cqId');
  const hasInitialized = useRef(false);
  const col1Ref = useRef<HTMLDivElement | null>(null);
  const [col1Height, setCol1Height] = useState<number | undefined>(undefined);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const currentYearMonth = `${currentYear}-${currentMonth}`;

  const [activeTab, setActiveTab] = useState<string>('Current State');
  const [selectedMonth, setSelectedMonth] = useState(currentYearMonth);
  const [activeState, setActiveState] = useState('initial');
  const [activeStateText, setActiveStateText] = useState('');

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  // Load initial stats for the current tab only
  useEffect(() => {
    // Skip if we don't have valid IDs or if this is the initial render with empty IDs
    if (!projectId || !cqId || projectId === '' || cqId === '') return;
    // Skip the initial render, only run on actual ID updates
    // if (!hasInitialized.current) {
    //   hasInitialized.current = true;
    //   return;
    // }
    // Load stats based on active tab
    if (activeTab === 'Current State') {
      dispatch(fetchCurrentStats({ projectId, cqId }));
    } else if (activeTab === 'Initial Search') {
      dispatch(fetchInitialStats({ projectId, cqId }));
    } else if (activeTab === 'Living Search') {
      dispatch(fetchLivingStats({ projectId, cqId, endDate: currentYearMonth }));
    }
  }, [projectId, cqId, activeTab, dispatch, currentYearMonth]);

  // Reset initialization flag when project or CQ changes
  useEffect(() => {
    if (projectId === '' || cqId === '') {
      hasInitialized.current = false;
    }
  }, [projectId, cqId]);

  useEffect(() => {
    if (col1Ref.current) {
      setCol1Height(col1Ref.current.offsetHeight);
    }
  }, [isMobile, isNarrow, activeTab, selectedMonth, activeState, activeStateText]);

  if (!projectId || !cqId) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Row className='d-flex  m-5 justify-content-between align-items-center'>
        <Col sm={4} className=''>
          <h3>{title}</h3>
          <div className='bottom-line'></div>
        </Col>
        <Col sm={8} >
        {description && (
             <p dangerouslySetInnerHTML={{ __html: description }} />
           )}    </Col>

      </Row>
      <div className={isMobile ? 'prisma-mobile-container' : ''}>
        <Row className={`${isMobile ? '' : 'mt-5 mb-5'} h-100`}>
          <Col
            className={`order-2 order-sm-1 h-100 ${isNarrow ? 'col-12 mb-4' : 'col-6'} ${isMobile ? 'mt-5' : ''}`}
          >
            <div ref={col1Ref} style={{ height: '100%' }}>
              <PrismaDiagram
                onTabChange={handleTabChange}
                onMonthChange={setSelectedMonth}
                onStateChange={setActiveState}
                onStateTextChange={setActiveStateText}
                selectedMonth={selectedMonth}
                activeTab={activeTab}
                activeState={activeState}
              />
            </div>
          </Col>

          <Col
            className={`order-1 order-sm-2 ${isMobile ? 'prisma-mobile-body mb-4' : ''}`}
            style={col1Height ? { maxHeight: col1Height } : {}}
          >
            <PrismaPapers
              activeTab={activeTab}
              selectedMonth={selectedMonth}
              activeState={activeState}
              activeStateText={activeStateText}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Prisma;
