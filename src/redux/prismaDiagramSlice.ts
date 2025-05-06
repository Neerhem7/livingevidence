// store/slices/prismaStatslice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BE_Endpoints } from './BEEndpoints';

interface ProjectState {
  projectId: string | null;
  cqId: string | null;
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
type ExcludeReason = {
  reason: string;
  count: number;
};

interface PrismaLivingStats {
  month: string;
  count: number;
  total_papers: number
}

interface PrismaStatsState {
  projectCreationDate: string;
  currentStats: PrismaStats;
  initialStats: PrismaStats;
  livingStats: PrismaLivingStats[];
  livingStatsByMonth: PrismaStats;
  fullTextExclusionReasions: ExcludeReason[],
  loading: boolean;
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
  projectCreationDate:'',
  currentStats: { ...emptyStats },
  initialStats: { ...emptyStats },
  livingStatsByMonth: { ...emptyStats},
  fullTextExclusionReasions:[],
  livingStats: [],
  loading: false,
};


export const fetchCurrentStats = createAsyncThunk(
  "prisma/fetchCurrentStats",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { project: ProjectState };
    const { projectId, cqId } = state.project;

    const res = await axios.get(
      `${BE_Endpoints.BASE_URL_PRISMA}?project_id=${projectId}&source=all&clinical_question_id=${cqId}`
    );
    return res.data;
  }
);

export const fetchInitialStats = createAsyncThunk(
  "prisma/fetchInitialStats",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { project: ProjectState };
    const { projectId, cqId} = state.project;

    const res = await axios.get(
      `${BE_Endpoints.BASE_URL_PRISMA}?project_id=${projectId}&source=initial&clinical_question_id=${cqId}`
    );
    return res.data;
  }
);

export const fetchLivingStats = createAsyncThunk(
  "prisma/fetchLivingStats",
  async (endDate: string, thunkAPI) => {
    const state = thunkAPI.getState() as { project: ProjectState };
    const { projectId, cqId } = state.project;

    const res = await axios.get(
      `${BE_Endpoints.BASE_URL_PRISMA}/monthly-included?project_id=${projectId}&clinical_question_id=${cqId}&start_date=2021-06&end_date=${endDate}`
    );
    console.info(" action.payload.livingStatsByMonth",  res.data.monthly_counts)
    return {"livingStatsByMonth":res.data.monthly_counts, "projectCreationDate":res.data.project_created_at};
   
  }
);

export const fetchLivingStatsByMonth = createAsyncThunk(
  "prisma/fetchLivingStatsByMonth",
  async (month: string, thunkAPI) => {
    const state = thunkAPI.getState() as { project: ProjectState };
    const { projectId, cqId } = state.project;

    const res = await axios.get(
      `${BE_Endpoints.BASE_URL_PRISMA}?project_id=${projectId}&source=living&clinical_question_id=${cqId}&date=${month}`
    );
    return res.data;
  }
);

export const fetchFullTextExcludeReasons = createAsyncThunk(
  "prisma/fetchFullTextExcludeReasons",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { project: ProjectState };
    const { projectId, cqId } = state.project;

    const res = await axios.get(
      `${BE_Endpoints.BASE_URL_PRISMA}/exclusion-reasons?project_id=${projectId}&clinical_question_id=${cqId}
      `
    );
    console.log("etchFullTextExcludeReasons",res.data)
    return res.data.data;
  }
);

const prismaStatslice = createSlice({
  name: 'prismaDiagram',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentStats.fulfilled, (state, action) => {
        state.currentStats = action.payload;
      })
      .addCase(fetchInitialStats.fulfilled, (state, action) => {
        state.initialStats = action.payload;
      })
      .addCase(fetchLivingStats.fulfilled, (state, action) => {
        state.livingStats = action.payload.livingStatsByMonth;
        state.projectCreationDate = action.payload.projectCreationDate;
      })
      .addCase(fetchLivingStatsByMonth.fulfilled, (state, action) => {
        state.livingStatsByMonth = action.payload;
        
      })
      .addCase(fetchFullTextExcludeReasons.fulfilled, (state, action) => {
        state.fullTextExclusionReasions= action.payload;
      });
  },
});

export default prismaStatslice.reducer;
