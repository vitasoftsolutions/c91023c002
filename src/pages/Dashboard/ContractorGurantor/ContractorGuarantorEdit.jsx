import { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import BeneficiaryForm from "../../../Components/shared/Forms/BeneficiaryForm";
import { ToastContainer, toast } from "react-toastify";
import {
  createLoanBen,
  contractorben,
  projectlist,
  fetchLoanBene,
  updateLoanBeneficiary,
} from "../../../redux/Actions/ContractorGuarantorAction";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { fetchContructorAllList } from "../../../redux/Actions/ContractorBenAction";

const ContractorGuarantorEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.paymentContractorReducers);
  const location = useLocation();
  const state = reduxState.sData;

  console.log(state.contractor_id, "state");

  useEffect(() => {
    dispatch(fetchLoanBene(location.state));
  }, [location.state, dispatch]);

  const conBenState = useSelector(
    (state) => state.ContractorBenReducers.con_data
  );

  useEffect(() => {
    dispatch(fetchContructorAllList());
  }, [dispatch]);

  const formsData = [
    {
      fieldName: "First Name",
      fieldType: "text",
      fieldPlaceholder: "First Name",
      isRequired: true,
      defaultValue: state.first_name,
    },
    {
      fieldName: "Last Name",
      fieldType: "text",
      fieldPlaceholder: "Last Name",
      isRequired: true,
      defaultValue: state.last_name,
    },
    {
      fieldName: "Email",
      fieldType: "email",
      fieldPlaceholder: "example@gmail.com",
      isRequired: true,
      defaultValue: state.email,
    },
    {
      fieldName: "Nid Number",
      fieldType: "number",
      fieldPlaceholder: "Nid Number",
      isRequired: true,
      defaultValue: state.nid_number,
    },
    {
      fieldName: "Present Address",
      fieldType: "text",
      fieldPlaceholder: "Present Address (Comma Separated)",
      isRequired: true,
      defaultValue: state.present_address,
    },
    {
      fieldName: "Permanent Address",
      fieldType: "text",
      fieldPlaceholder: "Permanent Address (Comma Separated)",
      isRequired: true,
      defaultValue: state.permanent_address,
    },
    {
      fieldName: "Profile Picture",
      fieldType: "file",
      fieldPlaceholder: "Upload Image",
      isRequired: false,
      defaultValue: state.profile_picture,
    },
    {
      fieldName: "Nid Front",
      fieldType: "file",
      fieldPlaceholder: "Upload Image",
      isRequired: false,
      defaultValue: state.nid_front,
    },
    {
      fieldName: "Nid Back",
      fieldType: "file",
      fieldPlaceholder: "Upload Image",
      isRequired: false,
      defaultValue: state.nid_back,
    },
    {
      fieldName: "Role",
      fieldType: "text",
      fieldPlaceholder: "Role",
      isRequired: true,
      defaultValue: state.role,
    },
    {
      fieldName: "Contractor id",
      fieldType: "select",
      fieldPlaceholder: "Select a contractor",
      isRequired: true,
      options: conBenState?.map(
        (dt, index) => (
          // console.log("vl", state.contractor_id, dt.id),
          {
            is_select: state.contractor_id === dt.id ? "selected" : "",
            index: state.contractor_id === dt.id ? index : null,
            value: dt.id,
            label: `${
              dt?.first_name === null
                ? dt.username
                : dt?.first_name + " " + dt?.last_name
            }`,
          }
        )
      ),
      defaultValue: state.contractor_id
        ? conBenState?.findIndex((dt) => dt.id === state.contractor_id)
        : null,
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      console.log(data.contractor_id, "From update page");
      const updatedData = {
        id: state.id,
        status: data.status ? data.status : state.status,
        contractor_id: data.contractor_id
          ? data.contractor_id
          : state.contractor_id,
        project_id: data.project_id ? data.project_id : state.project_id,
        worker: data.worker ? data.worker : state.worker,
        role: data.role ? data.eole : state.role,
        //author_id: data.author_id ? data.author_id : state.author_id,
        email: data.email ? data.email : state.email,
        first_name: data.first_name ? data.first_name : state.first_name,
        is_deleted: data.is_deleted ? data.is_deleted : state.is_deleted,
        last_name: data.last_name ? data.last_name : state.last_name,
        nid_number: data.nid_number ? data.nid_number : state.nid_number,
        permanent_address: data.permanent_address
          ? data.permanent_address
          : state.permanent_address,
        present_address: data.present_address
          ? data.present_address
          : state.present_address,
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
    if (reduxState.isUpdate) {
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
        navigate("/contractor-guarantor");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/contractor-guarantor"}
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
export default ContractorGuarantorEdit;
