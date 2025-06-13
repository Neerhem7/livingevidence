import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { RootState } from '../../redux/store';
import { generateCalendarData, CalendarData } from '../../utils/utils';
import './prisma.css'
import { fetchLivingStatsByMonth } from '../../redux/prismaDiagramSlice';
import InitialStateChart from './Charts/InitialState';
import { prisma_data } from './Charts/Prisma_Data';
import { fetchLivingPapers } from '../../redux/prismaPaperSlice';

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

interface CellData {
  date: string;
  count: number;
  isCurrentMonth: boolean;
  total_papers: number;
}

interface CalendarYearData {
  [year: number]: (CellData | null)[];
}

interface LivingProps {
  activeTab: string;
  stats: PrismaStats;
  livingStats: PrismaLivingStats[];
  onMonthChange?: (selectedMonth: string) => void;
  selectedMonth: string;
  onStateChange?: (activeState: string) => void;
  onStateTextChange?: (stateText: string) => void;
  activeState: string;
  startDate: string;
  projectCreationDate: string;
  nodeList: Array<any>;
  connections: Array<any>;
}

const Living: React.FC<LivingProps> = ({
  activeTab,
  stats,
  livingStats,
  onMonthChange,
  selectedMonth,
  onStateChange,
  onStateTextChange,
  activeState,
  startDate,
  projectCreationDate,
  nodeList,
  connections
}) => {
  const dispatch = useAppDispatch();
  const { projectId, cqId } = useAppSelector((state: RootState) => state.project);
  const { living } = useSelector((state: RootState) => state.prismaDiagram);
  const [showMonthStats, setShowMonthStats] = useState(false);
  const [calendarData, setCalendarData] = useState<CalendarYearData>({});
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const currentYearMonth = `${currentYear}-${currentMonth}`;

  useEffect(() => {
    if (projectId && cqId && selectedMonth) {
      dispatch(fetchLivingStatsByMonth({ projectId, cqId, month: selectedMonth }));
    }
  }, [projectId, cqId, selectedMonth, dispatch]);

  useEffect(() => {
    if (livingStats && livingStats.length > 0) {
      const startDateObj = new Date(startDate);
      const data = generateCalendarData(startDateObj, new Date()) as CalendarYearData;

      livingStats.forEach(({ month, count, total_papers }) => {
        const [yearStr, monthStr] = month.split("-");
        const year = parseInt(yearStr);
        const monthIndex = parseInt(monthStr) - 1;

        if (data[year] && data[year][monthIndex]) {
          data[year][monthIndex] = {
            date: month,
            count: count,
            isCurrentMonth: month === selectedMonth,
            total_papers: total_papers
          };
        }
      });

      setCalendarData(data);
    }
  }, [livingStats, startDate, selectedMonth]);

  const handleMonthClick = (month: string) => {
    if (projectId && cqId) {
      dispatch(fetchLivingStatsByMonth({projectId, cqId, month}));
      dispatch(fetchLivingPapers({
        projectId,
        cqId,
        month,
        stage: 'living',
        page: 1,
        size: 10
      }));
      onMonthChange?.(month);
      setShowMonthStats(true);
    }
  };

 

  return (
      <div className="calendar-container">
        <div>
          <div className="header-row">
            <div className="year-cell"></div>
            {monthNames.map(m => (
              <div key={m} className="month-cell">{m}</div>
            ))}
          </div>
          {Object.keys(calendarData).map(year => (
          <div className="year-row" key={year}>
            <div className="year-cell">{year}</div>
            {calendarData[parseInt(year)].map((cell, idx) => (
              <>
                {cell ? (
                  <div
                    className={`data-cell ${cell.date === selectedMonth ? 'active-cell' : ''}`}
                    key={idx}
                    onClick={() => handleMonthClick(cell.date)}
                  >
                    <div>
                      {cell.total_papers > 0 && <>{cell.total_papers}</>}
                    </div>
                    <div>{cell.count}</div>
                  </div>
                ) : (
                  <div className="data-cell empty-cell" key={idx}></div>
                )}
              </>
            ))}
          </div>
        ))}
        </div>
        <div className="mt-4 w-50">
      {showMonthStats && (
       
          <InitialStateChart
          activeTab={activeTab}
          activeState={activeState}
          onStateChange={onStateChange}
          onStateTextChange={onStateTextChange}
          nodeList={prisma_data.living_state_nodes}
          connections={prisma_data.living_state_connections}
          stats={living.stats}
          activeMonth={selectedMonth} 
          />
      )}
        </div>
      </div>
  );
};

export default Living;
