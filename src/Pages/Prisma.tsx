import React, { useEffect, useState } from 'react';
import { useAppDispatch } from "../redux/store";
import { Col, Row } from 'react-bootstrap';
import PrismaDiagram from '../components/Prisma/PrismaDiagram';
import PrismaPapers from '../components/Prisma/PrismaPapers';
import {
  fetchCurrentPapers,
  fetchInitialPapers,
  fetchLivingPapers,
} from "../redux/prismaPaperSlice";
import {
  fetchCurrentStats,
  fetchInitialStats,
  fetchLivingStats,
} from "../redux/prismaDiagramSlice";



const Prisma: React.FC = () => {
  const dispatch = useAppDispatch();

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

  useEffect(() => {
   

    dispatch(fetchCurrentPapers({ stage:'total',page: 1, size: 10 }));
    dispatch(fetchCurrentStats());
    dispatch(fetchInitialPapers({ stage:'total',page: 1, size: 10 }));
    dispatch(fetchInitialStats());
    dispatch(fetchLivingPapers({stage:'total', month: currentYearMonth, page: 1, size: 10 }));
    dispatch(fetchLivingStats(currentYearMonth));

  }, []);


  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>PRISMA</h3>
      <Row>
        <Col className='m-4' sm={6}>
          <PrismaDiagram onTabChange={handleTabChange} 
           onMonthChange={setSelectedMonth}
           onStateChange={setActiveState}
           onStateTextChange={setActiveStateText}
           selectedMonth={selectedMonth} 
           activeTab={activeTab}
           activeState={activeState} />
        </Col>
        <Col>
          <PrismaPapers activeTab={activeTab}  selectedMonth={selectedMonth} activeState={activeState} activeStateText={activeStateText} />
        </Col>
      </Row>

    </div>
  );
};

export default Prisma;
