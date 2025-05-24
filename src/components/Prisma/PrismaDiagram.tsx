import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Tabs from '../Tabs/Tab';
import { RootState } from '../../redux/store';
import { PRISMA_NODES } from './Charts/Constants';
import { prisma_data } from './Charts/Prisma_Data';

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

// Lazy load the chart components
const CurrentStateChart = lazy(() => import('./Charts/CurrentStateChart'));
const InitialStateChart = lazy(() => import('./Charts/InitialState'));
const Living = lazy(() => import('./Living'));

interface PrismaDiagramProps {
  onTabChange?: (activeTab: string) => void;
  onMonthChange?: (selectedMonth: string) => void;
  onStateChange?: (activeState:string)=> void;
  onStateTextChange?: (stateText: string)=> void;
  activeState: string;
  selectedMonth: string;
  activeTab: string;
}

const PrismaDiagram: React.FC<PrismaDiagramProps> = ({  activeTab, selectedMonth, activeState, onMonthChange,onTabChange,onStateChange, onStateTextChange }) => {

  const { currentStats, initialStats, livingStats, fullTextExclusionReasions, projectCreationDate } = useSelector((state: RootState) => state.prismaDiagram);
  const [stats, setStats] = useState<PrismaStats>(defaultStats);
  const [living, setLiving] = useState<PrismaLivingStats[]>([]);

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
            fullTextExcludeReason={fullTextExclusionReasions}
            stats={stats} 
          />
        </Suspense>
      ),
      onClick: () => onTabChange?.("Current State"),
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
      onClick: () => onTabChange?.("Initial Search"),
    },
    {
      label: "Living Search",
      content: (
        <Suspense fallback={<div>Loading Living Search...</div>}>
          <Living  
            startDate={projectCreationDate}
            activeState={activeState}
            onStateChange={onStateChange}
            onStateTextChange={onStateTextChange}
            selectedMonth={selectedMonth} 
            onMonthChange={onMonthChange} 
            activeTab={activeTab} 
            stats={living} 
          />
        </Suspense>
      ),
      onClick: () => onTabChange?.("Living Search"),
    }
  ];

  // Only update stats when tab changes
  useEffect(() => {
    if (activeTab === "Current State") {
      setStats(currentStats);
    } else if (activeTab === "Initial Search") {
      setStats(initialStats);
    } else if (activeTab === "Living Search") {
      setLiving(livingStats);
    }
  }, [activeTab, currentStats, initialStats, livingStats]);

  // Update state text only when stats change for the active tab
  useEffect(() => {
    const parsedLabel = PRISMA_NODES.INITIAL_SEARCH.replace(/\$(\w+)\$/g, (_: string, key: string) => {
      const value = stats?.[key as keyof PrismaStats];
      return value !== undefined ? String(value) : `0`;
    });
    onStateTextChange?.(parsedLabel);
  }, [stats, onStateTextChange]);

  return (
    <Tabs tabs={tabData} />
  );
};

export default PrismaDiagram;
