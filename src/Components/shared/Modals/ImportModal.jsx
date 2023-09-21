import { AiOutlineCloudDownload } from "react-icons/ai";

const ImportModal = ({ importModal, onClose }) => {
  if (!importModal) {
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 mt-8">
          <div className="md:col-span-3 col-span-1 min-h-[50vh]">
            <div className="my-3">
              <h3 className="text-2xl font-semibold text-center">
                Upload Files
              </h3>
              <p className="text-center font-italic text-erp_success">
                <i>CSVs only</i>
              </p>
            </div>
            {/* File 1 */}
            <div>
              <label className="border-2 border-erp_success border-dashed text-erp_dark text-center w-full py-5 px-4 inline-flex flex-col justify-center items-center cursor-pointer">
                <span className="text-3xl">
                  <AiOutlineCloudDownload />
                </span>
                <p className="font-bold">Drop files here or click to upload.</p>
                <input type="file" className="hidden" accept=".csv" />
              </label>
              <div className="flex gap-2 justify-center my-3">
                <button className="bg-[#5AC192] py-2 px-3 text-erp_light">
                  Merge and Upload as one file
                </button>
                <button className="bg-[#5AC192] py-2 px-3 text-erp_light">
                  Save each file separately
                </button>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 col-span-1 bg-gray-100 min-h-[50vh]"></div>
        </div>
        {/* End */}
        <div className="modal-action">
          <form method="dialog">
            <button
              className="px-6 py-2 bg-erp_primary text-erp_light rounded-sm"
              onClick={onClose}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ImportModal;
