import React from "react";
import { Outlet } from "react-router-dom";

const Assesments = () => {
  return (
    <div className=" h-full">
      <Outlet />
    </div>
  );
};

export default Assesments;
