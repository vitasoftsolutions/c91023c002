import { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import {
  fetchLoanBene,
  updateLoanBeneficiary,
} from "../../../redux/Actions/AssignContractorAction";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { fetchProjectsAllList } from "../../../redux/Actions/ProjectsAction";
import { fetchContructorAllList } from "../../../redux/Actions/ContractorBenAction";
const ContractorAssignEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contractorState = useSelector(
    (state) => state.assignContractorReducers
  );

  const conBenState = useSelector(
    (state) => state.ContractorBenReducers.con_data
  );


  const projectState = useSelector((state) => state.projectsReducer.con_data);

  const location = useLocation();
  const state = contractorState.sData;

  useEffect(() => {
    dispatch(fetchLoanBene(location.state));
  }, [location.state, dispatch]);

  //options code
  useEffect(() => {
    dispatch(fetchContructorAllList());
    dispatch(fetchProjectsAllList());
  }, [dispatch]);
 
  

  const formsData = [
    {
      fieldName: "Contructor id",
      fieldType: "select",
      fieldPlaceholder: "Select a contractor",
      isRequired: false,
      options: conBenState?.map(
        (dt, index) => (
          console.log("vl", state.contructor_id, dt.id),
          {
            is_select: state.contructor_id === dt.id ? "selected" : "",
            index: state.contructor_id === dt.id ? index : null,
            value: dt.id,
            label: `${
              dt?.first_name === null
                ? dt.username
                : dt?.first_name + " " + dt?.last_name
            }`,
          }
        )
      ),
      defaultValue: state.contructor_id
        ? conBenState?.findIndex((dt) => dt.id === state.contructor_id)
        : null,
    },
    {
      fieldName: "Project id",
      fieldType: "select",
      fieldPlaceholder: "Select a project",
      isRequired: false,
      options: projectState?.map((dt, index) =>
        // console.log("vl", state.project_id === dt.id ? index : null),
        ({
          is_select: state.project_id === dt.id ? "selected" : "",
          index: state.project_id === dt.id ? index : null,
          value: dt.id,
          label: `${dt?.name === null ? dt.username : dt?.name}`,
        })
      ),
      defaultValue: state.project_id
        ? projectState?.findIndex((dt) => dt.id === state.project_id)
        : null,
    },
    {
      fieldName: "Rate",
      fieldType: "text",
      fieldPlaceholder: "Rate",
      isRequired: false,
      defaultValue: state.rate,
    },
    {
      fieldName: "Rate per work",
      fieldType: "text",
      fieldPlaceholder: "Rate per work",
      isRequired: false,
      defaultValue: state.rate_per_work,
    },
    {
      fieldName: "Unit",
      fieldType: "text",
      fieldPlaceholder: "Unit",
      isRequired: false,
      defaultValue: state.unit,
    },
    {
      fieldName: "Work order amount",
      fieldType: "number",
      fieldPlaceholder: "Work Order Amount",
      isRequired: false,
      defaultValue: state.work_order_amount,
    },
    {
      fieldName: "Payed Amount",
      fieldType: "number",
      fieldPlaceholder: "Payed Amount",
      isRequired: false,
      defaultValue: state.payed_amount,
    },
    {
      fieldName: "Due Amount",
      fieldType: "number",
      fieldPlaceholder: "Due Amount",
      isRequired: false,
      defaultValue: state.due_amount,
    },
    {
      fieldName: "Workers",
      fieldType: "number",
      fieldPlaceholder: "Workers",
      isRequired: false,
      defaultValue: state.workers,
    },
    {
      fieldName: "Worker payement",
      fieldType: "number",
      fieldPlaceholder: "Worker payement",
      isRequired: false,
      defaultValue: state.worker_payement,
    },
    {
      fieldName: "Security Money Percentage",
      fieldType: "number",
      fieldPlaceholder: "Percentage(%)",
      isRequired: false,
      defaultValue: state.security_money_percentage,
    },
    {
      fieldName: "Security Amount",
      fieldType: "number",
      fieldPlaceholder: "Security Amount",
      isRequired: false,
      defaultValue: state.security_amount,
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      console.log(data.contructor_id, "From update page");
      const updatedData = {
        id: state.id,
        status: data.status ? data.status : state.status,
        contructor_id: data.contructor_id
          ? data.contructor_id
          : state.contructor_id,
        project_id: data.project_id ? data.project_id : state.project_id,
        rate: data.rate ? data.rate : state.rate,
        rate_per_work: data.rate_per_work
          ? data.rate_per_work
          : state.rate_per_work,
        unit: data.unit ? data.unit : state.unit,
        work_order_amount: data.work_order_amount
          ? data.work_order_amount
          : state.work_order_amount,
        payed_amount: data.payed_amount
          ? data.payed_amount
          : state.payed_amount,
        due_amount: data.due_amount ? data.due_amount : state.due_amount,
        workers: data.workers ? data.workers : state.workers,
        worker_payement: data.worker_payment
          ? data.worker_payement
          : state.worker_payement,
        security_money_percentage: data.security_money_percentage
          ? data.security_money_percentage
          : state.security_money_percentage,
        security_amount: data.security_amount
          ? data.security_amount
          : state.security_amount,
      };
      dispatch(
        updateLoanBeneficiary({
          id: state.id,
          data: updatedData,
        })
      );
    }
  };

  // In a useEffect or similar, check the updated state
  useEffect(() => {
    if (contractorState.isUpdate) {
      // Perform actions after the update is successful
      toast("Successfully done", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/contractor-assign");
      }, 3000);
    }
  }, [contractorState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/contractor-assign"}
            className="btn btn-sm font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
          >
            <BsArrowLeftShort /> Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 rounded-lg md:p-4">
        <MainForm
          formsData={formsData}
          submitFunction={submitFunction}
          isReset={true}
          isState={state}
        />
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default ContractorAssignEdit;
