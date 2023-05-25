import React from "react";
import { Outlet } from "react-router-dom";
// import UnderConstruction from "../../Components/UnderConstruction/UnderConstruction";

const Profile = () => {
  // return <UnderConstruction/>
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Profile;
