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
import assignContractorReducers from "./slices/AssignContractorSlice";
import renterBeneficiaryReducer from "./slices/renterBeneficiarySlice";
import customersBenReducer from "./slices/customersBeneficiarySlice";
import loanInstallmentReducer from "./slices/loanInstallmentSlice";
import loanTransactionsReducer from "./slices/loanTransactionsSlice";
import loanLogsReducer from "./slices/loanLgsSlice";
import paymentContractorReducers from "./slices/PaymentContractorSlice";
import guarantorContractorReducers from "./slices/ContractorGurantorSlice";
import supplierBenSliceReducers from "./slices/SupplierBenSlice";
import TypesModuleSliceReducers from "./slices/TypesModuleSlice";
import expenseSliceReducers from "./slices/ExpenseSlice";
import incomeSliceReducers from "./slices/IncomeSlice";
import leavesReducer from "./slices/leavesSlice";
// 
import propertyReducer from "./slices/propertySlice";
import propertyPurchaseReducer from "./slices/_propertyPurchaseSlice";
import flateRentReducer from "./slices/flateRentSlice";
import rentCollectionReducer from "./slices/rentCollectionSlice";
import repairRecordsReducer from "./slices/repairRecordsSlice";
import projectProgressReducer from "./slices/projectProgressSlice";
import expenseByPropertyReducer from "./slices/ExpenseByPropertySlice";
import warehouseItemsReducer from "./slices/_warehouseItemsSlice";


export const store = configureStore({
  reducer: {
    loanBeneficiary: loanBeneficiary,
    // 
    propertyReducer: propertyReducer,
    warehouseItemsReducer: warehouseItemsReducer,
    leavesReducer: leavesReducer,
    propertyPurchaseReducer: propertyPurchaseReducer,
    flateRentReducer: flateRentReducer,
    rentCollectionReducer: rentCollectionReducer,
    repairRecordsReducer: repairRecordsReducer,
    projectProgressReducer: projectProgressReducer,
    expenseByPropertyReducer: expenseByPropertyReducer,
    // 
    loanLogsReducer: loanLogsReducer,
    renterBeneficiaryReducer: renterBeneficiaryReducer,
    loanTransactionsReducer: loanTransactionsReducer,
    loanInstallmentReducer: loanInstallmentReducer,
    customersBenReducer: customersBenReducer,
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
    assignContractorReducers:assignContractorReducers,
    paymentContractorReducers:paymentContractorReducers,
    guarantorContractorReducers:guarantorContractorReducers,
    supplierBenSliceReducers:supplierBenSliceReducers,
    TypesModuleSliceReducers:TypesModuleSliceReducers,
    expenseSliceReducers:expenseSliceReducers,
    incomeSliceReducers:incomeSliceReducers,
  },
});
