// src/redux/projectSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BE_Endpoints } from './BEEndpoints';


interface ProjectsState {
  projects: any[],
  activeProject: {
    projectId: string | null;
    cqId: string | null;
  },
  projectsLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  projectsError: string | null;
  activeProjectLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  activeProjectError: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  activeProject: {
    projectId: "0",
    cqId: "0"
  },
  projectsLoading: 'idle',
  projectsError: null,
  activeProjectLoading: 'idle',
  activeProjectError: null,
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
          name: '',
          abbr: '',
          id:'',
        },
        {
          name: '',
          abbr: '',
          id:'',
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
          id:'5',
        },
        {
          name: 'mcrpc',
          abbr: 'mcrpc',
          id:'6',
        }
        ]
      }]
      return sample_projects;
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
      });
  },
});

export const { setProjectParams } = projectSlice.actions;
export default projectSlice.reducer;
