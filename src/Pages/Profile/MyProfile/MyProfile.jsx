import style from "./profile.module.css";

import { useEffect, useState } from "react";
import control from "../../../assets/dashBoardIcon/control.png";
import logo from "../../../assets/dashBoardIcon/logo.png";
import profile from "../../../assets/profileDashboard/black/profile.svg";
import profileWhite from "../../../assets/profileDashboard/white/profile.svg";
import education from "../../../assets/profileDashboard/black/education.svg";
import educationWhite from "../../../assets/profileDashboard/white/education.svg";
import certificate from "../../../assets/profileDashboard/black/certificate.svg";
import setting from "../../../assets/profileDashboard/black/Setting.svg";
import settingWhite from "../../../assets/profileDashboard/white/Setting.svg";
import certificateWhite from "../../../assets/profileDashboard/white/education.svg";
import profession from "../../../assets/profileDashboard/white/profession.svg";
import professionWhite from "../../../assets/profileDashboard/white/profession.svg";

import { Link, Outlet, useLocation } from "react-router-dom";
import EachLink from "./EachLink/EachLink";
// import EachLink from "./EachLink";
const MyProfile = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    {
      title: "General",
      src: profile,
      link: "/profile/my-profile",
      hover: profileWhite,
    },
    {
      title: "Education",
      src: education,
      link: "/profile/my-profile/education",
      hover: educationWhite,
    },
    {
      title: "MySkills",
      src: certificate,
      link: "/profile/my-profile/my-skills",
      hover: certificateWhite,
    },
    {
      title: "Profession",
      src: profession,
      link: "/profile/my-profile/profession",
      hover: professionWhite,
    },
    {
      title: "Settings",
      src: setting,
      link: "/profile/my-profile/settings",
      hover: settingWhite,
    },
  ];
  const [currentPath, setCurrrentPath] = useState("");
  const [shouldHiddenNav, setShouldHiddenNav] = useState(false);

  useLocation();
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrrentPath(window.location.pathname);
    };
    return handleLocationChange();
  });

  useEffect(() => {
    // console.log("currentPath: ", currentPath);
    if (currentPath.startsWith("/dashboard/assessment/on-processing")) {
      setShouldHiddenNav(true);
    } else {
      setShouldHiddenNav(false);
    }
  }, [currentPath]);

  return (
    <div className="flex  gap-4 w-full h-screen">
      <div
        style={{
          display: `${shouldHiddenNav ? "none" : "block"}`,
          minWidth: `${open ? "200px" : "80px"}`,
          maxWidth: `${open ? "200px" : "80px"}`,
        }}
        className={`${!open && "hidden"} md:block  ${
          open && " bg-white rounded-md"
        } ${
          style.dashboardHeight
        } h-screen  border-0 md:border-2 p-5  pt-8 md:relative absolute duration-300 z-[1000] `}
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
            style={{ width: "40px", height: "40px" }}
            src={logo}
            className={`cursor-pointer   duration-500 ${
              open && "rotate-[360deg]"
            }`}
            alt=""
          />
          <h1
            className={`text-gray-700 font-poppins origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Profile
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
      <div className="grow relative h-full">
        <div style={{ display: `${shouldHiddenNav ? "none" : "block"}` }}>
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
          className={`relative ${
            shouldHiddenNav
              ? "top-[50px] rounded-2xl px-1 sm:px-2 md:px-4 lg:px-8"
              : "top-[-35px] rounded-lg"
          }  ${style.dashboardHeight}  bg-white  overflow-y-auto `}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default MyProfile;
