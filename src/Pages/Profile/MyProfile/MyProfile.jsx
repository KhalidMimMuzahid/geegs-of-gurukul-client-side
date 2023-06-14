import style from "./profile.module.css";

import { useContext, useEffect, useState } from "react";
import control from "../../../assets/dashBoardIcon/control.png";
import logo from "../../../assets/dashBoardIcon/logo.png";
import {
  BsLayers,
  BsBook,
  BsJournalCode,
  BsBriefcase,
  BsGear,
} from "react-icons/bs";

import { Link, Outlet, useLocation } from "react-router-dom";

import { UIContext } from "../../../contexts/UIProvider/UIProvider";
import EachLinkForLeft from "./EachLink/EachLinkForLeft";
import EachLinkForBottom from "./EachLink/EachLinkForBottom";
// import EachLink from "./EachLink";
const MyProfile = () => {
  const [open, setOpen] = useState(true);
  const [currentPath, setCurrrentPath] = useState("");
  const { sideNavLayoutForMobile } = useContext(UIContext);
  const Menus = [
    {
      title: "General",
      src: <BsLayers />,
      link: "/profile/my-profile",
    },
    {
      title: "Education",
      src: <BsBook />,
      link: "/profile/my-profile/education",
    },
    {
      title: "MySkills",
      src: <BsJournalCode />,
      link: "/profile/my-profile/my-skills",
    },
    {
      title: "Profession",
      src: <BsBriefcase />,
      link: "/profile/my-profile/profession",
    },
    {
      title: "Settings",
      src: <BsGear />,
      link: "/profile/my-profile/settings",
    },
  ];

  useLocation();
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrrentPath(window.location.pathname);
    };
    return handleLocationChange();
  });
  const forLeftLayout = (
    <div className="flex  gap-4 w-full h-screen">
      <div
        style={{
          minWidth: `${open ? "200px" : "80px"}`,
          maxWidth: `${open ? "200px" : "80px"}`,
        }}
        className={`${!open && "hidden"} md:block  ${
          open && " bg-white rounded-md"
        } ${
          style.dashboardHeight
        } h-screen  border-0 md:border-2 p-5  pt-8 md:relative absolute duration-300 z-[1000] `}
      >
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
            <EachLinkForLeft
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
        <div>
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
          className={`relative top-[-35px] rounded-lg ${style.dashboardHeight}  bg-white  overflow-y-auto `}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
  const forBottomLayout = (
    <div className="flex flex-col-reverse md:flex-row   md:gap-4 w-full h-screen">
      {/* this is for tablet and desktop view  */}
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
            Profile
          </h1>
        </div>
        <ul className="pt-6 font-poppins">
          {Menus.map((Menu, index) => (
            <EachLinkForBottom
              key={index}
              currentPath={currentPath}
              Menu={Menu}
              open={open}
            />
          ))}
        </ul>
      </div>
      {/* this is for mobile biew  */}
      <div
        style={{
          width: "100vw",
          height: "7vh",
          border: "1px solid gray",
          borderRadius: "15px 15px 0 0",
        }}
        className="block md:hidden fixed  z-[99999999] bottom-0 left-[0px] right-[0px]  bg-white  border-gray-600"
      >
        {
          <ul className=" flex justify-around font-poppins">
            {Menus.map((Menu, index) => (
              <EachLinkForBottom
                key={index}
                currentPath={currentPath}
                Menu={Menu}
                open={open}
              />
            ))}
          </ul>
        }
      </div>
      {/* h-screen  */}
      <div className="grow  relative h-full">
        <div className="hidden md:block">
          <img
            src={control}
            className={`relative cursor-pointer  ${
              open ? "left-[180px]" : "left-[-15px] top-[14px]"
            } md:left-[-35px] top-[-3px] w-[35px] border-dark-purple border-2 rounded-full  ${
              !open && "rotate-180"
            } z-[1001]`}
            onClick={() => setOpen(!open)}
            alt=""
          />
        </div>
        <div
          className={`relative  md:top-[-30px] rounded-2xl px-1 sm:px-2 md:px-4 lg:px-8 h-[80vh] md:h-[90vh]  bg-white  overflow-y-auto `}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );

  return sideNavLayoutForMobile === "bottom" ? forBottomLayout : forLeftLayout;
};
export default MyProfile;
