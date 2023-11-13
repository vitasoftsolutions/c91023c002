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
import AppLabel from "../pages/Dashboard/AppLabel/AppLabel";
import CreateApplabel from "../pages/Dashboard/AppLabel/CreateApplabel";
import Projects from "../pages/Dashboard/Projects/Projects";
import CreateProjects from "../pages/Dashboard/Projects/CreateProjects";
import EditProjects from "../pages/Dashboard/Projects/EditProjects";
import EditAppLabel from "../pages/Dashboard/AppLabel/EditAppLabel";
import WorkProgressLists from "../pages/Dashboard/WorkProgress/WorkProgressLists";
import WorkProgressCreate from "../pages/Dashboard/WorkProgress/WorkProgressCreate";
import WorkProgressEdit from "../pages/Dashboard/WorkProgress/WorkProgressEdit";
import ContractorBenLists from "../pages/Dashboard/ContractorBeneficary/ContractorBenLists";
import ContractorBenCreate from "../pages/Dashboard/ContractorBeneficary/ContractorBenCreate";
import ContractorBenEdit from "../pages/Dashboard/ContractorBeneficary/ContractorBenEdit";
import ContractorAssignList from "../pages/Dashboard/ContractorAssign/ContractorAssignList";
import ContractorAssignCreate from "../pages/Dashboard/ContractorAssign/ContractorAssignCreate";
import ContractorAssignEdit from "../pages/Dashboard/ContractorAssign/ContractorAssignEdit";
import BusinessProfile from "../pages/Dashboard/BusinessProfile/BusinessProfile";
import CreateBusinessProfile from "../pages/Dashboard/BusinessProfile/CreateBusinessProfile";
import EditBusinessProfile from "../pages/Dashboard/BusinessProfile/EditBusinessProfile";

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
        path: "/projects/editprojects",
        element: (
          <PrivetRoute>
            <EditProjects />
          </PrivetRoute>
        ),
      },
      // Business profile
      {

        path: "/business-profile",
        element: (
          <PrivetRoute>
            <BusinessProfile />
          </PrivetRoute>
        ),
      },
      {
        path: "/business-profile/crete-business-profile",
        element: (
          <PrivetRoute>
            <CreateBusinessProfile />
          </PrivetRoute>
        ),
      },
      {
        path: "/business-profile/edit-business-profile",
        element: (
          <PrivetRoute>
            <EditBusinessProfile />
          </PrivetRoute>
        ),
      },
      // floors
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
      {
        path: "/app-label",
        element: (
          <PrivetRoute>
            <AppLabel></AppLabel>
          </PrivetRoute>
        ),
      },
      {
        path: "/app-label/create",
        element: (
          <PrivetRoute>
            <CreateApplabel></CreateApplabel>
          </PrivetRoute>
        ),
      },
      {
        path: "/app-label/edit",
        element: (
          <PrivetRoute>
            <EditAppLabel></EditAppLabel>
          </PrivetRoute>
        ),
      },
      {
        path: "/work-progress",
        element: (
          <PrivetRoute>
            <WorkProgressLists></WorkProgressLists>
          </PrivetRoute>
        ),
      },
      {
        path: "/work-progress/create",
        element: (
          <PrivetRoute>
            <WorkProgressCreate></WorkProgressCreate>
          </PrivetRoute>
        ),
      },
      {
        path: "/work-progress/edit",
        element: (
          <PrivetRoute>
            <WorkProgressEdit></WorkProgressEdit>
          </PrivetRoute>
        ),
      },
      {
        path: "/contractor-beneficaries",
        element: (
          <PrivetRoute>
            <ContractorBenLists></ContractorBenLists>
          </PrivetRoute>
        ),
      },
      {
        path: "/contractor-beneficaries/create",
        element: (
          <PrivetRoute>
            <ContractorBenCreate></ContractorBenCreate>
          </PrivetRoute>
        ),
      },
      {
        path: "/contractor-beneficaries/edit",
        element: (
          <PrivetRoute>
            <ContractorBenEdit></ContractorBenEdit>
          </PrivetRoute>
        ),
      },
      {
        path: "/contractor-assign",
        element: (
          <PrivetRoute>
            <ContractorAssignList></ContractorAssignList>
          </PrivetRoute>
        ),
      },
      {
        path: "/contractor-assign/create",
        element: (
          <PrivetRoute>
            <ContractorAssignCreate></ContractorAssignCreate>
          </PrivetRoute>
        ),
      },
      {
        path: "/contractor-assign/edit",
        element: (
          <PrivetRoute>
            <ContractorAssignEdit></ContractorAssignEdit>
          </PrivetRoute>
        ),
      },
    ],
  },
]);
