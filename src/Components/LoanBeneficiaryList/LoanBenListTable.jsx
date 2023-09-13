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

  useEffect(() => {
    dispatch(fetchLoanBeneList());
  }, [dispatch]);

  if (state.loanBeneList.isLoading) {
    return <p>Loading...</p>;
  }

  const handelDelete = (id) => {


    console.log(id, "idididididi")


    dispatch(deleteLoanBeneficiary(id));

    dispatch(fetchLoanBeneList());
  };

  return (
    <div className="container mx-auto border-2 border-gray-50 overflow-hidden rounded-xl shadow-xl">
      <div className="overflow-x-auto">
        <div className="flex p-5 items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">Beneficiary List</h3>
          </div>
          <div>
            <p>Search...</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra table_border table-compact w-full">
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
              {state?.loanBeneList?.data?.results?.map((loan) => {
                return (
                  // row
                  <tr key={loan.id}>
                    <td>{loan.first_name + " " + loan.last_name}</td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
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
            <tfoot className="border-t-2">
              <tr>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
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

          {/* <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              
              </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">

                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
              </ul>
            </div>
          </div> */}

          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default LoanBenListTable;
