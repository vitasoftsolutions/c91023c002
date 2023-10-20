// import axios from "axios";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { base_url } from "../../Components/shared/Url";
// import jwtDecode from "jwt-decode";

// export const fetchLoanBeneList = createAsyncThunk(
//   "fetchLoanBeneList",
//   async (page, { getState }) => {
//     // Get the JWT token from session storage
//     const token = sessionStorage.getItem("jwt_token");

//     const { perPage } = getState().loanBeneList;

//     // Define the headers
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     };

//     // Make the Axios GET request with the headers
//     const response = await axios.get(
//       `${base_url}/loan-beneficaries/?limit=${perPage}&offset=${
//         (page - 1) * perPage
//       }`,
//       {
//         headers,
//       }
//     );

//     const response_token = response.data.results.token;
//     const result = jwtDecode(response_token);

//     const data = result.data;
//     const totalData = Math.ceil(response.data.count);
//     const totalPages = Math.ceil(totalData / perPage);

//     // Return the data and pagination information
//     return {
//       data,
//       currentPage: page,
//       totalPages,
//       totalData,
//     };
//   }
// );

// const loanBeneListSlice = createSlice({
//   name: "loanBeneList",
//   initialState: {
//     isLoading: false,
//     data: [],
//     isError: false,
//     currentPage: 1,
//     totalPages: 1,
//     perPage: 5,
//     totalData: 0,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLoanBeneList.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchLoanBeneList.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.data = action.payload.data;
//         state.currentPage = action.payload.currentPage;
//         state.totalPages = action.payload.totalPages;
//         state.totalData = action.payload.totalData;
//       })
//       .addCase(fetchLoanBeneList.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = action.error.message;
//       });
//   },
// });

// export default loanBeneListSlice.reducer;
