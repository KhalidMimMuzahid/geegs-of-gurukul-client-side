import React from "react";
import { Link } from "react-router-dom";
import style from "../../Courses/course.module.css";

const EachLecture = ({ lecture }) => {
  return (
    <Link className={`${style.li} `}>
      <h3>
        <span className="bold">Name : </span> {lecture?.lectureName}
      </h3>
      <h3>
        {" "}
        <span className="bold">Instructor : </span> {lecture?.instructor}
      </h3>
      <h3>
        <span className="bold"> Time : </span> {lecture?.time}
      </h3>
    </Link>
  );
};

export default EachLecture;
