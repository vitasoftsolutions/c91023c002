import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { createPropertyPurchase } from "../../../redux/Actions/_PropertyPurchaseAction";

function CreatePropertyPurchase() {
  const dispatch = useDispatch();
  const propertyState = useSelector((state) => state.propertyPurchaseReducer);
  const navigate = useNavigate();
  const submitFunction = (data) => {
    dispatch(createPropertyPurchase(data));
  };

  const formsData = [
    {
      fieldName: "Project id",
      fieldType: "text",
      fieldPlaceholder: "Project id",
      isRequired: true,
      hasWidth: 3,
    },
    {
      fieldName: "Note",
      fieldType: "text",
      fieldPlaceholder: "Note",
      isRequired: true,
      hasWidth: 3,
    },
    // TODO: What is wp_ids
    {
      fieldName: "Wp Ids",
      fieldType: "text",
      fieldPlaceholder: "Wp Ids",
      isRequired: true,
      hasWidth: 3,
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
        navigate("/property-purchase");
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

export default CreatePropertyPurchase;
