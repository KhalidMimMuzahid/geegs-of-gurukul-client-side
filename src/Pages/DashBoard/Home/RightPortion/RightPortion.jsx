import React from "react";
import Notification from "./Notification/Notification";
import Stats from "./Stats/Stats";

const RightPortion = () => {
  return (
    <div className="flex flex-col gap-3">
          <Notification />
          <Stats/>
    </div>
  );
};

export default RightPortion;
