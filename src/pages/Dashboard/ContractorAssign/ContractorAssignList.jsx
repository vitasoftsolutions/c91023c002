import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import Swal from "sweetalert2";
import {
  deleteLoanBeneficiary,
  fetchLoanBeneList,
  searchLoanBeneficiaries,
} from "../../../redux/Actions/AssignContractorAction";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import { fetchContructorAllList } from "../../../redux/Actions/ContractorBenAction";
import { fetchProjectsAllList } from "../../../redux/Actions/ProjectsAction";
const t_head = [
  { name: "Name" },
  { name: "Project" },
  { name: "Date" },

  { name: "Due Amount" },
  { name: "Payed Amount" },
  { name: "Rate" },
  { name: "Status" },
  { name: "Action" },
];

const ContractorAssignList = () => {
  const [name, setName] = useState("");

  console.log("name: ", name);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.assignContractorReducers);
  const conBenState = useSelector(
    (state) => state.ContractorBenReducers.con_data
  );

  // allDataList
  const allDataList = state.data;
  console.log(state.data);
  const newData = state?.data?.map((item) => ({
    id: item.id,
    first_name: item.contractor_name,
    project: item.project_name,
    date: item.created_at,
    payed_amount: item.payed_amount,
    due_amount: item.due_amount,
    rate: item.rate,
    status: item.status,
  }));
  const tableData = {
    ...state,
    data: newData,
  };
  console.log(tableData);
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
    dispatch(fetchLoanBeneList(current_page));
  }, [dispatch, current_page, state.isDelete]);

  const handlePageChange = (newPage) => {
    dispatch(fetchLoanBeneList(newPage));
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
        dispatch(deleteLoanBeneficiary(id));
        if (state.isDelete === true) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

    //options code
    useEffect(() => {
        dispatch(fetchContructorAllList());
        dispatch(fetchProjectsAllList());
      }, [dispatch]);

  const formsData = [
    {
        fieldName: "Rate",
        fieldType: "text",
        fieldPlaceholder: "Rate",
      },
    // {
    //   fieldName: "Contructor id",
    //   fieldType: "select",
    //   fieldPlaceholder: "Select a contractor",
    //   isRequired: false,
    //   options: conBenState?.map(
    //     (dt, index) => (
    //       console.log("vl", state.contructor_id, dt.id),
    //       {
    //         is_select: state.contructor_id === dt.id ? "selected" : "",
    //         index: state.contructor_id === dt.id ? index : null,
    //         value: dt.id,
    //         label: `${
    //           dt?.first_name === null
    //             ? dt.username
    //             : dt?.first_name + " " + dt?.last_name
    //         }`,
    //       }
    //     )
    //   ),
    // },
  ];

  // Filter Code
  const handleSearch = (formData) => {
    const allKeysEmpty = Object.values(formData).every(
      (value) => value === "" || value === null
    );
    const app_model = "contructors/AssignContractor/";
    const serializer_class = "AssignContractor";
    const searchData = { formData, app_model, serializer_class };
    if (allKeysEmpty) {
      // If the search field is empty, fetch all formData
      dispatch(fetchLoanBeneList(current_page));
    } else {
      dispatch(searchLoanBeneficiaries(searchData));
    }
  };

//   https://erpcons.vitasoftsolutions.com/filter/contructors/AssignContractor/?data_name=contructor_id&value=undefined&serializer_class=ExpenseSerializer

  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Assign Contractor"}
        redirectLink={"/contractor-assign/create"}
        // For Export & Import
        model_name={"AssignContractor"}
        app_label={"contructors"}
        url_endpoint={
          "/export-csv/?model=AssignContractor&app_label=contructors"
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
        editLink={"/contractor-assign/edit"}
        erp_modalCol={12}
        photoSection={false}
      />
    </div>
  );
};

export default ContractorAssignList;
