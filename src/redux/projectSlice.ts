// src/redux/projectSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BE_Endpoints } from './BEEndpoints';
import { mcrpc } from '../Pages/data/public_web_mcrpc';
import { mcspc } from '../Pages/data/public_web_mcspc';


interface ProjectsState {
  projects: any[],
  userProjects: any[],
  activeProject: {
    projectId: string | null;
    cqId: string | null;
  },
  activeProjectWeb: any | null;
  projectsLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  projectsError: string | null;
  userProjectsLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  userProjectsError: string | null;
  activeProjectLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  activeProjectError: string | null;
  activeProjectWebLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  activeProjectWebError: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  userProjects: [],
  activeProject: {
    projectId: "0",
    cqId: "0"
  },
  activeProjectWeb: null,
  projectsLoading: 'idle',
  projectsError: null,
  userProjectsLoading: 'idle',
  userProjectsError: null,
  activeProjectLoading: 'idle',
  activeProjectError: null,
  activeProjectWebLoading: 'idle',
  activeProjectWebError: null,
};

export const fetchUserProjects = createAsyncThunk(
  'projects/fetchUserProjects',
  async (_, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.auth.token;
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}` 
      }
      const response = await axios.get(`${BE_Endpoints.USER_PROJECTS}`, {headers:headers});
      return response.data;

    } catch (error) {
      throw error;
    }
  }
);

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    try {
      // const response = await axios.put(`${BE_Endpoints.PRISMA_PAPERS}`);
      // return response.data;
      let sample_projects=[
        {
            "project_id": 210,
            "project_title": "Living Prostate Cancer",
            "clinical_questions": [
                {
                    "clinical_question_id": 329,
                    "clinical_question_title": "Living Prostate Cancer (Default)",
                    "clinical_unique_abbr": "Living Prostate Cancer"
                },
                {
                    "clinical_question_id": 394,
                    "clinical_question_title": "mCSPC",
                    "clinical_unique_abbr": "mcspc"
                },
                {
                    "clinical_question_id": 395,
                    "clinical_question_title": "mCRPC",
                    "clinical_unique_abbr": "mcrpc"
                },
                {
                    "clinical_question_id": 396,
                    "clinical_question_title": "M0_CRPC",
                    "clinical_unique_abbr": "m0crpc"
                },
                {
                    "clinical_question_id": 397,
                    "clinical_question_title": "Toxicity_PCa",
                    "clinical_unique_abbr": "tox_pca"
                },
                {
                    "clinical_question_id": 398,
                    "clinical_question_title": "PARP_mCRPC",
                    "clinical_unique_abbr": "parp_mcrpc"
                }
            ]
        },
        {
            "project_id": 233,
            "project_title": "Living Lung Cancer",
            "clinical_questions": [
                {
                    "clinical_question_id": 356,
                    "clinical_question_title": "Default",
                    "clinical_unique_abbr": "Default"
                }
            ]
        }
    ]
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
      .addCase(fetchUserProjects.pending, (state) => {
        state.userProjectsLoading = 'pending';
      })
      .addCase(fetchUserProjects.fulfilled, (state, action) => {
        state.userProjectsLoading = 'succeeded';
        state.userProjects = action.payload;
      })
      .addCase(fetchUserProjects.rejected, (state, action) => {
        state.userProjectsLoading = 'failed';
        state.userProjectsError = action.error.message || 'Failed to fetch projects';
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
