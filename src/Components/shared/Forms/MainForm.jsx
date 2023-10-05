import { useForm } from "react-hook-form";

const MainForm = ({ formData, defaultValues, isState, submitFunction }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = (data) => {
    submitFunction(data);
    reset();
  };

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
          {errors[subField.toLowerCase().replace(/\s+/g, "_")] || (
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
                required: !isState && field.isRequired,
              })}
              placeholder={field.fieldPlaceholder}
              className={`${
                field.fieldType === "file"
                  ? "w-full file-input rounded-sm file-input-bordered file-input-primary file-input-sm"
                  : "w-full border-red-600 rounded-sm py-2 px-3 focus:outline-none"
              }`}
              defaultValue={
                isState && defaultValues[field?.fieldName?.toLowerCase()]
              }
            />
          )}
          {errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")] && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
      );
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto p-4 grid grid-cols-3 gap-x-4 rounded-md bg-opacity-50 backdrop-blur-md bg-gray-200"
      >
        {formData.map((field, index) => (
          <div className={"col-span-3 md:col-span-1"} key={index}>
            {renderField(field)}
          </div>
        ))}

        {/* Status */}
        {isState && (
          <div className="col-span-3 md:col-span-1 mb-4">
            <label
              htmlFor="statusInput"
              className="block text-black mb-1 font-bold"
            >
              Status
            </label>
            <select
              id="statusInput"
              name="status"
              {...register("status")}
              defaultValue={isState?.status ? "true" : "false"}
              className="w-full border-red-600 rounded-md py-2 px-3 focus:outline-none"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        )}

        {/* Submit Button */}
        <div className="mb-4 col-span-3">
          <input
            type="submit"
            value="Submit"
            className="btn rounded-md bg-erp_primary text-md text-white hover:bg-primary w-full"
          />
        </div>
      </form>
    </>
  );
};

export default MainForm;