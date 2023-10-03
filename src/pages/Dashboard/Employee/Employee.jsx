import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmployeeListTable from "../../../Components/Employee/EmployeeTable";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import { fetchEmployeeAction } from "../../../redux/Actions/employeeAction";

const t_head = [
  { name: "Name" },
  { name: "Image" },
  { name: "Join Date" },
  { name: "E-mail" },
  { name: "Status" },
  { name: "Actions" },
];

function Employee() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.employeeReducers);
  console.log(state);
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
    dispatch(fetchEmployeeAction(current_page));
  }, [dispatch, current_page]);

  const handlePageChange = (newPage) => {
    dispatch(fetchEmployeeAction(newPage));
  };

  //
  //
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Employee"}
        redirectLink={"/employee/createemployee"}
        // url_endpoint={"/export-csv/?model=PhoneNumber&app_label=globalapp2"}
      />
      <EmployeeListTable
        t_head={t_head}
        handlePageChange={handlePageChange}
        current_page={current_page}
        page_number={page_number}
        t_data={state}
      />
    </div>
  );
}

export default Employee;
