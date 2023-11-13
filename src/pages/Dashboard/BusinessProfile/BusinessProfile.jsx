import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import Swal from "sweetalert2";
import {
  deleteLoanBeneficiary,
  fetchLoanBeneList,
} from "../../../redux/Actions/loanBenAction";

const t_head = [
  { name: "Name" },
  { name: "Image" },
  { name: "Join Date" },
  { name: "E-mail" },
  { name: "Status" },
  { name: "Actions" },
];

const BusinessProfile = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.loanBeneficiary);
  // allDataList
  const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    id: item.id,
    first_name: item.first_name + " " + item.last_name,
    image: item.profile_picture,
    date: item.created_at,
    email: item.email,
    status: item.status,
  }));
  const tableData = {
    ...state,
    data: newData,
  };
  //

  // console.log(tableData, "tableData");

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
    dispatch(fetchLoanBeneList(current_page));
  }, [dispatch, current_page, state.isDelete, state.isUpdate]);

  const handlePageChange = (newPage) => {
    dispatch(fetchLoanBeneList(newPage));
  };

  // console.log(state, "state_ page");

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
        dispatch(deleteLoanBeneficiary(id));
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
        title={"Business Profile"}
        redirectLink={"/business-profile/crete-business-profile"}
        // TODO: Need to add app label
        url_endpoint={"/export-csv/?model=LoanBeneficaries&app_label=loan"}
      />
      <GlobalTable
        t_head={t_head}
        t_data={tableData}
        allDataList={allDataList}
        handlePageChange={handlePageChange}
        current_page={current_page}
        page_number={page_number}
        deleteFunction={deleteFunction}
        editLink={"/business-profile/edit-business-profile"}
        erp_modalCol={6}
        photoSection={true}
      />
    </div>
  );
};

export default BusinessProfile;
