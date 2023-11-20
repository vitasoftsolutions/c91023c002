import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import {
  deleteEmployee,
  fetchEmployeeAction,
} from "../../../redux/Actions/employeeAction";
import Swal from "sweetalert2";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import { deleteLoanInstallments, fetchLoanInstallments } from "../../../redux/Actions/LoanInstallmentAction";

const t_head = [
  { name: "Name" },
  { name: "Image" },
  { name: "Join Date" },
  { name: "E-mail" },
  { name: "Status" },
  { name: "Actions" },
];

function LoanInstallment() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.loanInstallmentReducer);
  console.log(state);
  // allDataList
  const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    id: item.id,
    first_name: item.first_name + " " + item.last_name,
    image: item.profile_picture,
    date: item.joined_date,
    email: item.email,
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

  //
  //
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Installment"}
        redirectLink={"/loan-installment/create-loan-installment"}
        // TODO:
        url_endpoint={"/export-csv/?model=Empployee&app_label=users"}
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
        erp_modalCol={6}
        photoSection={true}
        nidSection={true}
      />
    </div>
  );
}

export default LoanInstallment;
