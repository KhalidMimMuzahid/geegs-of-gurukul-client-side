import React from "react";
import { Outlet } from "react-router-dom";
import TestPageHeader from "./TestPageHeader/TestPageHeader";

const Assesments = () => {
  return (
    <div className="relative ">
      <TestPageHeader />
      <Outlet />
    </div>
  );
};

export default Assesments;
