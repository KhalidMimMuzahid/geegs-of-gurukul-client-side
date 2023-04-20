import React from "react";
import style from "../Courses/course.module.css";
import EachModule from "./EachModule/EachModule";
import { Link } from "react-router-dom";
const SpecificCourse = () => {
  const modules = [
    { moduleName: "Html", instructor: "Rashal", time: "3:20", totalLecture: 5, },
    { moduleName: "Css", instructor: "Rashal", time: "3:20", totalLecture: 5, },
    { moduleName: "Javascript", instructor: "Rashal", time: "3:20", totalLecture: 5, },
    { moduleName: "java", instructor: "Rashal", time: "3:20", totalLecture: 5, },
  ];
  return (
    <div>
      <div className={`${style.titleCourse} `}>
        <h1>SpecificCourse</h1>
      </div>

      <div className=" max-w-screen-md m-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-7 pt-4 px-5">
          {modules?.map((module, i) => (
            <EachModule key={i} module={module} />
          ))}
        </div>
      </div>
      <div>
        <Link to="/dashboard/courses/module">go to specific module page</Link>
      </div>
    </div>
  );
};

export default SpecificCourse;
