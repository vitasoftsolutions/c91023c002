import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/LayoutMain";
import Login_Page from "../pages/Login_Page";
import LoanBeneficiary from "../pages/Dashboard/LoanBeneficiary";
import LoanBeneficiaryList from "../pages/Dashboard/LoanBeneficiaryList";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Login_Page />,
      },
      {
        path: "/loan-beneficiary",
        element: <LoanBeneficiary />,
      },
      {
        path: "/loan-beneficiarylist",
        element: <LoanBeneficiaryList />,
      },
    ],
  },
]);
