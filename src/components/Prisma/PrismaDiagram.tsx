import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Tabs from '../Tabs/Tab';
import { RootState } from '../../redux/store';
import { PRISMA_NODES } from './Charts/Constants';
import { prisma_data } from './Charts/Prisma_Data';

type PrismaLivingStats = {
  month: string;
  count: number;
  total_papers: number;
}

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

interface PrismaDiagramProps {
  activeTab: string;
  selectedMonth: string;
  activeState: string;
  onMonthChange?: (month: string) => void;
  onTabChange?: (tab: string) => void;
  onStateChange?: (state: string) => void;
  onStateTextChange?: (text: string) => void;
}

interface TabsProps {
  tabs: Array<{
    label: string;
    content: React.ReactNode;
    onClick: () => void;
  }>;
  activeTab: string;
}

const CurrentStateChart = lazy(() => import('./Charts/CurrentStateChart'));
const InitialStateChart = lazy(() => import('./Charts/InitialState'));
const LivingStateChart = lazy(() => import('./Living'));

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

const PrismaDiagram: React.FC<PrismaDiagramProps> = ({ 
  activeTab, 
  selectedMonth, 
  activeState, 
  onMonthChange,
  onTabChange,
  onStateChange, 
  onStateTextChange 
}) => {
  const { projectId, cqId } = useSelector((state: RootState) => state.project);
  const prismaDiagram = useSelector((state: RootState) => state.prismaDiagram);
  const [stats, setStats] = useState<PrismaStats>(defaultStats);
  const [living, setLiving] = useState<PrismaLivingStats[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeTab === 'Current State') {
      setStats(prismaDiagram.current.stats);
      setActiveIndex(0);
    } else if (activeTab === 'Initial Search') {
      setStats(prismaDiagram.initial.stats);
      setActiveIndex(1);
    } else if (activeTab === 'Living Search') {
      setStats(prismaDiagram.living.stats);
      setLiving(prismaDiagram.living.monthlyStats);
      setActiveIndex(2);
    }
  }, [activeTab, prismaDiagram]);

  const tabData = [
    {
      label: "Current State",
      content: (
        <Suspense fallback={<div>Loading Current State...</div>}>
          <CurrentStateChart 
            activeTab={activeTab}
            activeState={activeState}
            onStateChange={onStateChange}
            onStateTextChange={onStateTextChange}
            nodeList={prisma_data.current_state_nodes} 
            connections={prisma_data.current_state_connections}
            fullTextExcludeReason={prismaDiagram.fullTextExclusionReasons}
            stats={stats} 
          />
        </Suspense>
      ),
      onClick: () => onTabChange?.("Current State")
    },
    {
      label: "Initial Search",
      content: (
        <Suspense fallback={<div>Loading Initial Search...</div>}>
          <InitialStateChart 
            activeTab={activeTab}
            activeState={activeState}
            onStateChange={onStateChange}
            onStateTextChange={onStateTextChange}
            nodeList={prisma_data.initial_state_nodes} 
            connections={prisma_data.initial_state_connections}
            stats={stats}
          />
        </Suspense>
      ),
      onClick: () => onTabChange?.("Initial Search")
    },
    {
      label: "Living Search",
      content: (
        <Suspense fallback={<div>Loading Living Search...</div>}>
          <LivingStateChart 
            activeTab={activeTab}
            activeState={activeState}
            onStateChange={onStateChange}
            onStateTextChange={onStateTextChange}
            nodeList={prisma_data.living_state_nodes} 
            connections={prisma_data.living_state_connections}
            stats={stats}
            livingStats={living}
            projectCreationDate={prismaDiagram.living.projectCreationDate}
            selectedMonth={selectedMonth}
            onMonthChange={onMonthChange}
            startDate={prismaDiagram.living.projectCreationDate}
          />
        </Suspense>
      ),
      onClick: () => onTabChange?.("Living Search")
    }
  ];

  return (
    <div className="h-100">
      <Tabs tabs={tabData} />
    </div>
  );
};

export default React.memo(PrismaDiagram);
