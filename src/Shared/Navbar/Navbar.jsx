import React, { useContext, useEffect, useState } from "react";
import { Drawer } from "flowbite";
import { Collapse } from "flowbite";
import logo from "../../assets/logo/gog-full-logo.png";
import bookmark from "../../assets/svg/bookmark.svg";
import anouncement from "../../assets/svg/announcement.svg";
import iconHeader1 from "../../assets/icons/announcement.svg";
// import bookmark from '../../assets/icons/bookmark.svg'
import help from "../../assets/icons/help.svg";
import leaderboard from "../../assets/svg/leader-board.svg";
import logout from "../../assets/svg/logout.svg";
import { Link, useLocation } from "react-router-dom";
import { UIContext } from "../../contexts/UIProvider/UIProvider";
import { AuthContext } from "../../contexts/UserProvider/UserProvider";
import { toast } from "react-hot-toast";
const Navbar = () => {
  const [currentPath, setCurrrentPath] = useState("");
  const { user, logOut } = useContext(AuthContext);
  useLocation();
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrrentPath(window.location.pathname);
    };
    return handleLocationChange();
  });
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Successfully logged out");
      })
      .catch((err) => console.log(err));
  };
  return (
    <nav className="bg-white  shadow-md border-gray-900 dark:bg-green-900 rounded-lg">
      <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
        </Link>

        <div
          className={`${
            user?.email ? "flex" : "hidden"
          }  items-center md:order-2`}
        >
          {/* {user?.email && ( */}
          <button
            type="button"
            className={`${
              user?.email ? "flex" : "hidden"
            } mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600`}
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Openx user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src={
                user?.photoURL
                  ? user?.photoURL
                  : "https://i.ibb.co/jkbWws1/blank-profile-picture-973460-340.png"
              }
              alt="userphoto"
            />
          </button>
          {/* // )} */}
          {/* <!-- Dropdown menu --> */}
          <div
            className="z-[1000000]  w-[300px] hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          >
            <div className="px-2 py-4 flex items-center justify-around gap-2 ">
              <div className="">
                <img
                  width="76px"
                  height="76px"
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : "https://i.ibb.co/jkbWws1/blank-profile-picture-973460-340.png"
                  }
                  alt=""
                  className="rounded-full border-4 border-green-500"
                />
              </div>
              <div className="flex grow flex-col justify-between  ">
                <h4 className="text-xl ml-2 font-poppins">{user?.name}</h4>
                <Link to="/profile/my-profile" className="w-full grow ">
                  <button
                    type="button"
                    className="text-white w-full  font-poppins bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-green-400 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-green-400 "
                  >
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
            <ul
              className="py-2  font-poppins mx-4 gap-4 items-center justify-center"
              aria-labelledby="user-menu-button"
            >
              {/* <li>
                <Link
                  to="/profile/leaderboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  <div className="flex gap-4 items-center justify-start my-2">
                    <img src={leaderboard} alt="" />
                    <span>Leader Board</span>
                  </div>
                </Link>
              </li> */}

              <li className=" flex justify-center">
                <button
                  onClick={handleLogOut}
                  className="block  rounded-lg border-gray-600 shadow-md  w-full  text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  <div className="flex px-4 py-2 gap-2  items-center justify-start ">
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
          className="items-center grow   justify-end hidden w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="font-poppins">
              <Link
                to="/announcement"
                className={`text-black ${
                  currentPath.startsWith("/announcement")
                    ? "bg-white shadow-lg  shadow-slate-500"
                    : "bg-white"
                } block py-0    rounded    px-2 `}
              >
                <img src={anouncement} alt="" className="w-[30px]" />
              </Link>
            </li>
            <li className="font-poppins">
              <Link
                to="/bookmark"
                className={`text-black ${
                  currentPath.startsWith("/bookmark")
                    ? "bg-white shadow-lg  shadow-slate-500"
                    : "bg-white "
                } block py-0   rounded    px-2 `}
              >
                <img src={bookmark} alt="" className="w-[30px]" />
              </Link>
            </li>
            <li className="font-poppins">
              <Link
                to="/help"
                className={`text-black ${
                  currentPath.startsWith("/help")
                    ? "bg-white shadow-lg  shadow-slate-500"
                    : "bg-white "
                } block py-0  md:mr-4 mr-0  rounded    px-2 `}
              >
                <img src={help} alt="" className="w-[30px]" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
