import React from "react";
import anouncement from "../../assets/Anouncement/anouncement.svg";
import { useState } from "react";
import UnderConstruction from "../../Components/UnderConstruction/UnderConstruction";
const Announcement = () => {
  return (
    <div className="">
      <UnderConstruction/>
      {/* <div className="relative bg-white w-[90vw] h-4/5 mx-auto my-8 rounded-xl">
        <h3 className="font-poppins p-12 font-medium">Announcement</h3>
        <div className="flex flex-col items-center justify-center">
          <p className="font-poppins font-normal">
            You dont receive any Announcement{" "}
          </p>
          <img src={anouncement} alt="" />
        </div>
      </div> */}
    </div>
  );
};

export default Announcement;
