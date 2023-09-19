import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  BsFillCalendarCheckFill,
  BsFillCaretDownFill,
  BsFilterCircle,
  BsSearch,
} from "react-icons/bs";
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
          <div className="ml-4 w-full relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white p-2 pl-6 pr-10 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 w-full"
            />
            <button className="absolute inset-y-0 right-0 flex items-center pr-3  text-erp_dark pointer-events-none">
              <BsSearch />
            </button>
          </div>

          {/*  */}
          <div className="bg-white rounded-lg shadow-md shadow-blue-200">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="m-1 w-max cursor-pointer px-2 py-1 flex items-center gap-2">
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

          {/* <div>
          <button className="flex flex-col justify-center items-center p-1 text-erp_dark bg-white rounded-md shadow-md shadow-blue-200 hover:shadow-none duration-300">
            <BsFilterCircle />
            <p className="w-12">A-Z</p>
          </button>
        </div>
        <div>
          <button className="flex flex-col justify-center items-center p-1 text-erp_dark bg-white rounded-md shadow-md shadow-blue-200 hover:shadow-none duration-300">
            <BsFillCalendarCheckFill />
            <p>Recent</p>
          </button>
        </div> */}
        </div>
      </div>
      <Breadcrumb />
    </div>
  );
}

export default TableHeader;
