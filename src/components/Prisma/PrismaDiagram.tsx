import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Tabs from '../Tabs/Tab';
import CurrentStateChart from './Charts/CurrentStateChart';
import InitialStateChart from './Charts/InitialState';
import Living from './Living';
import { prisma_data } from './Charts/Prisma_Data';
import { RootState } from '../../redux/store';

type PrismaLivingStats = {
  month: string;
  count: number;
  total_papers: number
}

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
const defaultStats: PrismaStats = {
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


interface PrismaDiagramProps {
  onTabChange?: (activeTab: string) => void;
  activeTab: string
}

const PrismaDiagram: React.FC<PrismaDiagramProps> = ({ onTabChange, activeTab }) => {

  const { currentStats, initialStats, livingStats } = useSelector((state: RootState) => state.prismaDiagram);
  const [stats, setStats] = useState<PrismaStats>(defaultStats);
  const [living, setLiving] = useState<PrismaLivingStats[]>([]);

  const tabData = [
    {
      label: "Current State",
      content: <CurrentStateChart 
      activeTab={activeTab}
      nodeList={prisma_data.current_state_nodes} 
      connections={prisma_data.current_state_connections}
      stats={stats} />,
      onClick: () => onTabChange?.("Current State"),
    },
    {
      label: "Initial Search",
      content: <InitialStateChart 
      activeTab={activeTab}
      nodeList={prisma_data.initial_state_nodes} 
      connections={prisma_data.initial_state_connections}
      stats={stats}/>,
      onClick: () => onTabChange?.("Initial Search"),
    },
    {
      label: "Living Search",
      content: <Living activeTab={activeTab} stats={living} />,
      onClick: () => onTabChange?.("Living Search"),
    }
  ];

  useEffect(() => {
    setStats(currentStats);
    setLiving(livingStats);
  }, []);

  useEffect(() => {
    if (activeTab === "Current State") {
      setStats(currentStats);
    } else if (activeTab === "Initial Search") {
      setStats(initialStats);
    }
     else if (activeTab === "Living Search") {
      setLiving(livingStats);
      console.info("living stats active", living);
    }

  }, [activeTab, currentStats, initialStats, livingStats])

  return (
    <div>
      <Tabs tabs={tabData} />
    </div>
  );
};

export default PrismaDiagram;
