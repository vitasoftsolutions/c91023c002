import { configureStore } from "@reduxjs/toolkit";
// import loanBeneListReducer from "./slices/searchLoanSlice";
import loanBeneficiary from "./slices/loanBeneficiarySlice";
import phoneReducers from "./slices/phoneSlice";
import employeeReducers from "./slices/employeeSlice";
import ownerReducers from "./slices/ownerBeneficiarySlice";
import attendanceReducers from "./slices/AttendanceSlice";
import applabelReducer from "./slices/AppLabelSlice";
import projectsReducer from "./slices/ProjectsSlice";
import typesReducers from "./slices/TypesSlice";

export const store = configureStore({
  reducer: {
    // loanBeneList: loanBeneListReducer,
    loanBeneficiary: loanBeneficiary,
    projectsReducer: projectsReducer,
    phoneReducers: phoneReducers,
    employeeReducers: employeeReducers,
    ownerReducers: ownerReducers,
    attendanceReducers: attendanceReducers,
    applabelReducer: applabelReducer,

    typesReducers: typesReducers,
  },
});
