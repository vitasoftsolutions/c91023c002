import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import Swal from "sweetalert2";
import {
  deleteCustomerBen,
  fetchCustomerBeneList,
  searchCustomerBeneList,
} from "../../../redux/Actions/CustomerBenAction";

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
  {
    fieldName: "Email",
    fieldType: "Email",
    fieldPlaceholder: "Email",
  }
];

const CustomerBeneficiaries = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.customersBenReducer);
  // All DataList

  console.log(state, "state")

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
    dispatch(fetchCustomerBeneList(current_page));
  }, [dispatch, current_page, state.isDelete, state.isUpdate]);

  const handlePageChange = (newPage) => {
    dispatch(fetchCustomerBeneList(newPage));
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
        dispatch(deleteCustomerBen(id));
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
      const app_model = "customers/CustomerBeneficaries/";
      const serializer_class = "CustomerBeneficaries";
      const searchData = { formData, app_model, serializer_class };
      if (allKeysEmpty) {
        // If the search field is empty, fetch all formData
        dispatch(fetchCustomerBeneList(current_page));
      } else {
        dispatch(searchCustomerBeneList(searchData));
      }
    };
  
  //
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Customer"}
        redirectLink={"/customer-beneficiaries/customer-beneficiaries-crete"}
        // For Export & Import
        model_name={"CustomerBeneficaries"}
        app_label={"customers"}
        url_endpoint={
          "/export-csv/?model=CustomerBeneficaries&app_label=customers"
        }
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
        editLink={"/customer-beneficiaries/edit-customer-beneficiaries"}
        erp_modalCol={6}
        photoSection={true}
        nidSection={true}
      />
    </div>
  );
};

export default CustomerBeneficiaries;
