import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import Swal from "sweetalert2";
import {
    deleteLoanBeneficiary,
    fetchLoanBeneList,
} from "../../../redux/Actions/IncomeActions";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import customName from "../helper"
const t_head = [
    { name: "Income Name" },
    { name: "Amount" },
    { name: "Entry Date" },
    { name: "Income Date" },
    { name: "Status" },
    { name: "Action" },
];

//date function
function extractDate(dateTimeString) {
    // Create a new Date object from the provided string
    const date = new Date(dateTimeString);
  
    // Extract the individual date components
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // Months are zero-based
    const day = date.getUTCDate();
  
    // Create the formatted date string
    //const formattedDate = `${year}/${month < 10 ? '0' : ''}${month}/${day < 10 ? '0' : ''}${day}`;
    const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
  
    return formattedDate;
  }





const IncomeLists = () => {
    const [name, setName] = useState("")
    
    

    console.log("name: ", name)
    const dispatch = useDispatch();
    const state = useSelector((state) => state.expenseSliceReducers);

    // allDataList
    const allDataList = state.data;
    console.log(state.data)
    const newData = state?.data?.map((item) => ({
        id: item.id,
        first_name: item.income_name,
        amount:item.amount,
        date: item.created_at,
        income_date:extractDate(item.income_date),
        status: item.status,
    }));
    const tableData = {
        ...state,
        data: newData,
    };
    console.log(tableData)
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




    return (
        <div className="max-w-screen">
            <TableHeader
                title={"Incomes"}
                redirectLink={"/income/create"}
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
                editLink={"/income/edit"}
                erp_modalCol={12}
                photoSection={false}
            />
        </div>
    );
};

export default IncomeLists;