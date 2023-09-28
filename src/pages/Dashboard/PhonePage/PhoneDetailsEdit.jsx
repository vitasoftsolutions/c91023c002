import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import PhoneForm from "../../../Components/Phone/PhoneForm";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";

function PhoneDetailsEdit() {
  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/phone"}
            className="font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
          >
            <BsArrowLeftShort /> Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 rounded-lg md:p-4">
        <PhoneForm />
      </div>
    </>
  );
}

export default PhoneDetailsEdit;
