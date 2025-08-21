// src/redux/outcomeCategoriesSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BE_Endpoints } from "./BEEndpoints";

interface OutcomeNode {
  name: string;
  type: "root" | "category" | "outcome";
  outcome_id: number | null;
  children: OutcomeNode[];
}

interface OutcomeCategorizationResponse {
  pwma_categorization: string;
  nma_categorization: string | null;
  pwma_category: OutcomeNode;
}

interface OutcomeCategoriesState {
  categorization: OutcomeCategorizationResponse | null;
  categories: OutcomeNode[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  selectedCategories: string[];
  selectedOutcomes: number[]; // Keep as array but will only contain 0 or 1 item
}

const initialState: OutcomeCategoriesState = {
  categorization: null,
  categories: [],
  loading: "idle",
  error: null,
  selectedCategories: [],
  selectedOutcomes: [],
};

export const fetchOutcomeCategories = createAsyncThunk(
  "outcomeCategories/fetchOutcomeCategories",
  async (params: { clinicalQuestionId: string; projectId: string }, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.auth?.token || localStorage.getItem("token");

      const response = await axios.get(
        BE_Endpoints.OUTCOME_CATEGORIZATION(params.projectId, params.clinicalQuestionId),
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      return response.data as OutcomeCategorizationResponse;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch outcome categories"
      );
    }
  }
);

const outcomeCategoriesSlice = createSlice({
  name: "outcomeCategories",
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<string>) => {
      const categoryId = action.payload;
      if (state.selectedCategories.includes(categoryId)) {
        state.selectedCategories = state.selectedCategories.filter(
          (id) => id !== categoryId
        );
      } else {
        state.selectedCategories.push(categoryId);
      }
    },
    toggleOutcome: (state, action: PayloadAction<number>) => {
      const outcomeId = action.payload;
      //   if (state.selectedOutcomes.includes(outcomeId)) {
      //     // If already selected, deselect it
      //     state.selectedOutcomes = [];
      //   } else {
      // If not selected, select only this one (clear others)
      state.selectedOutcomes = [outcomeId];
      //   }
    },
    clearSelectedCategories: (state) => {
      state.selectedCategories = [];
    },
    clearSelectedOutcomes: (state) => {
      state.selectedOutcomes = [];
    },
    setSelectedCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload;
    },
    setSelectedOutcomes: (state, action: PayloadAction<number[]>) => {
      state.selectedOutcomes = action.payload;
    },
    clearCategories: (state) => {
      state.categories = [];
      state.categorization = null;
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOutcomeCategories.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchOutcomeCategories.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.categorization = action.payload;
        // Extract the hierarchical categories from the response
        state.categories = action.payload.pwma_category.children || [];
      })
      .addCase(fetchOutcomeCategories.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {
  toggleCategory,
  toggleOutcome,
  clearSelectedCategories,
  clearSelectedOutcomes,
  setSelectedCategories,
  setSelectedOutcomes,
  clearCategories,
} = outcomeCategoriesSlice.actions;

export default outcomeCategoriesSlice.reducer;
