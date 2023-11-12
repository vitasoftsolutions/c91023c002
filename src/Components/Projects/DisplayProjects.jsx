import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaFilePen, FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Loader from "../shared/Loader/Loader";
import DetailsModal from "../shared/Modals/DetailsModal";

function DisplayProjects({
  allDataList,
  editLink,
  erp_modalCol,
  photoSection,
  handlePageChange,
  current_page,
  page_number,
  tableData,
  deleteFunction,
}) {
  const [allData, setAllData] = useState(null);

  const handelDelete = (id) => {
    deleteFunction(id);
  };

  if (tableData?.isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center gap-4 items-center">
        <Loader text={"Gating data..."} />
      </div>
    );
  }

  // Modal data
  const getModalData = (id) => {
    const foundObject = allDataList.find((item) => item.id === id);
    setAllData(foundObject);
  };

  return (
    <div className="container border-2 bg-white mt-5 border-gray-50 overflow-hidden shadow-md shadow-blue-200">
      <div className="min-h-[60vh] grid grid-cols-5 gap-3">
        {/* Content */}
        {allDataList?.map((dt) => {
          return (
            <div
              key={dt.id}
              className="card w-40 h-min bg-base-100 shadow-xl hover:shadow-md duration-200 mx-5 mt-5 mb-10 rounded-md"
            >
              <button
                onClick={() => {
                  getModalData(dt.id);
                }}
              >
                <figure className="h-36 overflow-hidden bg-gray-200">
                  <img
                    src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                    alt="Shoes"
                  />
                </figure>
              </button>
              <div className="card-body px-3 pt-2 pb-3 relative">
                <button
                  onClick={() => {
                    getModalData(dt.id);
                  }}
                >
                  <h2 className="text-lg text-start">
                    <Link>{dt.name}</Link>
                  </h2>
                </button>
                <div className="card-actions">
                  <div className="badge badge-outline">
                    {dt.status === true ? "Complete" : "Working"}
                  </div>
                </div>

                <div className="absolute bottom-[-32px] left-0 rounded-sm bg-gray-200 shadow-xl w-40">
                  <div className="flex justify-center py-2">
                    <Link
                      to={editLink}
                      state={dt.id}
                      className="cursor-pointer justify-center flex w-1/2 text-erp_success"
                    >
                      <FaFilePen />
                    </Link>
                    <div className="divider divider-horizontal w-0 m-0 p-0"></div>
                    <button
                      className="flex justify-center w-1/2 text-erp_danger"
                      onClick={() => handelDelete(dt.id)}
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Pagination */}
      <div className="border-t-2 flex justify-center py-1 mt-auto w-full">
        <div className="join flex gap-2 rounded-none py-4">
          <button
            onClick={() => handlePageChange(current_page - 1)}
            disabled={current_page === 1}
            className="join-item btn btn-xs"
          >
            <AiOutlineLeft />
          </button>
          {page_number?.map((num, index) => {
            return (
              <button
                onClick={() => handlePageChange(num)}
                key={index}
                className={`${
                  current_page === num
                    ? "bg-erp_primary px-2 text-erp_light rounded-none"
                    : "join-item btn btn-xs"
                }`}
                disabled={current_page === num}
              >
                {num}
              </button>
            );
          })}
          <button
            onClick={() => handlePageChange(current_page + 1)}
            disabled={
              current_page === tableData.totalPages || tableData.totalPages <= 0
            }
            className="join-item btn btn-xs"
          >
            <AiOutlineRight />
          </button>
        </div>
      </div>
      {/* Pagination */}

      {/*  */}
      <DetailsModal
        allData={allData}
        onClose={() => setAllData(null)}
        erp_modalCol={erp_modalCol}
        photoSection={photoSection}
      />

      {/*  */}
    </div>
  );
}

export default DisplayProjects;
