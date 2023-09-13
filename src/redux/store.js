import { configureStore } from "@reduxjs/toolkit";
import loanBeneListReducer from "./slices/loanBenListSlice";

export const store = configureStore({
  reducer: {
    loanBeneList: loanBeneListReducer,
  },
});
