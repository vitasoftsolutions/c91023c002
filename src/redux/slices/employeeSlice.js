import { createSlice } from "@reduxjs/toolkit";
import {
  createPhone,
  fetchPhoneList,
  searchPhoneByName,
  sortByAZPhone,
  sortByDatePhone,
} from "../Actions/PhoneAction";

const employeeSlice = createSlice({
  name: "employeeSlice",
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
      })
      // Search Phone By Name
      .addCase(searchPhoneByName.pending, (state) => {
        state.isLoading = true;
        // Clear previous data when a search is initiated
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(searchPhoneByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(searchPhoneByName.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Sort by date
      .addCase(sortByDatePhone.pending, (state) => {
        state.isLoading = true;
        // Clear previous data when a search is initiated
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(sortByDatePhone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(sortByDatePhone.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Sort by A-Z
      .addCase(sortByAZPhone.pending, (state) => {
        state.isLoading = true;
        // Clear previous data when a search is initiated
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalData = 0;
      })
      .addCase(sortByAZPhone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(sortByAZPhone.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
