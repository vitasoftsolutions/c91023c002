import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../Components/shared/Url";
import jwtDecode from "jwt-decode";

export const searchLoanBeneficiaries = createAsyncThunk(
  "searchLoanBeneficiaries",
  async (firstName) => {
    // Get the JWT token from session storage
    const token = sessionStorage.getItem("jwt_token");

    // Define the headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the Axios GET request with the headers
    const response = await axios.get(
      `${base_url}/loan-beneficaries/?first_name=${firstName}`,
      {
        headers,
      }
    );

    const response_token = response.data.results.token;
    const result = jwtDecode(response_token);

    const data = result.data;

    // Return the data
    return data;
  }
);

const searchLoanSlice = createSlice({
  name: "searchLoan",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchLoanBeneficiaries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchLoanBeneficiaries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(searchLoanBeneficiaries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default searchLoanSlice.reducer;
