import { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import {
  fetchFlateRent,
  updateFlateRent,
} from "../../../redux/Actions/_FlateRentAction";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { fetchProperty, updateProperty } from "../../../redux/Actions/_PropertyAction";

function EditProperty() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.propertyReducer);
  const location = useLocation();
  const state = reduxState.sData;

  console.log(state);

  useEffect(() => {
    dispatch(fetchProperty(location.state));
  }, [location.state, dispatch]);

  const formsData = [
    {
      fieldName: "Size",
      fieldType: "number",
      fieldPlaceholder: "Size",
      isRequired: true,
      defaultValue: state.size,
    },
    {
      fieldName: "Code",
      fieldType: "text",
      fieldPlaceholder: "Code",
      isRequired: true,
      defaultValue: state.code,
    },
    {
      fieldName: "Side",
      fieldType: "text",
      fieldPlaceholder: "Side",
      isRequired: true,
      defaultValue: state.side,
    },
    {
      fieldName: "Project id",
      fieldType: "text",
      fieldPlaceholder: "Project id",
      isRequired: true,
      defaultValue: state.project_id,
    },
    {
      fieldName: "type",
      fieldType: "text",
      fieldPlaceholder: "type",
      isRequired: true,
      defaultValue: state.type,
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      const updateData = {
        size: data.size ? data.size : state.size,
        code: data.code ? data.code : state.code,
        side: data.side ? data.side : state.side,
        project_id: data.project_id ? data.project_id : state.project_id,
        type: data.type ? data.type : state.type,
        status: data.status ? data.status : state.status,
      };

      dispatch(
        updateProperty({
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
        navigate("/flat-rent");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/flat-rent"}
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

export default EditProperty;
