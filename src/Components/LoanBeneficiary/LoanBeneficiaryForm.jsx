import { useForm, useFieldArray } from "react-hook-form";

const formData = [
  {
    fieldName: "First Name",
    fieldType: "text",
    fieldPlaceholder: "First Name",
    isRequired: true,
  },
  {
    fieldName: "Last Name",
    fieldType: "text",
    fieldPlaceholder: "Last Name",
    isRequired: true,
  },
  {
    fieldName: "E-mail",
    fieldType: "email",
    fieldPlaceholder: "example@gmail.com",
    isRequired: true,
  },
  {
    fieldName: "Nid Number",
    fieldType: "number",
    fieldPlaceholder: "Nid Number",
    isRequired: true,
  },
  {
    fieldName: "Present Address",
    fieldType: "text",
    fieldPlaceholder: "Present Address (Comma Separated)",
    isRequired: true,
  },
  {
    fieldName: "Permanent Address",
    fieldType: "text",
    fieldPlaceholder: "Permanent Address (Comma Separated)",
    isRequired: true,
  },
  {
    fieldName: "Nid Front Side",
    fieldType: "file",
    fieldPlaceholder: "Upload Image",
    isRequired: true,
  },
  {
    fieldName: "Nid Back Side",
    fieldType: "file",
    fieldPlaceholder: "Upload Image",
    isRequired: true,
  },
  {
    fieldName: [],
  },
];

const LoanBeneficiaryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phoneNumbers",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const renderField = (field) => {
    if (Array.isArray(field.fieldName)) {
      return field.fieldName.map((subField, subIndex) => (
        <div className="mb-4" key={subIndex}>
          <label
            htmlFor={subField.inputPhone.toLowerCase().replace(/\s+/g, "-")}
            className="block text-black mb-1 font-bold"
          >
            {subField.inputPhone}
          </label>
          <input
            type={subField.fieldType}
            {...register(
              subField.inputPhone.toLowerCase().replace(/\s+/g, "-"),
              {
                required: subField.isRequired,
              }
            )}
            placeholder={subField.fieldPlaceholder}
            className="input input-bordered input-accent w-full"
          />
          {errors[subField.inputPhone.toLowerCase().replace(/\s+/g, "-")] && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
      ));
    } else {
      return (
        <div className="mb-4">
          <label
            htmlFor={field.fieldName.toLowerCase().replace(/\s+/g, "-")}
            className="block text-black mb-1 font-bold"
          >
            {field.fieldName}
          </label>
          {field.fieldType === "number" ? (
            <input
              type="text"
              {...register(field.fieldName.toLowerCase().replace(/\s+/g, "-"), {
                required: field.isRequired,
              })}
              placeholder={field.fieldPlaceholder}
              className="input input-bordered input-accent w-full"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
            />
          ) : (
            <input
              type={field.fieldType}
              {...register(field.fieldName.toLowerCase().replace(/\s+/g, "-"), {
                required: field.isRequired,
              })}
              placeholder={field.fieldPlaceholder}
              className={`${
                field.fieldType === "file"
                  ? "file-input file-input-bordered file-input-accent w-full"
                  : "input input-bordered input-accent w-full"
              }`}
            />
          )}
          {errors[field.fieldName.toLowerCase().replace(/\s+/g, "-")] && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
      );
    }
  };

  // Add default phone number input set
  if (fields.length === 0) {
    append({ phoneNumber: "", name: "", relation: "" });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:w-4/5 mx-auto p-4 grid grid-cols-2 gap-4 rounded-md bg-opacity-50 backdrop-blur-md"
    >
      {formData.map((field, index) => (
        <div className="col-span-2 md:col-span-1" key={index}>
          {renderField(field)}
        </div>
      ))}

      <h5 className="text-black col-span-2 mb-1 font-extrabold text-start">
        Add Phone Numbers
      </h5>

      {/* Mobile Numbers */}
      <div className="mb-4 col-span-2">
        {errors.phoneNumbers && (
          <span className="text-red-500">
            At least one phone number is required
          </span>
        )}
        <div className="">
          {fields.map((field, index) => (
            <div key={field.id} className="w-full grid grid-cols-3 gap-2">
              <div className="col-span-3 md:col-span-1">
                <label
                  htmlFor="phoneNumbers"
                  className="block text-black mb-1 font-bold"
                >
                  Number
                </label>
                <input
                  {...register(`phoneNumbers[${index}].phoneNumber`, {
                    required: true,
                  })}
                  placeholder="Phone Number"
                  className="input input-bordered input-accent w-full"
                />
                <div className="mb-4 col-span-2">
                  {errors.phoneNumbers && (
                    <span className="text-red-500">Add a mobile number</span>
                  )}
                </div>
              </div>

              <div className="col-span-3 md:col-span-1">
                <label
                  htmlFor="phoneNumbers"
                  className="block text-black mb-1 font-bold"
                >
                  Name
                </label>
                <input
                  {...register(`phoneNumbers[${index}].name`, {
                    required: true,
                  })}
                  placeholder="Name"
                  className="input input-bordered input-accent w-full"
                />
                <div className="mb-4 col-span-2">
                  {errors.phoneNumbers && (
                    <span className="text-red-500">Add Name</span>
                  )}
                </div>
              </div>

              <div className="col-span-3 md:col-span-1">
                <label
                  htmlFor="phoneNumbers"
                  className="block text-black mb-1 font-bold"
                >
                  Relation
                </label>
                <div className="md:flex border-b-2 border-gray-400 pb-5 md:pb-0 md:border-none items-center">
                  <input
                    {...register(`phoneNumbers[${index}].relation`, {
                      required: true,
                    })}
                    placeholder="Relation"
                    className="input input-bordered input-accent w-full md:w-[80%]"
                  />
                  {index > 0 && (
                    <div className="md:ml-3 text-center md:mt-0 mt-3">
                      <button
                        className=" bg-red-500 text-white p-2 rounded-md"
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
                          class="feather feather-x"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                <div className="mb-4 col-span-2">
                  {errors.phoneNumbers && (
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
            onClick={() => append({ phoneNumber: "", name: "", relation: "" })}
            className="mt-2 btn mx-auto"
          >
            Add Number +
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mb-4 col-span-2">
        <input
          type="submit"
          value="Submit"
          className="btn btn-primary w-full"
        />
      </div>
    </form>
  );
};

export default LoanBeneficiaryForm;
