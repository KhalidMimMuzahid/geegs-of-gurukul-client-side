import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./dashboard.module.css";
import { AuthContext } from "../../contexts/UserProvider/UserProvider";
const EachLink = ({ currentPath, Menu, open }) => {
  const { user } = useContext(AuthContext);
  const target = Menu?.title;
  return user?.role === "student" && Menu?.title === "Admin" ? null : (
    <li>
      <Link
        to={Menu?.link}
        className={`flex ${
          style.menuHover
        }  rounded-md p-2 my-6 cursor-pointer text-black text-sm items-center gap-x-4 
          ${"mt-2"} ${
          //   currentPath.startsWith(Menu?.link)
          (
            Menu?.link === "/"
              ? currentPath === "/"
              : currentPath.startsWith(Menu?.link)
          )
            ? `bg-white shadow-md border ${style.actives} border-slate-300 shadow-slate-500`
            : "bg-white "
        } `}
      >
        {/* <img src={Menu.src} alt="" className="w-[25px] text-blue-700" /> */}
        <img
          src={Menu.src}
          alt=""
          className={`w-[25px] ${style.img1}  ${
            currentPath.startsWith(Menu?.link) ? "hidden" : "block"
          } `}
        />
        <img
          src={Menu.hover}
          alt=""
          className={`w-[25px] ${style.img2} ${
            currentPath.startsWith(Menu?.link) ? "block" : "hidden"
          }`}
        />

        <span className={`${!open && "hidden"} origin-left duration-200`}>
          {Menu.title}
        </span>
      </Link>
    </li>
  );
};

export default EachLink;
