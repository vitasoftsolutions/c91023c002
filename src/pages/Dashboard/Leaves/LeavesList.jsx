import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import Swal from "sweetalert2";
import { deleteLeaves, fetchLeavesList } from "../../../redux/Actions/LeavesAction";

const t_head = [
  { name: "Apply Date" },
  { name: "From Date" },
  { name: "To Date" },
  { name: "Days" },
  { name: "Status" },
  { name: "Actions" },
];

const LeavesList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.leavesReducer);
  // allDataList
  console.log("first", state)
  const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    id: item.id,
    date: item.apply_date,
    from_date: item.from_date,
    to_date: item.to_date,
    days: item.days,
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
    dispatch(fetchLeavesList(current_page));
  }, [dispatch, current_page, state.isDelete, state.isUpdate]);

  const handlePageChange = (newPage) => {
    dispatch(fetchLeavesList(newPage));
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
        dispatch(deleteLeaves(id));
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
        title={"Leaves"}
        redirectLink={"/leaves/leaves-crete"}
        model_name={"leaves"}
        app_label={"hrm"}
        url_endpoint={"/export-csv/?model=leaves&app_label=hrm"}
      />
      <GlobalTable
        t_head={t_head}
        t_data={tableData}
        allDataList={allDataList}
        handlePageChange={handlePageChange}
        current_page={current_page}
        page_number={page_number}
        deleteFunction={deleteFunction}
        editLink={"/leaves/edit-leaves"}
        erp_modalCol={12}
        photoSection={false}
        nidSection={false}
      />
    </div>
  );
};

export default LeavesList;
