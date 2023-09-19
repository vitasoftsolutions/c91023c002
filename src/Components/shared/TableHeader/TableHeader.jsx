import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaFileImport, FaFileExport } from "react-icons/fa";
import { BsFillCaretDownFill, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

function TableHeader({ title, redirectLink }) {
  return (
    <div className="">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <Link
            to={redirectLink}
            className="text-4xl p-1 text-erp_light rounded-full shadow-blue-400 shadow-md hover:shadow-none duration-300 bg-erp_primary"
          >
            <AiOutlinePlusCircle />
          </Link>
        </div>
        <div className="flex items-center gap-4 w-full">
          {/* // Search */}
          <div className="ml-4 w-full relative">
            <div className="flex">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white p-2 pl-6 pr-10 rounded-full border border-gray-300 focus:outline-none w-full"
              />
              <button
                onClick={() => {
                  // Handle the search button click here
                }}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              >
                <BsSearch />
              </button>
            </div>
          </div>

          {/*  */}
          <div className="bg-white rounded-lg shadow-md shadow-blue-200">
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="m-1 w-max cursor-pointer px-2 py-1 flex items-center gap-2"
              >
                Created Data <BsFillCaretDownFill />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content mt-2 z-[1] menu p-2 shadow bg-base-100 rounded-box w-max"
              >
                <li>
                  <button>Created Date</button>
                </li>
                <li>
                  <button>Sort By A to Z</button>
                </li>
              </ul>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 mt-3">
        <Breadcrumb />
        <div className="flex space-x-4">
          {/* Import Button */}
          <label
            htmlFor="csv-file"
            className="cursor-pointer bg-erp_primary shadow-lg shadow-blue-200 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center"
          >
            <FaFileImport className="mr-2" /> Import
          </label>
          <input
            id="csv-file"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              // Handle the selected CSV file here
              if (selectedFile) {
                // Perform the import logic here
              }
            }}
          />

          {/* Export Button */}
          <button
            className="bg-green-500 shadow-lg shadow-blue-200 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center"
            onClick={() => {
              // Perform the export logic here
            }}
          >
            <FaFileExport className="mr-2" /> Export
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableHeader;
