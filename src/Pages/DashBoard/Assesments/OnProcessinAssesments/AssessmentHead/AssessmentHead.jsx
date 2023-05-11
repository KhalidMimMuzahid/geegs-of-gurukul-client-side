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

  return (
    <div>
      {/* 1st portion */}
      {/* <h3 className="text-black font-bold text-3xl ml-4">Time Left</h3>  */}
      <div className="flex justify-center items-center mt-3 font-poppins font-semibold text-[22px] text-[#4BA25D]">
        <CountdownCircleTimer
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
        </CountdownCircleTimer>

        {/* <Timer /> */}
      </div>
      {/* 2nd portion */}
      <div className="my-2 lg:my-4  rounded-lg shadow-lg border-2 p-2">
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

      <div class="w-full my-2 lg:my-5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
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
          className="grow font-normal  bg-gray-300 hover:bg-[#53A871] hover:text-white"
        >
          {isMarke ? "Un Mark" : "Mark"}
        </button>
        <button
          onClick={handleResetQuestion}
          type="button"
          className="grow font-normal bg-gray-300 hover:bg-[#53A871] hover:text-white"
        >
          Reset
        </button>
      </div>
      <button
        onClick={() => setShowInstructions(true)}
        className="my-3 flex items-center gap-2"
      >
        <span className="hover:underline">See Instructions</span>
        <span>
          <FaAngleRight className="text-3xl" />
        </span>
      </button>
      {showInstructions && (
        <>
          <div
            onClick={() => setShowInstructions(false)}
            className="modal justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none"
          >
            <div className="relative w-[360px] h-[600px] sm:w-[400px] md:w-[600px] lg-[700px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-auto max-w-3xl  bg-white rounded-lg shadow-2xl">
              <h3 className="text-2xl font-poppins font-medium mt-1">
                Instructions:
              </h3>
              <div className=" mt-6 w-full h-4/5 p-4 mx-auto bg-white border border-green-400 rounded-md overflow-x-auto overflow-y-auto">
                {/* content */}
                <div>
                  <h3 className="text-base font-normal my-3">
                    {`Time allocated for this examination is ${
                      totalQuestions * 1
                    } mins`}
                  </h3>
                  <h3 className="text-base font-normal mt-3">
                    {`This paper consists of 1 section ${totalQuestions} questions`}
                  </h3>
                  <p className="font-poppins">{`(${totalQuestions} questions - ${
                    totalQuestions * 1
                  } marks)`}</p>
                  <h3 className="text-base font-normal my-3">
                    When the timer (at top right) reaches zero, your time is up
                    but you still can continue with assesment. Extra Time will
                    be counted.
                  </h3>
                  <h3 className="text-base font-normal my-3">
                    Positive and Negetive marks assosiacted with the questions
                    are displayed at top-right.
                  </h3>
                  <h3 className="text-base font-normal my-3">
                    Colour-Scheme for question navigation-panel:
                  </h3>

                  <div className="flex justify-start items-center gap-3">
                    <div className="w-6 h-6 rounded-full border border-gray-400 bg-white mb-2"></div>
                    <p>You have not visited the question yet</p>
                  </div>

                  <div className="flex justify-start items-center gap-3">
                    <div className="w-6 h-6 rounded-full border border-gray-400 bg-[#cd7c7c] mb-2"></div>
                    <p>You have not answered the question</p>
                  </div>

                  <div className="flex justify-start items-center gap-3">
                    <div className="w-6 h-6 rounded-full border border-gray-400 bg-[#a5cd7c]"></div>
                    <p>You have answered the question</p>
                  </div>

                  <div className="flex justify-start items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#cd7c7c] border-black border-4"></div>
                    <p>
                      You have not answered the question, but have marked it for
                      review
                    </p>
                  </div>

                  <div className="flex justify-start items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#a5cd7c] border-black border-4"></div>
                    <p>
                      You have answered the question, but marked it for review
                    </p>
                  </div>

                  <h3 className="text-base font-normal font-poppins my-3">
                    The Marked status for a question simply indicates that you
                    would like to look at that question again. If a question is
                    answered and marked, answer for that question will be
                    considered in evaluation.
                  </h3>
                  <h3 className="font-poppins text-base">
                    Quant: Progreession and Series
                  </h3>
                </div>
                <div className="text-right ">
                  <label
                    onClick={() => setShowInstructions(false)}
                    // htmlFor="test-modal"
                    className="py-2 px-4 rounded-md font-semibold text-white text-md bg-[#088234b3] border-none cursor-pointer "
                  >
                    Begin Test
                  </label>
                </div>

                {/* content */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
        </>
      )}
    </div>
  );
};

export default AssessmentHead;
