import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../config";

// Types based on the API response structure
export interface OutcomeNode {
  name: string;
  type: "root" | "category" | "outcome";
  outcome_id: number | null;
  children: OutcomeNode[];
}

export interface OutcomeCategorizationResponse {
  pwma_categorization: string;
  nma_categorization: string | null;
  pwma_category: OutcomeNode;
}

interface OutcomeState {
  categorization: OutcomeCategorizationResponse | null;
  loading: boolean;
  error: string | null;
  selectedOutcomes: number[];
}

const initialState: OutcomeState = {
  categorization: null,
  loading: false,
  error: null,
  selectedOutcomes: [],
};

// Async thunk for fetching outcome categorization
export const fetchOutcomeCategorization = createAsyncThunk(
  "outcome/fetchCategorization",
  async ({
    outcomeId,
    projectId,
  }: {
    outcomeId: string;
    projectId: string;
  }) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${config.API_URL}/outcome/outcome_categorization/${outcomeId}/${projectId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: OutcomeCategorizationResponse = await response.json();
    return data;
  }
);

const outcomeSlice = createSlice({
  name: "outcome",
  initialState,
  reducers: {
    toggleOutcomeSelection: (state, action) => {
      const outcomeId = action.payload;
      const index = state.selectedOutcomes.indexOf(outcomeId);

      if (index > -1) {
        state.selectedOutcomes.splice(index, 1);
      } else {
        state.selectedOutcomes.push(outcomeId);
      }
    },
    clearOutcomeSelection: (state) => {
      state.selectedOutcomes = [];
    },
    setSelectedOutcomes: (state, action) => {
      state.selectedOutcomes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOutcomeCategorization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOutcomeCategorization.fulfilled, (state, action) => {
        state.loading = false;
        state.categorization = action.payload;
      })
      .addCase(fetchOutcomeCategorization.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch outcome categorization";
      });
  },
});

export const {
  toggleOutcomeSelection,
  clearOutcomeSelection,
  setSelectedOutcomes,
} = outcomeSlice.actions;

export default outcomeSlice.reducer;
