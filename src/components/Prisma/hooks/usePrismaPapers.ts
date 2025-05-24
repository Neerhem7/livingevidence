import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { RootState } from '../../../redux/store';
import {
  fetchCurrentPapers,
  fetchInitialPapers,
  fetchLivingPapers,
} from "../../../redux/prismaPaperSlice";
import { Paper, Pagination, FetchParams } from '../types';

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

  const fetchPapers = (params: FetchParams) => {
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
    if (!projectId || !cqId || !pagination) return;

    const params: FetchParams = {
      stage: activeState,
      page: 1,
      size: pagination.pageSize,
      searchKey,
      projectId,
      cqId,
    };

    fetchPapers(params);
  };

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