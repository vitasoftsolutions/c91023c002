import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import PhoneForm from "../../../Components/Phone/PhoneForm";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import MainForm from "../../../Components/shared/Forms/MainForm";

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
    fieldName: "Email",
    fieldType: "email",
    fieldPlaceholder: "example@gmail.com",
    isRequired: true,
  },
];

function CreateEmployee() {
  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/employee"}
            className="font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
          >
            <BsArrowLeftShort /> Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 rounded-lg md:p-4">
        {/* TODO : form er kaj hoy nai just design hoichi */}
        <MainForm formData={formData} />
      </div>
    </>
  );
}

export default CreateEmployee;
