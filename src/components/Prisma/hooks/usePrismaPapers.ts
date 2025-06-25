import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { RootState } from '../../../redux/store';
import {
  fetchCurrentPapers,
  fetchInitialPapers,
  fetchLivingPapers,
} from "../../../redux/prismaPaperSlice";
import { Paper, Pagination, FetchParams } from '../types';

const lastFetchKey = new Set<string>();

export const usePrismaPapers = (
  activeTab: string,
  selectedMonth: string,
  activeState: string
) => {
  const dispatch = useAppDispatch();
  const { projectId, cqId } = useAppSelector((state: RootState) => state.projects.activeProject);
  const { current, initial, living, loading } = useAppSelector((state: RootState) => state.prismaPaper);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [pagination, setPagination] = useState<Pagination>();
  const isInitialLoad = useRef(true);

  const fetchPapers = (params: FetchParams) => {
    if (!params.projectId || !params.cqId) {
      return;
    }

    if (params.searchKey) {
      const fetchKey = `${params.projectId}-${params.cqId}-${params.stage}-${activeTab}-${params.searchKey}`;
      if (lastFetchKey.has(fetchKey)) {
        return;
      }
      lastFetchKey.add(fetchKey);
    }
    
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
    const isValidId = (id: string | null) => {
      if (!id) return false;
      if (id === '0') return false;
      return id !== '';
    };
    
    const hasValidIds = isValidId(projectId) && isValidId(cqId);
    
    if (hasValidIds && !isInitialLoad.current) {
      const params: FetchParams = {
        stage: activeState || 'total',
        page: 1,
        size: 10,
        projectId: projectId as string,
        cqId: cqId as string,
      };
      fetchPapers(params);
    }

    // Update initial load flag
    if (hasValidIds && isInitialLoad.current) {
      isInitialLoad.current = false;
    }
  }, [projectId, cqId]);

  // Clear fetch tracking when IDs change
  useEffect(() => {
    if (!projectId || !cqId || projectId === '0' || cqId === '0') {
      lastFetchKey.clear();
      isInitialLoad.current = true;
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