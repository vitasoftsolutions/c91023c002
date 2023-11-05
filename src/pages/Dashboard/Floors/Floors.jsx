import React from "react";

const floors = [
  { info: "in the name of pending", status: "pending" },
  { info: "in the name of sold", status: "sold" },
  { info: "in the name of pending", status: "pending" },
  { info: "in the name of sold", status: "sold" },
  { info: "in the name of under", status: "under" },
];

function Floors() {
  return (
    <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 rounded-lg md:p-4">
      <div className="w-full mx-auto p-4 grid grid-cols-4 gap-x-4 rounded-md bg-opacity-50 backdrop-blur-md bg-gray-200">
        {floors.map((dt) => {
          return (
            <div
              key={dt}
              className={`${
                dt.status === "pending"
                  ? "bg-blue-400"
                  : dt.status === "sold"
                  ? "bg-green-600"
                  : dt.status === "under"
                  ? "bg-red-400"
                  : ""
              }
            p-3 rounded-sm h-28 mb-4`}
            >
              {dt.info}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Floors;
