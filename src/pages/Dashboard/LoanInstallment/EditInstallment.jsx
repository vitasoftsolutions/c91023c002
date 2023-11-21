import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import BeneficiaryForm from "../../../Components/shared/Forms/BeneficiaryForm";
import { ToastContainer, toast } from "react-toastify";
import {
  fetchLoanBenAllList,
  fetchLoanBene,
  updateLoanBeneficiary,
} from "../../../redux/Actions/loanBenAction";
import { fetchLoanTransactionAllList } from "../../../redux/Actions/LoanTransactionsAction";
import jwtDecode from "jwt-decode";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { fetchInstallment, updateInstallment } from "../../../redux/Actions/LoanInstallmentAction";

function EditInstallment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.loanInstallmentReducer);
  const loanState = useSelector((state) => state.loanBeneficiary.data);
  const loanTran = useSelector((state) => state.loanTransactionsReducer.data);
  const location = useLocation();
  const state = reduxState.sData;

  console.log(state);

  useEffect(() => {
    dispatch(fetchInstallment(location.state));
  }, [location.state, dispatch]);

  useEffect(() => {
    dispatch(fetchLoanBenAllList());
  }, [dispatch]);

  // fetch Loan Transaction AllList
  useEffect(() => {
    dispatch(fetchLoanTransactionAllList());
  }, [dispatch]);

  // Get the user
  const token = sessionStorage.getItem("jwt_token");
  const result = jwtDecode(token);
  const userId = result.user_id;

  const formsData = [
    {
      fieldName: "Amount",
      fieldType: "number",
      fieldPlaceholder: "Amount",
      isRequired: true,
      defaultValue: state.amount,
    },
    {
      fieldName: "Instalment",
      fieldType: "number",
      fieldPlaceholder: "Instalment",
      isRequired: true,
      defaultValue: state.instalment,

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
      defaultValue: state.giver_id,
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
      defaultValue: state.taker_id,

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
      fieldType: "select",
      fieldPlaceholder: "Select a Loan id",
      isRequired: true,
      options: loanTran.map(loan => ({
        value: loan.id.toString(),
        label: loan.amount,
      })),
      defaultValue: state.loan_id,
      
    },
    {
      fieldName: "Document",
      fieldType: "file",
      fieldPlaceholder: "doc",
      isRequired: true,
      defaultValue: state.document,
    },
  ];

  const submitFunction = (data) => {
    const document = data.document ? data.document : "";

    if (state) {
      const updateData = {
        amount: data.amount ? data.amount : state.amount,
        instalment: data.instalment ? data.instalment : state.instalment,
        giver_id: data.giver_id ? data.giver_id : state.giver_id,
        taker_id: data.taker_id ? data.taker_id : state.taker_id,
        loan_id: data.loan_id ? data.loan_id : state.loan_id,
        status: data.status ? data.status : state.status,
      };

      // Dispatch when document length is greater than 0
      if (document !== "") {
        dispatch(
          updateInstallment({
            id: state.id,
            data: { ...updateData, document: document },
          })
        );
      }

      dispatch(
        updateInstallment({
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
        navigate("/loan-installment");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

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

export default EditInstallment;
