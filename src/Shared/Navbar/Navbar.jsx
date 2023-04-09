import React, { useContext, useEffect } from "react";
import { Drawer } from "flowbite";
import { Collapse } from "flowbite";
import logo from "../../assets/logo/logo.svg";
import bookmark from "../../assets/svg/bookmark.svg";
import anounce from "../../assets/svg/announcement.svg";
import leaderboard from "../../assets/svg/leader-board.svg";
import logout from "../../assets/svg/logout.svg";
import { Link } from "react-router-dom";
import { UIContext } from "../../contexts/UIProvider/UIProvider";
const Navbar = () => {
  const { dashboardDrawer, setDashboardDrawer, p, setP } =
    useContext(UIContext);
  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class=" flex flex-wrap items-center justify-between mx-auto p-4">
        <Link class="flex items-center">
          <img src={logo} class="h-8 mr-3" alt="Flowbite Logo" />
          {/* <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span> */}
        </Link>
        {/* <div class="text-center">
          <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="button"
            onClick={() => {
              // dashboardDrawer.show();
            }}
            data-drawer-target="drawer-disabled-backdrop"
            data-drawer-show="drawer-disabled-backdrop"
            data-drawer-backdrop="false"
            aria-controls="drawer-disabled-backdrop"
          >
            Show drawer without backdrop {p}
          </button>
        </div> */}
        <div class="flex items-center md:order-2">
          <button
            type="button"
            class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span class="sr-only">Open user menu</span>
            <img
              class="w-8 h-8 rounded-full"
              src="https://randomuser.me/api/portraits/women/63.jpg"
              alt="userphoto"
            />
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          >
            <div class="px-12 py-12 flex items-center justify-center gap-2">
              <div>
                <img
                  width="76px"
                  height="76px"
                  src="https://randomuser.me/api/portraits/women/63.jpg"
                  alt=""
                  className="rounded-full border-4 border-green-500"
                />
              </div>
              <div>
                <h4 className="text-xl font-poppins">Shamima Akter</h4>
                <p className="font-poppins">ID : N/A</p>
                <Link to="/profile/my-profile">
                  <button
                    type="button"
                    class="text-white font-poppins bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-400 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-green-400 ml-8"
                  >
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
            <ul
              class="py-2 font-poppins mx-16 gap-4 items-center justify-center my-2"
              aria-labelledby="user-menu-button"
            >
              <li>
                <Link
                  to="/profile/bookmark"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  <div className="flex gap-4 items-center justify-start my-2">
                    <img src={bookmark} alt="" />
                    <span>Bookmark</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/leaderboard"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  <div className="flex gap-4 items-center justify-start my-2">
                    <img src={leaderboard} alt="" />
                    <span>Leader Board</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/announcement"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  <div className="flex gap-4 items-center justify-start my-2">
                    <img src={anounce} alt="" />
                    <span>Announcement</span>
                  </div>
                </Link>
              </li>
              <li>
                <button class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
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
            class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="font-poppins">
              <Link
                to="/"
                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="font-poppins">
              <Link
                to="/courses"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Courses
              </Link>
            </li>
            {/* <li className="font-poppins">
              <a
                href="/"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Learn
              </a>
            </li> */}
            <li className="font-poppins">
              <Link
                to="/dashboard"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
