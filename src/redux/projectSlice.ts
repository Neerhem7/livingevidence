// src/redux/projectSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectState {
  projectId: string | null;
  cqId: string | null;
}

const initialState: ProjectState = {
  // projectId: "8",
  // cqId: "5",
  projectId: "202",
  cqId: "116",
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectParams: (state, action: PayloadAction<{ projectId: string; cqId: string }>) => {
      state.projectId = action.payload.projectId;
      state.cqId = action.payload.cqId;
    },
  },
});

export const { setProjectParams } = projectSlice.actions;
export default projectSlice.reducer;
