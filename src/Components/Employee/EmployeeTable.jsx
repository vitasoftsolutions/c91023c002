import { useState } from "react";
import { FaEye, FaFilePen, FaTrashCan } from "react-icons/fa6";
// import LoanDetailModal from "./LoanDetailModal";
import { formatDate } from "../../hooks/formatDate";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Loader from "../shared/Loader/Loader";
import { Link } from "react-router-dom";

const EmployeeTable = ({
  t_head,
  handlePageChange,
  current_page,
  page_number,
  t_data,
  deleteFunction,
  editLink
}) => {
  // const state = useSelector((state) => state);

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [editLoan, setEditLoan] = useState(null);

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

  return (
    <div className="container mx-auto border-2 bg-white mt-5 border-gray-50 overflow-hidden shadow-md shadow-blue-200">
      <div className="overflow-x-auto">
        <div className="overflow-x-auto">
          {/*  */}
          <table className="table table-xs table_border dark:bg-blue-500 table-compact w-full">
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
                {t_head?.map((th) => (
                  <th key={th} className="text-[14px] pt-4 pb-2">
                    {th.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t_data?.data?.map((t_dt) => {
                return (
                  // row
                  <tr key={t_dt.id}>
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
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-circle w-10 h-10">
                            <img
                              src={t_dt.profile_picture}
                              alt={t_dt.first_name + " " + t_dt.last_name}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-[14px]">
                      {formatDate(t_dt.joined_date)}
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
                      <div className="flex gap-3 items-center text-lg">
                        <div className="text-erp_info">
                          <button onClick={() => setSelectedLoan(t_dt)}>
                            <FaEye />
                          </button>
                        </div>
                        <div className="text-erp_success">
                          <Link
                            to={editLink}
                            state={t_dt}
                            className="cursor-pointer"
                          >
                            <FaFilePen />
                          </Link>
                        </div>
                        <div className="text-erp_danger">
                          <button onClick={() => handelDelete(t_dt.id)}>
                            <FaTrashCan />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* foot */}
          </table>

          {/* Pagination */}
          <div className="border-t-2 flex justify-center py-1">
            <div className="join flex gap-2 rounded-none py-4">
              <button
                onClick={() => handlePageChange(current_page - 1)}
                disabled={current_page === 1}
                className="join-item btn btn-xs"
              >
                <AiOutlineLeft />
              </button>
              {page_number?.map((num) => {
                return (
                  <button
                    onClick={() => handlePageChange(num)}
                    key={num}
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
                disabled={current_page === t_data.totalPages  || t_data.totalPages <= 0}
                className="join-item btn btn-xs"
              >
                <AiOutlineRight />
              </button>
            </div>
          </div>
          {/* Pagination */}
          {/*  */}
          {/* <LoanDetailModal
            selectedLoan={selectedLoan}
            onClose={() => setSelectedLoan(null)}
          /> */}

          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
