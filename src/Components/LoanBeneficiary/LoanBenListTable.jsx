import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanBeneList } from "../../redux/slices/loanBenListSlice";
import { FaEye, FaFilePen, FaTrashCan } from "react-icons/fa6";
import LoanDetailModal from "./LoanDetailModal";
import { formatDate } from "../../hooks/formatDate";
import EditLoanSidebar from "./EditLoanSidebar";
import { deleteLoanBeneficiary } from "../../redux/slices/deleteLoanBeneficiarySlice";
import Swal from "sweetalert2";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const LoanBenListTable = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [editLoan, setEditLoan] = useState(null);

  const current_page = state.loanBeneList.currentPage;
  const total_page = state.loanBeneList.totalPages;

  let page_number = [];
  for (let i = current_page - 1; i <= current_page + 1; i++) {
    if (i < 1) continue;
    if (i > total_page) break;

    page_number.push(i);
  }

  useEffect(() => {
    dispatch(fetchLoanBeneList(current_page));
  }, [dispatch, current_page]);

  const handlePageChange = (newPage) => {
    dispatch(fetchLoanBeneList(newPage));
  };

  if (state.loanBeneList.isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center gap-4 items-center">
        <progress className="progress progress-info w-full"></progress>
        <progress className="progress progress-info w-full"></progress>
        <progress className="progress progress-info w-full"></progress>
      </div>
    );
  }

  const handelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteLoanBeneficiary(id));
        dispatch(fetchLoanBeneList(state.loanBeneList.currentPage));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="container mx-auto border-2 bg-white mt-5 border-gray-50 overflow-hidden shadow-md shadow-blue-200">
      <div className="overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="table table-xs table_border dark:bg-blue-500 table-compact w-full">
            {/* head */}
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
                <th className="text-[14px] pt-4 pb-2">Name</th>
                <th className="text-[14px] pt-4 pb-2">Image</th>
                <th className="text-[14px] pt-4 pb-2">Created Date</th>
                <th className="text-[14px] pt-4 pb-2">E-mail</th>
                <th className="text-[14px] pt-4 pb-2">Status</th>
                <th className="text-[14px] pt-4 pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state?.loanBeneList?.data?.map((loan) => {
                return (
                  // row
                  <tr key={loan.id}>
                    <th className="pl-6">
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-xs rounded-none"
                        />
                      </label>
                    </th>
                    <td className="text-[14px]">
                      {loan.first_name + " " + loan.last_name}
                    </td>
                    <td className="">
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-circle w-10 h-10">
                            <img
                              src={loan.profile_picture}
                              alt={loan.first_name + " " + loan.last_name}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-[14px]">
                      {formatDate(loan.created_at)}
                    </td>
                    <td className="text-[14px]">{loan.email}</td>
                    <td className="">
                      <span
                        className={`${
                          loan.status === true
                            ? "text-erp_success"
                            : "text-erp_danger"
                        } px-3 py-1 rounded-full max-w-fit flex justify-center items-center bg-blue-50 font-bold`}
                      >
                        {loan.status === true ? "active" : "inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-3 items-center text-lg">
                        <div className="text-erp_info">
                          <button onClick={() => setSelectedLoan(loan)}>
                            <FaEye />
                          </button>
                        </div>
                        <div className="text-erp_success">
                          <button
                            onClick={() => setEditLoan(loan)}
                            className="cursor-pointer"
                          >
                            <label
                              htmlFor="my-drawer-4"
                              className="drawer-button cursor-pointer"
                            >
                              <FaFilePen />
                            </label>
                          </button>
                        </div>
                        <div className="text-erp_danger">
                          <button onClick={() => handelDelete(loan.id)}>
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
            <div className="join rounded-none">
              <button
                onClick={() => handlePageChange(current_page - 1)}
                disabled={current_page === 1}
                className="join-item btn btn-xs"
              >
                <AiOutlineLeft />
              </button>
              {page_number.map((num) => {
                return (
                  <button
                    onClick={() => handlePageChange(num)}
                    key={num}
                    className="join-item btn btn-xs"
                    disabled={current_page === num}
                  >
                    {num}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(current_page + 1)}
                disabled={current_page === state.loanBeneList.totalPages}
                className="join-item btn btn-xs"
              >
                <AiOutlineRight />
              </button>
            </div>
          </div>
          {/* Pagination */}
          {/*  */}
          <LoanDetailModal
            selectedLoan={selectedLoan}
            onClose={() => setSelectedLoan(null)}
          />
          {/*  */}
          <EditLoanSidebar
            editLoan={editLoan}
            onClose={() => setEditLoan(null)}
          />

          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default LoanBenListTable;
