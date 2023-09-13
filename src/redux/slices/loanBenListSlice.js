import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../Components/shared/Url";

export const fetchLoanBeneList = createAsyncThunk(
  "fetchLoanBeneList",
  async () => {
    // Get the JWT token from session storage
    const token = sessionStorage.getItem("jwt_token");

    // Define the headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    // Make the Axios GET request with the headers
    const response = await axios.get(`${base_url}/loan-beneficaries/`, {
      headers,
    });

    // Return the data from the response
    return response.data;
  }
);

const loanBeneListSlice = createSlice({
  name: "loanBeneList",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanBeneList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLoanBeneList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchLoanBeneList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default loanBeneListSlice.reducer;
