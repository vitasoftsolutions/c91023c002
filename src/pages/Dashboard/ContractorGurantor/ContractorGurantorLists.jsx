import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import Swal from "sweetalert2";
import {
    deleteLoanBeneficiary,
    fetchLoanBeneList,
    searchLoanBeneficiaries,
} from "../../../redux/Actions/ContractorGuarantorAction";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";

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
      fieldName: "First name",
      fieldType: "text",
      fieldPlaceholder: "First Name",
    },
    {
      fieldName: "Last name",
      fieldType: "text",
      fieldPlaceholder: "Last Name",
    },
    {
      fieldName: "Email",
      fieldType: "email",
      fieldPlaceholder: "Email",
    },
  ];


const ContractorGurantorLists = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.loanBeneficiary);
    // allDataList
    const allDataList = state.data;
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
        dispatch(fetchLoanBeneList(current_page));
    }, [dispatch, current_page, state.isDelete, state.isUpdate]);

    const handlePageChange = (newPage) => {
        dispatch(fetchLoanBeneList(newPage));
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
                dispatch(deleteLoanBeneficiary(id));
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
    const app_model = "contructors/ContractorGarrentor/";
    const serializer_class = 'ContructorsGarrentor';
    const searchData = { formData, app_model, serializer_class};
    if (allKeysEmpty) {
      // If the search field is empty, fetch all formData
      dispatch(fetchLoanBeneList(current_page));
    } else {
      dispatch(searchLoanBeneficiaries(searchData));
    }
  };
    
    //
    return (
        <div className="max-w-screen">
            <TableHeader
                title={"Contractor Guarantor"}
                redirectLink={"/contractor-guarantor/create"}
                model_name={"contractorGarrentor"}
                app_label={"contructors"}
                // For Export & Import
                url_endpoint={"/export-csv/?model=contractorGarrentor&app_label=contructors"}       
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
                editLink={"/contractor-guarantor/edit"}
                erp_modalCol={6}
                photoSection={true}
                nidSection={true}
            />
        </div>
    );
};

export default ContractorGurantorLists;