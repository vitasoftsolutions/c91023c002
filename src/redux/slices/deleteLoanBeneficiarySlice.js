import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../Components/shared/Url";

export const deleteLoanBeneficiary = createAsyncThunk(
  "deleteLoanBeneficiary",
  async (payload) => {
    // Get the JWT token from session storage
    const token = sessionStorage.getItem("jwt_token");

    // Define the headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the Axios PUT request with the headers and payload
    const response = await axios.delete(
      `${base_url}/loan-beneficaries/${payload}/`,
      { headers }
    );

    // Return the data from the response
    return response.status;
  }
);

const deleteLoanBeneficiarySlice = createSlice({
  name: "deleteLoanBeneficiary",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    isDelete: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteLoanBeneficiary.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isDelete = false;
      })
      .addCase(deleteLoanBeneficiary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDelete = true;
        state.data = action.payload;
      })
      .addCase(deleteLoanBeneficiary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isDelete = false;
      });
  },
});

export default deleteLoanBeneficiarySlice.reducer;
