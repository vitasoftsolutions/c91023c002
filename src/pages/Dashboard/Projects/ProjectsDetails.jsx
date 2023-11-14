import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import NoData from "../../../Components/shared/NoData";
import { fetchFloors } from "../../../redux/Actions/FloorsAction";

function ProjectsDetails() {
  const dispatch = useDispatch();
  const floorState = useSelector((state) => state.floorsReducer);
  let { state } = useLocation();

  console.log(floorState, "floorState");
  console.log(state, "state");

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
          <div className={`w-full mx-auto p-4 grid grid-rows-${floorState?.data?.length} gap-x-4 rounded-md bg-opacity-50 backdrop-blur-md bg-gray-200}`}>
            {floorState?.data?.map((dt) => (
              <div
                key={dt.id}
                className={`${
                  dt.type === "Ressidential" ? "bg-blue-600" : "bg-gray-600"
                } p-2 rounded-sm my-4 w-full`}
              >
                {dt.unit_floor}
              </div>
            ))}

          </div>
        </div>
      )}
    </>
  );
}

export default ProjectsDetails;
