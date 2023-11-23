import { useEffect, useState } from "react";
import {
  FaHandHoldingUsd,
  FaMobileAlt,
  FaRegCreditCard,
  FaRegListAlt,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GiProgression } from "react-icons/gi";
import { GrUserAdmin, GrUserManager, GrUserWorker } from "react-icons/gr";
import {
  MdInstallMobile,
  MdOutlineAddBusiness,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { TbFileSettings } from "react-icons/tb";
import {
  BsCalculator,
  BsCalendar2Check,
  BsFillPersonPlusFill,
} from "react-icons/bs";
import { GoPasskeyFill } from "react-icons/go";
import { SiFlatpak } from "react-icons/si";
import { Link } from "react-router-dom";

const Menus = [
    // Accounts
    {
      title: "Accounts",
      icons: <FaHandHoldingUsd />,
      subMenus: [
        {
          title: "Expenses",
          icons: <TbFileSettings />,
          to: "/expense",
        },
        {
          title: "Incomes",
          icons: <FaMoneyCheckDollar />,
          to: "/income",
        },
      ],
    },
    // Contractors
    {
      title: "Contractors",
      icons: <MdOutlineManageAccounts />,
      subMenus: [
        {
          title: "Beneficiaries",
          icons: <FaRegListAlt />,
          to: "/contractor-beneficaries",
        },
        {
          title: "Assign Contractor",
          icons: <BsFillPersonPlusFill />,
          to: "/contractor-assign",
        },
        {
          title: "Contractor Payment",
          icons: <BsFillPersonPlusFill />,
          to: "/contractor-payment",
        },
        {
          title: "Contractor Guarantors",
          icons: <BsFillPersonPlusFill />,
          to: "/contractor-guarantor",
        },
      ],
    },
    // Customer
    {
      title: "Customers",
      icons: <GrUserManager />,
      subMenus: [
        {
          title: "Customer Ben",
          icons: <GrUserManager />,
          to: "/customer-beneficiaries",
        },
      ],
    },
    // Phone number
    {
      title: "Phone",
      icons: <FaMobileAlt />,
      subMenus: [
        {
          title: "Phone",
          icons: <MdInstallMobile />,
          to: "/phone",
        },
      ],
    },
    // HRM
    {
      title: "Hrm",
      icons: <FaHandHoldingUsd />,
      subMenus: [
        {
          title: "Attendance",
          icons: <BsCalendar2Check />,
          to: "/attendance",
        },
        {
          title: "Leaves",
          icons: <FaMoneyCheckDollar />,
          to: "/leaves",
        },
        {
          title: "Salaries",
          icons: <FaMoneyCheckDollar />,
          to: "/salary",
        },
      ],
    },
    // Loan
    {
      title: "Loan",
      icons: <FaHandHoldingUsd />,
      subMenus: [
        {
          title: "Beneficiary",
          icons: <FaRegListAlt />,
          to: "/beneficiarylist",
        },
        {
          title: "Loan Installment",
          icons: <FaMoneyCheckDollar />,
          to: "/loan-installment",
        },
        {
          title: "Loan logs",
          icons: <FaMoneyCheckDollar />,
          to: "/loan-logs",
        },
        {
          title: "Loan Transactions",
          icons: <FaMoneyCheckDollar />,
          to: "/loan-transactions",
        },
      ],
    },
    // Owner
    {
      title: "Owner",
      icons: <GrUserAdmin />,
      subMenus: [
        {
          title: "Owner",
          icons: <GrUserAdmin />,
          to: "/owner",
        },
      ],
    },
    // Business Profile
    {
      title: "Business Profile",
      icons: <MdOutlineAddBusiness />,
      subMenus: [
        {
          title: "Business Profile",
          icons: <MdOutlineAddBusiness />,
          to: "/business-profile",
        },
      ],
    },
    // Projects
    {
      title: "Projects",
      icons: <SiFlatpak />,
      subMenus: [
        {
          title: "Projects",
          icons: <SiFlatpak />,
          to: "/projects",
        },
        {
          title: "Project Progress",
          icons: <FaMoneyCheckDollar />,
          to: "/project-progress",
        },
        {
          title: "Work Progress",
          icons: <GiProgression />,
          to: "/work-progress",
        },
        {
          title: "Floors",
          icons: <GiProgression />,
          to: "/floors",
        },
        {
          title: "Property",
          icons: <FaMoneyCheckDollar />,
          to: "/property",
        },
        {
          title: "Property purchase",
          icons: <FaMoneyCheckDollar />,
          to: "/property-purchase",
        },
        {
          title: "Property Installment",
          icons: <FaMoneyCheckDollar />,
          to: "/Property-installment",
        },
        {
          title: "Expense by property",
          icons: <FaMoneyCheckDollar />,
          to: "/expense-by-property",
        },
      ],
    },
    // Suppliers
    {
      title: "Suppliers",
      icons: <FaMoneyCheckDollar />,
      subMenus: [
        {
          title: "Beneficiaries",
          icons: <FaMoneyCheckDollar />,
          to: "/suppliers-beneficaries",
        },
        {
          title: "Materials Dispatch from project",
          icons: <FaMoneyCheckDollar />,
          to: "/materials_dispatch_from_project",
        },
        {
          title: "Brands",
          icons: <MdOutlineAddBusiness />,
          to: "/brands",
        },
      ],
    },
    // Employee
    {
      title: "Employee",
      icons: <GrUserWorker />,
      subMenus: [
        {
          title: "Employee",
          icons: <GrUserWorker />,
          to: "/employee",
        },
      ],
    },
    // Roles
    {
      title: "Roles",
      icons: <FaMoneyCheckDollar />,
      subMenus: [
        {
          title: "Roles",
          icons: <FaMoneyCheckDollar />,
          to: "/roles",
        },
      ],
    },
    // Warehouse
    {
      title: "Warehouse",
      icons: <TbFileSettings />,
      subMenus: [
        {
          title: "Warehouse Items",
          icons: <FaMoneyCheckDollar />,
          to: "/warehouse-items",
        },
        {
          title: "Material Payment installment",
          icons: <TbFileSettings />,
          to: "/material-payment-installment ",
        },
        {
          title: "Material Purchase",
          icons: <TbFileSettings />,
          to: "/material-purchase",
        },
        {
          title: "Material Dispatch",
          icons: <TbFileSettings />,
          to: "/material-dispatch",
        },
        {
          title: "Material Receive Installment",
          icons: <TbFileSettings />,
          to: "/material-recive-installment",
        },
      ],
    },
    // Inventory
    {
      title: "Inventory",
      icons: <TbFileSettings />,
      subMenus: [
        {
          title: "Material Dispatch",
          icons: <FaMoneyCheckDollar />,
          to: "/material-dispatch",
        },
        {
          title: "Product Inventory",
          icons: <TbFileSettings />,
          to: "/product-inventory",
        },
      ],
    },
    // Renter
    {
      title: "Renter",
      icons: <FaMoneyCheckDollar />,
      subMenus: [
        {
          title: "Renter Beneficiaries",
          icons: <FaMoneyCheckDollar />,
          to: "/renter-beneficiaries",
        },
        {
          title: "Flat Rent",
          icons: <GoPasskeyFill />,
          to: "/flat-rent",
        },
        {
          title: "Rent collections",
          icons: <FaMoneyCheckDollar />,
          to: "/rent-collections",
        },
        {
          title: "Repair Records",
          icons: <FaMoneyCheckDollar />,
          to: "/repear-records",
        },
      ],
    },
    // Utilities
    {
      title: "Utilities",
      icons: <FiSettings />,
      subMenus: [
        {
          title: "App Label",
          icons: <FiSettings />,
          to: "/app-label",
        },
        {
          title: "Types",
          icons: <FaMoneyCheckDollar />,
          to: "/types",
        },
      ],
    },
//   {
//     title: "Loan",
//     icons: <FaHandHoldingUsd />,
//     subMenus: [
//       {
//         title: "Beneficiary",
//         icons: <FaRegListAlt />,
//         to: "/beneficiarylist",
//       },
//     ],
//   },
//   {
//     title: "Phone",
//     icons: <FaMobileAlt />,
//     subMenus: [
//       {
//         title: "Incomes",
//         icons: <FaMoneyCheckDollar />,
//         to: "/incomes",
//       },
//     ],
//   },
//   {
//     title: "Employee",
//     icons: <GrUserWorker />,
//     subMenus: [
//       {
//         title: "Employee",
//         icons: <GrUserWorker />,
//         to: "/employee",
//       },
//     ],
//   },
//   {
//     title: "Owner",
//     icons: <GrUserAdmin />,
//     subMenus: [
//       {
//         title: "Assign Contractor",
//         icons: <BsFillPersonPlusFill />,
//         to: "/contractor-assign",
//       },
//     ],
//   },
//   {
//     title: "Attendance",
//     icons: <BsCalendar2Check />,
//     subMenus: [
//       {
//         title: "Attendance",
//         icons: <BsCalendar2Check />,
//         to: "/attendance",
//       },
//     ],
//   },
//   {
//     title: "Projects",
//     icons: <SiFlatpak />,
//     subMenus: [
//       {
//         title: "Contractor Guarantors",
//         icons: <BsFillPersonPlusFill />,
//         to: "/contractor-guarantor",
//       },
//     ],
//   },
//   {
//     title: "Business Profile",
//     icons: <MdOutlineAddBusiness />,
//     subMenus: [
//       {
//         title: "Business Profile",
//         icons: <MdOutlineAddBusiness />,
//         to: "/business-profile",
//       },
//     ],
//   },
//   // Brands
//   {
//     title: "Brands",
//     icons: <MdOutlineAddBusiness />,
//     subMenus: [
//       {
//         title: "Brands",
//         icons: <MdOutlineAddBusiness />,
//         to: "/brands",
//       },
//     ],
//   },
//   // Salaries
//   {
//     title: "Salaries",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Salaries",
//         icons: <FaMoneyCheckDollar />,
//         to: "/salary",
//       },
//     ],
//   },
//   // Customer Beneficiaries
//   {
//     title: "Customer Ben",
//     icons: <GrUserManager />,
//     subMenus: [
//       {
//         title: "Roles",
//         icons: <FaMoneyCheckDollar />,
//         to: "/roles",
//       },
//     ],
//   },
//   // Expenses
//   {
//     title: "Expenses",
//     icons: <TbFileSettings />,
//     subMenus: [
//       {
//         title: "Expenses",
//         icons: <TbFileSettings />,
//         to: "/expenses",
//       },
//     ],
//   },
//   // Flat Installment
//   {
//     title: "Flat Installment",
//     icons: <BsCalculator />,
//     subMenus: [
//       {
//         title: "Flat Installment",
//         icons: <BsCalculator />,
//         to: "/flat_installment",
//       },
//     ],
//   },
//   // Flat Rent
//   {
//     title: "Flat Rent",
//     icons: <GoPasskeyFill />,
//     subMenus: [
//       {
//         title: "Flat Rent",
//         icons: <GoPasskeyFill />,
//         to: "/flat-rent",
//       },
//     ],
//   },
//   // Incomes
//   {
//     title: "Incomes",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Incomes",
//         icons: <FaMoneyCheckDollar />,
//         to: "/incomes",
//       },
//     ],
//   },
//   // Leaves
//   {
//     title: "Leaves",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Leaves",
//         icons: <FaMoneyCheckDollar />,
//         to: "/leaves",
//       },
//     ],
//   },
//   // Loan Installment
//   {
//     title: "Loan Installment",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "App Label",
//         icons: <FiSettings />,
//         to: "/app-label",
//       },
//       {
//         title: "Types",
//         icons: <FaMoneyCheckDollar />,
//         to: "/types",
//       },
//     ],
//   },
//   // Loan Transactions
//   {
//     title: "Loan Transactions",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Loan Transactions",
//         icons: <FaMoneyCheckDollar />,
//         to: "/loan-transactions",
//       },
//     ],
//   },
//   // Loan Logs
//   {
//     title: "Loan logs",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "App Label",
//         icons: <FiSettings />,
//         to: "/app-label",
//       },
//     ],
//   },
//   // Material Installment
//   {
//     title: "Material Installment",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Material Installment",
//         icons: <FaMoneyCheckDollar />,
//         to: "/material_installment",
//       },
//     ],
//   },
//   // Material Payment Installment
//   {
//     title: "Material Payment Installment ",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Material Payment Installment ",
//         icons: <FaMoneyCheckDollar />,
//         to: "/material_payment_installment ",
//       },
//     ],
//   },
//   // Material Purchase
//   {
//     title: "Material Purchase ",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Material Purchase ",
//         icons: <FaMoneyCheckDollar />,
//         to: "/material_purchase ",
//       },
//     ],
//   },
//   // Material Purchase
//   {
//     title: "Material Purchase ",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Material Purchase ",
//         icons: <FaMoneyCheckDollar />,
//         to: "/material_purchase ",
//       },
//     ],
//   },
//   // Materials
//   {
//     title: "Materials",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Materials",
//         icons: <FaMoneyCheckDollar />,
//         to: "/materials",
//       },
//     ],
//   },
//   // Materials Dispatch from project
//   {
//     title: "Materials Dispatch from project",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Materials Dispatch from project",
//         icons: <FaMoneyCheckDollar />,
//         to: "/materials_dispatch_from_project",
//       },
//     ],
//   },
//   // Materials Dispatch from warehouse
//   {
//     title: "Materials Dispatch from warehouse",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Materials Dispatch from warehouse",
//         icons: <FaMoneyCheckDollar />,
//         to: "/materials_dispatch_from_warehouse",
//       },
//     ],
//   },
//   // Property
//   {
//     title: "Property",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Loan Transactions",
//         icons: <FaMoneyCheckDollar />,
//         to: "/loan-transactions",
//       },
//     ],
//   },
//   // Property purchase
//   {
//     title: "Property purchase",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Owner",
//         icons: <GrUserAdmin />,
//         to: "/owner",
//       },
//     ],
//   },
//   // Rent collections
//   {
//     title: "Rent collections",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Rent collections",
//         icons: <FaMoneyCheckDollar />,
//         to: "/rent-collections",
//       },
//     ],
//   },
//   // Renter Beneficiaries
//   {
//     title: "Renter Beneficiaries",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Renter Beneficiaries",
//         icons: <FaMoneyCheckDollar />,
//         to: "/renter-beneficiaries",
//       },
//     ],
//   },
//   // Reaper Records
//   {
//     title: "Reaper Records",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Reaper Records",
//         icons: <FaMoneyCheckDollar />,
//         to: "/repear_records",
//       },
//     ],
//   },
//   // Roles
//   {
//     title: "Roles",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Roles",
//         icons: <FaMoneyCheckDollar />,
//         to: "/roles",
//       },
//     ],
//   },
//   // Employee
//   {
//     title: "Employee",
//     icons: <GrUserWorker />,
//     subMenus: [
//       {
//         title: "Employee",
//         icons: <GrUserWorker />,
//         to: "/employee",
//       },
//       {
//         title: "Materials Dispatch from project",
//         icons: <FaMoneyCheckDollar />,
//         to: "/materials_dispatch_from_project",
//       },
//       {
//         title: "Brands",
//         icons: <MdOutlineAddBusiness />,
//         to: "/brands",
//       },
//     ],
//   },
//   // Types
//   {
//     title: "Types",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Types",
//         icons: <FaMoneyCheckDollar />,
//         to: "/types",
//       },
//     ],
//   },
//   // Warehouse Items
//   {
//     title: "Warehouse Items",
//     icons: <FaMoneyCheckDollar />,
//     subMenus: [
//       {
//         title: "Roles",
//         icons: <FaMoneyCheckDollar />,
//         to: "/warehouse_items",
//       },
//     ],
//   },
// // Menu 3
//   {
//     title: "Menu 3",
//     icons: <FaHandHoldingUsd />,
//     subMenus: [
//       {
//         title: "Sub menu 3",
//         icons: <FaRegCreditCard />,
//         to: "/",
//       },
//       {
//         title: "Sub menu 3.1",
//         icons: <FaRegListAlt />,
//         to: "/",
//       },
//       {
//         title: "Sub menu 3",
//         icons: <FaRegCreditCard />,
//         to: "/",
//       },
//       {
//         title: "Sub menu 3.1",
//         icons: <FaRegListAlt />,
//         to: "/",
//       },
//     ],
//   },
//   {
//     title: "Settings",
//     icons: <FiSettings />,
//     subMenus: [
//       {
//         title: "App Label",
//         icons: <FiSettings />,
//         to: "/app-label",
//       },
//     ],
//   },
//   {
//     title: "Work Progress",
//     icons: <GiProgression />,
//     subMenus: [
//       {
//         title: "Work Progress",
//         icons: <GiProgression />,
//         to: "/work-progress",
//       },
//       {
//         title: "Product Inventory",
//         icons: <TbFileSettings />,
//         to: "/product-inventory",
//       },
//     ],
//   },
//   {
//     title: "Contractors",
//     icons: <MdOutlineManageAccounts />,
//     subMenus: [
//       {
//         title: "Beneficaries",
//         icons: <FaRegListAlt />,
//         to: "/contractor-beneficaries",
//       },
//       {
//         title: "Assign Contractor",
//         icons: <BsFillPersonPlusFill />,
//         to: "/contractor-assign",
//       },
//       {
//         title: "Contractor Payment",
//         icons: <BsFillPersonPlusFill />,
//         to: "/contractor-payment",
//       },
//       {
//         title: "Contractor Guarantors",
//         icons: <BsFillPersonPlusFill />,
//         to: "/contractor-guarantor",
//       },
//     ],
//   },
//   {
//     title: "Suppliers",
//     icons: <MdOutlineManageAccounts />,
//     subMenus: [
//       {
//         title: "Beneficaries",
//         icons: <FaRegListAlt />,
//         to: "/suppliers-beneficaries",
//       },
//       {
//         title: "Brands",
//         icons: <BsFillPersonPlusFill />,
//         to: "/brands",
//       },
//       {
//         title: "Materials",
//         icons: <BsFillPersonPlusFill />,
//         to: "/",
//       },
      
//     ],
//   },
];

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState([]);

  const handleToggleSubMenu = (index) => {
    const expandedMenusCopy = [...expandedMenus];
    if (expandedMenusCopy.includes(index)) {
      // Remove index if already expanded
      expandedMenusCopy.splice(expandedMenusCopy.indexOf(index), 1);
    } else {
      // Add index if collapsed
      expandedMenusCopy.push(index);
    }
    setExpandedMenus(expandedMenusCopy);
  };

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 768); // Adjust breakpoint as needed
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize once on component mount to set initial state
    handleResize();

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mt-10 bg-white h-full">
      <div
        className={`${
          open ? "w-60" : "w-20 "
        } shadow-xl shadow-blue-200 h-full relative duration-300`}
      >
        <img
          src="/image/control.png"
          className={`absolute cursor-pointer -right-3 top-20 w-7 border-dark-purple
           border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />

        <ul className="pt-10">
          {Menus?.map((Menu, index) => (
            <div key={index}>
              {Menu.subMenus && Menu.subMenus.length > 0 ? (
                <div>
                  <div
                    className={`text-lg w-full font-medium cursor-pointer flex justify-between ${
                      !open && "justify-center pl-8 py-2"
                    } py-1 px-4`}
                    onClick={() => handleToggleSubMenu(index)}
                  >
                    <div className="flex items-center gap-2">
                      {Menu.icons}{" "}
                      <span
                        className={`${
                          !open && "hidden scale-0"
                        } origin-left duration-200 text-md`}
                      >
                        {Menu.title}
                      </span>
                    </div>
                    <div>
                      <span
                        className={`${
                          !open && "hidden scale-0"
                        } origin-left duration-200`}
                      >
                        {expandedMenus.includes(index) ? "-" : "+"}
                      </span>
                    </div>
                  </div>
                  <ul
                    className={`${
                      expandedMenus.includes(index)
                        ? "max-h-screen transition-max-h duration-[2s] ease-in-out"
                        : "max-h-0 transition-max-h duration-[1s] ease-in-out"
                    } overflow-hidden`}
                  >
                    {Menu.subMenus.map((submenu, subIndex) => (
                      <Link key={subIndex} to={submenu.to}>
                        <li
                          className={`flex pb-1 rounded-md cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 py-1 px-6 ${
                            subIndex === 0 && "bg-light-white"
                          }`}
                        >
                          <span className="pl-4">{submenu.icons}</span>
                          <span
                            className={`${
                              !open && "hidden scale-0"
                            } origin-left duration-200 text-md`}
                          >
                            {submenu.title}
                          </span>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link key={index} to={Menu.to}>
                  <li
                    className={
                      "selection:font-medium font-semibold text-lg overflow-hidden"
                    }
                  >
                    <div
                      className={`flex justify-between rounded-2xl py-1 px-4 ${
                        !open && "justify-center pl-8 py-2"
                      }`}
                    >
                      <div className="flex  items-center gap-2">
                        {Menu.icons}{" "}
                        <span
                          className={`${
                            !open && "hidden scale-0"
                          } origin-left duration-200`}
                        >
                          {Menu.title}
                        </span>
                      </div>
                    </div>
                  </li>
                </Link>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;