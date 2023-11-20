import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import Swal from "sweetalert2";
import {
    deleteLoanBeneficiary,
    fetchLoanBeneList,
} from "../../../redux/Actions/AssignContractorAction";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import customName from "../helper"
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
    const [name, setName] = useState("")
    
    

    console.log("name: ", name)
    const dispatch = useDispatch();
    const state = useSelector((state) => state.assignContractorReducers);

    // allDataList
    const allDataList = state.data;
    console.log(state.data)
    const newData = state?.data?.map((item) => ({
        id: item.id,
        first_name: item.contructor_id,
        project: item.project_id,
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
                title={"Assign Contractor"}
                redirectLink={"/contractor-assign/create"}
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
                editLink={"/contractor-assign/edit"}
                erp_modalCol={12}
                photoSection={false}
            />
        </div>
    );
};

export default ContractorAssignList;