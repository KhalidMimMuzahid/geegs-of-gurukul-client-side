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
import Pdf from "react-to-pdf";
import { Link, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import ReviewAnswerModal from "./ReviewAnswerModal/ReviewAnswerModal";
import OpenModal from "./ReviewAnswerModal/OpenModal/OpenModal";
// import ReviewAnswerModal from "./ReviewAnswerModal/ReviewAnswerModal";
const ref = React.createRef();

const Analysis = () => {
  const [response, setResponse] = useState({});
  const [assessment, setAssessment] = useState({});
  const [aboutResponse, setAboutResponse] = useState({});
  const [strength, setStrength] = useState([]);
  const [average, setAverage] = useState([]);
  const [haveToImprove, setHaveToImprove] = useState([]);
  // for open Modal
  // const [open, setOpen] = useState(false);
  // const openModal = () => setOpen(true);
  // const closeModal = () => setOpen(false);

  const [categories, setCategories] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [wrong, setWrong] = useState([]);
  const [notAttempt, setNotAttempt] = useState([]);
  const responseTemp = useLoaderData();
  // setAboutResponse(response?.aboutResponse);
  console.log("responseTemp: ", responseTemp);

  useEffect(() => {
    // const responseString = localStorage.getItem("response");
    // const responseParse = JSON.parse(responseString);

    // setResponse(responseParse);
    setResponse(responseTemp);
    setAboutResponse(responseTemp?.aboutResponse);
    //
    fetch(
      `https://geeks-of-gurukul-server-side.vercel.app/assessment?_id=${responseTemp?.assessmentId}`
    ).then((res) =>
      res.json().then((data) => {
        setAssessment(data);
        console.log(data);
      })
    );
  }, [responseTemp]);
  const { startedAt, studentEmail, takenTimeToFinish, totalMark } = response;
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
      {/* <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={ open ? closeModal : openModal}
        className='px-2 py-2 mx-4 my-8 float-right rounded-xl bg-green-300 font-medium font-poppins'
      >
        Review Answer open= {open? "true": "false"}
      </motion.button> */}
      <OpenModal response={response} assessment={assessment} />
      <OverView aboutResponse={aboutResponse} totalMark={totalMark} />
      <div>{strength?.length > 0 && <Strength strength={strength} />}</div>
      <div>{average?.length > 0 && <Average average={average} />}</div>
      <div>
        {haveToImprove?.length > 0 && (
          <AreaOfImprovement haveToImprove={haveToImprove} />
        )}
      </div>
      <div>
        {/* for pdf */}
        <Pdf targetRef={ref} filename={`report.pdf`}>
          {({ toPdf }) => (
            <div ref={ref}>
              <div>
                <button
                  className="px-2 py-2 bg-green-400 float-right font-poppins text-white"
                  onClick={toPdf}
                >
                  Download Report
                </button>
                <StackedColumnChat
                  categories={categories}
                  correct={correct}
                  wrong={wrong}
                  notAttempt={notAttempt}
                />
              </div>
              <div>
                {/* <h1 className="text-xl font-bold">Topic-wise Analysis :</h1> */}
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
            </div>
          )}
        </Pdf>
        {/* for pdf */}
      </div>

      {/* <Recomandation /> */}
      {/* <LeaderBoard /> */}

      {/* modal body */}

      {/* {open && (
        // <!-- Modal HTML structure -->
        <ReviewAnswerModal
          aboutResponse={aboutResponse}
          openModal={openModal}
          closeModal={closeModal}
          assessment={assessment}
        />
      )} */}
    </div>
  );
};

export default Analysis;
