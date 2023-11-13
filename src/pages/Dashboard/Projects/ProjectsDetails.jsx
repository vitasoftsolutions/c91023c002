import { BsArrowLeftShort } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import NoData from "../../../Components/shared/NoData";

function ProjectsDetails() {
  // Access the state passed through the link's "to" prop
  let { state } = useLocation();
  

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/projects"}
            className="btn btn-sm font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
          >
            <BsArrowLeftShort /> Back
          </Link>
        </div>
      </div>
      {!state ? (
        <NoData />
      ) : (
        <div className="bg-white shadow-lg shadow-blue-200 md:mx-8 mb-5 mt-5 rounded-lg md:p-4">
          <div className="w-full mx-auto p-4 grid grid-cols-4 gap-x-4 rounded-md bg-opacity-50 backdrop-blur-md bg-gray-200">
            <div>
              <h1>Floor Details</h1>
              <p>Name: {state?.info?.name}</p>
              <p>Status: {state?.status}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectsDetails;
