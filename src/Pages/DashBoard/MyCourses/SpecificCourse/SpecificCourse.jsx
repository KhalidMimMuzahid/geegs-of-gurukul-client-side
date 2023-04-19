import React from "react";
import EachLecture from "./EachLecture/EachLecture";
import style from '../AllCourses/allCourse.module.css'
const SpecificCourse = () => {
  const lectures = [

    { lectureName: "java", instructor: "Rashal", time: "3:20" },
    { lectureName: "Html", instructor: "Rashal", time: "3:20" },
    { lectureName: "Css", instructor: "Rashal", time: "3:20" },
    { lectureName: "javascript", instructor: "Rashal", time: "3:20" },

  ];
  return (
    <div>
      <div className={`${style.titleCourse} `}>
        <h1>SpecificCourse</h1>
      </div>


      <div className=" max-w-screen-md m-auto">
        {lectures?.map((lecture, i) => (
          <EachLecture key={i} lecture={lecture} />
        ))}
      </div>
    </div>
  );
};

export default SpecificCourse;
