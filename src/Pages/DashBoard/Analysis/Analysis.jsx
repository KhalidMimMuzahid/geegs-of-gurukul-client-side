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
import PieChart from "./PieChart/PieChart";
import SpiderChart from "./SpiderChart/SpiderChart";

const Analysis = () => {
  const [response, setResponse] = useState({});
  const [aboutResponse, setAboutResponse] = useState({});
  const [strength, setStrength] = useState([]);
  const [average, setAverage] = useState([]);
  const [haveToImprove, setHaveToImprove] = useState([]);
  const { startedAt, studentEmail, takenTimeToFinish, totalMark } = response;

  const [categories, setCategories] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [wrong, setWrong] = useState([]);
  const [notAttempt, setNotAttempt] = useState([]);
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
    setCategories([]);
    setCorrect([]);
    setWrong([]);
    setNotAttempt([]);
    aboutResponse?.topicsDetails?.forEach((eachRes) => {
      if (eachRes?.abilityRate > 70) {
        setStrength((prev) => [...prev, eachRes]);
      } else if (eachRes?.abilityRate > 50) {
        setAverage((prev) => [...prev, eachRes]);
      } else {
        setHaveToImprove((prev) => [...prev, eachRes]);
      }
    });

    aboutResponse?.topicsDetails?.forEach((eachRes) => {
      setCategories((prev) => [...prev, eachRes?.topicName]);

      setCorrect((prev) => [...prev, eachRes?.totalCorrect]);
      setWrong((prev) => [
        ...prev,
        eachRes?.totalAttempt - eachRes?.totalCorrect,
      ]);
      setNotAttempt((prev) => [
        ...prev,
        eachRes?.totalQuestions - eachRes?.totalAttempt,
      ]);
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
      {/* <button className="px-2 py-2 mx-4 my-8 float-right rounded-xl bg-green-300 font-medium font-poppins">
        Review Answer
      </button> */}
      {/* <button className='px-2 py-2 mx-4 my-8 float-right rounded-xl bg-green-300 font-medium font-poppins'>Review Answer</button> */}
      <OverView aboutResponse={aboutResponse} totalMark={totalMark} />
      <div>{strength?.length > 0 && <Strength strength={strength} />}</div>
      <div>{average?.length > 0 && <Average average={average} />}</div>
      <div>
        {haveToImprove?.length > 0 && (
          <AreaOfImprovement haveToImprove={haveToImprove} />
        )}
      </div>
      <div>
        <StackedColumnChat
          categories={categories}
          correct={correct}
          wrong={wrong}
          notAttempt={notAttempt}
        />
      </div>
      <div>
        <h1 className="text-xl font-bold">details Chart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-around">
          <div className="lg:relative top-[20px] justify-self-center">
            <PieChart
              details={[
                { skipped: aboutResponse?.skipped },
                { correct: aboutResponse?.correct },
                { wrong: aboutResponse?.wrong },
              ]}
            />
          </div>
          <div className="  justify-self-center">
            <SpiderChart topicsDetails={aboutResponse?.topicsDetails} />
          </div>
        </div>
      </div>

      {/* <Recomandation /> */}
      {/* <LeaderBoard /> */}
    </div>
  );
};

export default Analysis;
