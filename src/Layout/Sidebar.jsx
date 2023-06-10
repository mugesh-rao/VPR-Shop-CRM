import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import DriverIcon from "../assets/Icons/DriverIcon";
import TripIcon from "../assets/Icons/TripIcon";
import EmployeeIcon from "../assets/Icons/EmployeeIcon";
import HomeIcon from "../assets/Icons/HomeIcon";
import ReportIcon from "../assets/Icons/ReportIcon";
import PassbookIcon from "../assets/Icons/PassbookIcon";
import InvoiceIcon from "../assets/Icons/Invoice";
import { FaBars, FaTimes } from "react-icons/fa";
const SidebarNew = () => {
  const location = useLocation();
  const Nav = [
    { title: "Home", path: "/Home", src: <HomeIcon /> },
    { title: "Sales", path: "/Trip", src: <TripIcon /> },
    { title: "Purchase", path: "/Driver", src: <DriverIcon /> },
    { title: "Suppliers", path: "/employee-list", src: <EmployeeIcon /> },
    { title: "Invoice", path: "/invoice-list", src: <InvoiceIcon /> },
    { title: "Monthly Reports", path: "/Report", src: <ReportIcon /> },
    { title: "Hiki Camera", path: "/Passbook", src: <PassbookIcon /> },
  ];

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {/* Mobile view */}
      <div className="block md:hidden">
        <button
          className="text-white p-4 mt-8 rounded-lg"
          onClick={toggleSidebar}
        >
          {showSidebar ? <FaTimes /> : <FaBars />}
        </button>
        {showSidebar && (
          <div className="bg-gray-800 text-white p-4">
            <ul>
              {Nav.map((menu, index) => (
                <li
                  className={`p-2 hover:bg-gray-700 rounded-lg cursor-pointer ${
                    location.pathname === menu.path && "bg-[#00ADB5]"
                  }`}
                  key={index}
                >
                  <Link to={menu.path}>
                    <div className="flex items-center">
                      <div className="text-2xl">{menu.src}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Desktop view */}
      <div className="w-full  hidden md:block  sm:block  duration-300 bg-[#222831]">
        <div className=" py-2 h-[100px] bg-[#393E46] ">
          <Link to="/Home">
            <div className=" flex flex-col h-auto w-auto items-center">
              <img
                className="h-[50px]  w-[50px] max-w-full mt-2  "
                src={Logo}
                alt=""
              />

              <h3 className="text-[14px]  font-bold font-sans   text-white font-body  ">
                VPR AGRO SPARES
              </h3>
            </div>
          </Link>
        </div>

        <ul className="pt-6  px-2 ">
          {Nav.map((menu, index) => (
            <Link to={menu.path} key={index}>
              <li
                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer  hover:bg-[#58ae70]
                        ${menu.gap ? "mt-14" : "mt-2"} 
                        ${
                          location.pathname === menu.path &&
                          "bg-[#539165]  dark:bg-gray-700"
                        }`}
              >
                <div className="text-2xl text-white ">{menu.src}</div>
                <span className="origin-left text-[18px] duration-300 hover:block text-white">
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SidebarNew;
