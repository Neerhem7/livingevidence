// utils.ts

export interface CellData {
  month: string,
  total_papers: number | 0;
  count: number | 0;
}

export type CalendarData = {
  [year: number]: (CellData | null)[];
};

export const generateCalendarData = (startDate: string | Date, endDate: Date): CalendarData => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const calendar: CalendarData = {};

  while (start <= end) {
    const year = start.getFullYear();
    const month = start.getMonth(); // 0-indexed

    if (!calendar[year]) calendar[year] = Array(12).fill(null);
    calendar[year][month] = { month:'', total_papers: 0, count: 0 };

    start.setMonth(start.getMonth() + 1);
  }

  return calendar;
};
