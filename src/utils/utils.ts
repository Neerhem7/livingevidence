// utils.ts

import axios from "axios";

export interface CellData {
  month: string;
  total_papers: number | 0;
  count: number | 0;
}

export type CalendarData = {
  [year: number]: (CellData | null)[];
};

export const generateCalendarData = (
  startDate: string | Date,
  endDate: Date
): CalendarData => {
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
    calendar[year][month] = { month: "", total_papers: 0, count: 0 };

    iter.setMonth(iter.getMonth() + 1);
  }

  return calendar;
};

const checkPubMedArticle = async (paperId: string) => {
  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${paperId}&retmode=json`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.result && data.result[paperId] && !data.result[paperId]?.error) {
      return `https://pubmed.ncbi.nlm.nih.gov/${paperId}`;
    }
    return null;
  } catch (error) {
    console.error("Error accessing API:", error);
    return null;
  }
};

const verifyPaperLink = async (
  paper_id_type: string,
  paper_id: string
): Promise<string | null> => {
  let url = null;

  if (paper_id_type === "PMID" && paper_id) {
    url = `https://pubmed.ncbi.nlm.nih.gov/${paper_id}`;
  } else if (paper_id_type === "DOI" && paper_id) {
    url = `https://doi.org/${paper_id}`;
  }

  if (url) {
    try {
      const response = await checkPubMedArticle(paper_id); // Perform a GET request to fetch the page content
      if (response && response !== null && response?.length > 0) {
        return response;
      }
    } catch (error) {
      console.error(`Error checking URL: ${url}`, error);
    }
  }

  return null;
};

export const getPaperLink = async (paper_id_type: string, paper_id: string) => {
  if (paper_id_type === "pubmed" && paper_id) {
    const paperLink = await verifyPaperLink("PMID", paper_id);
    if (paperLink) {
      return paperLink; // Redirect to the article
    } else {
      return "";
    }
  } else if (paper_id_type === "DOI" && paper_id) {
    const paperLink = await verifyPaperLink("DOI", paper_id);
    if (paperLink) {
      return paperLink; // Redirect to the article
    } else {
      return "";
    }
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
