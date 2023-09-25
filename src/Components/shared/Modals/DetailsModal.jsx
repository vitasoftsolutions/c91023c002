import { formatDate } from "../../../hooks/formatDate";


const DetailsModal = ({ selectedPhone, onClose }) => {
  // Check if selectedPhone is null (no loan selected) and return null if it is

  console.log(selectedPhone)
  if (!selectedPhone) {
    return null;
  }

  return (
    <dialog id="my_modal_1" className="modal bg-gray-800 bg-opacity-50" open>
      <div className="modal-box w-11/12 max-w-5xl rounded-none">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-6">
          <div className="md:col-span-3 col-span-1">
            
            <h2 className="text-center my-2 font-bold uppercase">
              {selectedPhone.name}
            </h2>
            {/*  */}
            {/* Details */}
            <div className="ml-16 mt-5 px-5 py-5 bg-gray-100">
              <h3 className="font-bold text-lg">Loan Details</h3>
              <p>
                <span className="font-bold">Name:</span>{" "}
                {selectedPhone.name}
              </p>
              <p>
                <span className="font-bold">Relation:</span> {selectedPhone.relation}
              </p>
              <p>
                <span className="font-bold">Date:</span>{" "}
                {formatDate(selectedPhone.created_at)}
              </p>
            </div>
            {/*  */}
          </div>
          {/* Grid 2 */}
          <div className="md:col-span-3 col-span-1">
            
          </div>
        </div>
        {/* End */}
        <div className="modal-action">
          <form method="dialog">
            <button className="px-6 py-2 bg-erp_primary text-erp_light rounded-sm" onClick={onClose}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DetailsModal;
