import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/LayoutMain";
import Login_Page from "../pages/Login_Page";
import HomePage from "../pages/Dashboard/HomePage";
import PrivetRoute from "./PrivetRoute";
import CreatePhone from "../pages/Dashboard/PhonePage/CreatePhone";
import PhoneList from "../pages/Dashboard/PhonePage/PhoneList";
import PhoneDetailsEdit from "../pages/Dashboard/PhonePage/PhoneDetailsEdit";
import EditLoanBen from "../pages/Dashboard/LoanBeneficiary/EditLoanBen";
import Employee from "../pages/Dashboard/Employee/Employee";
import CreateEmployee from "../pages/Dashboard/Employee/CreateEmployee";
import EditEmployee from "../pages/Dashboard/Employee/EditEmployee";
import Owner from "../pages/Dashboard/Owner/Owner";
import CreateOwner from "../pages/Dashboard/Owner/CreateOwner";
import EditOwner from "../pages/Dashboard/Owner/EditOwner";
import CreateLoanBeneficiary from "../pages/Dashboard/LoanBeneficiary/CreateLoanBeneficiary";
import LoanBeneficiaryList from "../pages/Dashboard/LoanBeneficiary/LoanBeneficiaryList";
import CreateAttendance from "../pages/Dashboard/Attendance/CreateAttendance";
import Attendance from "../pages/Dashboard/Attendance/Attendance";
import EditAttendance from "../pages/Dashboard/Attendance/EditAttendance";
import Floors from "../pages/Dashboard/Floors/Floors";
import CreateFloors from "../pages/Dashboard/Floors/CreateFloors";
import FloorsDetails from "../pages/Dashboard/Floors/FloorsDetails";
import Projects from "../pages/Dashboard/Projects/Projects";
import CreateProjects from "../pages/Dashboard/Projects/CreateProjects";

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
            <CreateLoanBeneficiary />
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
      // Owner
      {
        path: "/owner",
        element: (
          <PrivetRoute>
            <Owner />
          </PrivetRoute>
        ),
      },
      {
        path: "/owner/createowner",
        element: (
          <PrivetRoute>
            <CreateOwner />
          </PrivetRoute>
        ),
      },
      {
        path: "/owner/editeowner",
        element: (
          <PrivetRoute>
            <EditOwner />
          </PrivetRoute>
        ),
      },
      // attendance
      {
        path: "/attendance",
        element: (
          <PrivetRoute>
            <Attendance />
          </PrivetRoute>
        ),
      },
      {
        path: "/attendance/createattendance",
        element: (
          <PrivetRoute>
            <CreateAttendance />
          </PrivetRoute>
        ),
      },
      {
        path: "/attendance/editeattendance",
        element: (
          <PrivetRoute>
            <EditAttendance />
          </PrivetRoute>
        ),
      },
      // Projects
      {

        path: "/projects",
        element: (
          <PrivetRoute>
            <Projects />
          </PrivetRoute>
        ),
      },
      {
        path: "/projects/crete-projects",
        element: (
          <PrivetRoute>
            <CreateProjects />
          </PrivetRoute>
        ),
      },
      {
        path: "/floors",
        element: (
          <PrivetRoute>
            <Floors />
          </PrivetRoute>
        ),
      },
      {
        path: "/floors/floors-crete",
        element: (
          <PrivetRoute>
            <CreateFloors />
          </PrivetRoute>
        ),
      },
      {
        path: "/floors/:floorId",
        element: (
          <PrivetRoute>
            <FloorsDetails />
          </PrivetRoute>
        ),
      },
    ],
  },
]);
