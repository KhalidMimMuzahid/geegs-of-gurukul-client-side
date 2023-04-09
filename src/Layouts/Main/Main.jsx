import React from "react";
import Navbar from "../../Shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="container max-w-[1440px] mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
