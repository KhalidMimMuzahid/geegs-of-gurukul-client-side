import React, { useContext, useEffect, useState } from "react";
import { Drawer } from "flowbite";
import { Collapse } from "flowbite";
import logo from "../../assets/logo/gog-full-logo.png";
import bookmark from "../../assets/svg/bookmark.svg";
import anounce from "../../assets/svg/announcement.svg";
import leaderboard from "../../assets/svg/leader-board.svg";
import logout from "../../assets/svg/logout.svg";
import { Link, useLocation } from "react-router-dom";
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
    <nav className="bg-white shadow-green-700 shadow-md border-gray-900 dark:bg-green-900 rounded-lg">
      <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
        </Link>

        <div className=" flex items-center md:order-2">
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Openx user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://randomuser.me/api/portraits/women/63.jpg"
              alt="userphoto"
            />
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            className="z-50  w-[300px]  hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          >
            <div className="px-2 py-8 flex items-center justify-around gap-2">
              <div>
                <img
                  width="76px"
                  height="76px"
                  src="https://randomuser.me/api/portraits/women/63.jpg"
                  alt=""
                  className="rounded-full border-4 border-green-500"
                />
              </div>
              <div className="flex flex-col justify-between items-start">
                <h4 className="text-xl font-poppins">Shamima Akter</h4>
                <Link to="/profile/my-profile">
                  <button
                    type="button"
                    className="text-white  font-poppins bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-400 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-green-400 ml-8"
                  >
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
            <ul
              className="py-2 font-poppins mx-16 gap-4 items-center justify-center my-2"
              aria-labelledby="user-menu-button"
            >
              <li>
                <Link
                  to="/profile/leaderboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  <div className="flex gap-4 items-center justify-start my-2">
                    <img src={leaderboard} alt="" />
                    <span>Leader Board</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  <div className="flex gap-4 items-center justify-start my-2">
                    <img src={leaderboard} alt="" />
                    <span>Ticket</span>
                  </div>
                </Link>
              </li>

              <li>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  <div className="flex gap-2 items-center justify-start my-2">
                    <img src={logout} alt="" />
                    <span>Sign Out</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="font-poppins">
              <Link
                to="/announcement"
                className={`text-black ${
                  currentPath.startsWith("/announcement")
                    ? "bg-white shadow-lg border border-slate-300 shadow-slate-500"
                    : "bg-white border border-slate-300"
                } block py-1 pl-3 pr-4   rounded    px-3 `}
              >
                Announcement
              </Link>
            </li>
            <li className="font-poppins">
              <Link
                to="/bookmark"
                className={`text-black ${
                  currentPath.startsWith("/bookmark")
                    ? "bg-white shadow-lg border border-slate-300 shadow-slate-500"
                    : "bg-white border border-slate-300"
                } block py-1 pl-3 pr-4   rounded    px-3 `}
              >
                Bookmark
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
