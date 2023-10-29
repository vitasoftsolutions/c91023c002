import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import Swal from "sweetalert2";
import {
  fetchPhoneList,
  deletePhone,
} from "../../../redux/Actions/PhoneAction";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";

const t_head = [
  { name: "Name" },
  { name: "Date" },
  { name: "Relation" },
  { name: "Phone Number" },
  { name: "Role" },
  { name: "Status" },
  { name: "Action" },
];

function PhoneList() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.phoneReducers);
  console.log(state);
   // allDataList
   const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    id: item.id,
    first_name: item.first_name + " " + item.last_name,
    date: item.created_at,
    relation: item.relation,
    phone_number: item.phone_number,
    role: item.role,
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
    dispatch(fetchPhoneList(current_page));
  }, [dispatch, current_page, state.isDelete]);

  const handlePageChange = (newPage) => {
    dispatch(fetchPhoneList(newPage));
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
        dispatch(deletePhone(id));
        if (state.isDelete === true) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Phone"}
        redirectLink={"/phone/createphone"}
        url_endpoint={"/export-csv/?model=PhoneNumber&app_label=globalapp2"}
      />
      <GlobalTable
        t_head={t_head}
        t_data={tableData}
        allDataList={allDataList}
        handlePageChange={handlePageChange}
        current_page={current_page}
        page_number={page_number}
        deleteFunction={deleteFunction}
        editLink={"/phone/editphone"}
        erp_modalCol={12}
        photoSection={false}
      />
    </div>
  );
}

export default PhoneList;
