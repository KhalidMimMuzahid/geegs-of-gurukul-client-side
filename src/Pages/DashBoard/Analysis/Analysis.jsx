import React, { useEffect, useState } from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import OverView from "./OverView/OverView";
import Ratings from "./Ratings/Ratings";
import OverAll from "./OverAll/OverAll";
import Strength from "./Strength/Strength";
import AreaOfImprovement from "./AreaOfImprovement/AreaOfImprovement";
import Recomandation from "./Recomandation/Recomandation";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import StackedColumnsChart from "../../../Components/StackedColumnsChart/StackedColumnsChart";

const Analysis = () => {
  const data = [
    {
      name: "Correct",
      data: [20, 30, 40],
    },
    {
      name: "Incorrect",
      data: [30, 40, 50],
    },
    {
      name: "Not Attempt",
      data: [10, 20, 30],
    },
  ];
  return (
    <div className="p-16">
      <ProfileInfo />
      <button className="px-2 py-2 mx-4 my-8 float-right rounded-xl bg-green-300 font-medium font-poppins">
        Review Answer
      </button>
      <OverView />
      <OverAll />
      <Ratings />
      <Strength />
      <AreaOfImprovement />
      <StackedColumnsChart data={data} />
      <Recomandation />
      <LeaderBoard />
    </div>
  );
};

export default Analysis;
