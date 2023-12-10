import React, { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { ToastContainer, toast } from "react-toastify";
import { createOwner } from "../../../redux/Actions/ownerBenAction";

const formsData = [
  {
    fieldName: "First Name",
    fieldType: "text",
    fieldPlaceholder: "First Name",
    isRequired: true,
  },
  {
    fieldName: "Last Name",
    fieldType: "text",
    fieldPlaceholder: "Last Name",
    isRequired: true,
  },
  {
    fieldName: "Username",
    fieldType: "text",
    fieldPlaceholder: "Type your username",
    isRequired: true,
  },
  {
    fieldName: "Phone Number",
    fieldType: "number",
    fieldPlaceholder: "Type phone number here",
    isRequired: true,
  },
  {
    fieldName: "password",
    fieldType: "password",
    fieldPlaceholder: "Type your password here",
    isRequired: true,
  },
  {
    fieldName: "Email",
    fieldType: "email",
    fieldPlaceholder: "example@gmail.com",
    isRequired: true,
  },
  {
    fieldName: "NID Number",
    fieldType: "number",
    fieldPlaceholder: "Your NID number here",
    isRequired: true,
  },
  {
    fieldName: "Profile Picture",
    fieldType: "file",
    fieldPlaceholder: "Profile picture here",
    isRequired: true,
  },
  {
    fieldName: "Present Address",
    fieldType: "text",
    fieldPlaceholder: "Your address here",
    isRequired: true,
  },
  {
    fieldName: "Permanent Address",
    fieldType: "text",
    fieldPlaceholder: "Your address here",
    isRequired: true,
  },
];

function CreateOwner() {
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state.ownerReducers);
  let navigate = useNavigate();

  const submitFunction = (data) => {
    console.log(data, "Owner From create ");
    dispatch(createOwner(data));
  };

  // In a useEffect or similar, check the updated state
  useEffect(() => {
    if (reduxState.isCreated) {
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
        navigate("/owner");
      }, 2000);
    }

    // Error
    if (reduxState.isError) {
      // Perform actions after the update is successful
      toast.error(reduxState.massage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [reduxState.isCreated, reduxState.isError, reduxState.massage, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/owner"}
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
        />
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
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
}

export default CreateOwner;
