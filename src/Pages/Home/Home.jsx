import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LectureScedule from "./LectureScedule/LectureScedule";
import DoughnutChart from "../../Components/DoughnutChart/DoughnutChart";
import QuizChart from "../../Components/QuizChart/QuizChart";
import AttendanceChart from "../../Components/AttendanceChart/AttendanceChart";
import styles from "./preassessment.module.css";
import PreQuestionire from "./PreQuestionire/PreQuestionire";
import moment from "moment/moment";
const Home = () => {
  const nowString = moment().format();
  const time = () => {
    // const nowString = moment().format();
    // const x = moment(nowString).calendar();
    console.log("nowString: ", nowString);
    // console.log("x: ", x);

    const nowStringvv = moment().format();
    const zzzz = nowStringvv - nowString;
    console.log("zzzz: ", zzzz);
  };
  return (
    <div className="">
      {/* <div>
        <LectureScedule />
        <LectureScedule />
      </div>

      <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5">
        <DoughnutChart />
        <QuizChart />
        <AttendanceChart />
      </div> */}
      {/* <PreQuestionire /> */}
      <button onClick={time}>xxxxxxxxxxxx</button>
    </div>
  );
};

export default Home;
