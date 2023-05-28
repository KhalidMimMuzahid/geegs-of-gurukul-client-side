import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import InstructionsModal from "../InstructionsModal/InstructionsModal";

const TestPageHeader = () => {
  const [open, setOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const dropdons = [
    {
      name: "Easy",
      path: "",
    },
    {
      name: "Medium",
      path: "",
    },
    {
      name: "Hard",
      path: "",
    },
  ];
  console.log(showInstructions);
  return (
    <div className="w-4/5 mx-auto my-3 flex justify-between">
      <div className=" max-w-[315px]">
        <div className="relative">
          <input
            type="search"
            placeholder="Search here"
            name="searchAssessment"
            className=" w-full rounded-3xl border-2 z-[998]"
          />
          <FaSearch className="text-[18px] absolute top-3 right-4 z-[999]" />
        </div>
      </div>
      <div className="relative">
        <button
          className=" flex justify-between px-4 py-2 border-2 border-black rounded-3xl w-full"
          type="button"
          onClick={() => setOpen(!open)}
        >
          Level
          <svg
            className={`w-5 h-5 ml-2 ${
              open ? "-rotate-180" : ""
            } transition-all duration-500`}
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        <div
          className={`absolute top-12 left-0 z-10 bg-white divide-y divide-gray-100 rounded-2xl shadow w-44 dark:bg-gray-700 easy-in-out transition-all duration-500 ${
            open ? "block" : "hidden top-5"
          }`}
        >
          <ul className="text-sm text-gray-700 rounded-2xl overflow-hidden shadow-lg">
            {dropdons?.map((dropdon) => (
              <li className="border border-gray-200">
                <Link
                  nk
                  href="#"
                  className="block px-4 py-2 text-center hover:text-white hover:bg-green-400 hover:scaleX(.75) transition-all duration-500"
                >
                  {dropdon?.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="">
        <button
          className=" flex justify-between px-4 py-2 border-2 border-black rounded-3xl w-full"
          type="button"
          onClick={() => setShowInstructions(true)}
        >
          Level
          <svg
            className={`w-5 h-5 ml-2 -rotate-90`}
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
      </div>
      {showInstructions && (
        <>
          <div
            onClick={() => setShowInstructions(false)}
            className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-[20010] outline-none focus:outline-none h-100 mx-4"
          >
            <div className="relative w-full h-[800px] sm:w-[500px] md:w-[750px] lg:w-[900px]  py-5 sm:py-5 lg:py-5 px-5 sm:px-5 md:px-6 mx-4 bg-white rounded-lg shadow-2xl overflow-y-hidden overflow-y-scroll">
              <h3 className="text-2xl bold font-poppins font-medium my-5 text-center z-[20020]">
                Instructions
              </h3>
              <div className="content">
                <h3>
                  Sure! Here's an example of instructions you can include before
                  students start the coding Test:
                </h3>
                <h3 className="my-3">Welcome to the Coding Test!</h3>
                <h3>
                  Before you begin, please read the following instructions
                  carefully:
                </h3>

                <div className="mb-4 text-left flex gap-3 text-lg">
                  <h1>1.</h1>
                  <p>
                    <strong>Time Limit:</strong> This Test has a time limit of
                    [10min] minutes. Make sure you manage your time effectively
                    to answer as many questions as possible.
                  </p>
                </div>
                <div className="mb-4 text-left flex gap-3 text-lg">
                  <h1>2.</h1>
                  <p>
                    <strong>Multiple-Choice Questions (MCQs):</strong> The quiz
                    consists of multiple-choice questions. Each question will
                    have multiple options, and you need to select the correct
                    one.
                  </p>
                </div>
                <div className="mb-4 text-left flex gap-3 text-lg">
                  <h1>3.</h1>
                  <p>
                    <strong>Single Answer:</strong> Each MCQ has only one
                    correct answer. Choose the option that you think is the most
                    appropriate.
                  </p>
                </div>
                <div className="mb-4 text-left flex gap-3 text-lg">
                  <h1>4.</h1>
                  <p>
                    <strong>Progress:</strong> You can track your progress using
                    the progress bar at the top of the screen. It will show you
                    the number of questions you have completed and how many are
                    remaining.
                  </p>
                </div>
                <div className="mb-4 text-left flex gap-3 text-lg">
                  <h1>5.</h1>
                  <p>
                    <strong>Skipping Questions:</strong> If you are unsure about
                    an answer, you can skip the question and come back to it
                    later. However, keep in mind that you cannot revisit a
                    skipped question once you submit the quiz.
                  </p>
                </div>
                <div className="mb-4 text-left flex gap-3 text-lg">
                  <h1>6.</h1>
                  <p>
                    <strong>Final Submission:</strong> Once you have completed
                    all the questions or the time is up, click on the "Submit"
                    button to finish the quiz. Make sure you have answered all
                    the questions you want to attempt before submitting.
                  </p>
                </div>
                <div className="mb-4 text-left flex gap-3 text-lg">
                  <h1>7.</h1>
                  <p>
                    <strong>Scoring:</strong> The quiz will be automatically
                    scored once you submit it. You will receive your score and
                    feedback on your performance.
                  </p>
                </div>
                <div className="mb-4 text-left flex gap-3 text-lg">
                  <h1>8.</h1>
                  <p>
                    <strong>Technical Issues:</strong> In case of any technical
                    issues or difficulties during the quiz, please contact the
                    support team immediately for assistance.
                  </p>
                </div>
                <div className="mb-4 text-left flex gap-3 text-lg">
                  <h1>9.</h1>
                  <p>
                    <strong>Honesty and Integrity:</strong> Remember to maintain
                    academic honesty and integrity while attempting the quiz. Do
                    not use any external resources or help from others.
                  </p>
                </div>
                <div className="mb-4 text-left flex gap-3 text-lg">
                  <h1>10.</h1>
                  <p>
                    <strong>Have Fun and Good Luck:</strong> Enjoy the quiz and
                    test your coding knowledge! Good luck with your answers!
                  </p>
                </div>
                <div className="mb-4 text-left flex gap-3 text-lg">
                  <h1>11.</h1>
                  <div className="flex gap-4">
                    <strong>Color scheme: </strong>
                    <div className="grid grid-cols-2 gap-3 justify-start">
                      <div className="flex gap-2 items-center">
                        <button className="px-3 py-2 shadow-lg rounded-full bg-[#A5A7A5] text-white">
                          01
                        </button>
                        <h3>Not Attempted and unseen</h3>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-2 shadow-lg rounded-full bg-[#27DC69] text-white border-2 border-red-400">
                          02
                        </button>
                        <h3>Marked and Attempted</h3>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-2 shadow-lg rounded-full border-2 border-green-400">
                          03
                        </button>
                        <h3>Not Attempted and seen</h3>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-2 shadow-lg rounded-full border-2 border-red-400">
                          04
                        </button>
                        <h3>Marked and Not Attempted</h3>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-2 shadow-lg rounded-full bg-[#27DC69] text-white">
                          05
                        </button>
                        <h3>Attempted and seen</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-5">
                  <p className="text-lg">
                    Now, you're ready to start the quiz. Click on the "Start
                    Quiz" button below to begin
                  </p>
                </div>
                <div className="flex justify-center gap-4 ">
                  <button className="text-white bg-gray-600 px-5 py-2 hover:bg-gray-600/90 rounded-lg">
                    Cancel
                  </button>
                  <button className="text-white bg-green-500 px-5 py-2 hover:bg-green-500/90 rounded-lg">
                    Start
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
        </>
      )}
    </div>
  );
};

export default TestPageHeader;
