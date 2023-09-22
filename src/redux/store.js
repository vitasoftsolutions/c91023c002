import { configureStore } from "@reduxjs/toolkit";
import loanBeneListReducer from "./slices/searchLoanSlice";
import createLoanBeneficiaryReducer from "./slices/createLoanBeneficiarySlice";
// import searchAdnSortLoanReducer from "./slices/searchLoanSlice"

export const store = configureStore({
  reducer: {
    loanBeneList: loanBeneListReducer,
    createLoanBeneficiary: createLoanBeneficiaryReducer,
    // searchAdnSortLoan: searchAdnSortLoanReducer
  },
});
