import React, { useState, useEffect } from "react";

function Timer({ duration, setTakenTimeToFinish }) {
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (currentTime >= duration) {
      setTakenTimeToFinish((prevTime) => {
        console.log(prevTime + 1);
        return ++prevTime;
      });
    } else {
      setTakenTimeToFinish(currentTime);
      console.log(currentTime);
    }
  }, [currentTime]);

  const minutes = Math.floor((duration * 60 - currentTime) / 60);
  const seconds = (duration * 60 - currentTime) % 60;
  const totalTime =
    (minutes < 10 && minutes >= 0 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 && seconds >= 0 ? "0" + seconds : seconds);

  const progress = (currentTime / (duration * 60)) * 100;
  const progressWidth = progress + "%";

  const additionalMinutes = Math.floor((currentTime - duration * 60) / 60);
  const additionalSeconds = (currentTime - duration * 60) % 60;
  const additionalTime =
    (additionalMinutes < 10 && additionalMinutes >= 0
      ? "0" + additionalMinutes
      : additionalMinutes) +
    ":" +
    (additionalSeconds < 10 && additionalSeconds >= 0
      ? "0" + additionalSeconds
      : additionalSeconds);

  const progressColor =
    progress <= 50
      ? "#27DC69"
      : progress >= 50 && progress <= 90
      ? "#EED202"
      : "#FF0000";

  //   const children = (remainingTime) => {
  //     if (remainingTime > 0) {
  //       setTakenTimeToFinish(assessment?.duration * 60 - remainingTime);
  //     } else {
  //       setInterval(() => {
  //         setTakenTimeToFinish((prev) => ++prev);
  //       }, 1000);
  //     }
  //   };

  return (
    <>
      <p className="z-20">
        {progress < 100
          ? "Total time: " + totalTime
          : "Overtime: " + additionalTime}
      </p>
      <div
        className="absolute top-0 left-0 h-full z-10 rounded-lg transition-all duration-200 max-w-[100%]"
        style={{ width: progressWidth, backgroundColor: progressColor }}
      ></div>
    </>
  );
}

export default Timer;
