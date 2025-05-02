import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
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

interface LivingProps {
  activeTab: string,
  stats: PrismaLivingStats[];
  onMonthChange?: (selectedMonth: string) => void;
  selectedMonth: string;
  onStateChange?: (activeState: string) => void;
  onStateTextChange?: (stateText: string) => void;
  activeState: string;
}

const Living: React.FC<LivingProps> = ({ activeTab, stats, selectedMonth, onMonthChange, activeState, onStateChange, onStateTextChange }) => {
  const dispatch = useAppDispatch();
  const { livingStatsByMonth } = useSelector((state: RootState) => state.prismaDiagram);
  const [showMonthStats, setShowMonthStats] = useState(false);
  // const [selectedMonth, setSelectedMonth] = useState('');
  const [calendarData, setCalendarData] = useState<CalendarData>({});
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const currentYearMonth = `${currentYear}-${currentMonth}`;

  useEffect(() => {
    const data = generateCalendarData("2021-06-01", new Date());
    fetchCalendarData(data, stats);
    onMonthChange?.(currentYearMonth);
  }, [stats]);

  const fetchCalendarData = async (calendar: CalendarData, stats: PrismaLivingStats[]) => {
    stats?.forEach(({ month, count, total_papers }) => {
      const [yearStr, monthStr] = month.split("-");
      const year = parseInt(yearStr, 10);
      const monthIndex = parseInt(monthStr, 10) - 1; // Convert to 0-indexed

      if (calendar[year] && calendar[year][monthIndex] !== null) {
        calendar[year][monthIndex] = {
          month: month,
          total_papers: total_papers,
          count: count,
        };
      }
    });

    setCalendarData({ ...calendar });
  };

  const showStats = (month: string) => {

    dispatch(fetchLivingStatsByMonth(month));
    dispatch(fetchLivingPapers({ stage: 'include', month: month, page: 1, size: 10 }))
    setShowMonthStats(true)
    onMonthChange?.(month)
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
                    className={`data-cell ${cell.month === selectedMonth ? 'active-cell' : ''}`}
                    key={idx}
                    onClick={() => showStats(cell.month)}
                  >
                    <div>
                      {cell.count > 0 && <>{cell.count}</>}
                    </div>
                    <div>{cell.total_papers}</div>
                  </div>
                ) : (
                  <div className="data-cell empty-cell" key={idx}></div>
                )}
              </>
            ))}
          </div>
        ))}
        <div className='mt-4'>
          {
            showMonthStats && <InitialStateChart
              activeTab={activeTab}
              activeState={activeState}
              onStateChange={onStateChange}
              onStateTextChange={onStateTextChange}
              nodeList={prisma_data.living_state_nodes}
              connections={prisma_data.living_state_connections}
              stats={livingStatsByMonth}
              activeMonth={selectedMonth} />
          }

        </div>
      </div>
    </div>
  );
};

export default Living;
