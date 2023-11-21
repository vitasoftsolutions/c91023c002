import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { fetchRentCollection, updateRentCollection } from "../../../redux/Actions/_RentCollectionAction";

function EditRentCollection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.rentCollectionReducer);
  const location = useLocation();
  const state = reduxState.sData;

  useEffect(() => {
    dispatch(fetchRentCollection(location.state));
  }, [location.state, dispatch]);

  const formsData = [
    {
      fieldName: "Rent Amount",
      fieldType: "number",
      fieldPlaceholder: "Rent Amount",
      isRequired: true,
      defaultValue: state.rent_amount,
    },
    {
      fieldName: "Due Amount",
      fieldType: "number",
      fieldPlaceholder: "Due Amount",
      isRequired: true,
      defaultValue: state.due_amount,
    },
    {
      fieldName: "Rent Date",
      fieldType: "date",
      fieldPlaceholder: "Rent Date",
      isRequired: true,
      defaultValue: state.rent_date,
    },
    {
      fieldName: "Project id",
      fieldType: "text",
      fieldPlaceholder: "Project id",
      isRequired: true,
      defaultValue: state.project_id,
    },
    {
      fieldName: "Property id",
      fieldType: "text",
      fieldPlaceholder: "Property id",
      isRequired: true,
      defaultValue: state.property_id,
    },
    {
      fieldName: "Renter id",
      fieldType: "text",
      fieldPlaceholder: "Renter id",
      isRequired: true,
      defaultValue: state.renter_id,
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      const updateData = {
        rent_amount: data.rent_amount ? data.rent_amount : state.rent_amount,
        due_amount: data.due_amount ? data.due_amount : state.due_amount,
        rent_date: data.rent_date ? data.rent_date : state.rent_date,
        project_id: data.project_id ? data.project_id : state.project_id,
        property_id: data.property_id ? data.property_id : state.property_id,
        renter_id: data.renter_id ? data.renter_id : state.renter_id,
        status: data.status ? data.status : state.status,
      };

      dispatch(
        updateRentCollection({
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
        navigate("/rent-collections");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/rent-collections"}
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

export default EditRentCollection;
