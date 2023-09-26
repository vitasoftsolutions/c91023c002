import { useEffect } from "react";
import { GoTasklist } from "react-icons/go";
import { FaFileImport, FaFileExport } from "react-icons/fa";
import { BsFillCaretDownFill, BsSearch } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { AiOutlinePlus } from "react-icons/ai";
import ImportModal from "../Modals/ImportModal";
import { useState } from "react";
import { base_url } from "../Url";
import { useForm } from "react-hook-form";

// redux
import { useDispatch } from "react-redux";
import {
  fetchLoanBeneList,
  searchLoanBeneficiaries,
  sortByAZLoanBen,
  sortByDateLoanBen,
} from "../../../redux/Actions/loanBenAction";

function TableHeader({ title, redirectLink, url_endpoint }) {
  const { pathname } = useLocation();
  //
  const { handleSubmit, register } = useForm();
  //
  const [importModal, setImportModal] = useState(null);
  const [csvData, setCsvData] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortButtonText, setSortButtonText] = useState("Sort By A to Z");

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(pathname, "path");

    if (data.text === "") {
      // If the search field is empty, fetch all data
      dispatch(fetchLoanBeneList(1)); // You may need to adjust the page parameter
    }
    if (pathname === "/beneficiarylist") {
      console.log(data.text, "data.text");

      dispatch(searchLoanBeneficiaries(data.text));
    }
  };

  // submitDate
  const handleDateChange = (event) => {
    const { value } = event.target;
    if (!value) {
      dispatch(fetchLoanBeneList(1));
    } else {
      dispatch(sortByDateLoanBen(value));
    }
  };

  // handleAtoZClick
  const handleAtoZClick = () => {
    // Toggle the sorting order
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    // Toggle the button text
    const newText =
      newSortOrder === "asc" ? "Sort By A to Z" : "Sort By Z to A";
    setSortButtonText(newText);

    // You can now use the `newSortOrder` value in your sorting logic
    console.log("Sort Order:", newSortOrder);
    dispatch(sortByAZLoanBen(sortOrder));
  };

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("jwt_token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(`${base_url}${url_endpoint}`, { headers });
      const data = await response.text();
      setCsvData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const downloadCsv = () => {
    fetchData();
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <Link
            to={redirectLink}
            className="text-2xl font-bold p-1 text-erp_light rounded-full shadow-blue-200 shadow-md hover:shadow-none hover:bg-erp_blue duration-300 bg-erp_primary"
          >
            <AiOutlinePlus />
          </Link>
        </div>
        <div className="flex items-center ml-5 gap-2 w-full">
          {/*  */}
          <div className="bg-white shadow-md shadow-blue-200">
            <div className="dropdown dropdown-start">
              <label
                tabIndex={0}
                className="m-1 w-max cursor-pointer px-2 py-1 flex items-center gap-2"
              >
                <GoTasklist /> Created Data <BsFillCaretDownFill />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content rounded-none z-[1] menu p-2 shadow bg-base-100 w-max"
              >
                <li className="rounded-none">
                  <input
                    onChange={handleDateChange}
                    type="date"
                    className="cursor-pointer border-none outline-none bg-transparent"
                    placeholder="Select date"
                  />
                </li>
                <li className="rounded-none">
                  <button onClick={handleAtoZClick} className="rounded-none">
                    {sortButtonText}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/*  */}
          {/* // Search */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="ml-4 w-full relative"
          >
            {/* <div className="ml-4 w-full relative"> */}
            <div className="flex">
              <input
                {...register("text")}
                placeholder="Search..."
                className="bg-white p-2 pl-6 pr-10 rounded-full border border-gray-300 focus:outline-none w-full"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              >
                <BsSearch />
              </button>
            </div>
            {/* </div> */}
          </form>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 mt-3">
        <Breadcrumb />
        <div className="flex space-x-4">
          {/* Import Button */}
          <button
            onClick={() => setImportModal("loan")}
            className="cursor-pointer bg-erp_primary shadow-lg shadow-blue-200 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center"
          >
            <FaFileImport className="mr-2" /> Import
          </button>
          {/* Export Button */}
          <button
            className="bg-green-500 shadow-lg shadow-blue-200 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center"
            onClick={downloadCsv}
          >
            <FaFileExport className="mr-2" /> Export
          </button>
        </div>
        <ImportModal
          importModal={importModal}
          onClose={() => setImportModal(null)}
        />
      </div>
    </div>
  );
}

export default TableHeader;
