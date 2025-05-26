import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Row, Col } from 'react-bootstrap';
import PrismaDiagram from '../components/Prisma/PrismaDiagram';
import PrismaPapers from '../components/Prisma/PrismaPapers';
import {
  fetchCurrentStats,
  fetchInitialStats,
  fetchLivingStats,
} from "../redux/prismaDiagramSlice";
import useMediaQuery from '../hooks/useMediaQuery';
import '../components/Prisma/prisma.css';

const Prisma: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const dispatch = useAppDispatch();
  const { projectId, cqId } = useAppSelector((state) => state.project);
  const hasInitialized = useRef(false);

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
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      return;
    }

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

  if (!projectId || !cqId) {
    return <div>Loading...</div>;
  }

  return (
    <div className={isMobile ? 'prisma-mobile-container' : ''}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>PRISMA</h3>
      <Row className={`${isMobile ? '' : 'mt-5 mb-5'} h-100`}>
        <Col 
          className={`order-2 order-sm-1 h-100 ${isMobile ? 'd-none d-sm-block' : ''}`} 
          sm={6}
        >
          <PrismaDiagram 
            onTabChange={handleTabChange} 
            onMonthChange={setSelectedMonth}
            onStateChange={setActiveState}
            onStateTextChange={setActiveStateText}
            selectedMonth={selectedMonth} 
            activeTab={activeTab}
            activeState={activeState} 
          />
        </Col>

        <Col 
          className={`order-1 order-sm-2 ${isMobile ? 'prisma-mobile-body' : ''}`} 
          sm={6}
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
  );
};

export default Prisma;
