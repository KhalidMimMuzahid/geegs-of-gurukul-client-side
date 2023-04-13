import React from "react";
import PreQuestionire from "./PreQuestionire/PreQuestionire";
import LectureScedule from "./LectureScedule/LectureScedule";
import OverallProgress from "./OverallProgress/OverallProgress";


const Home = () => {
  return (
    <div className="">
      {/* <PreQuestionire /> */}
      <LectureScedule/>
      <LectureScedule />
      <OverallProgress/>
    </div>
  );
};

export default Home;
