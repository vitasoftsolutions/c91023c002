import React from "react";
import { Link } from "react-router-dom";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";

const floors = [
  {
    info: {
      name: "pending",
      height: 10,
      width: 20,
    },
    status: "pending",
  },
  {
    info: {
      name: "sold",
      height: 10,
      width: 20,
    },
    status: "sold",
  },
  {
    info: {
      name: "pending",
      height: 10,
      width: 20,
    },
    status: "pending",
  },
  {
    info: {
      name: "sold",
      height: 10,
      width: 20,
    },
    status: "sold",
  },
  {
    info: {
      name: "construction",
      height: 10,
      width: 20,
    },
    status: "construction",
  },
];

function Floors() {
  return (
    <>
      <TableHeader
        title={"Floors"}
        redirectLink={"/floors/floors-crete"}
        url_endpoint={"/export-csv/?model=LoanBeneficaries&app_label=loan"}
      />
      <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 mt-5 rounded-lg md:p-4">
        <div className="w-full mx-auto p-4 grid grid-cols-4 gap-x-4 rounded-md bg-opacity-50 backdrop-blur-md bg-gray-200">
          {floors.map((dt, index) => {
            const floorId = index + 1;
            return (
              <Link
                key={dt}
                to={`/floors/${floorId}`}
                state={dt}
                className={`${
                  dt.status === "pending"
                    ? "bg-blue-400"
                    : dt.status === "sold"
                    ? "bg-green-600"
                    : dt.status === "construction"
                    ? "bg-red-400"
                    : ""
                }
            p-3 rounded-sm h-28 mb-4 flex justify-center items-center capitalize shadow-xl border-2 border-gray-300`}
              >
                {dt.info.name}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Floors;
