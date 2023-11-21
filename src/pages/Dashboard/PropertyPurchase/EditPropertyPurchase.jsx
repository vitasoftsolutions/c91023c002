import { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { fetchPropertyPurchase, updatePropertyPurchase } from "../../../redux/Actions/_PropertyPurchaseAction";

function EditPropertyPurchase() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.propertyPurchaseReducer);
  const location = useLocation();
  const state = reduxState.sData;

  console.log(state);

  useEffect(() => {
    dispatch(fetchPropertyPurchase(location.state));
  }, [location.state, dispatch]);

  const formsData = [
    {
      fieldName: "Project id",
      fieldType: "text",
      fieldPlaceholder: "Project id",
      isRequired: true,
      hasWidth: 3,
      defaultValue: state.project_id,
    },
    {
      fieldName: "Note",
      fieldType: "text",
      fieldPlaceholder: "Note",
      isRequired: true,
      hasWidth: 3,
      defaultValue: state.note,
    },
    // TODO: What is wp_ids
    {
      fieldName: "Wp Ids",
      fieldType: "text",
      fieldPlaceholder: "Wp Ids",
      isRequired: true,
      hasWidth: 3,
      defaultValue: state.wp_ids,
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      const updateData = {
        project_id: data.project_id ? data.project_id : state.project_id,
        note: data.note ? data.note : state.note,
        wp_ids: data.wp_ids ? data.wp_ids : state.side,
        status: data.status ? data.status : state.status,
      };

      dispatch(
        updatePropertyPurchase({
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
        navigate("/property-purchase");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/property-purchase"}
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

export default EditPropertyPurchase;
