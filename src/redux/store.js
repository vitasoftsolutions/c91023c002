import { configureStore } from "@reduxjs/toolkit";
import loanBeneListReducer from "./slices/loanBenListSlice";
import createLoanBeneficiaryReducer from "./slices/createLoanBeneficiarySlice";

export const store = configureStore({
  reducer: {
    loanBeneList: loanBeneListReducer,
    createLoanBeneficiary: createLoanBeneficiaryReducer,
  },
});
