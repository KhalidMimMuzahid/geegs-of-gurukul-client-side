import React from "react";
import Cover from "./Cover/Cover";
import OverAll from "./OverAll/OverAll";
import TodaysScedule from "./TodaysScedule/TodaysScedule";

const LeftPortion = () => {
  return (
    <div className='flex flex-col gap-3'>
      <Cover />
      <OverAll />
      <TodaysScedule/>
    </div>
  );
};

export default LeftPortion;
