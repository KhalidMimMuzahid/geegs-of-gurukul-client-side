import React, { useContext, useEffect, useState } from "react";
import { Drawer } from "flowbite";
import { Collapse } from "flowbite";
import logo from "../../assets/logo/gog-full-logo.png";
import bookmark from "../../assets/svg/bookmark.svg";
import anounce from "../../assets/svg/announcement.svg";
import leaderboard from "../../assets/svg/leader-board.svg";
import logout from "../../assets/svg/logout.svg";
import { Link, useLocation } from "react-router-dom";
import iconHeader1 from '../../assets/icons/ann.svg'
import iconHeader2 from '../../assets/icons/header2.svg'
import iconHeader3 from '../../assets/icons/questio.svg'
import icon from '../../assets/Testimg/user.png'
import { UIContext } from "../../contexts/UIProvider/UIProvider";
const Navbar = () => {
  const [currentPath, setCurrrentPath] = useState("");
  useLocation();
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrrentPath(window.location.pathname);
    };
    return handleLocationChange();
  });
  return (

      <nav className="bg-white shadow-green-700 shadow-md border-gray-900 dark:bg-green-900 ">
        <div className=" flex flex-wrap items-center justify-between mx-auto p-4 max-w-[1440px] mx-auto">
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
          </Link>
          

          
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li className="font-poppins">
                <Link
                  to="/announcement"
                  className={`text-black ${currentPath.startsWith("/announcement")
                      ? "bg-white shadow-lg border border-slate-300 shadow-slate-500"
                      : "bg-white "
                    } block py-1 pl-3 pr-4   rounded    px-3 `}
                >
                  <img src={iconHeader1} alt="" />
                </Link>
              </li>
              <li className="font-poppins">
                <Link
                  to="/bookmark"
                  className={`text-black ${currentPath.startsWith("/bookmark")
                      ? "bg-white shadow-lg border border-slate-300 shadow-slate-500"
                      : "bg-white"
                    } block py-1 pl-3 pr-4   rounded    px-3 `}
                >
                  <img src={iconHeader2} alt="" />
                </Link>
              </li>
              <li className="font-poppins">
                <Link
                  to="/bookmark"
                  className={`text-black ${currentPath.startsWith("/bookmark")
                      ? "bg-white shadow-lg border border-slate-300 "
                      : "bg-white"
                    } block py-1 pl-3 pr-4   rounded    px-3 `}
                >
                  <img src={iconHeader3} alt="" />
                </Link>
              </li>
              <li className="font-poppins">
                <Link
                  to="/bookmark"
                  className={`text-black ${currentPath.startsWith("/bookmark")
                      ? "bg-white shadow-lg border border-slate-300 "
                      : "bg-white"
                    } block py-1 pl-3 pr-4   rounded    px-3 `}
                >
                  <img className=" w-10" src={icon} alt="" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


  );
};

export default Navbar;
