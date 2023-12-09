import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { ToastContainer, toast } from "react-toastify";
import { fetchLoanBenAllList } from "../../../redux/Actions/loanBenAction";
import {
  fetchLoanTransaction,
  updateLoanTransactions,
} from "../../../redux/Actions/LoanTransactionsAction";

function EditLoanTransactions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.loanTransactionsReducer);
  const loanState = useSelector((state) => state.loanBeneficiary.data);
  const location = useLocation();
  const state = reduxState.sData;

  useEffect(() => {
    dispatch(fetchLoanTransaction(location.state));
  }, [location.state, dispatch]);

  useEffect(() => {
    dispatch(fetchLoanBenAllList());
  }, [dispatch]);

  const optionsArray = [
    { value: "Fixed", label: "Fixed" },
    { value: "Percentage", label: "Percentage" },
  ]

  const formsData = [
    {
      fieldName: "Amount",
      fieldType: "number",
      fieldPlaceholder: "Amount",
      isRequired: true,
      defaultValue: state.amount,
    },
    {
      fieldName: "Return type",
      fieldType: "select",
      fieldPlaceholder: "Select a role",
      isRequired: true,
      options: optionsArray,
      defaultValue: state.return_type
      ? optionsArray.findIndex((option) => option.value === state.return_type)
      : null,
    },
    {
      fieldName: "Instalment",
      fieldType: "number",
      fieldPlaceholder: "Instalment",
      isRequired: true,
      defaultValue: state.instalment,
    },
    {
      fieldName: "Interest",
      fieldType: "number",
      fieldPlaceholder: "Interest",
      isRequired: true,
      defaultValue: state.interest,
    },
    {
      fieldName: "Interested Amount",
      fieldType: "number",
      fieldPlaceholder: "Interested amount",
      isRequired: true,
      defaultValue: state.interested_amount,
    },
    {
      fieldName: "Return Amount",
      fieldType: "number",
      fieldPlaceholder: "Return amount",
      isRequired: true,
      defaultValue: state.return_amount,
    },
    {
      fieldName: "Current Amount",
      fieldType: "number",
      fieldPlaceholder: "Current amount",
      isRequired: true,
      defaultValue: state.current_amount,
    },
    {
      fieldName: "Last payed",
      fieldType: "date",
      fieldPlaceholder: "Last payed",
      isRequired: true,
      defaultValue: state.last_payed,
    },
    {
      fieldName: "Giver id",
      fieldType: "select",
      fieldPlaceholder: "Select a Giver id",
      // isRequired: true,
      options: loanState?.map((dt, index) =>
      // console.log("vl", state.giver_id, dt.id),
      ({
        is_select: state.giver_id === dt.id ? "selected" : "",
        index: state.giver_id === dt.id ? index : null,
        value: dt.id,
        label: `${
          dt?.first_name === null
            ? dt.username
            : dt?.first_name + " " + dt?.last_name
        }`,
      })
    ),
    defaultValue: state.giver_id
      ? loanState?.findIndex((dt) => dt.id === state.giver_id)
      : null,
    },
    {
      fieldName: "Taker id",
      fieldType: "select",
      fieldPlaceholder: "Select a Taker id",
      // isRequired: true,
      options: loanState?.map(
        (dt, index) => (
          console.log("vl", state.taker_id, dt.id),
          {
            is_select: state.taker_id === dt.id ? "selected" : "",
            index: state.taker_id === dt.id ? index : null,
            value: dt.id,
            label: `${
              dt?.first_name === null
                ? dt.username
                : dt?.first_name + " " + dt?.last_name
            }`,
          }
        )
      ),
      defaultValue: state.taker_id
        ? loanState?.findIndex((dt) => dt.id === state.taker_id)
        : null,
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      const updateData = {
        amount: data.amount ? data.amount : state.amount,
        current_amount: data.current_amount
          ? data.current_amount
          : state.current_amount,
        giver_id: data.giver_id ? data.giver_id : state.giver_id,
        instalment: data.instalment ? data.instalment : state.instalment,
        interest: data.interest ? data.interest : state.interest,
        interested_amount: data.interested_amount
          ? data.interested_amount
          : state.interested_amount,
        last_payed: data.last_payed ? data.last_payed : state.last_payed,
        return_amount: data.return_amount
          ? data.return_amount
          : state.return_amount,
        return_type: data.return_type ? data.return_type : state.return_type,
        taker_id: data.taker_id ? data.taker_id : state.taker_id,
        status: data.status ? data.status : state.status,
      };

      dispatch(
        updateLoanTransactions({
          id: state.id,
          data: updateData,
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
        navigate("/loan-transactions");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

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
}

export default EditLoanTransactions;
