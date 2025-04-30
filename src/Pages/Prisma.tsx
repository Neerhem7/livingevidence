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

  const [activeTab, setActiveTab] = useState<string>('Current State');


  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const currentYearMonth = `${currentYear}-${currentMonth}`;

    dispatch(fetchCurrentPapers({ stage:'include',page: 1, size: 10 }));
    dispatch(fetchCurrentStats());
    dispatch(fetchInitialPapers({ stage:'include',page: 1, size: 10 }));
    dispatch(fetchInitialStats());
    dispatch(fetchLivingPapers({stage:'include', month: currentYearMonth, page: 1, size: 10 }));
    dispatch(fetchLivingStats(currentYearMonth));

  }, []);


  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>PRISMA</h3>
      <Row>
        <Col className='m-4' sm={6}>
          <PrismaDiagram onTabChange={handleTabChange} activeTab={activeTab} />
        </Col>
        <Col>
          <PrismaPapers activeTab={activeTab} />
        </Col>
      </Row>

    </div>
  );
};

export default Prisma;
