import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import style from "../onProcessinAssesments.module.css";
import EachQuesNo from "./EachQuesNo/EachQuesNo";
import Timer from "./Timer/Timer";
const AssessmentHead = ({
  setTakenTimeToFinish,
  assessment,
  questions,
  selectedQuestion,
  setSelectedQuestion,
  seenQuestionId,
  setIsMarkedQuestionId,
  isMarkedQuestionId,
  selectTheSelectedQuestionIndexWithIndex,
  setChosenAnswers,
  chosenAnswers,
}) => {
  const [isMarke, setIsMark] = useState(true);
  const [extraTime, setExtraTime] = useState(0);
  // const [remainingTime, setRemainingTime] = useState(25 * 60);
  const handleIncrisingExtraTime = () => {};
  const children = (remainingTime) => {
    if (remainingTime > 0) {
      setTakenTimeToFinish(assessment?.duration * 60 - remainingTime);
    } else {
      setInterval(() => {
        setTakenTimeToFinish((prev) => ++prev);
      }, 1000);
    }
  };
  const handleResetQuestion = () => {
    setChosenAnswers((prev) => {
      const newchosenAnswers = prev.filter(
        (each) => each?.questionId !== selectedQuestion?._id
      );
      return newchosenAnswers;
    });
  };
  const handleMarkQuestion = () => {
    const isAlreadyInisMarkedQuestionIdArray = isMarkedQuestionId.find(
      (_id) => _id === selectedQuestion?._id
    );
    if (!isAlreadyInisMarkedQuestionIdArray) {
      // setIsMark(true);
      setIsMarkedQuestionId((prev) => {
        const newMarketQuestionId = [...prev, selectedQuestion?._id];
        return newMarketQuestionId;
      });
    } else {
      // setIsMark(false);
      const newSetIsMarkedQuestionId = isMarkedQuestionId?.filter(
        (each) => each !== selectedQuestion?._id
      );
      setIsMarkedQuestionId(newSetIsMarkedQuestionId);
    }
  };
  useEffect(() => {
    const isAlreadyInisMarkedQuestionIdArray = isMarkedQuestionId.find(
      (_id) => _id === selectedQuestion?._id
    );
    if (isAlreadyInisMarkedQuestionIdArray) {
      setIsMark(true);
    } else {
      setIsMark(false);
    }
  }, [selectedQuestion, isMarke, isMarkedQuestionId]);
  return (
    <div>
      {/* 1st portion */}
      <h3 className="text-black font-bold text-3xl ml-4">Time Left</h3>
      <div className="flex justify-center items-center mt-3">
        <CountdownCircleTimer
          isPlaying
          duration={assessment?.duration * 60}
          colors="#4cb08f"
          strokeWidth="16"
          onUpdate={(remainingTime) => children(remainingTime)}
        >
          {({ remainingTime }) => {
            if (remainingTime > 0) {
              const minutesLeft = Math.floor(remainingTime / 60);
              const secondsRemainder = remainingTime % 60;
              // const firstPart = `${minutesLeft < 10 ? 0${minutesLeft} : ${minutesLeft}}`
              const firstPart = `${
                minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft
              }`;
              const secondPart = `${
                secondsRemainder < 10
                  ? `0${secondsRemainder}`
                  : secondsRemainder
              }`;
              return `${firstPart} : ${secondPart}`;
            } else {
              return "Time Over";
            }
          }}
        </CountdownCircleTimer>

        {/* <Timer /> */}
      </div>
      {/* 2nd portion */}
      <div className="my-4 lg:my-12  rounded-lg shadow-lg border-2 p-4">
        <div className="flex gap-2 flex-wrap justify-center items-center">
          {questions?.map((eachQues, index) => (
            <EachQuesNo
              key={eachQues?._id}
              _id={eachQues?._id}
              eachQues={eachQues}
              index={index}
              selectTheSelectedQuestionIndexWithIndex={
                selectTheSelectedQuestionIndexWithIndex
              }
              selectedQuestion={selectedQuestion}
              seenQuestionId={seenQuestionId}
              isMarkedQuestionId={isMarkedQuestionId}
              chosenAnswers={chosenAnswers}
            />
          ))}
        </div>
      </div>
      {/* progress bar */}

      <div class="w-full my-4 lg:my-8 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          class="bg-green-400 h-2.5 rounded-full"
          style={{
            width: `${(chosenAnswers?.length / questions?.length) * 100}%`,
          }}
        ></div>
      </div>
      <div className={`${style?.resultBtn} mt-4 flex justify-center gap-4 `}>
        <button
          onClick={handleMarkQuestion}
          type="button"
          className="grow font-bold  bg-gray-300 hover:bg-green-400"
        >
          {isMarke ? "Un Mark" : "Mark"}
        </button>
        <button
          onClick={handleResetQuestion}
          type="button"
          className="grow font-bold bg-gray-300 hover:bg-green-400"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default AssessmentHead;
