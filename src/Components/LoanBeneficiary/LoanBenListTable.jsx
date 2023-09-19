import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanBeneList } from "../../redux/slices/loanBenListSlice";
import { FaEye, FaFilePen, FaTrashCan } from "react-icons/fa6";
import LoanDetailModal from "./LoanDetailModal";
import { formatDate } from "../../hooks/formatDate";
import EditLoanSidebar from "./EditLoanSidebar";
import { deleteLoanBeneficiary } from "../../redux/slices/deleteLoanBeneficiarySlice";

const LoanBenListTable = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [editLoan, setEditLoan] = useState(null);

  const [paginationParams, setPaginationParams] = useState({
    limit: 5, // Number of items per page
    offset: 0, // Offset to fetch data
  });

  useEffect(() => {
    dispatch(fetchLoanBeneList(paginationParams));
  }, [dispatch, paginationParams]);

  const handlePageChange = (newOffset) => {
    setPaginationParams({ ...paginationParams, offset: newOffset });
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(
      state.loanBeneList.data?.length / paginationParams.limit
    );

    const currentPage = paginationParams.offset / paginationParams.limit + 1;

    const pageButtons = [];

    if (totalPages <= 10) {
      // If there are 10 or fewer pages, display all page buttons
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <button
            key={i}
            className={`join-item btn btn-xs ${
              currentPage === i ? "btn-active" : ""
            }`}
            onClick={() => handlePageChange((i - 1) * paginationParams.limit)}
          >
            {i}
          </button>
        );
      }
    } else {
      // If there are more than 10 pages, display "123...8910" format
      const pagesToShow = 5;
      let startPage = currentPage - 2;
      let endPage = currentPage + 2;

      if (startPage < 1) {
        startPage = 1;
        endPage = pagesToShow;
      }

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - pagesToShow + 1;
      }

      if (startPage > 1) {
        pageButtons.push(
          <button
            key="start"
            className="join-item btn btn-xs"
            onClick={() => handlePageChange(0)}
          >
            {"<<"}
          </button>
        );
      }

      if (startPage > 2) {
        pageButtons.push(
          <button key="dots" className="join-item btn btn-xs">
            {"..."}
          </button>
        );
      }

      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
          <button
            key={i}
            className={`join-item btn btn-xs ${
              currentPage === i ? "btn-active" : ""
            }`}
            onClick={() => handlePageChange((i - 1) * paginationParams.limit)}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages - 1) {
        pageButtons.push(
          <button key="dots" className="join-item btn btn-xs">
            {"..."}
          </button>
        );
      }

      if (endPage < totalPages) {
        pageButtons.push(
          <button
            key="end"
            className="join-item btn btn-xs"
            onClick={() =>
              handlePageChange((totalPages - 1) * paginationParams.limit)
            }
          >
            {">>"}
          </button>
        );
      }
    }

    return pageButtons;
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
    dispatch(deleteLoanBeneficiary(id));
    dispatch(fetchLoanBeneList());
  };

  return (
    <div className="container mx-auto border-2 bg-white mt-5 border-gray-50 overflow-hidden rounded-xl shadow-md shadow-blue-200">
      <div className="overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="table table-xs table-zebra table_border dark:bg-blue-500 table-compact w-full">
            {/* head */}
            <thead>
              <tr className="bg-[#F2F2F2]">
                <th className="text-lg">Name</th>
                <th className="text-lg">Image</th>
                <th className="text-lg">Created Date</th>
                <th className="text-lg">E-mail</th>
                <th className="text-lg">Status</th>
                <th className="text-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state?.loanBeneList?.data?.map((loan) => {
                return (
                  // row
                  <tr key={loan.id}>
                    <td className="text-[16px]">
                      {loan.first_name + " " + loan.last_name}
                    </td>
                    <td>
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
                    <td>{formatDate(loan.created_at)}</td>
                    <td>{loan.email}</td>
                    <td>
                      <span
                        className={`${
                          loan.status === true ? "bg-[#54CA68]" : "bg-red-500"
                        } px-3 py-1 rounded-full max-w-fit flex justify-center items-center text-white font-bold`}
                      >
                        {loan.status === true ? "active" : "inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-3 items-center text-lg">
                        <div className="text-orange-500">
                          <button onClick={() => setSelectedLoan(loan)}>
                            <FaEye />
                          </button>
                        </div>
                        <div className="text-green-500">
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
                        <div className="text-red-500">
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
            <div className="border-t-2 flex justify-center py-1">
              <div className="join">{renderPaginationButtons()}</div>
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
