import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import Swal from "sweetalert2";
import { deleteBusinessProfile, fetchBusinessProfileList, searchBusinessProfile } from "../../../redux/Actions/BusinessProfileAction";

const t_head = [
  { name: "Name" },
  { name: "Logo" },
  { name: "Address" },
  { name: "Join Date" },
  { name: "Status" },
  { name: "Actions" },
];

const formsData = [
  {
    fieldName: "Name",
    fieldType: "text",
    fieldPlaceholder: "Name",
  },
];

const BusinessProfile = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.businessProfileReducer);
  // allDataList
  const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.logo,
    address: item.address,
    date: item.created_at,
    status: item.status,
  }));
  const tableData = {
    ...state,
    data: newData,
  };
  //

  console.log(state, "state")

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
    dispatch(fetchBusinessProfileList(current_page));
  }, [dispatch, current_page, state.isDelete, state.isUpdate]);

  const handlePageChange = (newPage) => {
    dispatch(fetchBusinessProfileList(newPage));
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
        dispatch(deleteBusinessProfile(id));
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
    const app_model = "profileapp/BusinessProfile/";
    const serializer_class = "Profile";
    const searchData = { formData, app_model, serializer_class };
    if (allKeysEmpty) {
      // If the search field is empty, fetch all formData
      dispatch(fetchBusinessProfileList(current_page));
    } else {
      dispatch(searchBusinessProfile(searchData));
    }
  };
  //
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Business Profile"}
        redirectLink={"/business-profile/crete-business-profile"}
        // For Export & Import
        model_name={"businessProfile"}
        app_label={"profileapp"}
        url_endpoint={"/export-csv/?model=businessProfile&app_label=profileapp"}
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
        editLink={"/business-profile/edit-business-profile"}
        erp_modalCol={12}
        photoSection={true}
      />
    </div>
  );
};

export default BusinessProfile;
