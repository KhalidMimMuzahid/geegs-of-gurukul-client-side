import React, { useEffect, useState } from "react";
import Navbar from "../../Shared/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Main = () => {
  const [shouldHiddenNav, setShouldHiddenNav] = useState(false);
  const [currentPath, setCurrrentPath] = useState("");

  useLocation();
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrrentPath(window.location.pathname);
    };
    return handleLocationChange();
  });

  useEffect(() => {
    // console.log("currentPath: ", currentPath);
    if (currentPath.startsWith("/dashboard/assessment/on-processing")) {
      setShouldHiddenNav(true);
    } else {
      setShouldHiddenNav(false);
    }
  }, [currentPath]);
  return (
    <div
      className="h-screen overflow-y-hidden"
      style={{ backgroundColor: "#FFF" }}
    >
      <div className="flex flex-col gap-4 container max-w-[1440px] mx-auto">
        <div style={{ display: `${shouldHiddenNav ? "none" : "block"}` }}>
          <Navbar />
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Main;
