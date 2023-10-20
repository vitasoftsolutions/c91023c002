import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MainForm from "../../../Components/shared/Forms/MainForm";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { updateOwner } from "../../../redux/Actions/ownerBenAction";

function EditOwner() {
  const dispatch = useDispatch();
  let { state } = useLocation();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.ownerReducers);

  const formData = [
    {
      fieldName: "First Name",
      fieldType: "text",
      fieldPlaceholder: "First Name",
      isRequired: true,
      defaultValue: state.first_name,
    },
    {
      fieldName: "Last Name",
      fieldType: "text",
      fieldPlaceholder: "Last Name",
      isRequired: true,
      defaultValue: state.last_name,
    },
    {
      fieldName: "Email",
      fieldType: "email",
      fieldPlaceholder: "example@gmail.com",
      isRequired: true,
      defaultValue: state.email,
    },
    {
      fieldName: "NID Number",
      fieldType: "number",
      fieldPlaceholder: "Your NID number here",
      isRequired: true,
      defaultValue: state.nid_number,
    },
    {
      fieldName: "Present Address",
      fieldType: "text",
      fieldPlaceholder: "Your address here",
      isRequired: true,
      defaultValue: state.present_address,
    },
  ];

  const submitFunction = (data) => {
    console.log(data, "From update page");
    if (state) {
      const updatedData = {
        id: state.id,
        ...data,
      };
      dispatch(updateOwner(updatedData));      
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
        navigate("/owner");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  console.log(reduxState.isUpdate, "reduxState.isUpdate");

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/owner"}
            className="btn btn-sm font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
          >
            <BsArrowLeftShort /> Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 rounded-lg md:p-4">
        <MainForm
          formData={formData}
          submitFunction={submitFunction}
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

export default EditOwner;
