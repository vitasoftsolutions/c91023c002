import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { createLoanBeneficiary } from "../../redux/slices/createLoanBeneficiarySlice";
import Loader from "../shared/Loader/Loader";
import { toast, ToastContainer } from "react-toastify";

const formData = [
  {
    fieldName: "Name",
    fieldType: "text",
    fieldPlaceholder: "Name",
    isRequired: true,
  },
  {
    fieldName: "Relation",
    fieldType: "text",
    fieldPlaceholder: "Relation",
    isRequired: true,
  },
  {
    fieldName: "Phone Number",
    fieldType: "number",
    fieldPlaceholder: "Phone number",
    isRequired: true,
  },
];

const CreatePhoneForm = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.createLoanBeneficiary);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // const profile_picture = data.profile_picture[0];
    // const nid_front = data.nid_front[0];
    // const nid_back = data.nid_back[0];

    // const submitData = { ...data, profile_picture, nid_front, nid_back };
    // console.log(submitData);
    // dispatch(createLoanBeneficiary(submitData));
    // reset();
  };

  const isLoading = state.isLoading;

  if (state.data?.message.length > 0) {
    toast(state.data?.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  if (state.isError) {
    toast.error(state.isError, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const renderField = (field) => {
    if (Array.isArray(field.fieldName)) {
      return field.fieldName.map((subField, subIndex) => (
        <div className="mb-4" key={subIndex}>
          <label
            htmlFor={subField.toLowerCase().replace(/\s+/g, "_")}
            className="block text-black mb-1 font-bold"
          >
            {subField}
          </label>
          <input
            type={field.fieldType}
            {...register(subField.toLowerCase().replace(/\s+/g, "_"), {
              required: subField.isRequired,
            })}
            placeholder={field.fieldPlaceholder}
            className="w-full"
          />
          {errors[subField.toLowerCase().replace(/\s+/g, "_")] && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
      ));
    } else {
      return (
        <div className="mb-4">
          <label
            htmlFor={field.fieldName.toLowerCase().replace(/\s+/g, "_")}
            className="block text-black mb-1 font-bold"
          >
            {field.fieldName}
          </label>
          {field.fieldType === "number" ? (
            <input
              type="text"
              {...register(field.fieldName.toLowerCase().replace(/\s+/g, "_"), {
                required: field.isRequired,
              })}
              placeholder={field.fieldPlaceholder}
              className="w-full border-red-600 rounded-md py-2 px-3 focus:outline-none"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
            />
          ) : (
            <input
              type={field.fieldType}
              {...register(field.fieldName.toLowerCase().replace(/\s+/g, "_"), {
                required: field.isRequired,
              })}
              placeholder={field.fieldPlaceholder}
              className={`${
                field.fieldType === "file"
                  ? "w-full file-input rounded-sm file-input-bordered file-input-primary file-input-sm"
                  : "w-full border-red-600 rounded-sm py-2 px-3 focus:outline-none"
              }`}
            />
          )}
          {errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")] && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
      );
    }
  };


  return isLoading ? (
    <Loader text={"Creating please wait..."} />
  ) : (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="w-full mx-auto p-4 grid grid-cols-3 gap-x-4 rounded-md bg-opacity-50 backdrop-blur-md bg-gray-200"
      >
        {formData.map((field, index) => (
          <div className={"col-span-3 md:col-span-1"} key={index}>
            {renderField(field)}
          </div>
        ))}
        

        {/* Submit Button */}
        <div className="mb-4 col-span-3">
          <input
            type="submit"
            value="Submit"
            className="btn bg-erp_primary text-md text-white hover:bg-primary w-full"
          />
        </div>
      </form>

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
};

export default CreatePhoneForm;
