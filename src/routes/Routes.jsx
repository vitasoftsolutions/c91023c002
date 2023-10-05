import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/LayoutMain";
import Login_Page from "../pages/Login_Page";
import LoanBeneficiary from "../pages/Dashboard/LoanBeneficiary";
import LoanBeneficiaryList from "../pages/Dashboard/LoanBeneficiaryList";
import HomePage from "../pages/Dashboard/HomePage";
import PrivetRoute from "./PrivetRoute";
import CreatePhone from "../pages/Dashboard/PhonePage/CreatePhone";
import PhoneList from "../pages/Dashboard/PhonePage/PhoneList";
import PhoneDetailsEdit from "../pages/Dashboard/PhonePage/PhoneDetailsEdit";
import EditLoanBen from "../pages/Dashboard/LoanBeneficiary/EditLoanBen";
import Employee from "../pages/Dashboard/Employee/Employee";
import CreateEmployee from "../pages/Dashboard/Employee/CreateEmployee";
import EditEmployee from "../pages/Dashboard/Employee/EditEmployee";

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
        path: "/beneficiarylist/loan-beneficiary-crete",
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
            <LoanBeneficiaryList />
          </PrivetRoute>
        ),
      },
      {
        path: "/beneficiarylist/editloan",
        element: (
          <PrivetRoute>
            <EditLoanBen />
          </PrivetRoute>
        ),
      },
      {
        path: "/phone",
        element: (
          <PrivetRoute>
            <PhoneList />
          </PrivetRoute>
        ),
      },
      {
        path: "/phone/createphone",
        element: (
          <PrivetRoute>
            <CreatePhone />
          </PrivetRoute>
        ),
      },
      {
        path: "/phone/editphone",
        element: (
          <PrivetRoute>
            <PhoneDetailsEdit />
          </PrivetRoute>
        ),
      },
      // employee
      {
        path: "/employee",
        element: (
          <PrivetRoute>
            <Employee />
          </PrivetRoute>
        ),
      },
      {
        path: "/employee/createemployee",
        element: (
          <PrivetRoute>
            <CreateEmployee />
          </PrivetRoute>
        ),
      },
      {
        path: "/employee/editemployee",
        element: (
          <PrivetRoute>
            <EditEmployee />
          </PrivetRoute>
        ),
      },
    ],
  },
]);
