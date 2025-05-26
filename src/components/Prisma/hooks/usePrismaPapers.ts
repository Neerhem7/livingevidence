import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { RootState } from '../../../redux/store';
import {
  fetchCurrentPapers,
  fetchInitialPapers,
  fetchLivingPapers,
} from "../../../redux/prismaPaperSlice";
import { Paper, Pagination, FetchParams } from '../types';

// Track last successful fetch to prevent duplicates
const lastFetchKey = new Set<string>();

export const usePrismaPapers = (
  activeTab: string,
  selectedMonth: string,
  activeState: string
) => {
  const dispatch = useAppDispatch();
  const { projectId, cqId } = useAppSelector((state: RootState) => state.project);
  const { current, initial, living, loading } = useAppSelector((state: RootState) => state.prismaPaper);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [pagination, setPagination] = useState<Pagination>();
  const prevProjectId = useRef<string | null>(null);
  const prevCqId = useRef<string | null>(null);

  const fetchPapers = (params: FetchParams) => {
    // Skip if we don't have valid IDs
    if (!params.projectId || !params.cqId) {
      console.log('Skipping fetch - invalid IDs:', { projectId: params.projectId, cqId: params.cqId });
      return;
    }

    // Generate unique key for this fetch
    const fetchKey = `${params.projectId}-${params.cqId}-${params.stage}-${activeTab}`;
    
    // Skip if this exact fetch was just made
    if (lastFetchKey.has(fetchKey)) {
      console.log('Skipping duplicate fetch:', fetchKey);
      return;
    }

    console.log('Fetching papers with params:', { 
      projectId: params.projectId, 
      cqId: params.cqId, 
      stage: params.stage,
      activeTab,
      fetchKey
    });

    // Add to tracking set
    lastFetchKey.add(fetchKey);
    
    const fetchAction = {
      'Current State': () => fetchCurrentPapers(params),
      'Initial Search': () => fetchInitialPapers(params),
      'Living Search': () => fetchLivingPapers({ ...params, month: selectedMonth }),
    }[activeTab];

    if (fetchAction) {
      return dispatch(fetchAction());
    }
  };

  const changePage = (page: number) => {
    if (!projectId || !cqId || !pagination) return;

    const params: FetchParams = {
      stage: activeState,
      page,
      size: pagination.pageSize,
      projectId,
      cqId,
    };

    fetchPapers(params);
  };

  const searchPapers = (searchKey: string) => {
    if (!projectId || !cqId) return;

    const params: FetchParams = {
      stage: activeState,
      page: 1,
      size: pagination?.pageSize || 10,
      searchKey,
      projectId,
      cqId,
    };

    fetchPapers(params);
  };

  // Update papers and pagination when data changes
  useEffect(() => {
    const currentData = {
      'Current State': current,
      'Initial Search': initial,
      'Living Search': living,
    }[activeTab];

    if (currentData) {
      setPapers(currentData.papers);
      setPagination(currentData.pagination);
    }
  }, [activeTab, current, initial, living]);

  // Fetch when projectId or cqId updates (not on initial load)
  useEffect(() => {
    const isValidId = (id: string | null) => id && id !== '';
    const hasValidIds = isValidId(projectId) && isValidId(cqId);
    const isUpdate = (
      hasValidIds && 
      (projectId !== prevProjectId.current || cqId !== prevCqId.current) &&
      (prevProjectId.current !== null || prevCqId.current !== null) // Skip initial load
    );
    
    if (isUpdate && projectId && cqId) {
      console.log('ID update detected:', { projectId, cqId, prevProjectId: prevProjectId.current, prevCqId: prevCqId.current });
      const params: FetchParams = {
        stage: activeState || 'total',
        page: 1,
        size: 10,
        projectId: projectId,
        cqId: cqId,
      };
      fetchPapers(params);
    }

    // Update previous values
    prevProjectId.current = projectId;
    prevCqId.current = cqId;
  }, [projectId, cqId]);

  // Clear fetch tracking when IDs change
  useEffect(() => {
    if (!projectId || !cqId) {
      lastFetchKey.clear();
    }
  }, [projectId, cqId]);

  return {
    papers,
    pagination,
    loading,
    changePage,
    searchPapers,
    projectId,
    cqId,
  };
}; 