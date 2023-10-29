import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ToastContainer } from "react-toastify";

const BeneficiaryForm = ({
  formsData,
  defaultValues,
  submitFunction,
  isState,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phone_number",
  });

  const [filePreviews, setFilePreviews] = useState({});
  const [fileData, setFileData] = useState({});

  // console.log(fileData?.profile_picture?.name)

  useEffect(() => {
    // Retrieve file previews and data from local storage on component mount
    const storedFilePreviews =
      JSON.parse(localStorage.getItem("filePreviews")) || {};
    setFilePreviews(storedFilePreviews);

    const storedFileData = JSON.parse(localStorage.getItem("fileData")) || {};
    setFileData(storedFileData);
  }, []);

  const onSubmit = (data) => {
    const formDataWithFiles = { ...data, ...fileData };
    submitFunction(formDataWithFiles);
    // Clear files from local storage after submission
    localStorage.removeItem("filePreviews");
    localStorage.removeItem("fileData");
  };

  const handleFileChange = (fieldName, e) => {
    const file = e.target.files[0];
    console.log(file, "File changed");
    const newFilePreviews = {
      ...filePreviews,
      [fieldName]: URL.createObjectURL(file),
    };
    const newFileData = { ...fileData, [fieldName]: file };

    localStorage.setItem("filePreviews", JSON.stringify(newFilePreviews));
    localStorage.setItem("fileData", JSON.stringify(newFileData));

    setFilePreviews(newFilePreviews);
    setFileData(newFileData);
  };

  const removeFile = (fieldName) => {
    const newFilePreviews = { ...filePreviews };
    delete newFilePreviews[fieldName];

    const newFileData = { ...fileData };
    delete newFileData[fieldName];

    localStorage.setItem("filePreviews", JSON.stringify(newFilePreviews));
    localStorage.setItem("fileData", JSON.stringify(newFileData));

    setFilePreviews(newFilePreviews);
    setFileData(newFileData);
  };

  const renderField = (field, index) => (
    <div className="mb-4" key={index}>
      <label
        htmlFor={field.fieldName.toLowerCase().replace(/\s+/g, "_")}
        className="block text-black mb-1 font-bold"
      >
        {field.fieldName}
      </label>
      {field.fieldType === "file" ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            console.log(e.target, "Inside");
            e.preventDefault();
            e.stopPropagation();
            handleFileChange(
              field.fieldName.toLowerCase().replace(/\s+/g, "_"),
              e
            );

            const droppedFiles = e.dataTransfer.files;

            if (droppedFiles && droppedFiles.length > 0) {
              const file = droppedFiles[0];
              const reader = new FileReader();

              reader.onload = (event) => {
                const filePreview = event.target.result;

                // Display the dropped file preview
                setFilePreviews({
                  ...filePreviews,
                  [field.fieldName.toLowerCase().replace(/\s+/g, "_")]:
                    filePreview,
                });

                // Store the file preview in local storage
                const newFilePreviews = {
                  ...filePreviews,
                  [field.fieldName.toLowerCase().replace(/\s+/g, "_")]:
                    filePreview,
                };
                localStorage.setItem(
                  "filePreviews",
                  JSON.stringify(newFilePreviews)
                );
              };

              reader.readAsDataURL(file);
            }
          }}
        >
          <input
            type="file"
            onChange={(e) =>
              handleFileChange(
                field.fieldName.toLowerCase().replace(/\s+/g, "_"),
                e
              )
            }
            className="hidden"
            id={`fileInput_${index}`}
            name={field.fieldName.toLowerCase().replace(/\s+/g, "_")}
          />
          {filePreviews[field.fieldName.toLowerCase().replace(/\s+/g, "_")] && (
            <div className="relative bg-red-500 h-36 p-2">
              <img
                src={
                  filePreviews[
                    field.fieldName.toLowerCase().replace(/\s+/g, "_")
                  ]
                }
                alt="File Preview"
                className="w-16 h-16 object-contain"
              />
              <button
                className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center p-1 bg-red-500 text-white rounded-full"
                onClick={() =>
                  removeFile(field.fieldName.toLowerCase().replace(/\s+/g, "_"))
                }
              >
                X
              </button>
            </div>
          )}
          <label
            htmlFor={`fileInput_${index}`}
            className="border-2 border-erp_primary border-dashed text-erp_dark text-center w-full rounded-sm py-[5px] px-2 inline-flex gap-1 justify-center items-center cursor-pointer"
          >
            <span className="text-xl">
              <AiOutlineCloudUpload />
            </span>
            <p className="font-semibold text-md">
              {fileData?.profile_picture
                ? fileData.profile_picture.name
                : fileData?.nid_front
                ? fileData.nid_front.name
                : "Drop files here or click to upload."}
            </p>
          </label>
        </div>
      ) : (
        <input
          type={field.fieldType}
          {...register(field.fieldName.toLowerCase().replace(/\s+/g, "_"), {
            required: !isState && field.isRequired,
          })}
          placeholder={field.fieldPlaceholder}
          className="w-full border-red-600 rounded-sm py-2 px-3 focus:outline-none"
          defaultValue={isState && field.defaultValue}
        />
      )}
    </div>
  );

  if (fields.length === 0) {
    append({ phone_number: "", name: "", relation: "" });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto p-4 grid grid-cols-3 gap-x-4 rounded-md bg-opacity-50 backdrop-blur-md bg-gray-200"
      >
        {formsData?.map((field, index) => renderField(field, index))}

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

        <h5 className="text-black col-span-3 font-extrabold text-start">
          Add Phone Numbers
        </h5>

        {/* Mobile Numbers */}
        <div className="mb-4 col-span-3">
          {errors.phone_number && (
            <span className="text-red-500">
              At least one phone number is required
            </span>
          )}
          <div className="">
            {fields.map((field, index) => (
              <div key={field.id} className="w-full grid grid-cols-3 gap-2">
                <div className="col-span-3 md:col-span-1">
                  <label
                    htmlFor={`phone_number[${index}].number`}
                    className="block text-black mb-1 font-bold"
                  >
                    Number
                  </label>
                  <input
                    type={"number"}
                    {...register(`phone_number[${index}].number`, {
                      required: false,
                    })}
                    defaultValue={isState && field.defaultValue}
                    placeholder="Phone Number"
                    className="w-full rounded-md py-2 px-3 focus:outline-none"
                  />
                  <div className="mb-4 col-span-3">
                    {errors.phone_number && (
                      <span className="text-red-500">Add a mobile number</span>
                    )}
                  </div>
                </div>

                <div className="col-span-3 md:col-span-1">
                  <label
                    htmlFor={`phone_number[${index}].name`}
                    className="block text-black mb-1 font-bold"
                  >
                    Name
                  </label>
                  <input
                    {...register(`phone_number[${index}].name`, {
                      required: false,
                    })}
                    placeholder="Name"
                    className="w-full rounded-md py-2 px-3 focus:outline-none"
                  />
                  <div className="mb-4 col-span-3">
                    {errors.phone_number && (
                      <span className="text-red-500">Add Name</span>
                    )}
                  </div>
                </div>

                <div className="col-span-3 md:col-span-1">
                  <label
                    htmlFor={`phone_number[${index}].relation`}
                    className="block text-black mb-1 font-bold"
                  >
                    Relation
                  </label>
                  <div className="md:flex border-b-2 border-gray-400 pb-5 md:pb-0 md:border-none items-center">
                    <input
                      {...register(`phone_number[${index}].relation`, {
                        required: false,
                      })}
                      placeholder="Relation"
                      className="w-full rounded-md py-2 px-3 focus:outline-none"
                    />
                    {index > 0 && (
                      <div className="md:ml-3 text-center md:mt-0 mt-3">
                        <button
                          className="bg-red-500 text-white p-2 rounded-md"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-x"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="mb-4 col-span-3">
                    {errors.phone_number && (
                      <span className="text-red-500">Add Relation</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => append({ number: "", name: "", relation: "" })}
              className="mt-2 btn mx-auto"
            >
              Add Number +
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-4 col-span-3">
          <input
            type="submit"
            value="Submit"
            className="btn bg-erp_primary text-md text-white hover-bg-primary w-full"
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

export default BeneficiaryForm;
