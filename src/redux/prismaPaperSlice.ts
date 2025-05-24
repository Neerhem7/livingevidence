// store/slices/prismaPaperSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BE_Endpoints } from './BEEndpoints';

interface Paper {
  id: number;
  projectId: string;
  cqId: string;
  title: string;
  authors: string;
  publish_date: string;
  abstract: string;
  decision: string;
  is_duplicate: string;
  upload_source: string;
  journal: string;
  year: number;
  doi: string;
  pmid: string;
  included: boolean;
  excluded: boolean;
  fullText: boolean;
  duplicate: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface PrismaPaperState {
  current: {
    papers: Paper[]
    pagination: Pagination
  };
  initial: {
    papers: Paper[]
    pagination: Pagination
  };
  living: {
    papers: Paper[]
    pagination: Pagination
  };
  loading: boolean;
  error: string | null;
  selectedPaper: Paper | null;
}

const initialState: PrismaPaperState = {
  current: {
    papers: [],
    pagination: {
      totalItems: 0,
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      hasNext: false,
      hasPrevious: false,
    }
  },
  initial: {
    papers: [],
    pagination: {
      totalItems: 0,
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      hasNext: false,
      hasPrevious: false,
    }
  },
  living: {
    papers: [],
    pagination: {
      totalItems: 0,
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      hasNext: false,
      hasPrevious: false,
    }
  },
  loading: false,
  error: null,
  selectedPaper: null
};

export const fetchCurrentPapers = createAsyncThunk(
  "prisma/fetchCurrent",
  async (
    {
      searchKey,
      stage,
      page,
      size,
      projectId,
      cqId
    }: { searchKey?: string; stage: string; page: number; size: number; projectId: string; cqId: string },
    thunkAPI
  ) => {
    const params = new URLSearchParams({
      stage,
      source: "all",
      page: page.toString(),
      limit: size.toString(),
      project_id: projectId,
      clinical_question_id: cqId
    });

    if (searchKey) {
      params.append("search", searchKey);
    }

    const res = await axios.get(`${BE_Endpoints.PRISMA_PAPERS}?${params.toString()}`);
    return res.data;
  }
);

export const fetchInitialPapers = createAsyncThunk(
  "prisma/fetchInitial",
  async ({
    searchKey,
    stage,
    page,
    size,
    projectId,
    cqId
  }: { searchKey?: string; stage: string; page: number; size: number; projectId: string; cqId: string }, thunkAPI) => {
    const params = new URLSearchParams({
      stage,
      source: "initial",
      page: page.toString(),
      limit: size.toString(),
      project_id: projectId,
      clinical_question_id: cqId
    });

    if (searchKey) {
      params.append("search", searchKey);
    }
    const res = await axios.get(`${BE_Endpoints.PRISMA_PAPERS}?${params.toString()}`);
    return res.data;
  }
);

export const fetchLivingPapers = createAsyncThunk(
  "prisma/fetchLiving",
  async ({
    searchKey,
    stage,
    month,
    page,
    size,
    projectId,
    cqId
  }: { searchKey?: string; stage: string; month: string; page: number; size: number; projectId: string; cqId: string }, thunkAPI) => {
    const params = new URLSearchParams({
      stage,
      source: "living",
      page: page.toString(),
      limit: size.toString(),
      date: month,
      project_id: projectId,
      clinical_question_id : cqId
    });

    if (searchKey) {
      params.append("search", searchKey);
    }

    const res = await axios.get(`${BE_Endpoints.PRISMA_PAPERS}?${params.toString()}`);
    return res.data;
  }
);

export const updatePrismaPaper = createAsyncThunk(
  'prismaPaper/updatePaper',
  async ({ id, data, projectId, cqId }: { id: number; data: Partial<Paper>; projectId: string; cqId: string }) => {
    try {
      const response = await axios.put(`${BE_Endpoints.PRISMA_PAPERS}/${id}?project_id=${projectId}&clinical_question_id=${cqId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const prismaPaperSlice = createSlice({
  name: 'prismaPaper',
  initialState,
  reducers: {
    setSelectedPaper: (state, action) => {
      state.selectedPaper = action.payload;
    },
    clearSelectedPaper: (state) => {
      state.selectedPaper = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCurrentPapers
      .addCase(fetchCurrentPapers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentPapers.fulfilled, (state, action) => {
        state.current.papers = action.payload.items;
        state.current.pagination.totalItems = action.payload.page_info.total;
        state.current.pagination.currentPage = action.payload.page_info.page;
        state.current.pagination.totalPages = action.payload.page_info.total_pages;
        state.current.pagination.hasNext = action.payload.page_info.has_next;
        state.current.pagination.hasPrevious = action.payload.page_info.has_previous;
        state.loading = false;
      })
      .addCase(fetchCurrentPapers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch current papers';
      })

      // fetchInitialPapers
      .addCase(fetchInitialPapers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInitialPapers.fulfilled, (state, action) => {
        state.initial.papers = action.payload.items;
        state.initial.pagination.totalItems = action.payload.page_info.total;
        state.initial.pagination.currentPage = action.payload.page_info.page;
        state.initial.pagination.totalPages = action.payload.page_info.total_pages;
        state.initial.pagination.hasNext = action.payload.page_info.has_next;
        state.initial.pagination.hasPrevious = action.payload.page_info.has_previous;
        state.loading = false;
      })
      .addCase(fetchInitialPapers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch initial papers';
      })

      // fetchLivingPapers
      .addCase(fetchLivingPapers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLivingPapers.fulfilled, (state, action) => {
        state.living.papers = action.payload.items;
        state.living.pagination.totalItems = action.payload.page_info.total;
        state.living.pagination.currentPage = action.payload.page_info.page;
        state.living.pagination.totalPages = action.payload.page_info.total_pages;
        state.living.pagination.hasNext = action.payload.page_info.has_next;
        state.living.pagination.hasPrevious = action.payload.page_info.has_previous;
        state.loading = false;
      })
      .addCase(fetchLivingPapers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch living papers';
      })

      // updatePrismaPaper
      .addCase(updatePrismaPaper.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePrismaPaper.fulfilled, (state, action) => {
        state.loading = false;
        // Update paper in the appropriate list (current, initial, or living)
        const updatePaperInList = (papers: Paper[]) => {
          const index = papers.findIndex((paper) => paper.id === action.payload.id);
          if (index !== -1) {
            papers[index] = action.payload;
          }
        };
        updatePaperInList(state.current.papers);
        updatePaperInList(state.initial.papers);
        updatePaperInList(state.living.papers);
      })
      .addCase(updatePrismaPaper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update paper';
      });
  },
});

export const { setSelectedPaper, clearSelectedPaper } = prismaPaperSlice.actions;
export default prismaPaperSlice.reducer;
