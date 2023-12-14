import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import { deleteEmployee } from "../../../redux/Actions/employeeAction";
import Swal from "sweetalert2";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import {
  deleteTransaction,
  fetchLoanTransactions,
  searchLoanBeneficiaries,
} from "../../../redux/Actions/LoanTransactionsAction";

const t_head = [
  { name: "Giver Name" },
  { name: "Taker Name" },
  { name: "Interested Amount" },
  { name: "Return Amount" },
  { name: "Current Amount" },
  { name: "Last Payed" },
  { name: "Created At" },
  { name: "Status" },
  { name: "Actions" },
];

const formsData = [
  {
    fieldName: "Amount",
    fieldType: "number",
    fieldPlaceholder: "Amount",
  },
];

function LoanTransactions() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.loanTransactionsReducer);
  console.log(state);
  // allDataList
  const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    id: item.id,
    giver_name: item.giver_name,
    taker_name: item.taker_name,
    interested_amount: item.interested_amount,
    return_amount: item.return_amount,
    current_amount: item.current_amount,
    last_payed: item.last_payed,
    date: item.created_at,
    status: item.status,
  }));
  const tableData = {
    ...state,
    data: newData,
  };

  //
  const current_page = state.currentPage;
  const total_page = state.totalPages;

  // Pages
  let page_number = [];
  for (let i = current_page - 1; i <= current_page + 1; i++) {
    if (i < 1) continue;
    if (i > total_page) break;
    page_number.push(i);
  }

  useEffect(() => {
    dispatch(fetchLoanTransactions(current_page));
  }, [dispatch, current_page, state.isDelete]);

  const handlePageChange = (newPage) => {
    dispatch(fetchLoanTransactions(newPage));
  };

  const deleteFunction = (id) => {
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
        dispatch(deleteTransaction(id));
        if (state.isDelete === true) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

  //
  // Filter Code
  const handleSearch = (formData) => {
    const allKeysEmpty = Object.values(formData).every(
      (value) => value === "" || value === null
    );
    const app_model = "loan/LoanTransactions/";
    const serializer_class = "LoanTransaction";
    const searchData = { formData, app_model, serializer_class };
    if (allKeysEmpty) {
      // If the search field is empty, fetch all formData
      dispatch(fetchLoanTransactions(current_page));
    } else {
      dispatch(searchLoanBeneficiaries(searchData));
    }
  };
  //
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Transactions"}
        redirectLink={"/loan-transactions/create-loan-transactions"}
        // For Export & Import
        model_name={"loanTransactions"}
        app_label={"loan"}
        url_endpoint={"/export-csv/?model=loanTransactions&app_label=loan"}
        // For filters
        onSearch={handleSearch}
        formsData={formsData}
      />
      <GlobalTable
        t_head={t_head}
        t_data={tableData}
        allDataList={allDataList}
        handlePageChange={handlePageChange}
        current_page={current_page}
        page_number={page_number}
        deleteFunction={deleteFunction}
        editLink={"/loan-transactions/edit-loan-transactions"}
        erp_modalCol={12}
        photoSection={false}
        nidSection={false}
      />
    </div>
  );
}

export default LoanTransactions;
