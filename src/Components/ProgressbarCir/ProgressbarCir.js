import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressbarCir = ({ percentage, circleColor, textColor }) => {
  return (
    <div className="progess-bare" style={{ width: "120px", height: "120px" }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          rotation: 0.25,

          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: "butt",

          // Text size
          textSize: "16px",

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

          // Colors
          pathColor: circleColor,
          textColor: textColor,
          trailColor: "#d6d6d6",
          backgroundColor: "#cd0000",
        })}
      />
      ;
    </div>
  );
};

export default ProgressbarCir;
