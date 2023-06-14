import React from "react";
import { Link } from "react-router-dom";

import style from "../../../DashBoard/dashboard.module.css";
const EachLinkForBottom = ({ currentPath, Menu, open }) => {
  const isActive =
    Menu?.link === "/profile/my-profile"
      ? currentPath === "/profile/my-profile"
      : currentPath.startsWith(Menu?.link);

  return (
    <li>
      <Link
        to={Menu?.link}
        className={`flex flex-col md:flex-row ${
          style.menuHover
        } rounded-md p-0 md:p-2 my-6 cursor-pointer text-black text-sm items-center gap-x-4 mt-2 md:mt-2 ${
          isActive ? `md:bg-[#4BA25D] ${style.actives}` : "md:bg-white"
        } `}
      >
        <div className={`hidden md:block `}>
          {React.cloneElement(Menu.src, {
            size: 22,
            color: isActive ? "white" : "black",
            className: style.icon,
          })}
        </div>
        <div
          className={`block md:hidden 
     `}
        >
          {React.cloneElement(Menu.src, {
            size: 18,
            color: isActive ? "green" : "black",
            className: style.icon,
          })}
        </div>

        <span
          className={`hidden ${
            !open ? "md:hidden" : "md:block"
          } origin-left duration-200`}
        >
          {Menu.title}
        </span>
        <h1
          style={{
            fontSize: "12px",
          }}
          className={` block md:hidden  ${
            isActive ? "text-green-600 " : "text-black"
          }`}
        >
          {Menu.title}
        </h1>
      </Link>
    </li>
  );
};

export default EachLinkForBottom;
