// import axios from "axios";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { base_url } from "../../Components/shared/Url";

// export const updateLoanBeneficiary = createAsyncThunk(
//   "updateLoanBeneficiary",
//   async (payload) => {

//     console.log(payload, "payload")
//     // Get the JWT token from session storage
//     const token = sessionStorage.getItem("jwt_token");

//     // Define the headers
//     const headers = {
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${token}`,
//     };

//     // Make the Axios PUT request with the headers and payload
//     const response = await axios.patch(
//       `${base_url}/loan-beneficaries/${payload.id}/`,
//       payload.data,
//       { headers }
//     );

//     // Return the data from the response
//     return response.data;
//   }
// );

// const updateLoanBeneficiarySlice = createSlice({
//   name: "updateLoanBeneficiary",
//   initialState: {
//     isLoading: false,
//     data: null,
//     isError: false,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(updateLoanBeneficiary.pending, (state) => {
//         state.isLoading = true;
//         state.isError = false; // Reset the error flag
//       })
//       .addCase(updateLoanBeneficiary.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.data = action.payload;
//       })
//       .addCase(updateLoanBeneficiary.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = action.error.message;
//       });
//   },
// });

// export default updateLoanBeneficiarySlice.reducer;
