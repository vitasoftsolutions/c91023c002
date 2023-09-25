import { configureStore } from "@reduxjs/toolkit";
import loanBeneListReducer from "./slices/searchLoanSlice";
import createLoanBeneficiaryReducer from "./slices/createLoanBeneficiarySlice";
import phoneReducers from "./slices/phoneSlice";

export const store = configureStore({
  reducer: {
    loanBeneList: loanBeneListReducer,
    createLoanBeneficiary: createLoanBeneficiaryReducer,
    phoneReducers: phoneReducers,
  },
});
