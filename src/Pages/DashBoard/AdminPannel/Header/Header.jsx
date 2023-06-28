import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import DropDown from "./DropDwon/DropDwon";

const navigation = [
  {
    name: "Assessment",
    parrentLink: "/dashboard/admin-pannel/assessment",
    submenu: [
      {
        name: "Add Assesment",
        link: "/dashboard/admin-pannel/assessment/add-assessment",
        current: true,
      },
      {
        name: "Assesment List",
        link: "/dashboard/admin-pannel/assessment/assesment-list",
        current: false,
      },
      {
        name: "Add Question",
        link: "/dashboard/admin-pannel/assessment/upload-csv",
        current: false,
      },
    ],
  },
  
  {
    name: "Lectures",
    parrentLink: "/dashboard/admin-pannel/lecture",
    submenu: [
      {
        name: "Add Lecture",
        link: "/dashboard/admin-pannel/lecture/add-lectures",
        current: false,
      },
      {
        name: "Lecture List",
        link: "/dashboard/admin-pannel/lecture/lectures-list",
        current: false,
      },

      {
        name: "Module List",
        link: "/dashboard/admin-pannel/lecture/module-list",
        current: false,
      },
      {
        name: "Add Assignment",
        link: "/dashboard/admin-pannel/lecture/add-assignment",
        current: false,
      },
      {
        name: "Assignment List",
        link: "/dashboard/admin-pannel/lecture/assignment-list",
        current: false,
      },
      {
        name: "Add Exercise",
        link: "/dashboard/admin-pannel/lecture/add-exercise",
        current: false,
      },
      {
        name: "Exercise List",
        link: "/dashboard/admin-pannel/lecture/exercise-list",
        current: false,
      },
    ],
  },
 
  {
    name: "Course",
    parrentLink: "/dashboard/admin-pannel/course",
    submenu: [
      {
        name: "Add Course",
        link: "/dashboard/admin-pannel/course/add-course",
        current: false,
      },
      {
        name: "Course List",
        link: "/dashboard/admin-pannel/course/course-list",
        current: false,
      },
      
      {
        name: "Add Program",
        link: "/dashboard/admin-pannel/course/add-program",
        current: false,
      },
      {
        name: "Program List",
        link: "/dashboard/admin-pannel/course/program-list",
        current: false,
      },
      {
        name: "Add Batch",
        link: "/dashboard/admin-pannel/course/add-batch",
        current: false,
      },
      {
        name: "Batch List",
        link: "/dashboard/admin-pannel/course/batch-list",
        current: false,
      },
    ],
  },
  
  {
    name: "Others",
    parrentLink: "/dashboard/admin-pannel/others",
    submenu: [
      {
        name: "Users",
        link: "/dashboard/admin-pannel/others/users",
        current: false,
      },
      {
        name: "Create Coupon",
        link: "/dashboard/admin-pannel/others/create-coupon",
        current: false,
      },
      {
        name: "Coupon List",
        link: "/dashboard/admin-pannel/others/coupon-list",
        current: false,
      },
      {
        name: "Exercise Response",
        link: "/dashboard/admin-pannel/others/exercise-response",
        current: false,
      },
      {
        name: "Add Student",
        link: "/dashboard/admin-pannel/others/add-student",
        current: false,
      },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [currentPath, setCurrrentPath] = useState("");
  useLocation();
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrrentPath(window.location.pathname);
    };
    return handleLocationChange();
  });

  // console.log("location: ", location);
  return (
    <Disclosure as="nav" className="md:my-5 lg:my-0 ">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 font-poppins">
            <div className="relative flex h-16 items-center justify-end sm:justify-between w-full">
              <div className="hidden  sm:flex grow items-center justify-end sm:items-stretch w-full">
                <div className="hidden sm:ml-6 sm:block justify-end w-full">
                  <div className="flex w-full gap-4 lg:justify-end md:justify-center">
                    {navigation.map((item, i) => (
                      // dropdwon
                      <DropDown key={i} item={item} currentPath={currentPath} />
                      // dropdwon
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon
                      className="block h-6 w-6 text-black font-bold"
                      aria-hidden="true"
                    />
                  ) : (
                    <Bars3Icon
                      className="block h-6 w-6 text-black"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className={`${
                    currentPath === item.link
                      ? "bg-gray-900 text-white"
                      : "text-gray-900 hover:bg-gray-700 hover:text-white"
                  }  block rounded-md px-3 py-2 text-base font-medium `}
                  // aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))} */}
              {navigation.map((item, i) => (
                // dropdwon
                <DropDown key={i} item={item} currentPath={currentPath} />
                // dropdwon
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
