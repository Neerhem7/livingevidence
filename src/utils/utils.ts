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

  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  for (let year = startYear; year <= endYear; year++) {
    calendar[year] = Array(12).fill(null);
  }

  const iter = new Date(start);
  iter.setDate(1); // start from beginning of the month

  while (iter <= end) {
    const year = iter.getFullYear();
    const month = iter.getMonth(); // 0-indexed

    if (!calendar[year]) calendar[year] = Array(12).fill(null);
    calendar[year][month] = { month: '', total_papers: 0, count: 0 };

    iter.setMonth(iter.getMonth() + 1);
  }

  return calendar;
};


export const getPaperLink = (paper_id_type: string, paper_id: string) => {
  if (paper_id_type === "pubmed" && paper_id) {
    return `https://pubmed.ncbi.nlm.nih.gov/${paper_id}`;
  } else if (paper_id_type === "DOI" && paper_id) {
    return `https://doi.org/${paper_id}`;
  }
};

export const getPaperType = (paper_id_type: string) => {
  if (paper_id_type?.toLowerCase() === "pubmed") {
    return "PMID";
  } else if (paper_id_type?.toLowerCase() === "doi") {
    return "DOI";
  }
  return "";
};