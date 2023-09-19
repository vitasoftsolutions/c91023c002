import { formatDate } from "../../hooks/formatDate";

const LoanDetailModal = ({ selectedLoan, onClose }) => {
  // Check if selectedLoan is null (no loan selected) and return null if it is
  if (!selectedLoan) {
    return null;
  }

  return (
    <dialog id="my_modal_1" className="modal bg-gray-800 bg-opacity-50" open>
      <div className="modal-box">
        <div className="bg-gray-100 h-[10rem] w-[10rem] rounded-full overflow-hidden items-center flex justify-center mx-auto">
          <img
            className="object-cover"
            src={selectedLoan.profile_picture}
            alt={selectedLoan.first_name + " " + selectedLoan.last_name}
          />
        </div>
        <h2 className="text-center my-2 font-bold uppercase">
          {selectedLoan.first_name + " " + selectedLoan.last_name}
        </h2>
        <div className="divider"></div>

        {/* Loan Details */}
        <h3 className="font-bold text-lg">Loan Details</h3>
        <p>
          <span className="font-bold">Name:</span> {selectedLoan.first_name}{" "}
          {selectedLoan.last_name}
        </p>
        <p>
          <span className="font-bold">Email:</span> {selectedLoan.email}
        </p>
        <p>
          <span className="font-bold">Date:</span>{" "}
          {formatDate(selectedLoan.created_at)}
        </p>
        {/*  */}
        <div className="divider"></div>
        <h3 className="font-bold text-lg">Nid Photos</h3>
        <div className="flex justify-between overflow-hidden gap-3 h-[8rem] w-full">
          <div className="rounded-lg overflow-hidden bg-gray-100 w-full">
            <img
              className="h-full w-full object-cover"
              src={selectedLoan.nid_front}
              alt="Nid Front"
            />
          </div>
          <div className="rounded-lg overflow-hidden bg-gray-100 w-full">
            <img
              className="h-full w-full object-cover"
              src={selectedLoan.nid_back}
              alt="Nid Back"
            />
          </div>
        </div>

        {/* End */}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default LoanDetailModal;
