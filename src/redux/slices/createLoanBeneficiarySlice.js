import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../Components/shared/Url";

export const createLoanBeneficiary = createAsyncThunk(
  "createLoanBeneficiary",
  async (payload) => {
    console.log(payload, "_____")
    try {
      const token = sessionStorage.getItem("jwt_token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(`${base_url}/loan-beneficaries/`, payload, { headers });
      // console.log(response.json(), "______")
      return response.data;
    } catch (error) {
      throw new Error("Failed to update loan beneficiary"); // Customize the error message as needed
    }
  }
);



const createLoanBeneficiarySlice = createSlice({
  name: "createLoanBeneficiary",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLoanBeneficiary.pending, (state) => {
        state.isLoading = true;
        state.isError = false; // Reset the error flag
      })
      .addCase(createLoanBeneficiary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createLoanBeneficiary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default createLoanBeneficiarySlice.reducer;
