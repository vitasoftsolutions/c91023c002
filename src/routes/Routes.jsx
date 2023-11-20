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
import ProjectsDetails from "../pages/Dashboard/Projects/ProjectsDetails";
import FloorDetails from "../pages/Dashboard/Projects/FloorDetails";
import FloorTypeDetails from "../pages/Dashboard/Projects/FloorTypeDetails";
import Brands from "../pages/Dashboard/Brands/Brands";
import EditBrands from "../pages/Dashboard/Brands/EditBrands";
import CreateBrand from "../pages/Dashboard/Brands/CreateBrands";
import Salaries from "../pages/Dashboard/Salaries/Salaries";
import CreateSalaries from "../pages/Dashboard/Salaries/CreateSalaries";
import RenterBeneficiaries from "../pages/Dashboard/RenterBeneficiaries/RenterBeneficiaries";
import RenterBeneficiariesCrete from "../pages/Dashboard/RenterBeneficiaries/RenterBeneficiariesCrete";
import EditRenterBeneficiaries from "../pages/Dashboard/RenterBeneficiaries/EditRenterBeneficiaries";
import CustomerBeneficiaries from "../pages/Dashboard/CustomerBeneficiaries/CustomerBeneficiaries";
import CreateCustomerBeneficiaries from "../pages/Dashboard/CustomerBeneficiaries/CreateCustomerBen";
import EditCustomerBen from "../pages/Dashboard/CustomerBeneficiaries/EditCustomerBen";
import LoanInstallment from "../pages/Dashboard/LoanInstallment/LoanInstallment";
import CreateInstallment from "../pages/Dashboard/LoanInstallment/CreateInstallment";
import LoanTransactions from "../pages/Dashboard/LoanTransactions/LoanTransactions";
import CreateTransactions from "../pages/Dashboard/LoanTransactions/CreateTransactions";

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
        path: "/projects/:projectId",
        element: (
          <PrivetRoute>
            <ProjectsDetails />
          </PrivetRoute>
        ),
      },
      {
        path: "/projects/:id/floor-details",
        element: (
          <PrivetRoute>
            <FloorDetails />
          </PrivetRoute>
        ),
      },
      {
        path: "/projects/:id/floor-details/:id",
        element: (
          <PrivetRoute>
            <FloorTypeDetails />
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
      // Brand
      {

        path: "/brands",
        element: (
          <PrivetRoute>
            <Brands />
          </PrivetRoute>
        ),
      },
      {
        path: "/brands/create-brands",
        element: (
          <PrivetRoute>
            <CreateBrand />
          </PrivetRoute>
        ),
      },
      {
        path: "/brands/edit-brands",
        element: (
          <PrivetRoute>
            <EditBrands />
          </PrivetRoute>
        ),
      },
      // Salary
      {

        path: "/salary",
        element: (
          <PrivetRoute>
            <Salaries />
          </PrivetRoute>
        ),
      },
      {
        path: "/salary/crete-salaries",
        element: (
          <PrivetRoute>
            <CreateSalaries />
          </PrivetRoute>
        ),
      },
      {
        path: "/brands/edit-brands",
        element: (
          <PrivetRoute>
            <EditBrands />
          </PrivetRoute>
        ),
      },
      // renter
      {
        path: "/renter-beneficiaries",
        element: (
          <PrivetRoute>
            <RenterBeneficiaries />
          </PrivetRoute>
        ),
      },
      {
        path: "/renter-beneficiaries/renter-beneficiaries-crete",
        element: (
          <PrivetRoute>
            <RenterBeneficiariesCrete />
          </PrivetRoute>
        ),
      },
      {
        path: "/renter-beneficiaries/edit-renter-beneficiaries",
        element: (
          <PrivetRoute>
            <EditRenterBeneficiaries />
          </PrivetRoute>
        ),
      },
      // renter
      {
        path: "/customer-beneficiaries",
        element: (
          <PrivetRoute>
            <CustomerBeneficiaries />
          </PrivetRoute>
        ),
      },
      {
        path: "/customer-beneficiaries/customer-beneficiaries-crete",
        element: (
          <PrivetRoute>
            <CreateCustomerBeneficiaries />
          </PrivetRoute>
        ),
      },
      {
        path: "/customer-beneficiaries/edit-customer-beneficiaries",
        element: (
          <PrivetRoute>
            <EditCustomerBen />
          </PrivetRoute>
        ),
      },
      // loan-installment
      {
        path: "/loan-installment",
        element: (
          <PrivetRoute>
            <LoanInstallment />
          </PrivetRoute>
        ),
      },
      {
        path: "/loan-installment/create-loan-installment",
        element: (
          <PrivetRoute>
            <CreateInstallment />
          </PrivetRoute>
        ),
      },
      // TODO:
      {
        path: "/customer-beneficiaries/edit-customer-beneficiaries",
        element: (
          <PrivetRoute>
            <EditCustomerBen />
          </PrivetRoute>
        ),
      },
      // Loan-Transactions
      {
        path: "/loan-transactions",
        element: (
          <PrivetRoute>
            <LoanTransactions />
          </PrivetRoute>
        ),
      },
      {
        path: "/loan-transactions/create-loan-transactions",
        element: (
          <PrivetRoute>
            <CreateTransactions />
          </PrivetRoute>
        ),
      },
      {
        path: "/loan-transactions/edit-loan-transactions",
        element: (
          <PrivetRoute>
            <EditCustomerBen />
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
