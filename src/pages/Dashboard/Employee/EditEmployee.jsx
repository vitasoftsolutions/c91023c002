import { BsArrowLeftShort } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import MainForm from "../../../Components/shared/Forms/MainForm";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { useDispatch } from "react-redux";
import { updateEmployee } from "../../../redux/Actions/employeeAction";

function EditEmployee() {
  const dispatch = useDispatch();
  let { state } = useLocation();

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
      fieldName: "Present Address",
      fieldType: "number",
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
      dispatch(updateEmployee(updatedData));
      // navigate("/phone");
    }
  };
  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/employee"}
            className="font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
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
    </>
  );
}

export default EditEmployee;
