import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateLoanBeneficiary } from "../../redux/slices/updateLoanBeneficiarySlice";
import { fetchLoanBeneList } from "../../redux/slices/loanBenListSlice";


const EditLoanSidebar = ({ editLoan, onClose }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: editLoan });

  const onSubmit = (data) => {
    try {
      // Create a new object with all the fields, including unchanged ones
      const updatedData = {
        ...editLoan, // Include the existing data
        ...(data
          ? Object.fromEntries(
              Object.keys(data).map((key) => [key, data[key] || editLoan[key]])
            )
          : {}), // Include the updated data or default values if not changed
      };

      // Dispatch the update action
      dispatch(
        updateLoanBeneficiary({
          id: editLoan.id,
          data: updatedData,
        })
      );
      // Handle success or update your UI as needed
      console.log("Update successful");
      // Trigger the fetchLoanBeneList action to refresh the data
      dispatch(fetchLoanBeneList(state.loanBeneList.currentPage));

      // Close the sidebar after submission
      onClose(); 

    } catch (error) {
      // Handle errors here (e.g., show an error message)
      console.error("Update failed", error);
    }
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="menu p-4 w-60 md:w-80 min-h-full bg-base-200 text-base-content">
          <h2 className="text-xl font-bold border-b-2 pb-2">
            Edit Loan Beneficiary
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full mx-auto p-4 grid grid-cols-2 gap-4 rounded-md bg-opacity-50 backdrop-blur-md"
          >
            <div className="mb-4 col-span-2">
              <label
                htmlFor="firstNameInput"
                className="block text-black mb-1 font-bold"
              >
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                id="firstNameInput"
                {...register("first_name")}
                defaultValue={editLoan?.first_name}
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div className="mb-4 col-span-2">
              <label
                htmlFor="lastNameInput"
                className="block text-black mb-1 font-bold"
              >
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                id="lastNameInput"
                {...register("last_name")}
                defaultValue={editLoan?.last_name}
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div className="mb-4 col-span-2">
              <label
                htmlFor="email"
                className="block text-black mb-1 font-bold"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                {...register("email")}
                defaultValue={editLoan?.email}
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div className="mb-4 col-span-2">
              <label
                htmlFor="nidNumber"
                className="block text-black mb-1 font-bold"
              >
                NID Number
              </label>
              <input
                type="text"
                name="nid_number"
                id="nidNumber"
                {...register("nid_number")}
                defaultValue={editLoan?.nid_number}
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div className="mb-4 col-span-2">
              <label
                htmlFor="permanentAddress"
                className="block text-black mb-1 font-bold"
              >
                Permanent Address
              </label>
              <input
                type="text"
                name="permanent_address"
                id="permanentAddress"
                {...register("permanent_address")}
                defaultValue={editLoan?.permanent_address}
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div className="mb-4 col-span-2">
              <label
                htmlFor="presentAddress"
                className="block text-black mb-1 font-bold"
              >
                Present Address
              </label>
              <input
                type="text"
                name="present_address"
                id="presentAddress"
                {...register("present_address")}
                defaultValue={editLoan?.present_address}
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div className="mb-4 col-span-2">
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
                defaultValue={editLoan?.status ? "true" : "false"}
                className="input input-bordered input-accent w-full"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <div className="mb-4 col-span-2">
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary w-full"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditLoanSidebar;
