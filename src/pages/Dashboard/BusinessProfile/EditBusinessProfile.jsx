import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import BeneficiaryForm from "../../../Components/shared/Forms/BeneficiaryForm";
import { ToastContainer, toast } from "react-toastify";
import {
  fetchBusinessProfile,
  updateBusinessProfile,
} from "../../../redux/Actions/BusinessProfileAction";

function EditBusinessProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.businessProfileReducer);
  const location = useLocation();
  const state = reduxState.sData;

  console.log(state, "popopp");

  useEffect(() => {
    dispatch(fetchBusinessProfile(location.state));
  }, [location.state, dispatch]);

  const formsData = [
    {
      fieldName: "Name",
      fieldType: "text",
      fieldPlaceholder: "Name",
      isRequired: true,
      defaultValue: state.name,
    },
    {
      fieldName: "Address",
      fieldType: "text",
      fieldPlaceholder: "Address",
      isRequired: true,
      defaultValue: state.address,
    },
    {
      fieldName: "License Number",
      fieldType: "text",
      fieldPlaceholder: "License Number",
      isRequired: true,
      defaultValue: state.license_number,
    },
    {
      fieldName: "Reg Number",
      fieldType: "text",
      fieldPlaceholder: "Reg Number",
      isRequired: true,
      defaultValue: state.reg_number,
    },
    {
      fieldName: "Logo",
      fieldType: "file",
      fieldPlaceholder: "Logo",
      isRequired: true,
      defaultValue: state.logo,
    },
  ];

  const submitFunction = (data) => {
    const logo = data.logo ? data.logo : "";

    if (state) {
      const updateData = {
        author_id: data.author_id ? data.author_id : state.author_id,
        name: data.name ? data.name : state.name,
        address: data.address ? data.address : state.address,
        license_number: data.license_number
          ? data.license_number
          : state.license_number,
        reg_number: data.reg_number ? data.reg_number : state.reg_number,
        status: data.status ? data.status : state.status,
      };

     
      // Dispatch when logo length is greater than 0
      if (logo !== "") {
        dispatch(
          updateBusinessProfile({
            id: state.id,
            data: { ...updateData, logo: logo },
          })
        );
      }

      dispatch(
        updateBusinessProfile({
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
        navigate("/business-profile");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/business-profile"}
            className="btn btn-sm font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
          >
            <BsArrowLeftShort /> Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 rounded-lg md:p-4">
        <BeneficiaryForm
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

export default EditBusinessProfile;
