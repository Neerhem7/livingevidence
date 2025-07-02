// src/redux/projectSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BE_Endpoints } from './BEEndpoints';
import { mcrpc } from '../Pages/data/public_web_mcrpc';
import { mcspc } from '../Pages/data/public_web_mcspc';


interface ProjectsState {
  projects: any[],
  activeProject: {
    projectId: string | null;
    cqId: string | null;
  },
  activeProjectWeb: any | null;
  projectsLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  projectsError: string | null;
  activeProjectLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  activeProjectError: string | null;
  activeProjectWebLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  activeProjectWebError: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  activeProject: {
    projectId: "0",
    cqId: "0"
  },
  activeProjectWeb: null,
  projectsLoading: 'idle',
  projectsError: null,
  activeProjectLoading: 'idle',
  activeProjectError: null,
  activeProjectWebLoading: 'idle',
  activeProjectWebError: null,
};

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    try {
      // const response = await axios.put(`${BE_Endpoints.PRISMA_PAPERS}`);
      // return response.data;
      let sample_projects=[{
        name: 'Living Lung Cancer',
        abbr: 'LUNGCA',
        id:'233',
        clinical_questions: [{
          name: 'LL_mNSCLC_d+',
          abbr: 'LL_mNSCLC_d+',
          id:'17',
        },
        {
          name: 'LL_mNSCLC_d-',
          abbr: 'LL_mNSCLC_d-',
          id:'16',
        }
        ]
      },
      {
        name: 'Living Prostate Cancer',
        abbr: 'LPR',
        id:'210',
        clinical_questions: [{
          name: 'mcspc',
          abbr: 'mcspc',
          id:'394',
        },
        {
          name: 'mcrpc',
          abbr: 'mcrpc',
          id:'395',
        }
        ]
      }]
      return sample_projects;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchActiveProjectWeb = createAsyncThunk(
  'projects/fetchActiveProjectWeb',
  async ({ projectId, cqId }: { projectId: string; cqId: string }) => {
    try {
      // const response = await axios.put(`${BE_Endpoints.PRISMA_PAPERS}`, { projectId, cqId });
      // return response.data;
      let sample_project_web= cqId == '395' ? mcrpc :mcspc ;
      console.info("hello", sample_project_web)
      return sample_project_web;
    } catch (error) {
      throw error;
    }
  }
);


const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjectParams: (state, action: PayloadAction<{ projectId: string; cqId: string }>) => {
      state.activeProject.projectId = action.payload.projectId;
      state.activeProject.cqId = action.payload.cqId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.projectsLoading = 'pending';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projectsLoading = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.projectsLoading = 'failed';
        state.projectsError = action.error.message || 'Failed to fetch projects';
      })
      .addCase(fetchActiveProjectWeb.pending, (state) => {
        state.activeProjectWebLoading = 'pending';
        state.activeProjectWebError = null;
      })
      .addCase(fetchActiveProjectWeb.fulfilled, (state, action) => {
        state.activeProjectWebLoading = 'succeeded';
        state.activeProjectWeb = action.payload;
      })
      .addCase(fetchActiveProjectWeb.rejected, (state, action) => {
        state.activeProjectWebLoading = 'failed';
        state.activeProjectWebError = action.error.message || 'Failed to fetch active project web';
      });
  },
});

export const { setProjectParams } = projectSlice.actions;
export default projectSlice.reducer;
