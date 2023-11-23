import { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import BeneficiaryForm from "../../../Components/shared/Forms/BeneficiaryForm";
import { ToastContainer, toast } from "react-toastify";
import {
    createLoanBen, contractorben, projectlist, fetchLoanBene, updateLoanBeneficiary
} from "../../../redux/Actions/PropertyInstallmentAction";
import MainForm from "../../../Components/shared/Forms/MainForm";

const PropertyInstallmentedit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reduxState = useSelector((state) => state.propertySliceReducers);
    const location = useLocation();
    const state = reduxState.sData;

    console.log("sate: ", state)

    useEffect(() => {
        dispatch(fetchLoanBene(location.state));
    }, [location.state, dispatch]);

    //options code
    useEffect(() => {
        dispatch(contractorben());
    }, [dispatch]);
    const optionsArray = reduxState.property_data.map(element => {
        return { value: parseInt(element.id), label: element.first_name + " " + element.last_name };
    });
    console.log(optionsArray)
    //projects



    useEffect(() => {
        dispatch(projectlist());
    }, [dispatch]);
    const optionsArray2 = reduxState.project_data.map(element => {

        return { value: parseInt(element.id), label: element.name };

    });
    console.log("projectState: ", reduxState)
    const optionsArray3 = reduxState.purchase_id.map(element => {
        console.log(typeof element.id)
        return { value: parseInt(element.id), label: element.id };

    });
    console.log("projectState: ", reduxState)



    const formsData = [
        {
            fieldName: "Property Id",
            fieldType: "select",
            fieldPlaceholder: "Select a contractor",
            isRequired: false,
            options: [
                ...optionsArray
            ],
        },
        {
            fieldName: "Project id",
            fieldType: "select",
            fieldPlaceholder: "Select a project",
            isRequired: false,
            options: [
                ...optionsArray2
            ],
        },
        {
            fieldName: "Purchase id",
            fieldType: "select",
            fieldPlaceholder: "Select a project",
            isRequired: false,
            options: [
                ...optionsArray3
            ],
        },
        {
            fieldName: "Installment Date",
            fieldType: "date",
            fieldPlaceholder: "Date",
            isRequired: false,
        },
        {
            fieldName: "Amount",
            fieldType: "text",
            fieldPlaceholder: "Amount",
            isRequired: false,
        },
        

    ];
    const submitFunction = (data) => {
        if (state) {
            console.log(data.contructor_id, "From update page");
            const updatedData = {
                id: state.id,
                status: data.status ? data.status : state.status,
                contructor_id: data.contructor_id ? data.contructor_id : state.contructor_id,
                project_id: data.project_id ? data.project_id : state.project_id,
                purchase_id: data.purchase_id ? data.purchase_id : state.purchase_id,
                amount: data.amount ? data.amount : state.amount,
                installment_date: data.installment_date ? data.installment_date : state.installment_date,

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
                navigate("/property-installment");
            }, 3000);
        }
    }, [reduxState.isUpdate, navigate]);

    return (
        <>
            <div className="flex items-center justify-between gap-4 mb-4">
                <Breadcrumb />
                <div className="flex space-x-4">
                    <Link
                        to={"/property-installment"}
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

export default PropertyInstallmentedit;