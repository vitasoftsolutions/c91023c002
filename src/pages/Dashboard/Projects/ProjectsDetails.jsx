import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaBuilding } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import NoData from "../../../Components/shared/NoData";
import { fetchFloors } from "../../../redux/Actions/FloorsAction";

function ProjectsDetails() {
  const dispatch = useDispatch();
  const floorState = useSelector((state) =>
    state.floorsReducer?.data?.slice().reverse()
  );
  let { state } = useLocation();

  useEffect(() => {
    dispatch(fetchFloors(state?.id));
  }, [dispatch, state]);

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
          <div
            className={`w-full mx-auto p-4 grid bg-gray-200 gap-x-4 rounded-md bg-opacity-50 backdrop-blur-md bg-gray-200 min-h-[60vh] relative`}
          >

            

            <Link
              to={`/projects/${state.id}/floor-details`}
              state={state}
              className="absolute bg-blue-500 h-12 w-12 flex justify-center items-center rounded-full bottom-4 text-white text-xl right-4"
            >
              <FaBuilding />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectsDetails;
