// store/slices/prismaStatslice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BE_Endpoints } from './BEEndpoints';

type PrismaStats = {
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
};

type ExcludeReason = {
  reason: string;
  count: number;
};

interface PrismaLivingStats {
  month: string;
  count: number;
  total_papers: number;
}

interface PrismaStatsState {
  current: {
    stats: PrismaStats;
    loading: boolean;
    error: string | null;
  };
  initial: {
    stats: PrismaStats;
    loading: boolean;
    error: string | null;
  };
  living: {
    stats: PrismaStats;
    monthlyStats: PrismaLivingStats[];
    projectCreationDate: string;
    loading: boolean;
    error: string | null;
  };
  fullTextExclusionReasons: ExcludeReason[];
}

const emptyStats: PrismaStats = {
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

const initialState: PrismaStatsState = {
  current: {
    stats: { ...emptyStats },
    loading: false,
    error: null
  },
  initial: {
    stats: { ...emptyStats },
    loading: false,
    error: null
  },
  living: {
    stats: { ...emptyStats },
    monthlyStats: [],
    projectCreationDate: '',
    loading: false,
    error: null
  },
  fullTextExclusionReasons: []
};

export const fetchCurrentStats = createAsyncThunk(
  "prisma/fetchCurrentStats",
  async ({ projectId, cqId }: { projectId: string; cqId: string }) => {
    const res = await axios.get(
      `${BE_Endpoints.BASE_URL_PRISMA}?project_id=${projectId}&source=all&clinical_question_id=${cqId}`
    );
    return res.data;
  }
);

export const fetchInitialStats = createAsyncThunk(
  "prisma/fetchInitialStats",
  async ({ projectId, cqId }: { projectId: string; cqId: string }) => {
    const res = await axios.get(
      `${BE_Endpoints.BASE_URL_PRISMA}?project_id=${projectId}&source=initial&clinical_question_id=${cqId}`
    );
    return res.data;
  }
);

export const fetchLivingStats = createAsyncThunk(
  "prisma/fetchLivingStats",
  async ({ projectId, cqId, endDate }: { projectId: string; cqId: string; endDate: string }) => {
    const res = await axios.get(
      `${BE_Endpoints.BASE_URL_PRISMA}/monthly-included?project_id=${projectId}&clinical_question_id=${cqId}&start_date=2021-06&end_date=${endDate}`
    );
    return {
      monthlyStats: res.data.monthly_counts,
      projectCreationDate: res.data.project_created_at
    };
  }
);

export const fetchLivingStatsByMonth = createAsyncThunk(
  "prisma/fetchLivingStatsByMonth",
  async ({ projectId, cqId, month }: { projectId: string; cqId: string; month: string }) => {
    const res = await axios.get(
      `${BE_Endpoints.BASE_URL_PRISMA}?project_id=${projectId}&source=living&clinical_question_id=${cqId}&date=${month}`
    );
    return res.data;
  }
);

export const fetchFullTextExcludeReasons = createAsyncThunk(
  "prisma/fetchFullTextExcludeReasons",
  async ({ projectId, cqId }: { projectId: string; cqId: string }) => {
    const res = await axios.get(
      `${BE_Endpoints.BASE_URL_PRISMA}/exclusion-reasons?project_id=${projectId}&clinical_question_id=${cqId}`
    );
    return res.data.data;
  }
);

const prismaStatslice = createSlice({
  name: 'prismaDiagram',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Current Stats
      .addCase(fetchCurrentStats.pending, (state) => {
        state.current.loading = true;
        state.current.error = null;
      })
      .addCase(fetchCurrentStats.fulfilled, (state, action) => {
        state.current.stats = action.payload;
        state.current.loading = false;
      })
      .addCase(fetchCurrentStats.rejected, (state, action) => {
        state.current.loading = false;
        state.current.error = action.error.message || 'Failed to fetch current stats';
      })

      // Initial Stats
      .addCase(fetchInitialStats.pending, (state) => {
        state.initial.loading = true;
        state.initial.error = null;
      })
      .addCase(fetchInitialStats.fulfilled, (state, action) => {
        state.initial.stats = action.payload;
        state.initial.loading = false;
      })
      .addCase(fetchInitialStats.rejected, (state, action) => {
        state.initial.loading = false;
        state.initial.error = action.error.message || 'Failed to fetch initial stats';
      })

      // Living Stats
      .addCase(fetchLivingStats.pending, (state) => {
        state.living.loading = true;
        state.living.error = null;
      })
      .addCase(fetchLivingStats.fulfilled, (state, action) => {
        state.living.monthlyStats = action.payload.monthlyStats;
        state.living.projectCreationDate = action.payload.projectCreationDate;
        state.living.loading = false;
      })
      .addCase(fetchLivingStats.rejected, (state, action) => {
        state.living.loading = false;
        state.living.error = action.error.message || 'Failed to fetch living stats';
      })

      // Living Stats By Month
      .addCase(fetchLivingStatsByMonth.pending, (state) => {
        state.living.loading = true;
        state.living.error = null;
      })
      .addCase(fetchLivingStatsByMonth.fulfilled, (state, action) => {
        state.living.stats = action.payload;
        state.living.loading = false;
      })
      .addCase(fetchLivingStatsByMonth.rejected, (state, action) => {
        state.living.loading = false;
        state.living.error = action.error.message || 'Failed to fetch living stats by month';
      })

      // Full Text Exclusion Reasons
      .addCase(fetchFullTextExcludeReasons.pending, (state) => {
        state.living.loading = true;
      })
      .addCase(fetchFullTextExcludeReasons.fulfilled, (state, action) => {
        state.fullTextExclusionReasons = action.payload;
        state.living.loading = false;
      })
      .addCase(fetchFullTextExcludeReasons.rejected, (state, action) => {
        state.living.loading = false;
        state.living.error = action.error.message || 'Failed to fetch exclusion reasons';
      });
  },
});

export default prismaStatslice.reducer;
