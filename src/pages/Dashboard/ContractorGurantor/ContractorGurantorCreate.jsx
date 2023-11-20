import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import BeneficiaryForm from "../../../Components/shared/Forms/BeneficiaryForm";
import { createLoanBen, contractorben, projectlist } from "../../../redux/Actions/ContractorGuarantorAction";
import MainForm from "../../../Components/shared/Forms/MainForm";

const ContractorGurantorCreate = () => {
    //contractor
    const dispatch = useDispatch();
    // const projectState = useSelector((state) => state.assignContractorReducers);
    // console.log("projectState: ",projectState);
    const projectState = useSelector((state) => state.guarantorContractorReducers);
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
            fieldName: "First Name",
            fieldType: "text",
            fieldPlaceholder: "First Name",
            isRequired: true,
        },
        {
            fieldName: "Last Name",
            fieldType: "text",
            fieldPlaceholder: "Last Name",
            isRequired: true,
        },
        {
            fieldName: "Email",
            fieldType: "email",
            fieldPlaceholder: "example@gmail.com",
            isRequired: true,
        },
        {
            fieldName: "Nid Number",
            fieldType: "number",
            fieldPlaceholder: "Nid Number",
            isRequired: true,
        },
        {
            fieldName: "Present Address",
            fieldType: "text",
            fieldPlaceholder: "Present Address (Comma Separated)",
            isRequired: true,
        },
        {
            fieldName: "Permanent Address",
            fieldType: "text",
            fieldPlaceholder: "Permanent Address (Comma Separated)",
            isRequired: true,
        },
        {
            fieldName: "Profile Picture",
            fieldType: "file",
            fieldPlaceholder: "Upload Image",
            isRequired: false,
        },
        {
            fieldName: "Nid Front",
            fieldType: "file",
            fieldPlaceholder: "Upload Image",
            isRequired: false,
        },
        {
            fieldName: "Nid Back",
            fieldType: "file",
            fieldPlaceholder: "Upload Image",
            isRequired: false,
        },
        {
            fieldName: "Role",
            fieldType: "text",
            fieldPlaceholder: "Role",
            isRequired: true,
        },
        {
            fieldName: "Contructor id",
            fieldType: "select",
            fieldPlaceholder: "Select a contractor",
            isRequired: true,
            options: [
                ...optionsArray
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
                navigate("/contractor-guarantor");
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
                        to={"/contractor-guarantor"}
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

export default ContractorGurantorCreate;