import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Shared/Navbar/Navbar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/UserProvider/UserProvider";
import Loader from "../../Components/Loader/Loader";

const Main = () => {
  const { user, loading, justCreatedUser } = useContext(AuthContext);
  const location = useLocation();
  console.log("location from main", location);
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (user?.email && justCreatedUser && location?.pathname !== "/") {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }

  return (
    <div
      className="h-screen overflow-y-hidden"
      style={{ backgroundColor: "#FFF" }}
    >
      <div className="flex flex-col gap-2 container max-w-[1440px] mx-auto">
        <div
        // style={{ display: `${shouldHiddenNav ? "none" : "block"}` }}
        >
          <Navbar />
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Main;
