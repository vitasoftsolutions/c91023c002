import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { fetchLoanBenAllList } from "../../../redux/Actions/loanBenAction";
import { createLoanTransactions } from "../../../redux/Actions/LoanTransactionsAction";

function CreateTransactions() {
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state.loanTransactionsReducer);
  const loanState = useSelector((state) => state.loanBeneficiary.data);
  const navigate = useNavigate();

  const submitFunction = (data) => {
    dispatch(createLoanTransactions(data));
  };

  useEffect(() => {
    dispatch(fetchLoanBenAllList());
  }, [dispatch]);

  const formsData = [
    {
      fieldName: "Amount",
      fieldType: "number",
      fieldPlaceholder: "Amount",
      isRequired: true,
    },
    {
      fieldName: "Return type",
      fieldType: "select",
      fieldPlaceholder: "Select a role",
      isRequired: true,
      options: [
        { value: "Fixed", label: "Fixed" },
        { value: "Percentage", label: "Percentage" },
      ],
    },
    {
      fieldName: "Instalment",
      fieldType: "number",
      fieldPlaceholder: "Instalment",
      isRequired: true,
    },
    {
      fieldName: "Interest",
      fieldType: "number",
      fieldPlaceholder: "Interest",
      isRequired: true,
    },
    {
      fieldName: "Interested Amount",
      fieldType: "number",
      fieldPlaceholder: "Interested amount",
      isRequired: true,
    },
    {
      fieldName: "Return Amount",
      fieldType: "number",
      fieldPlaceholder: "Return amount",
      isRequired: true,
    },
    {
      fieldName: "Current Amount",
      fieldType: "number",
      fieldPlaceholder: "Current amount",
      isRequired: true,
    },
    {
      fieldName: "Last payed",
      fieldType: "date",
      fieldPlaceholder: "Last payed",
      isRequired: true,
    },
    {
      fieldName: "Created at",
      fieldType: "date",
      fieldPlaceholder: "Current at",
      isRequired: true,
    },
    {
      fieldName: "Giver id",      
      fieldType: "select",
      fieldPlaceholder: "Select a Giver id",
      isRequired: true,
      options: loanState.map(user => ({
        value: user.id.toString(),
        label: user.first_name,
      })),
    },
    {
      fieldName: "Taker id",      
      fieldType: "select",
      fieldPlaceholder: "Select a Taker id",
      isRequired: true,
      options: loanState.map(user => ({
        value: user.id.toString(),
        label: user.first_name,
      })),
    },
  ];

  useEffect(() => {
    if (reduxState.isCreated) {
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
        navigate("/loan-transactions");
      }, 3000);
    }

    if (reduxState.isError) {
      toast.error(reduxState.data[0], {
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
  }, [reduxState.isError, reduxState.data, reduxState.isCreated, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/loan-transactions"}
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
}

export default CreateTransactions;
