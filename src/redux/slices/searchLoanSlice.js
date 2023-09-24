import { createSlice } from "@reduxjs/toolkit";
import {
  searchLoanBeneficiaries,
  fetchLoanBeneList,
} from "../Actions/loanBenAction";

const loanBeneListSlice = createSlice({
  name: "loanBeneList",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    currentPage: 1,
    totalPages: 1,
    perPage: 5,
    totalData: 0,
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchLoanBeneficiaries.pending, (state) => {
        state.isLoading = true;
        // Clear previous data when a search is initiated
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(searchLoanBeneficiaries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(searchLoanBeneficiaries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(fetchLoanBeneList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLoanBeneList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
      })
      .addCase(fetchLoanBeneList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default loanBeneListSlice.reducer;