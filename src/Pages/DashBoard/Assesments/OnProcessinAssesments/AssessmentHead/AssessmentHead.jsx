import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import style from "../onProcessinAssesments.module.css";
import EachQuesNo from "./EachQuesNo/EachQuesNo";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
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
  totalQuestions,
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
  // State for showing instruction modal
  const [showInstructions, setShowInstructions] = useState(true);
  useEffect(() => {
    setInterval(() => {
      if (assessment?.duration > 0) {
        let time = assessment?.duration - 1;
        setExtraTime(time);
      }
    }, 1000);
  }, [assessment?.duration]);
  return (
    <div>
      <div className="h-[610px] flex flex-col justify-center mt-3 font-poppins font-semibold text-[22px] text-[#4BA25D] shadow-2xl rounded-2xl bg-white">
        {/* <Timer /> */}
        <div className="w-11/12 mx-auto">
          <h1 className="text-2xl text-black text-center">
            Total Time - 14:08
          </h1>
          {/* <CountdownCircleTimer
            isPlaying
            duration={assessment?.duration * 60}
            // duration={totalQuestions *60}
            colors={["#3DC86F", "#b9ff78", "#ffff78", "#ff6d24", "#FF0000"]}
            colorsTime={[300, 270, 240, 210, 0]}
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
          </CountdownCircleTimer> */}

          {/* 2nd portion */}
          <div className="my-4 lg:my-4">
            <div className="grid grid-cols-5 gap-8">
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
          <div className="h-[115px] bg-[#40444C] mt-8 rounded-3xl p-5">
            {/* progress bar */}
            <h1 className="text-lg font-medium text-white">Your Answers</h1>
            <p className="text-sm text-white font-medium">
              Please complete all the question.
            </p>
            <div class="w-full my-2 lg:my-5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                class="bg-green-400 h-2.5 rounded-full"
                style={{
                  width: `${
                    (chosenAnswers?.length / questions?.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <div
            className={`${style?.resultBtn} mt-6 flex justify-center gap-4 `}
          >
            <button
              onClick={handleMarkQuestion}
              type="button"
              className="grow font-normal bg-gray-300 hover:bg-[#53A871] hover:text-white rounded-lg transition-all duration-500"
            >
              {isMarke ? "Un Mark" : "Mark"}
            </button>
            <button
              onClick={handleResetQuestion}
              type="button"
              className="grow font-normal bg-gray-300 hover:bg-[#53A871] hover:text-white rounded-lg transition-all duration-500"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentHead;

{
  /* <CountdownCircleTimer
isPlaying
duration={assessment?.duration * 60}
colorsTime={[300, 270, 240, 210, 0]}
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
</CountdownCircleTimer> */
}
