import React from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

const AdminPannel = () => {
  return (
    <div
    //  className="relative top-[-20px] sm:top-[20px] md:top-[-5px] lg:top-[14px] "
    >
      {/* <div className="top-0 sticky"> */}
      <Header />
      {/* </div> */}

      <Outlet />
    </div>
  );
};

export default AdminPannel;
