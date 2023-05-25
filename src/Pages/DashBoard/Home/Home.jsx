import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LectureScedule from "./LectureScedule/LectureScedule";

import styles from "./preassessment.module.css";
import PreQuestionire from "./PreQuestionire/PreQuestionire";
import moment from "moment/moment";
import AttendanceChart from "../../../Components/AttendanceChart/AttendanceChart";
import DoughnutChart from "../../../Components/DoughnutChart/DoughnutChart";
import QuizChart from "../../../Components/QuizChart/QuizChart";
import style from "./preassessment.module.css";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../contexts/UserProvider/UserProvider";
import UnderConstruction from "../../../Components/UnderConstruction/UnderConstruction";

const Home = () => {
  const { justCreatedUser } = useContext(AuthContext);
  console.log("justCreatedUser: ", justCreatedUser);

  // const nowString = moment().format();
  // const time = () => {
  //   // const nowString = moment().format();
  //   // const x = moment(nowString).calendar();
  //   console.log("nowString: ", nowString);
  //   // console.log("x: ", x);

  //   const nowStringvv = moment().format();
  //   const zzzz = nowStringvv - nowString;
  //   console.log("zzzz: ", zzzz);
  // };
  return (
    <div className="">
      <div className="mt-9"></div>
      {/* <div>
        <LectureScedule />
        <LectureScedule />
      </div>
      <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5">
        <DoughnutChart />
        <QuizChart />
        <AttendanceChart />
      </div> */}
      {/* <button onClick={time}>xxxxxxxxxxxx</button> */}

      {justCreatedUser && (
        <>
          {/* <h1>sddfddfvfdffdfdfd</h1> */}
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none">
            <div className="relative w-[360px]  sm:w-[400px] md:w-[600px] lg-[700px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-auto max-w-3xl  bg-white rounded-lg shadow-2xl">
              {/*content*/}

              <PreQuestionire />
      
            </div>
          </div>
          <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
        </>
      )}
    </div>
  );
};

export default Home;
