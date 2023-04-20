import React from "react";
import { Outlet } from "react-router-dom";

const Assesments = () => {
  return (
    <div className="relative ">
      <Outlet />
    </div>
  );
};

export default Assesments;
