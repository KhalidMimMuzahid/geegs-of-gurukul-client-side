import React from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

const AdminPannel = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default AdminPannel;
