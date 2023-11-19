import { useEffect, useState } from "react";
import {
  FaHandHoldingUsd,
  FaMobileAlt,
  FaRegCreditCard,
  FaRegListAlt,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GiProgression } from "react-icons/gi";
import { GrUserAdmin, GrUserWorker } from "react-icons/gr";
import { MdInstallMobile, MdOutlineAddBusiness, MdOutlineManageAccounts } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BsCalendar2Check, BsFiles, BsFillPersonPlusFill } from "react-icons/bs";
import { SiFlatpak } from "react-icons/si";
import { Link } from "react-router-dom";

const Menus = [
  {
    title: "Loan",
    icons: <FaHandHoldingUsd />,
    subMenus: [
      {
        title: "Beneficiary",
        icons: <FaRegListAlt />,
        to: "/beneficiarylist",
      },
    ],
  },
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
  {
    title: "Attendance",
    icons: <BsCalendar2Check />,
    subMenus: [
      {
        title: "Attendance",
        icons: <BsCalendar2Check />,
        to: "/attendance",
      },
    ],
  },
  {
    title: "Projects",
    icons: <SiFlatpak />,
    subMenus: [
      {
        title: "Projects",
        icons: <SiFlatpak />,
        to: "/projects",
      },
    ],
  },
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
  // Brand
  {
    title: "Brands",
    icons: <MdOutlineAddBusiness />,
    subMenus: [
      {
        title: "Brands",
        icons: <MdOutlineAddBusiness />,
        to: "/brands",
      },
    ],
  },
  // Salaries
  {
    title: "Salaries",
    icons: <FaMoneyCheckDollar />,
    subMenus: [
      {
        title: "Salaries",
        icons: <FaMoneyCheckDollar />,
        to: "/salary",
      },
    ],
  },
  // Customer Beneficiaries
  {
    title: "Customer Ben",
    icons: <FaMoneyCheckDollar />,
    subMenus: [
      {
        title: "Customer Ben",
        icons: <FaMoneyCheckDollar />,
        to: "/customer_beneficiaries",
      },
    ],
  },
  // Expenses
  {
    title: "Expenses",
    icons: <FaMoneyCheckDollar />,
    subMenus: [
      {
        title: "Expenses",
        icons: <FaMoneyCheckDollar />,
        to: "/expenses",
      },
    ],
  },
  // Flat Installment
  {
    title: "Flat Installment",
    icons: <FaMoneyCheckDollar />,
    subMenus: [
      {
        title: "Flat Installment",
        icons: <FaMoneyCheckDollar />,
        to: "/flat_installment",
      },
    ],
  },
  // Flat Rent
  {
    title: "Flat Rent",
    icons: <FaMoneyCheckDollar />,
    subMenus: [
      {
        title: "Flat Rent",
        icons: <FaMoneyCheckDollar />,
        to: "/flat_rent",
      },
    ],
  },
  // Incomes
  {
    title: "Incomes",
    icons: <FaMoneyCheckDollar />,
    subMenus: [
      {
        title: "Incomes",
        icons: <FaMoneyCheckDollar />,
        to: "/incomes",
      },
    ],
  },
  // Leaves
  {
    title: "Leaves",
    icons: <FaMoneyCheckDollar />,
    subMenus: [
      {
        title: "Leaves",
        icons: <FaMoneyCheckDollar />,
        to: "/leaves",
      },
    ],
  },
  {
    title: "Menu 3",
    icons: <FaHandHoldingUsd />,
    subMenus: [
      {
        title: "Sub menu 3",
        icons: <FaRegCreditCard />,
        to: "/",
      },
      {
        title: "Sub menu 3.1",
        icons: <FaRegListAlt />,
        to: "/",
      },
      {
        title: "Sub menu 3",
        icons: <FaRegCreditCard />,
        to: "/",
      },
      {
        title: "Sub menu 3.1",
        icons: <FaRegListAlt />,
        to: "/",
      },
    ],
  },
  {
    title: "Settings",
    icons: <FiSettings />,
    subMenus: [
      {
        title: "App Label",
        icons: <FiSettings />,
        to: "/app-label",
      },
    ]
    ,
  },
  { 
    title: "Work Progress",
    icons: <GiProgression />,
    subMenus: [
      {
        title: "Work Progress",
        icons: <GiProgression />,
        to: "/work-progress",
      },
    ]
    ,
  },
  {
    title: "Contractors",
    icons: <MdOutlineManageAccounts />,
    subMenus: [
      {
        title: "Beneficaries",
        icons: <FaRegListAlt />,
        to: "/contractor-beneficaries",
      },
      {
        title: "Assign Contractor",
        icons: <BsFillPersonPlusFill />,
        to: "/contractor-assign",
      },
    ]
    ,
  },
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
    <div className="mt-10 bg-white">
      <div
        className={`${
          open ? "w-60" : "w-20 "
        } shadow-xl shadow-blue-200 h-full relative duration-300`}
      >
        <img
          src="/image/control.png"
          className={`absolute cursor-pointer -right-3 top-20 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
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
