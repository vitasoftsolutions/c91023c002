import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import Swal from "sweetalert2";
import {
  deleteLoanBeneficiary,
  fetchLoanBeneList,
  searchLoanBeneficiaries,
  sortByAZLoanBen,
  sortByDateLoanBen,
} from "../../../redux/Actions/loanBenAction";
import { useLocation } from "react-router-dom";
import {
  fetchPhoneList,
  searchPhoneByName,
  sortByAZPhone,
  sortByDatePhone,
} from "../../../redux/Actions/PhoneAction";

const t_head = [
  { name: "Name" },
  { name: "Image" },
  { name: "Join Date" },
  { name: "E-mail" },
  { name: "Status" },
  { name: "Actions" },
];

const formsData = [
  {
    fieldName: "First Name",
    fieldType: "text",
    fieldPlaceholder: "First Name",
  },
  {
    fieldName: "Last Name",
    fieldType: "text",
    fieldPlaceholder: "Last Name",
  },
];

const LoanBeneficiaryList = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
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
  const handleSearch = (formData) => {
    const allKeysEmpty = Object.values(formData).every(
      (value) => value === "" || value === null
    );
    const app_model = "loan/LoanBeneficaries/";
    const serializer_class = "LoanBeneficaries";
    const searchData = { formData, app_model, serializer_class};
    if (allKeysEmpty) {
      // If the search field is empty, fetch all formData
      dispatch(fetchLoanBeneList(current_page));
    } else {
      dispatch(searchLoanBeneficiaries(searchData));
    }
  };

  const handleSortByDate = (value) => {
    if (!value) {
      pathname === "/beneficiarylist"
        ? dispatch(fetchLoanBeneList(current_page))
        : "";
    }
    if (pathname === "/beneficiarylist") {
      dispatch(sortByDateLoanBen(value));
    }
  };

  const [sortOrder, setSortOrder] = useState("asc");
  const [sortButtonText, setSortButtonText] = useState("Sort By A to Z");

  // handleAtoZClick
  const handleAtoZClick = () => {
    // Toggle the sorting order
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    // Toggle the button text
    const newText =
      newSortOrder === "asc" ? "Sort By A to Z" : "Sort By Z to A";
    setSortButtonText(newText);

    // You can now use the `newSortOrder` value in your sorting logic
    pathname === "/beneficiarylist"
      ? dispatch(sortByAZLoanBen({ sortOrder, current_page }))
      : "";
  };
  //
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Beneficiary"}
        redirectLink={"/beneficiarylist/loan-beneficiary-crete"}
        // For Export & Import
        app_label={"loan"}
        model_name={"LoanBeneficaries"}
        url_endpoint={"/export-csv/?model=LoanBeneficaries&app_label=loan"}
        // For filters
        onSearch={handleSearch}
        formsData={formsData}
        //Optional
        onSortByAZ={handleAtoZClick}
        onSortByDate={handleSortByDate}
        sortButtonText={sortButtonText}
      />
      <GlobalTable
        t_head={t_head}
        t_data={tableData}
        allDataList={allDataList}
        handlePageChange={handlePageChange}
        current_page={current_page}
        page_number={page_number}
        deleteFunction={deleteFunction}
        editLink={"/beneficiarylist/editloan"}
        erp_modalCol={6}
        photoSection={true}
        nidSection={true}
      />
    </div>
  );
};

export default LoanBeneficiaryList;
