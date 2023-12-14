import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import Swal from "sweetalert2";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import {
  deleteLoanInstallments,
  fetchLoanInstallments,
  searchLoanBeneficiaries,
} from "../../../redux/Actions/LoanInstallmentAction";

const t_head = [
  { name: "Giver Name" },
  { name: "Taker Name" },
  { name: "Amount" },
  { name: "Document" },
  { name: "Created at" },
  { name: "Instalment" },
  { name: "Status" },
  { name: "Actions" },
];

const formsData = [
  {
    fieldName: "Amount",
    fieldType: "text",
    fieldPlaceholder: "Amount",
  },
];

function LoanInstallment() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.loanInstallmentReducer);
  console.log(state);
  // allDataList
  const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    id: item.id,
    giver_name: item.giver_name,
    taker_name: item.taker_name,
    amount: item.amount,
    image: item.document,
    date: item.created_at,
    instalment: item.instalment,
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
    dispatch(fetchLoanInstallments(current_page));
  }, [dispatch, current_page, state.isDelete]);

  const handlePageChange = (newPage) => {
    dispatch(fetchLoanInstallments(newPage));
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
        dispatch(deleteLoanInstallments(id));
        if (state.isDelete === true) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

  // Filter Code
  const handleSearch = (formData) => {
    const allKeysEmpty = Object.values(formData).every(
      (value) => value === "" || value === null
    );
    const app_model = "loan/LoanInstallment/";
    const serializer_class = "LoanInstallmenttion";
    const searchData = { formData, app_model, serializer_class };
    if (allKeysEmpty) {
      // If the search field is empty, fetch all formData
      dispatch(fetchLoanInstallments(current_page));
    } else {
      dispatch(searchLoanBeneficiaries(searchData));
    }
  };
  //
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Installment"}
        redirectLink={"/loan-installment/create-loan-installment"}
        // For Export & Import
        model_name={"loanInstallment"}
        app_label={"loan"}
        url_endpoint={"/export-csv/?model=loanInstallment&app_label=loan"}
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
        editLink={"/loan-installment/edit-loan-installment"}
        erp_modalCol={12}
        photoSection={true}
        nidSection={false}
      />
    </div>
  );
}

export default LoanInstallment;
