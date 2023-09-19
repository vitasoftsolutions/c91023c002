import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/LayoutMain";
import Login_Page from "../pages/Login_Page";
import LoanBeneficiary from "../pages/Dashboard/LoanBeneficiary";
import LoanBeneficiaryList from "../pages/Dashboard/LoanBeneficiaryList";
import HomePage from "../pages/Dashboard/HomePage";
import PrivetRoute from "./PrivetRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: (
          <PrivetRoute>
            <HomePage />
          </PrivetRoute>
        ),
      },
      {
        path: "/login",
        element: <Login_Page />,
      },
      {
        path: "/loan-beneficiary-crete",
        element: (
          <PrivetRoute>
            <LoanBeneficiary />
          </PrivetRoute>
        ),
      },
      {
        path: "/beneficiarylist",
        element: (
          <PrivetRoute>
            <LoanBeneficiaryList />{" "}
          </PrivetRoute>
        ),
      },
    ],
  },
]);
