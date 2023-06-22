import React from "react";
import robot from "../../../assets/Home/robot.svg";
import book from "../../../assets/Home/book.svg";
import calendar from "../../../assets/Home/calendar.svg";
import user from "../../../assets/Home/profile.svg";
import Clock from "../../../assets/Home/Clock.svg";
import assignment from "../../../assets/Home/Assignment.svg";
import announcement from "../../../assets/Home/Announcements.svg";
import arrow from "../../../assets/Home/arrow.svg";
import green from "../../../assets/Home/cardGreen.svg";
import orange from "../../../assets/Home/cardOrange.svg";
import red from "../../../assets/Home/cardChoco.svg";
import ProgressbarCir from "../../../Components/ProgressbarCir/ProgressbarCir";
import RightPortion from "./RightPortion/RightPortion";
import LeftPortion from "./LeftPortion/LeftPortion";

const Home = () => {
  return (
    <div className='grid grid-cols-12 font-poppins'>
      {/* Left side */}
      <div className="m-3 col-span-full lg:col-span-7">
        <LeftPortion/>
      </div>
      {/* Right side */}
      <div className="m-3 col-span-full lg:col-span-5">
      <RightPortion/>
    </div>
    </div>
  );
};

export default Home;
