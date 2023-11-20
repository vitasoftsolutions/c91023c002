import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { createLoanInstallment } from "../../../redux/Actions/LoanInstallmentAction";

function CreateInstallment() {
  const dispatch = useDispatch();
  const loanBen = useSelector((state) => state.loanInstallmentReducer);
  console.log(loanBen, "loanBen");
  const navigate = useNavigate();

  const submitFunction = (data) => {
    dispatch(createLoanInstallment(data));
  };

  // Get the user
  const token = sessionStorage.getItem("jwt_token");
  const result = jwtDecode(token);
  const userId = result.user_id;

  console.log(userId);

  const formsData = [
    {
      fieldName: "Amount",
      fieldType: "number",
      fieldPlaceholder: "Amount",
      isRequired: true,
    },
    {
      fieldName: "Instalment",
      fieldType: "number",
      fieldPlaceholder: "Instalment",
      isRequired: true,
    },
    {
      fieldName: "Giver id",
      fieldType: "text",
      fieldPlaceholder: "Giver name",
      isRequired: true,
    },
    {
      fieldName: "Taker id",
      fieldType: "text",
      fieldPlaceholder: "Taker id",
      isRequired: true,
    },
    {
      fieldName: "Document",
      fieldType: "file",
      fieldPlaceholder: "doc",
      isRequired: true,
    },
    {
      fieldName: "Author id",
      fieldType: "number",
      fieldPlaceholder: "Author id",
      defaultValue: userId,
      isRequired: true,
      isHidden: true,
    },
    {
      fieldName: "Loan id",
      fieldType: "number",
      fieldPlaceholder: "Loan id",
      isRequired: true,
    },
  ];

  useEffect(() => {
    if (loanBen.isCreated) {
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
        navigate("/loan-installment");
      }, 3000);
    }

    if (loanBen.isError) {
      toast.error(loanBen.data[0], {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [
    loanBen.isError,
    loanBen.data,
    loanBen.isCreated,
    navigate,
  ]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/loan-installment"}
            className="btn btn-sm font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
          >
            <BsArrowLeftShort /> Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 rounded-lg md:p-4">
        <MainForm
          isValue={true}
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
}

export default CreateInstallment;
