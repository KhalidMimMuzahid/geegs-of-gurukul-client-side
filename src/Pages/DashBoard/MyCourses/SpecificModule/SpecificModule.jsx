import React from "react";
import EachLecture from "./EachLecture/EachLecture";
import { Link } from "react-router-dom";

const SpecificModule = () => {
  const lectures = [
    { lectureName: "java", instructor: "Rashal", time: "3:20" },
    { lectureName: "Html", instructor: "Rashal", time: "3:20" },
    { lectureName: "Css", instructor: "Rashal", time: "3:20" },
    { lectureName: "javascript", instructor: "Rashal", time: "3:20" },
  ];
  return (
    <div>
      <h1>modules</h1>
      <div className=" max-w-screen-md m-auto">
        {lectures?.map((lecture, i) => (
          <EachLecture key={i} lecture={lecture} />
        ))}
      </div>
      <div>
        <Link to="/dashboard/courses/lecture">go to specific lecture page</Link>
      </div>
    </div>
  );
};

export default SpecificModule;
