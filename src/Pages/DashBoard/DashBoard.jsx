import style from "./dashboard.module.css";

import { useState } from "react";
import control from "../../assets/dashBoardIcon/control.png";
import logo from "../../assets/dashBoardIcon/logo.png";
import test from "../../assets/dashBoardIcon/test.png";
import analysis from "../../assets/dashBoardIcon/analysis.png";
import practice from "../../assets/dashBoardIcon/practice.png";
import adminPannel from "../../assets/dashBoardIcon/amin.png";
import { Link, Outlet } from "react-router-dom";
const DashBoard = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Test", src: test, link: "/dashboard/assessment" },
    { title: "Analysis", src: analysis, link: "/dashboard/analysis" },
    { title: "Practice", src: practice, link: "/dashboard/practice" },
    {
      title: "Admin-Pannel",
      src: adminPannel,
      link: "/dashboard/admin-pannel",
    },
  ];

  return (
    <div className="flex">
      <div
        className={` ${open ? "w-72" : "w-20 "} bg-gray-200 ${
          style.dashboardHeight
        } h-screen p-5  pt-8 relative duration-300 `}
      >
        {/* <img
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt=""
        /> */}
        <div className="flex gap-x-4 items-center">
          <img
            src={logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            alt=""
          />
          <h1
            className={`text-gray-700 font-poppins origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Dashboard
          </h1>
        </div>
        <ul className="pt-6 font-poppins">
          {Menus.map((Menu, index) => (
            <li key={index}>
              <Link
                to={Menu?.link}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-slate-300 text-gray-600 text-sm items-center gap-x-4 
              ${"mt-2"} ${"bg-slate-300"} `}
              >
                <img src={Menu.src} alt="" className="w-[25px]" />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen  p-7">
        <img
          src={control}
          className={`relative cursor-pointer left-[-48px] top-[-28px] w-[35px] border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt=""
        />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
