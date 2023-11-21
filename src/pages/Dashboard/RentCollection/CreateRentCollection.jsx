import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { createRentCollection } from "../../../redux/Actions/_RentCollectionAction";
import jwtDecode from "jwt-decode";

function CreateRentCollection() {
  const dispatch = useDispatch();
  const propertyState = useSelector((state) => state.rentCollectionReducer);
  const navigate = useNavigate();
  const submitFunction = (data) => {
    dispatch(createRentCollection(data));
  };

  // Get the user
  const token = sessionStorage.getItem("jwt_token");
  const result = jwtDecode(token);
  const userId = result.user_id;

  const formsData = [
    {
      fieldName: "Rent Amount",
      fieldType: "number",
      fieldPlaceholder: "Rent Amount",
      isRequired: true,
    },
    {
      fieldName: "Due Amount",
      fieldType: "number",
      fieldPlaceholder: "Due Amount",
      isRequired: true,
    },
    {
      fieldName: "Rent Date",
      fieldType: "date",
      fieldPlaceholder: "Rent Date",
      isRequired: true,
    },
    {
      fieldName: "Project id",
      fieldType: "text",
      fieldPlaceholder: "Project id",
      isRequired: true,
    },
    {
      fieldName: "Property id",
      fieldType: "text",
      fieldPlaceholder: "Property id",
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
      fieldName: "Renter id",
      fieldType: "text",
      fieldPlaceholder: "Renter id",
      isRequired: true,
    },
  ];

  useEffect(() => {
    if (propertyState.isCreated) {
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

    if (propertyState.isError) {
      toast.error(propertyState.data[0], {
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
    propertyState.isError,
    propertyState.data,
    propertyState.isCreated,
    navigate,
  ]);

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

export default CreateRentCollection;
