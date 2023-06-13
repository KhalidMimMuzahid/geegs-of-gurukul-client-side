import style from "./dashboard.module.css";

import { useEffect, useState } from "react";
import control from "../../assets/dashBoardIcon/control.png";
import logo from "../../assets/dashBoardIcon/logo.png";

import {
  BsHouse,
  BsClipboardData,
  BsGraphUp,
  BsFillJournalBookmarkFill,
  BsPerson,
} from "react-icons/bs";

import { Link, Outlet, useLocation } from "react-router-dom";
import EachLink from "./EachLink";
const DashBoard = () => {
  const [open, setOpen] = useState(true);
  const [currentPath, setCurrrentPath] = useState("");
  // const [shouldHiddenNav, setShouldHiddenNav] = useState(false);

  const Menus = [
    { title: "Home", src: <BsHouse />, link: "/" },
    {
      title: "Test",
      src: <BsClipboardData />,
      link: "/dashboard/assessment",
    },
    {
      title: "Analysis",
      src: <BsGraphUp />,
      link: "/dashboard/analysis",
    },

    {
      title: "Courses",
      src: <BsFillJournalBookmarkFill />,
      link: "/dashboard/courses",
    },
    {
      title: "Admin",
      src: <BsPerson />,
      link: "/dashboard/admin-pannel/assessment/add-assessment",
    },
  ];

  useLocation();
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrrentPath(window.location.pathname);
    };
    return handleLocationChange();
  });

  // useEffect(() => {
  //   // console.log("currentPath: ", currentPath);
  //   if (currentPath.startsWith("/dashboard/assessment/on-processing")) {
  //     setShouldHiddenNav(true);
  //   } else {
  //     setShouldHiddenNav(false);
  //   }
  // }, [currentPath]);

  return (
    <div className="flex  gap-4 w-full h-screen">
      <div
        style={{
          // display: `${shouldHiddenNav ? "none" : "block"}`,
          minWidth: `${open ? "200px" : "80px"}`,
          maxWidth: `${open ? "200px" : "80px"}`,
        }}
        className={`hidden md:block  ${open && " bg-white rounded-md"} ${
          style.dashboardHeight
        } h-screen  border-0 md:border-2 p-5  pt-8 md:relative absolute duration-300 z-[1000] `}
      >
        <div className="flex gap-x-3 items-center ">
          <img
            style={{ width: "40px", height: "40px" }}
            src={logo}
            className={`cursor-pointer   duration-500 ${
              open && "rotate-[360deg]"
            }`}
            alt=""
          />
          <h1
            className={`text-gray-700 font-poppins origin-left font-medium text-lg duration-200 ${
              !open && "scale-0"
            }`}
          >
            Dashboard
          </h1>
        </div>
        <ul className="pt-6 font-poppins">
          {Menus.map((Menu, index) => (
            <EachLink
              key={index}
              currentPath={currentPath}
              Menu={Menu}
              open={open}
            />
          ))}
        </ul>
      </div>
      {/* h-screen  */}
      <div className="grow    relative h-full">
        <div className="hidden md:block">
          <img
            src={control}
            className={`relative cursor-pointer  ${
              open ? "left-[180px]" : "left-[-15px] top-[14px]"
            } md:left-[-35px] top-[-3px] w-[35px] border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"} z-[1001]`}
            onClick={() => setOpen(!open)}
            alt=""
          />
        </div>
        <div
          className={`relative  top-[50px] rounded-2xl px-1 sm:px-2 md:px-4 lg:px-8
              ${style.dashboardHeight}  bg-white  overflow-y-auto `}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
