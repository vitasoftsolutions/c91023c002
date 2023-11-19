import { configureStore } from "@reduxjs/toolkit";
import loanBeneficiary from "./slices/loanBeneficiarySlice";
import salaryReducer from "./slices/salariesSlice";
import floorsReducer from "./slices/floorSlice";
import businessProfileReducer from "./slices/BusinessProfileSlice";
import brandsReducer from "./slices/brandsSlice";
import phoneReducers from "./slices/phoneSlice";
import employeeReducers from "./slices/employeeSlice";
import ownerReducers from "./slices/ownerBeneficiarySlice";
import attendanceReducers from "./slices/AttendanceSlice";
import applabelReducer from "./slices/AppLabelSlice";
import projectsReducer from "./slices/ProjectsSlice";
import typesReducers from "./slices/TypesSlice";
import workprogressReducers from "./slices/WorkprogressSlice";
import ContractorBenReducers from "./slices/ContractorBenSlice";
import assignContractorSlice from "./slices/AssignContractorSlice";
import renterBeneficiaryReducer from "./slices/renterBeneficiarySlice";



export const store = configureStore({
  reducer: {
    loanBeneficiary: loanBeneficiary,
    renterBeneficiaryReducer: renterBeneficiaryReducer,
    brandsReducer: brandsReducer,
    salaryReducer: salaryReducer,
    businessProfileReducer: businessProfileReducer,
    floorsReducer: floorsReducer,
    projectsReducer: projectsReducer,
    phoneReducers: phoneReducers,
    employeeReducers: employeeReducers,
    ownerReducers: ownerReducers,
    attendanceReducers: attendanceReducers,
    applabelReducer: applabelReducer,
    typesReducers: typesReducers,
    workprogressReducers:workprogressReducers,
    ContractorBenReducers:ContractorBenReducers,
    assignContractorSlice:assignContractorSlice
  },
});
