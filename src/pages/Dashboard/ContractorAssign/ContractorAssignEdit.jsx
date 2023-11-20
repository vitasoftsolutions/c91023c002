import { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import BeneficiaryForm from "../../../Components/shared/Forms/BeneficiaryForm";
import { ToastContainer, toast } from "react-toastify";
import {
    createLoanBen, contractorben, projectlist, fetchLoanBene, updateLoanBeneficiary
} from "../../../redux/Actions/AssignContractorAction";
import MainForm from "../../../Components/shared/Forms/MainForm";
const ContractorAssignEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reduxState = useSelector((state) => state.assignContractorReducers);
    const location = useLocation();
    const state = reduxState.sData;

    console.log(state)

    useEffect(() => {
        dispatch(fetchLoanBene(location.state));
    }, [location.state, dispatch]);
    const formsData = [
        {
            fieldName: "Contructor id",
            fieldType: "select",
            fieldPlaceholder: "Select a contractor",
            isRequired: true,
            options: [
                // ...optionsArray
            ],
        },
        {
            fieldName: "Project id",
            fieldType: "select",
            fieldPlaceholder: "Select a project",
            isRequired: true,
            options: [
                // ...optionsArray2
            ],
        },
        {
            fieldName: "Rate",
            fieldType: "text",
            fieldPlaceholder: "Rate",
            isRequired: true,
        },
        {
            fieldName: "Rate per work",
            fieldType: "text",
            fieldPlaceholder: "Rate per work",
            isRequired: true,
        },
        {
            fieldName: "Unit",
            fieldType: "text",
            fieldPlaceholder: "Unit",
            isRequired: true,
        },
        {
            fieldName: "Work order amount",
            fieldType: "number",
            fieldPlaceholder: "Work Order Amount",
            isRequired: true,
        },
        {
            fieldName: "Payed Amount",
            fieldType: "number",
            fieldPlaceholder: "Payed Amount",
            isRequired: true,
        },
        {
            fieldName: "Due Amount",
            fieldType: "number",
            fieldPlaceholder: "Due Amount",
            isRequired: true,
        },
        {
            fieldName: "Workers",
            fieldType: "number",
            fieldPlaceholder: "Workers",
            isRequired: true,
        },
        {
            fieldName: "Worker payement",
            fieldType: "number",
            fieldPlaceholder: "Worker payement",
            isRequired: true,
        },
        {
            fieldName: "Security Money Percentage",
            fieldType: "number",
            fieldPlaceholder: "Percentage(%)",
            isRequired: true,
        },
        {
            fieldName: "Security Amount",
            fieldType: "number",
            fieldPlaceholder: "Security Amount",
            isRequired: true,
        },

    ];
    const submitFunction = (data) => {
        if (state) {
            console.log(data.contructor_id, "From update page");
            const updatedData = {
                id: state.id,
                status: data.status ? data.status : state.status,
                
                
            };
            dispatch(
                updateLoanBeneficiary({
                    id: state.id,
                    data: updatedData,
                })
            );
        }
    };

    // In a useEffect or similar, check the updated state
    useEffect(() => {
        if (reduxState.isUpdate) {
            // Perform actions after the update is successful
            toast("Successfully done", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                navigate("/contractor-assign");
            }, 3000);
        }
    }, [reduxState.isUpdate, navigate]);

    return (
        <>
            <div className="flex items-center justify-between gap-4 mb-4">
                <Breadcrumb />
                <div className="flex space-x-4">
                    <Link
                        to={"/contractor-assign"}
                        className="btn btn-sm font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
                    >
                        <BsArrowLeftShort /> Back
                    </Link>
                </div>
            </div>
            <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 rounded-lg md:p-4">
                <MainForm
                    formsData={formsData}
                    submitFunction={submitFunction}
                    isState={state}
                />
            </div>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default ContractorAssignEdit;