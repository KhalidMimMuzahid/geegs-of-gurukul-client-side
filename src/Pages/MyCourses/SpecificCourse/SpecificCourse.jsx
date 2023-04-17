import React from "react";
import EachLecture from "./EachLecture/EachLecture";

const SpecificCourse = () => {
  const lectures = [
    { lectureName: "java" },
    { lectureName: "java" },
    { lectureName: "java" },
    { lectureName: "java" },
    { lectureName: "java" },
  ];
  return (
    <div>
      <h1>SpecificCourse</h1>
      <h1>lectures</h1>
      {lectures?.map((lecture, i) => (
        <EachLecture key={i} lecture={lecture} />
      ))}
    </div>
  );
};

export default SpecificCourse;
