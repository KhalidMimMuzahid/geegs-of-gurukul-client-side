import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressbarCir = ({ percentage }) => {
  return (
    <div className="progess-bare">
      <CircularProgressbar value={percentage} text={`${percentage}%`} />;
    </div>
  );
};

export default ProgressbarCir;
