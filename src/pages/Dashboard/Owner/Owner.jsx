import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import Swal from "sweetalert2";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import {
  deleteOwner,
  fetchOwnerAction,
  searchPhoneByName,
} from "../../../redux/Actions/ownerBenAction";

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
    fieldName: "Nid Number",
    fieldType: "number",
    fieldPlaceholder: "Nid Number",
  },
];

function Owner() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ownerReducers);
  // allDataList
  const allDataList = state.data;
  // Data
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
    dispatch(fetchOwnerAction(current_page));
  }, [dispatch, current_page, state.isDelete]);

  const handlePageChange = (newPage) => {
    dispatch(fetchOwnerAction(newPage));
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
        dispatch(deleteOwner(id));
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
    const app_model = "owner/OwnerBeneficaries/";
    const serializer_class = "OwnerBeneficaries";
    const searchData = { formData, app_model, serializer_class };
    if (allKeysEmpty) {
      // If the search field is empty, fetch all formData
      dispatch(fetchOwnerAction(current_page));
    } else {
      dispatch(searchPhoneByName(searchData));
    }
  };
  //
  return (
    <div className="max-w-screen">
      {/* TODO: need to add owner model and app_label */}
      <TableHeader
        title={"Owner"}
        redirectLink={"/owner/createowner"}
        // For Export & Import
        model_name={"OwnerBeneficaries"}
        app_label={"owner"}
        url_endpoint={"/export-csv/?model=OwnerBeneficaries&app_label=owner"}
        // Search
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
        editLink={"/owner/editeowner"}
        erp_modalCol={12}
        photoSection={true}
      />
    </div>
  );
}

export default Owner;
