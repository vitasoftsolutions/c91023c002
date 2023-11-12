import { useEffect } from "react";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import Swal from "sweetalert2";
// import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProjects,
  fetchProjects,
} from "../../../redux/Actions/ProjectsAction";
import DisplayProjects from "../../../Components/Projects/DisplayProjects";

// const t_head = [
//   { name: "Name" },
//   { name: "Address" },
//   { name: "Area" },
//   { name: "Start Date" },
//   { name: "Status" },
//   { name: "Actions" },
// ];

function Projects() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.projectsReducer);
  console.log(state);
  // allDataList
  const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    id: item.id,
    name: item.name,
    address: item.address,
    area: item.area,
    work_start_date: item.work_start_date,
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
    dispatch(fetchProjects(current_page));
  }, [dispatch, current_page, state.isDelete, state.isUpdate]);

  const handlePageChange = (newPage) => {
    dispatch(fetchProjects(newPage));
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
        dispatch(deleteProjects(id));
        if (state.isDelete === true) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Projects"}
        redirectLink={"/projects/crete-projects"}
        url_endpoint={"/export-csv/?model=LoanBeneficaries&app_label=loan"}
      />
      <DisplayProjects
        allDataList={allDataList}
        editLink={"/projects/editprojects"}
        handlePageChange={handlePageChange}
        current_page={current_page}
        page_number={page_number}
        photoSection={false}
        erp_modalCol={12}
        tableData={tableData}
        deleteFunction={deleteFunction}
      />

      {/* <GlobalTable
        t_head={t_head}
        t_data={tableData}
        allDataList={allDataList}
        handlePageChange={handlePageChange}
        current_page={current_page}
        page_number={page_number}
        deleteFunction={deleteFunction}
        editLink={"/projects/editprojects"}
        erp_modalCol={12}
        photoSection={false}
      /> */}
    </div>
  );
}

export default Projects;
