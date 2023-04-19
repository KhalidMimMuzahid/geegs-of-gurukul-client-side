import React from "react";
import style from "../Courses/course.module.css";
import EachModule from "./EachModule/EachModule";
import { Link } from "react-router-dom";
const SpecificCourse = () => {
  const modules = [
    { moduleName: "Html", instructor: "Rashal", time: "3:20" },
    { moduleName: "Css", instructor: "Rashal", time: "3:20" },
    { moduleName: "java", instructor: "Rashal", time: "3:20" },
    { moduleName: "javascript", instructor: "Rashal", time: "3:20" },
  ];
  return (
    <div>
      <div className={`${style.titleCourse} `}>
        <h1>SpecificCourse</h1>
      </div>

      <div className=" max-w-screen-md m-auto">
        {modules?.map((module, i) => (
          <EachModule key={i} module={module} />
        ))}
      </div>
      <div>
        <Link to="/dashboard/courses/module">go to specific module page</Link>
      </div>
    </div>
  );
};

export default SpecificCourse;
