import React from "react";
import { Link } from "react-router-dom";
import style from "../../../DashBoard/dashboard.module.css";

const EachLinkForLeft = ({ currentPath, Menu, open }) => {
  const isActive =
    Menu?.link === "/profile/my-profile"
      ? currentPath === "/profile/my-profile"
      : currentPath.startsWith(Menu?.link);

  return (
    <li>
      <Link
        to={Menu?.link}
        className={`flex ${
          style.menuHover
        } rounded-md p-2 my-6 cursor-pointer text-black text-sm items-center gap-x-4 ${"mt-2"} ${
          isActive ? `bg-[#4BA25D] ${style.actives}` : "bg-white"
        } `}
      >
        {React.cloneElement(Menu.src, {
          size: 22,
          color: isActive ? "white" : "black",
          className: style.icon,
        })}

        <span className={`${!open && "hidden"} origin-left duration-200`}>
          {Menu.title}
        </span>
      </Link>
    </li>
  );
};

export default EachLinkForLeft;
