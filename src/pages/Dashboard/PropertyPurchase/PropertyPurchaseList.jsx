import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import Swal from "sweetalert2";
import { deletePropertyPurchase, fetchPropertyPurchaseList, searchPropertyPurchase } from "../../../redux/Actions/_PropertyPurchaseAction";

const t_head = [
  { name: "Property Name" },
  { name: "Project Name" },
  { name: "Customer Name" },
  { name: "Amount" },
  { name: "Created at" },
  { name: "Status" },
  { name: "Actions" },
];

const formsData = [
  // {
  //   fieldName: "Customer Name",
  //   fieldType: "text",
  //   fieldPlaceholder: "Customer Name",
  // },
  {
    fieldName: "Amount",
    fieldType: "number",
    fieldPlaceholder: "Amount",
  },
];


const PropertyPurchaseList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.propertyPurchaseReducer);
  console.log(state, "propertyPurchaseReducer")
  // allDataList
  const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    id: item.id,
    property_name: item?.property_code?.map((pi)=>pi+" "),
    project_name: item?.project_name?.map((pi)=>pi+" "),
    customer_id: item.customer_name,
    amount: item.amount,
    date: item.created_at,
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
    dispatch(fetchPropertyPurchaseList(current_page));
  }, [dispatch, current_page, state.isDelete, state.isUpdate]);

  const handlePageChange = (newPage) => {
    dispatch(fetchPropertyPurchaseList(newPage));
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
        dispatch(deletePropertyPurchase(id));
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
    const app_model = "projects/PropertyPurchase/";
    const serializer_class = "PropertyPurchase";
    const searchData = { formData, app_model, serializer_class };
    if (allKeysEmpty) {
      // If the search field is empty, fetch all formData
      dispatch(fetchPropertyPurchaseList(current_page));
    } else {
      dispatch(searchPropertyPurchase(searchData));
    }
  };
  //
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Property Purchase"}
        redirectLink={"/property-purchase/property-purchase-crete"}
        model_name={"propertyPurchase"}
        app_label={"projects"}
        url_endpoint={"/export-csv/?model=propertyPurchase&app_label=projects"}
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
        editLink={"/property-purchase/edit-property-purchase"}
        erp_modalCol={12}
        photoSection={false}
        nidSection={false}
      />
    </div>
  );
};

export default PropertyPurchaseList;
