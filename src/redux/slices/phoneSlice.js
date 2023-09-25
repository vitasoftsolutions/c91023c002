import { createSlice } from "@reduxjs/toolkit";
import { createPhone, fetchPhoneList } from "../Actions/PhoneAction";

const phoneSlice = createSlice({
  name: "phoneSlice",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    currentPage: 1,
    totalPages: 1,
    perPage: 5,
    totalData: 0,
    massage: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhoneList.pending, (state) => {
        state.isLoading = true;
        state.massage = "";
      })
      .addCase(fetchPhoneList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
      })
      .addCase(fetchPhoneList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Create
      .addCase(createPhone.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createPhone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.massage = action.payload;
      })
      .addCase(createPhone.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });

    //   .addCase(searchLoanBeneficiaries.pending, (state) => {
    //     state.isLoading = true;
    //     // Clear previous data when a search is initiated
    //     state.data = [];
    //     state.currentPage = 1;
    //     state.totalPages = 1;
    //     state.totalData = 0;
    //   })
    //   .addCase(searchLoanBeneficiaries.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.data = action.payload;
    //   })
    //   .addCase(searchLoanBeneficiaries.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = action.error.message;
    //   })
  },
});

export default phoneSlice.reducer;
