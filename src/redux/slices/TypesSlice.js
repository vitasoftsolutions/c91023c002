import { createSlice } from "@reduxjs/toolkit";
import { fetchTypes } from "../Actions/TypesAction";

const typesSlice = createSlice({
  name: "createTypes",
  initialState: {
    isLoading: false,
    data: [],
    sData: [],
    isError: false,
    massage: "",
    isDelete: false,
    isUpdate: false,
    isCreated: false,
  },
  extraReducers: (builder) => {
    builder
      // Fetch LoanBen list
      .addCase(fetchTypes.pending, (state) => {
        state.isLoading = true;
        state.isUpdate = false;
        state.isError = false;
        state.sData = [];
      })
      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCreated = false;
        state.isUpdate = false;
        state.isError = false;
        state.data = action.payload.data;
      })
      .addCase(fetchTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default typesSlice.reducer;
