import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import OverView from "./OverView/OverView";
import Ratings from "./Ratings/Ratings";
import OverAll from "./OverAll/OverAll";
import Strength from "./Strength/Strength";
import AreaOfImprovement from "./AreaOfImprovement/AreaOfImprovement";
import Recomandation from "./Recomandation/Recomandation";
import LeaderBoard from "./LeaderBoard/LeaderBoard";

const Analysis = () => {
  return (
    <div>
      {/* <ProfileInfo /> */}
      <OverView />
      <OverAll />
      <Ratings />
      <Strength />
      <AreaOfImprovement />
      <Recomandation />
      <LeaderBoard />
    </div>
  );
};

export default Analysis;
