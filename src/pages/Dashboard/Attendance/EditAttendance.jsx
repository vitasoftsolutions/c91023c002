import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import BeneficiaryForm from "../../../Components/shared/Forms/BeneficiaryForm";
import { ToastContainer, toast } from "react-toastify";
import {
  fetchLoanBene,
  updateLoanBeneficiary,
} from "../../../redux/Actions/loanBenAction";
import MainForm from "../../../Components/shared/Forms/MainForm";

function EditAttendance() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.attendanceReducers);
  const location = useLocation();
  const state = reduxState.sData;

  console.log(state);

  useEffect(() => {
    dispatch(fetchLoanBene(location.state));
  }, [location.state, dispatch]);

  const formsData = [
    {
      fieldName: "First Name",
      fieldType: "text",
      fieldPlaceholder: "First Name",
      defaultValue: state.first_name,
    },
  ];

  const submitFunction = (data) => {
    const profile_picture = data.profile_picture ? data.profile_picture : "";
    const nid_front = data.nid_front ? data.nid_front : "";
    const nid_back = data.nid_back ? data.nid_back : "";

    if (state) {
      const updateData = {
        author_id: data.author_id ? data.author_id : state.author_id,
        email: data.email ? data.email : state.email,
        first_name: data.first_name ? data.first_name : state.first_name,
        is_deleted: data.is_deleted ? data.is_deleted : state.is_deleted,
        last_name: data.last_name ? data.last_name : state.last_name,
        nid_number: data.nid_number ? data.nid_number : state.nid_number,
        permanent_address: data.permanent_address
          ? data.permanent_address
          : state.permanent_address,
        present_address: data.present_address
          ? data.present_address
          : state.present_address,
        status: data.status ? data.status : state.status,
      };

      // Dispatch when profile_picture length is greater than 0
      if (profile_picture !== "") {
        dispatch(
          updateLoanBeneficiary({
            id: state.id,
            data: { ...updateData, profile_picture: profile_picture },
          })
        );
      }
      // Dispatch when nid_front length is greater than 0
      if (nid_front !== "") {
        dispatch(
          updateLoanBeneficiary({
            id: state.id,
            data: { ...updateData, nid_front: nid_front },
          })
        );
      }
      // Dispatch when nid_back length is greater than 0
      if (nid_back !== "") {
        dispatch(
          updateLoanBeneficiary({
            id: state.id,
            data: { ...updateData, nid_back: nid_back },
          })
        );
      }

      dispatch(
        updateLoanBeneficiary({
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
        navigate("/beneficiarylist");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/beneficiarylist"}
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

export default EditAttendance;