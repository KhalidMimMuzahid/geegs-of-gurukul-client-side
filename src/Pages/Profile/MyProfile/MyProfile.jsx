import React from "react";
import style from "./profile.module.css";

import { useEffect, useState } from "react";
import control from "../../../assets/dashBoardIcon/control.png";
import logo from "../../../assets/dashBoardIcon/logo.png";
import test from "../../../assets/dashBoardIcon/test.png";
import analysis from "../../../assets/dashBoardIcon/analysis.png";
import practice from "../../../assets/dashBoardIcon/practice.png";
import adminPannel from "../../../assets/dashBoardIcon/amin.png";
import { Link, Outlet, useLocation } from "react-router-dom";
const MyProfile = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "General", src: test, link: "/profile/my-profile" },
    {
      title: "Education",
      src: analysis,
      link: "/profile/my-profile/education",
    },
    {
      title: "Certification",
      src: practice,
      link: "/profile/my-profile/certification",
    },
    {
      title: "Settings",
      src: adminPannel,
      link: "/profile/my-profile/settings",
    },
  ];
  const [currentPath, setCurrrentPath] = useState("");
  useLocation();
  useEffect(() => {
    const handleWindowResize = () => {
      setCurrrentPath(window.location.pathname);
    };
    return handleWindowResize();
  });
  return (
    <div className="flex w-full">
      <div
        className={`${!open && "hidden"} md:block ${open ? "w-72" : "w-20 "}  ${
          open && "border-r-4"
        } ${
          style.dashboardHeight
        } h-screen p-5  pt-8 md:relative absolute duration-300 z-[1000] `}
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
            My Profile
          </h1>
        </div>
        <ul className="pt-6 font-poppins">
          {Menus.map((Menu, index) => (
            <li key={index}>
              <Link
                to={Menu?.link}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-slate-300 text-gray-600 text-sm items-center gap-x-4 
              ${"mt-2"} ${
                  currentPath.startsWith(Menu?.link)
                    ? "bg-slate-400"
                    : "bg-slate-100"
                } `}
              >
                <img src={Menu.src} alt="" className="w-[25px]" />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left font-bold duration-200`}
                >
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen grow  relative">
        <div>
          <img
            src={control}
            className={`relative cursor-pointer  ${
              open ? "left-[270px]" : "left-[-15px] top-[14px]"
            } md:left-[-19px] top-[0px] w-[35px] border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"} z-[1001]`}
            onClick={() => setOpen(!open)}
            alt=""
          />
        </div>
        <div className={`relative top-[-35px] `}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
