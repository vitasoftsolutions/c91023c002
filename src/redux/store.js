import { configureStore } from "@reduxjs/toolkit";
import loanBeneListReducer from "./slices/searchLoanSlice";
import createLoanBeneficiaryReducer from "./slices/createLoanBeneficiarySlice";
import deleteLoanBeneficiaryReducer from "./slices/deleteLoanBeneficiarySlice";
import phoneReducers from "./slices/phoneSlice";
import employeeReducers from "./slices/employeeSlice";

export const store = configureStore({
  reducer: {
    loanBeneList: loanBeneListReducer,
    createLoanBeneficiary: createLoanBeneficiaryReducer,
    deleteLoanBeneficiary: deleteLoanBeneficiaryReducer,
    phoneReducers: phoneReducers,
    employeeReducers: employeeReducers,
  },
});
