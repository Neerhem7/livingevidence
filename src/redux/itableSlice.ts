// store/slices/iTableSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BE_Endpoints } from './BEEndpoints';

interface ProjectState {
  projectId: string | null;
  cqId: string | null;
}

interface ITableState {
  items: any[];
  filters: any[];
  pageInfo: {
    total: number;
    page: number;
    size: number;
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: ITableState = {
  items: [],
  filters: [],
  pageInfo: {
    total: 0,
    page: 1,
    total_pages: 0,
    size: 10,
    has_next: false,
    has_previous: false,
  },
  loading: false,
  error: null,
};

export const fetchITableData = createAsyncThunk(
  'iTable/fetchData',
  async (
    {
      page = 1,
      size = 10,
      filters = [],
    }: { page?: number; size?: number; filters?: any[] },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as { project: ProjectState };
    const { projectId, cqId } = state.project;

    if (!projectId || !cqId) {
      return thunkAPI.rejectWithValue('Project ID or CQ ID is missing.');
    }
   
    try {
      const res = await axios.post(
        `${BE_Endpoints.BASE_URL_ITABLE}/${projectId}/${cqId}/all`,
        {
          filters,
          page,
          size,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice
const iTableSlice = createSlice({
  name: 'iTable',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchITableData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchITableData.fulfilled, (state, action) => {
        state.loading = false;
      
        const updatedItems = action.payload.items.map((item: any) => {
          const rootNode = item.extraction_results.find((result: { name: string }) => result.name === "Root Node");
          const rootNodeId = rootNode?.id;
        
          const updatedResults = item.extraction_results
            .filter((result: { name: string }) => result.name !== "Root Node")
            .map((result: any) => ({
              ...result,
              parent_id: result.parent_id === rootNodeId ? null : result.parent_id,
            }));
        
          return {
            ...item,
            extraction_results: updatedResults,
          };
        });
        state.items = updatedItems;
        state.filters = action.payload.filters;
        state.pageInfo = action.payload.page_info;
      })
      
      .addCase(fetchITableData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default iTableSlice.reducer;
