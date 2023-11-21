import React, { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { createLoanBen, contractorben, projectlist } from "../../../redux/Actions/PaymentContractorAction";

const ContractorPaymentcreate = () => {
    //contractor
    const dispatch = useDispatch();
    // const projectState = useSelector((state) => state.assignContractorReducers);
    // console.log("projectState: ",projectState);
    const projectState = useSelector((state) => state.assignContractorReducers);
    console.log("projectState: ", projectState);
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(contractorben());
    }, [dispatch]);
    const optionsArray = projectState.con_data.map(element => {
        return { value: parseInt(element.id), label: element.first_name + " " + element.last_name };
    });
    console.log(optionsArray)
    //projects



    useEffect(() => {
        dispatch(projectlist());
    }, [dispatch]);
    const optionsArray2 = projectState.project_data.map(element => {
        console.log(typeof element.id)
        return { value: parseInt(element.id), label: element.name };

    });
    console.log("projectState: ", projectState)
    const formsData = [
        {
            fieldName: "Contructor id",
            fieldType: "select",
            fieldPlaceholder: "Select a contractor",
            isRequired: true,
            options: [
                ...optionsArray
            ],
        },
        {
            fieldName: "Project id",
            fieldType: "select",
            fieldPlaceholder: "Select a project",
            isRequired: true,
            options: [
                ...optionsArray2
            ],
        },
        {
            fieldName: "Worker",
            fieldType: "text",
            fieldPlaceholder: "Worker",
            isRequired: true,
        },
        {
            fieldName: "Payment",
            fieldType: "text",
            fieldPlaceholder: "Payment",
            isRequired: true,
        },
        {
            fieldName: "Payment Type",
            fieldType: "select",
            fieldPlaceholder: "Select a project",
            isRequired: false,
            options: [
                { value: "", label: "No choice"}
            ],
        },
        
    ];
    const submitFunction = (data) => {
        // const modifiedData = {
        //     ...data,
        //     contractor: parseInt(data.contractor),
        //     project: parseInt(data.project),
        //     // Add more fields to convert as needed
        // };
        console.log(data, "Owner From create ");
        dispatch(createLoanBen(data));
    };

    // In a useEffect or similar, check the updated state
    useEffect(() => {
        if (projectState.isCreated) {
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
                navigate("/contractor-payment");
            }, 3000);
        }

        if (projectState.isError) {
            // Perform actions after the update is successful
            toast.error(projectState.massage, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }, [projectState, navigate]);


    return (
        <>
            <div className="flex items-center justify-between gap-4 mb-4">
                <Breadcrumb />
                <div className="flex space-x-4">
                    <Link
                        to={"/contractor-payment"}
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
                    isReset={true}
                />
            </div>

            <ToastContainer
                position="top-center"
                autoClose={2000}
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

export default ContractorPaymentcreate;