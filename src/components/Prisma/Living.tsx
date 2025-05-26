import React, { useEffect, useState } from 'react';
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
      
      // Update calendar data with stats
      livingStats.forEach(({ month, count }) => {
        const [yearStr, monthStr] = month.split("-");
        const year = parseInt(yearStr);
        const monthIndex = parseInt(monthStr) - 1;

        if (data[year] && data[year][monthIndex]) {
          data[year][monthIndex] = {
            date: month,
            count: count,
            isCurrentMonth: month === selectedMonth
          };
        }
      });

      setCalendarData(data);
    }
  }, [livingStats, startDate, selectedMonth]);

  const handleMonthClick = (month: string) => {
    onMonthChange?.(month);
    setShowMonthStats(true);
  };

  const renderCalendar = (year: number) => {
    const yearData = calendarData[year];
    if (!yearData) return null;

    return yearData.map((cell: CellData | null, idx: number) => {
      if (!cell) return <div key={idx} className="calendar-cell empty"></div>;

      return (
        <div
          key={idx}
          className={`calendar-cell ${cell.isCurrentMonth ? 'current-month' : ''} ${
            cell.date === selectedMonth ? 'selected' : ''
          }`}
          onClick={() => handleMonthClick(cell.date)}
        >
          <div className="cell-content">
            <div className="month">{monthNames[parseInt(cell.date.split('-')[1]) - 1]}</div>
            <div className="count">{cell.count}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="living-search-container">
      <div className="calendar-container">
        {Object.keys(calendarData).map((year) => (
          <div key={year} className="calendar-year">
            <h3>{year}</h3>
            <div className="calendar-grid">{renderCalendar(parseInt(year))}</div>
          </div>
        ))}
      </div>
      {showMonthStats && (
        <div className="month-stats">
          <InitialStateChart
            activeTab={activeTab}
            activeState={activeState}
            onStateChange={onStateChange}
            onStateTextChange={onStateTextChange}
            nodeList={nodeList}
            connections={connections}
          />
        </div>
      )}
    </div>
  );
};

export default Living;
