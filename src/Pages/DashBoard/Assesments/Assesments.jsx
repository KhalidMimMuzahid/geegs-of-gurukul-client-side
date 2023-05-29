import React from "react";
import { Outlet } from "react-router-dom";
import TestPageHeader from "./TestPageHeader/TestPageHeader";

const Assesments = () => {
  return (
    <div className="relative ">
      <Outlet />
    </div>
  );
};

export default Assesments;
