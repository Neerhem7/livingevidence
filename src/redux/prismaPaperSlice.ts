// store/slices/prismaPaperSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
interface Paper {
  id: number;
  title: string;
  authors: string;
  publish_date: string;
  abstract: string;
  decision: string;
  is_duplicate: string;
  upload_source: string;
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
    pagination : Pagination
  };
  initial: {
    papers: Paper[]
    pagination : Pagination
  };
  living:{
    papers: Paper[]
    pagination : Pagination
  };
  loading: boolean;
}

const initialState: PrismaPaperState = {
  current: {
    papers: [],
    pagination:  {
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
    pagination:  {
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
    pagination:  {
      totalItems: 0,
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      hasNext: false,
      hasPrevious: false,
    }
  },
  loading: false,
};



const BASE_URL = "https://app.lisr.org/backend/api/v1/staging_prisma/prisma/papers?project_id=8";

export const fetchCurrentPapers = createAsyncThunk(
  "prisma/fetchCurrent",
  async ({ stage, page, size }: { stage:string,page: number; size: number }, thunkAPI) => {
    const res = await axios.get(
      `${BASE_URL}&stage=${stage}&source=all&page=${page}&limit=${size}`
    );
    return res.data;
  }
);

export const fetchInitialPapers = createAsyncThunk(
  "prisma/fetchInitial",
  async ({ stage, page, size }: { stage:string,page: number; size: number }, thunkAPI) => {
    const res = await axios.get(
      `${BASE_URL}&stage=${stage}&source=initial&page=${page}&limit=${size}`
    );
    return res.data;
  }
);

export const fetchLivingPapers = createAsyncThunk(
  "prisma/fetchLiving",
  async ({stage, month, page, size }: { stage:string,month: string, page: number; size: number }, thunkAPI) => {
    const res = await axios.get(
      `${BASE_URL}&stage=${stage}&source=living&page=${page}&limit=${size}&date=${month}`
    );
    return res.data;
  }
);


const prismaPaperSlice = createSlice({
  name: 'prismaPaper',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchCurrentPapers
    builder
      .addCase(fetchCurrentPapers.pending, (state) => {
        state.loading = true;
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
      .addCase(fetchCurrentPapers.rejected, (state) => {
        state.loading = false;
      })

    // fetchInitialPapers
      .addCase(fetchInitialPapers.pending, (state) => {
        state.loading = true;
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
      .addCase(fetchInitialPapers.rejected, (state) => {
        state.loading = false;
      })

    // fetchLivingPapers
      .addCase(fetchLivingPapers.pending, (state) => {
        state.loading = true;
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
      .addCase(fetchLivingPapers.rejected, (state) => {
        state.loading = false;
      });
  },
});


export default prismaPaperSlice.reducer;
