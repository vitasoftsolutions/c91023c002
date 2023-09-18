import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../Components/shared/Url";
import jwtDecode from "jwt-decode";

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

    const response_token = response.data.results.token;
    const result = jwtDecode(response_token);

    console.log("resultresultresultresult", result.data)

    // Return the data from the response
    return result.data;
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
