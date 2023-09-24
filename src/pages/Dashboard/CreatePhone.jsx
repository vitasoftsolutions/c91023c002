import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import CreatePhoneForm from "../../Components/Phone/CreatePhoneForm";
import Breadcrumb from "../../Components/shared/Breadcrumb/Breadcrumb";

function CreatePhone() {
  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/"}
            className="font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
          >
            <BsArrowLeftShort /> Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 rounded-lg md:p-4">
        <CreatePhoneForm />
      </div>
    </>
  );
}

export default CreatePhone;
