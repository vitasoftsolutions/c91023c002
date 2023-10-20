import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { createEmployee } from "../../../redux/Actions/employeeAction";

const formData = [
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
    fieldName: "Present Address",
    fieldType: "number",
    fieldPlaceholder: "Your address here",
    isRequired: true,
  },
];

function CreateEmployee() {
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state.employeeReducers);
  let navigate = useNavigate();

  let { state } = useLocation();

  const submitFunction = (data) => {
    console.log(data, "From create [age");
    // if (state) {
    //   const updatedData = {
    //     id: state.id,
    //     ...data,
    //   };
    //   dispatch(updatePhone(updatedData));
    //   navigate("/phone");
    // } else {
    dispatch(createEmployee(data));
    // }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/employee"}
            className="btn btn-sm font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
          >
            <BsArrowLeftShort /> Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 rounded-lg md:p-4">
        <MainForm
          formData={formData}
          submitFunction={submitFunction}
          isReset={true}
        />
      </div>
    </>
  );
}

export default CreateEmployee;
