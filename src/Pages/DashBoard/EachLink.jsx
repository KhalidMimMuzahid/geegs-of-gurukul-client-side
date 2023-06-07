import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./dashboard.module.css";
import { AuthContext } from "../../contexts/UserProvider/UserProvider";

const EachLink = ({ currentPath, Menu, open }) => {
  const { user } = useContext(AuthContext);

  const isActive =
    Menu?.link === "/"
      ? currentPath === "/"
      : currentPath.startsWith(Menu?.link);

  const link = (
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

  return Menu?.title === "Admin"
    ? (user?.role === "admin" ||
        user?.role === "super-admin" ||
        user?.role === "instructor") &&
        link
    : link;
};

export default EachLink;
