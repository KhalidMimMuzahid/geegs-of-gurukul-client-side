// import React, { useEffect, useState } from "react";
// import { Drawer } from "flowbite";
// import style from "./dashboard.module.css";
// import { Link, Outlet } from "react-router-dom";
// const DashBoard = () => {
//   const [windowSize, setWindowSize] = useState();
//   // // options with default values
//   // let options
//   let drawer;
//   useEffect(() => {
//     let options = {
//       placement: "left",
//       backdrop: false,
//       bodyScrolling: false,
//       edge: true,
//       edgeOffset: "bottom-[600px]",
//       backdropClasses:
//         "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 relative top-[-200px] inset-0 z-30",
//       onHide: () => {
//         console.log("drawer is hidden");
//       },
//       onShow: () => {
//         console.log("drawer is shown");
//       },
//       onToggle: () => {
//         console.log("drawer has been toggled");
//       },
//     };
//     let $targetEl = document.getElementById("drawer-disabled-backdrop");
//     drawer = new Drawer($targetEl, options);
//   }, []);
//   useEffect(() => {
//     const width = window.screen.width;
//     console.log("width: ", width);
//   });
//   useEffect(() => {
//     const handleWindowResize = () => {
//       setWindowSize(window.innerWidth);
//     };
//     console.log("windowSize: ", windowSize);
//     window.addEventListener("resize", handleWindowResize);

//     return () => {
//       window.removeEventListener("resize", handleWindowResize);
//     };
//   });
//   return (
//     <div className="flex flex-row">
//       {/* <!-- drawer init and toggle --> */}

//       {/* <!-- drawer component --> */}
//       <div
//         id="drawer-disabled-backdrop"
//         class={`relative top-[0px] left-0 z-40 ${style.dashboardHeight}     ${
//           windowSize < 1024 && "transition-transform -translate-x-full"
//         } p-4 overflow-y-auto   bg-slate-200 w-80 dark:bg-gray-800`}
//         tabindex="-1"
//         aria-labelledby="drawer-disabled-backdrop-label"
//       >
//         <h5
//           id="drawer-disabled-backdrop-label"
//           class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
//         >
//           Dashboard
//         </h5>
//         <button
//           type="button"
//           data-drawer-hide="drawer-disabled-backdrop"
//           aria-controls="drawer-disabled-backdrop"
//           class=" lg:hidden  text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
//         >
//           <svg
//             aria-hidden="true"
//             class="w-5 h-5"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fill-rule="evenodd"
//               d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//               clip-rule="evenodd"
//             ></path>
//           </svg>
//           <span class="sr-only">Close menu</span>
//         </button>
//         <div class="py-4 overflow-y-auto">
//           <ul class="space-y-2 font-medium">
//             <li>
//               <Link
//                 to="/dashboard/assessment"
//                 class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 <svg
//                   aria-hidden="true"
//                   class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
//                 </svg>
//                 <span class="flex-1 ml-3 whitespace-nowrap">Assessment</span>
//                 {/* <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
//                   Pro
//                 </span> */}
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/analysis"
//                 class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 <svg
//                   aria-hidden="true"
//                   class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
//                 </svg>
//                 <span class="flex-1 ml-3 whitespace-nowrap">Analysis</span>
//                 {/* <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
//                   Pro
//                 </span> */}
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/practice"
//                 class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 <svg
//                   aria-hidden="true"
//                   class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
//                 </svg>
//                 <span class="flex-1 ml-3 whitespace-nowrap">Practice</span>
//                 {/* <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
//                   Pro
//                 </span> */}
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/admin-pannel"
//                 class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 <svg
//                   aria-hidden="true"
//                   class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
//                 </svg>
//                 <span class="flex-1 ml-3 whitespace-nowrap">Admin Panel</span>
//                 {/* <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
//                   Pro
//                 </span> */}
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default DashBoard;

import { useState } from "react";
import control from "../../assets/dashBoardIcon/control.png";
import logo from "../../assets/dashBoardIcon/logo.png";
import test from "../../assets/dashBoardIcon/test.png";
import analysis from "../../assets/dashBoardIcon/analysis.png";
import practice from "../../assets/dashBoardIcon/practice.png";
import adminPannel from "../../assets/dashBoardIcon/amin.png";
import { Link } from "react-router-dom";
const DashBoard = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Test", src: test, link: "/dashboard/assessment" },
    { title: "Analysis", src: analysis, link: "/dashboard/analysis" },
    { title: "Practice", src: practice, link: "/dashboard/practice" },
    {
      title: "Admin-Pannel",
      src: adminPannel,
      link: "/dashboard/admin-pannel",
    },
  ];

  return (
    <div className='flex'>
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt=''
        />
        <div className='flex gap-x-4 items-center'>
          <img
            src={logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            alt=''
          />
          <h1
            className={`text-gray-700 font-poppins origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Dashboard
          </h1>
        </div>
        <ul className='pt-6 font-poppins'>
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-600 text-sm items-center gap-x-4 
              ${"mt-2"} ${index === 0 && "bg-light-white"} `}
            >
              <img src={Menu.src} alt='' className='w-[25px]' />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className='h-screen flex-1 p-7'>
        <h1 className='text-2xl font-semibold '>Home Page</h1>
      </div>
    </div>
  );
};
export default DashBoard;
