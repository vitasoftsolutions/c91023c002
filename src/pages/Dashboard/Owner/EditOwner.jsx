import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MainForm from "../../../Components/shared/Forms/MainForm";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { fetchOwner, updateOwner } from "../../../redux/Actions/ownerBenAction";

function EditOwner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.ownerReducers);
  const location = useLocation();
  const state = reduxState.sData;

  useEffect(() => {
    dispatch(fetchOwner(location.state));
  }, [location.state, dispatch]);

  // const formsData = [
  //   {
  //     fieldName: "First Name",
  //     fieldType: "text",
  //     fieldPlaceholder: "First Name",
  //     isRequired: true,
  //     defaultValue: state.first_name,
  //   },
  //   {
  //     fieldName: "Last Name",
  //     fieldType: "text",
  //     fieldPlaceholder: "Last Name",
  //     isRequired: true,
  //     defaultValue: state.last_name,
  //   },
  //   {
  //     fieldName: "Email",
  //     fieldType: "email",
  //     fieldPlaceholder: "example@gmail.com",
  //     isRequired: true,
  //     defaultValue: state.email,
  //   },
  //   {
  //     fieldName: "NID Number",
  //     fieldType: "number",
  //     fieldPlaceholder: "Your NID number here",
  //     isRequired: true,
  //     defaultValue: state.nid_number,
  //   },
  //   {
  //     fieldName: "Present Address",
  //     fieldType: "text",
  //     fieldPlaceholder: "Your address here",
  //     isRequired: true,
  //     defaultValue: state.present_address,
  //   },
  //   {
  //     fieldName: "Permanent Address",
  //     fieldType: "text",
  //     fieldPlaceholder: "Your address here",
  //     isRequired: true,
  //     defaultValue: state.permanent_address,
  //   },
  // ];



  const formsData = [
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
      fieldName: "Username",
      fieldType: "text",
      fieldPlaceholder: "Type your username",
      isRequired: true,
      defaultValue: state.username,
    },
    {
      fieldName: "password",
      fieldType: "password",
      fieldPlaceholder: "Type your password here",
      isRequired: true,
      defaultValue: state.password,
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
      fieldName: "Profile Picture",
      fieldType: "file",
      fieldPlaceholder: "Profile picture here",
      isRequired: true,
      defaultValue: state.profile_picture,
    },
    {
      fieldName: "Present Address",
      fieldType: "text",
      fieldPlaceholder: "Your address here",
      isRequired: true,
      defaultValue: state.present_address,
    },
    {
      fieldName: "Permanent Address",
      fieldType: "text",
      fieldPlaceholder: "Your address here",
      isRequired: true,
      defaultValue: state.permanent_address,
    },
  ]

  const submitFunction = (data) => {
    const profile_picture = data.profile_picture ? data.profile_picture : "";



    if (state) {
      console.log(data, "From update page");
      const updatedData = {
        id: state.id,
        status: data.status ? data.status : state.status,
        first_name: data.first_name ? data.first_name : state.first_name,
        last_name: data.last_name ? data.last_name : state.last_name,
        nid_number: data.nid_number ? data.nid_number : state.nid_number,
        present_address: data.present_address ? data.present_address : state.present_address,
        permanent_address: data.permanent_address ? data.permanent_address : state.permanent_address,
        phone_number: data.phone_number
          ? data.phone_number
          : state.phone_number,
        role: data.role ? data.role : state.role,
      };

      console.log(updatedData, "updatedData page");


           // Dispatch when profile_picture length is greater than 0
           if (profile_picture !== "") {
            dispatch(
              updateOwner({
                id: state.id,
                data: { ...updatedData, profile_picture: profile_picture },
              })
            );
          }

      dispatch(
        updateOwner({
          id: state.id,
          data: updatedData,
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
        navigate("/owner");
      }, 3000);
    }

    if (reduxState.isError) {
      // Perform actions after the update is successful
      toast.error(reduxState.massage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [reduxState.isUpdate, reduxState.isError, reduxState.massage, navigate]);

  // console.log(reduxState.isUpdate, "reduxState.isUpdate");

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
          formsData={formsData}
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
