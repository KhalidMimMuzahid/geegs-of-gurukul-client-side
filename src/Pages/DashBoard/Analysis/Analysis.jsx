import React, { useEffect, useState } from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import OverView from "./OverView/OverView";
import Ratings from "./Ratings/Ratings";
import OverAll from "./OverAll/OverAll";
import Strength from "./Strength/Strength";
import AreaOfImprovement from "./AreaOfImprovement/AreaOfImprovement";
import Recomandation from "./Recomandation/Recomandation";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import Average from "./Average/Average";
import StackedColumnChat from "./StackedColumnChat/StackedColumnChat";

const Analysis = () => {
  const [response, setResponse] = useState({});
  const [aboutResponse, setAboutResponse] = useState({});
  const [strength, setStrength] = useState([]);
  const [average, setAverage] = useState([]);
  const [haveToImprove, setHaveToImprove] = useState([]);
  const { startedAt, studentEmail, takenTimeToFinish, totalMark } = response;
  useEffect(() => {
    const responseString = localStorage.getItem("response");
    const responseParse = JSON.parse(responseString);

    setResponse(responseParse);
    setAboutResponse(responseParse?.aboutResponse);
    console.log("responseParse: ", responseParse);
    console.log("aboutResponse: ", responseParse?.aboutResponse);
  }, []);
  useEffect(() => {
    setStrength([]);
    setAverage([]);
    setHaveToImprove([]);
    aboutResponse?.successRate?.forEach((eachRes) => {
      if (eachRes?.successRate > 70) {
        setStrength((prev) => [...prev, eachRes]);
      } else if (eachRes?.successRate > 50) {
        setAverage((prev) => [...prev, eachRes]);
      } else {
        setHaveToImprove((prev) => [...prev, eachRes]);
      }
    });
  }, [aboutResponse]);
  const xxx = () => {
    console.log("strength: ", strength);
    console.log("average: ", average);
    console.log("haveToImprove: ", haveToImprove);
  };

  return (
    <div className="p-16">
      <ProfileInfo />

      <button className="px-2 py-2 mx-4 my-8 float-right rounded-xl bg-green-300 font-medium font-poppins">
        Review Answer
      </button>

      {/* <button className='px-2 py-2 mx-4 my-8 float-right rounded-xl bg-green-300 font-medium font-poppins'>Review Answer</button> */}

      <OverView aboutResponse={aboutResponse} totalMark={totalMark} />
      {/* <OverAll /> */}
      {/* <Ratings /> */}
      <div>{strength?.length > 0 && <Strength strength={strength} />}</div>
      <div>{average?.length > 0 && <Average average={average} />}</div>
      <div>
        {haveToImprove?.length > 0 && (
          <AreaOfImprovement haveToImprove={haveToImprove} />
        )}
      </div>
      {/* <AreaOfImprovement /> */}
      {/* <StackedColumnsChart data={data} /> */}
      <StackedColumnChat />
      {/* <Recomandation /> */}
      {/* <LeaderBoard /> */}
    </div>
  );
};

export default Analysis;
