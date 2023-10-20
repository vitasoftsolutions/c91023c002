import { useState } from "react";
import { FaEye, FaFilePen, FaTrashCan } from "react-icons/fa6";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatDate } from "../../../hooks/formatDate";
import DetailsModal from "../Modals/DetailsModal";
import Loader from "../Loader/Loader";

const GlobalTable = ({
  t_head,
  handlePageChange,
  current_page,
  page_number,
  t_data,
  deleteFunction,
  editLink,
}) => {
  //   console.log(t_data.data[0], "from emp table page");

  const [selectedDetails, setSelectedDetails] = useState({});
  const [allData, setAllData] = useState(null);

  if (t_data?.isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center gap-4 items-center">
        <Loader text={"Gating data..."} />
      </div>
    );
  }

  const handelDelete = (id) => {
    deleteFunction(id);
  };

  console.log(t_data, "t_data");
  

  return (
    <div className="container mx-auto border-2 bg-white mt-5 border-gray-50 overflow-hidden shadow-md shadow-blue-200">
      <div className="overflow-x-auto flex flex-col min-h-[60vh]">
        {/*  */}
        <table className="table table-xs table_border table-compact w-full">
          {/* t head */}
          <thead>
            <tr className="">
              <th className="pl-6 pt-4 pb-2">
                <label>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs rounded-none"
                  />
                </label>
              </th>
              {t_head?.map((th, index) => (
                <th key={index} className="text-[14px] pt-4 pb-2">
                  {th.name}
                </th>
              ))}
            </tr>
          </thead>
          {t_data?.data.length === 0 && (
            <span className="absolute flex justify-center items-center w-full text-center min-h-[45vh]">
              <span className="flex flex-col bg-gray-200 px-5 rounded-full">
                <img
                  src="./no_data.svg"
                  alt=""
                  width={100}
                  className="opacity-50"
                />
                <p className="my-2 font-bold text-gray-500">No data</p>
              </span>
            </span>
          )}
          <tbody className="relative">
            {t_data?.data?.map((t_dt) => {
              return (
                // row
                <tr key={t_dt.id} className="w-full border-b-[1px]">
                  <th className="pl-6">
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-xs rounded-none"
                      />
                    </label>
                  </th>
                  <td className="text-[14px]">
                    {t_dt.first_name + " " + t_dt.last_name}
                  </td>
                  <td className="">
                    <span className="flex items-center space-x-3">
                      <span className="avatar">
                        <span className="mask mask-circle w-10 h-10">
                          <img
                            src={t_dt.profile_picture}
                            alt={t_dt.first_name + " " + t_dt.last_name}
                          />
                        </span>
                      </span>
                    </span>
                  </td>
                  <td className="text-[14px]">
                    {formatDate(t_dt.joined_date || t_dt.created_at)}
                  </td>
                  <td className="text-[14px]">{t_dt.email}</td>
                  <td className="">
                    <span
                      className={`${
                        t_dt.status === true
                          ? "text-erp_success"
                          : "text-erp_danger"
                      } px-3 py-1 rounded-full max-w-fit flex justify-center items-center bg-blue-50 font-bold`}
                    >
                      {t_dt.status === true ? "active" : "inactive"}
                    </span>
                  </td>
                  <td>
                    <span className="flex gap-3 items-center text-lg">
                      <span className="text-erp_info">
                        <button
                          onClick={() => {
                            setSelectedDetails({
                              "First name": t_dt?.first_name,
                              "Last name": t_dt?.last_name,
                              Email: t_dt?.email,
                              "Joined date": formatDate(
                                t_dt?.joined_date || t_dt?.created_at
                              ),
                              "NID number": t_dt?.nid_number,
                              "Permanent address": t_dt?.permanent_address,
                              "Present address": t_dt?.present_address,
                            });
                            setAllData(t_dt);
                          }}
                        >
                          <FaEye />
                        </button>
                      </span>
                      <span className="text-erp_success">
                        <Link
                          to={editLink}
                          state={t_dt}
                          className="cursor-pointer"
                        >
                          <FaFilePen />
                        </Link>
                      </span>
                      <span className="text-erp_danger">
                        <button onClick={() => handelDelete(t_dt.id)}>
                          <FaTrashCan />
                        </button>
                      </span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* foot */}
        </table>

        {/* Pagination */}
        <div className="border-t-2 flex justify-center py-1 mt-auto">
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
                current_page === t_data.totalPages || t_data.totalPages <= 0
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
          selectedDetails={selectedDetails}
          onClose={() => setAllData(null)}
          erp_modalCol={6}
          photoSection={true}
        />

        {/*  */}
      </div>
    </div>
  );
};

export default GlobalTable;
