import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import NoData from "../../../Components/shared/NoData";
import { fetchFloors } from "../../../redux/Actions/FloorsAction";

function FloorDetails() {
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
            className={`w-full mx-auto p-4 grid grid-rows-${floorState?.data?.length} bg-gray-200 gap-x-4 rounded-md bg-opacity-50 backdrop-blur-md bg-gray-200}`}
          >
            {floorState?.map((dt) => (
              <div key={dt.id} className={`p-2 rounded-sm my-4 w-full`}>
                {dt.type === "Ressidential" ? (
                  <div className="flex justify-between">
                    {dt.unit_property.map((up) => {
                      return (
                        <div key={up.id} className="w-36">
                          <div className="bg-gray-400 p-2 rounded-md shadow-lg hover:shadow-sm duration-200">
                            <h3 className="text-erp_light text-center">
                              {up.code}
                            </h3>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : dt.type === "Commarcial" ? (
                  <div className="w-full flex">
                    <div className="bg-gray-400 p-2 rounded-md shadow-lg hover:shadow-sm duration-200 w-1/2">
                      <h3 className="text-erp_light text-center">{dt.type}</h3>
                    </div>
                    <div className="divider divider-horizontal "></div>
                    <div className="bg-gray-400 p-2 rounded-md shadow-lg hover:shadow-sm duration-200 w-1/2">
                      <h3 className="text-erp_light text-center">{dt.type}</h3>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default FloorDetails;
