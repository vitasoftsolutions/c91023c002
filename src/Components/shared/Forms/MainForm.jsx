import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloudDownload } from "react-icons/ai";

const MainForm = ({
  formData,
  defaultValues,
  isState,
  submitFunction,
  isReset,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValues,
  });

  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file); // Store the selected file
    }
  };

  const onSubmit = (data) => {
    const submittedData = {
      file: selectedFile,
      ...data,
    };
    submitFunction(submittedData);
    isReset && reset();
  };

  // render Fields
  const renderField = (field) => {
    return (
      <div
        className={`mb-4${
          Array.isArray(field.fieldName) ? " col-span-3 md:col-span-1" : ""
        }`}
      >
        {Array.isArray(field.fieldName) ? (
          field.fieldName.map((subField, subIndex) => (
            <div key={subIndex}>
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
                defaultValue={isState && field.defaultValue}
                placeholder={field.fieldPlaceholder}
                className="w-full"
              />
              {errors[subField.toLowerCase().replace(/\s+/g, "_")] && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          ))
        ) : (
          <div>
            <label
              htmlFor={field.fieldName.toLowerCase().replace(/\s+/g, "_")}
              className="block text-black mb-1 font-bold"
            >
              {field.fieldName}
            </label>
            {field.fieldType === "select" ? (
              <select
                name={field.fieldName.toLowerCase().replace(/\s+/g, "_")}
                {...register(
                  field.fieldName.toLowerCase().replace(/\s+/g, "_"),
                  {
                    required: field.isRequired,
                  }
                )}
                defaultValue={isState && field.defaultValue}
                className="w-full border-red-600 rounded-md py-2 px-3 focus:outline-none"
              >
                <option value="" disabled>
                  Choose an option
                </option>
                {field.options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.fieldType === "number" ? (
              <input
                type="text"
                {...register(
                  field.fieldName.toLowerCase().replace(/\s+/g, "_"),
                  {
                    required: field.isRequired,
                  }
                )}
                placeholder={field.fieldPlaceholder}
                className="w-full border-red-600 rounded-md py-2 px-3 focus:outline-none"
                defaultValue={isState && field.defaultValue}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
            ) : field.fieldType === "file" ? (
              <label
                className="border-2 border-erp_primary border-dashed text-erp_dark text-center w-full rounded-sm py-[5px] px-2 inline-flex gap-1 justify-center items-center cursor-pointer"
                htmlFor="fileInput" // Add htmlFor attribute to link label and input
              >
                <span className="text-xl">
                  <AiOutlineCloudDownload />
                </span>
                <p className="font-semibold text-md">
                  {fileName ? fileName : "Drop files here or click to upload."}
                </p>
                {/* Use standard file input element */}
                <input
                  {...register("fileInput")}
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <input
                type={field.fieldType}
                {...register(
                  field.fieldName.toLowerCase().replace(/\s+/g, "_"),
                  {
                    required: !isState && field.isRequired,
                  }
                )}
                placeholder={field.fieldPlaceholder}
                className="w-full border-red-600 rounded-sm py-2 px-3 focus:outline-none"
                defaultValue={isState && field.defaultValue}
              />
            )}
            {errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")] && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        )}
      </div>
    );
  };

  console.log(isState, "from main form");
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto p-4 grid grid-cols-3 gap-x-4 rounded-md bg-opacity-50 backdrop-blur-md bg-gray-200"
      >
        {formData?.map((field, index) => (
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
