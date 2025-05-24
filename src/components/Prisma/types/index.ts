export type Paper = {
  id: number;
  title: string;
  authors: string;
  publish_date: string;
  abstract: string;
  decision: string;
  is_duplicate: string;
  upload_source: string;
};

export type Pagination = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type FetchParams = {
  stage: string;
  page: number;
  size: number;
  searchKey?: string;
  projectId: string;
  cqId: string;
  month?: string;
};

export interface PrismaPapersProps {
  activeTab: string;
  selectedMonth: string;
  activeState: string;
  activeStateText: string;
}

export interface PaperCardProps {
  paper: Paper;
  onViewDetails: (paper: Paper) => void;
}

export interface PaperDetailsModalProps {
  paper: Paper | null;
  show: boolean;
  onClose: () => void;
} 