import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import time from "../../../../assets/TestIcons/time.svg";
import question from "../../../../assets/TestIcons/question.svg";
import Loading from "../../../../Components/Loading/Loading";
import { MdOutlineLock } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import InstructionsModal from "../InstructionsModal/InstructionsModal";
import TestPageHeader from "../TestPageHeader/TestPageHeader";

const Default = () => {
  const [assessments, setAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    fetch("https://geeks-of-gurukul-server-side.vercel.app/assessments")
      .then((res) => res.json())
      .then((assessments) => {
        console.log("Assessments: ", assessments);
        setAssessments(assessments);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return (
      <div className="h-[90vh] flex justify-center items-center">
        <Loading type={"search"} />
      </div>
    );
  }

  const handelClick = (id) => {
    setShowInstructions(true);
    setSelectedId(id);
    console.log(id, showInstructions);
  };
  console.log(assessments);
  return (
    <>
<<<<<<< HEAD
      <TestPageHeader setAssessments={setAssessments} />
=======
      <TestPageHeader />
>>>>>>> a30dde4bbb47f811b5f4121f2ec0ef40cb074266
      <div className="w-11/12 mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 pt-4 px-5">
        {assessments?.map((assessment, i) => (
          <div
            key={assessment?._id}
            className="max-w-[1063px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
          >
            <div className="p-5">
              <div className="md:flex justify-between items-center">
                <div className="">
                  <h1 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
                    {assessment?.assessmentName} ({assessment?.categoryName})
                  </h1>
                </div>
                <div className="flex mt-2 md:mt-0 gap-2 place-items-center">
                  <MdOutlineLock className="text-2xl" />
                  <h1 className=" text-lg tracking-tight text-gray-900 dark:text-white">
                    Available from{" "}
                    {assessment?.scheduledAt
                      ?.slice(0, 10)
                      .split("-")
                      .reverse()
                      ?.join("-")}
                  </h1>
                </div>
              </div>
              <div className="questions mt-3">
                <p className="flex gap-8 items-center mb-3 font-normal font-poppins leading-normal text-gray-700 dark:text-gray-400">
                  <FaRegQuestionCircle className="text-xl" />
                  <span>No Question</span>
                  {assessment?.questions?.length}
                </p>
              </div>
              <div className="marks mt-3">
                <p className="flex gap-8 items-center mb-3 font-normal font-poppins leading-normal text-gray-700 dark:text-gray-400">
                  <img src={question} alt="" /> <span>Max Mark</span>{" "}
                  {assessment?.questions?.length}
                </p>
              </div>
              <div className="time mt-3 md:flex md:flex-row md:justify-between md:items-center">
                <p className="flex gap-8 items-center mb-3 font-normal font-poppins leading-normal text-gray-700 dark:text-gray-400">
                  <img src={time} alt="" /> <span>Time</span>{" "}
                  {assessment?.duration}
                </p>
                <button
                  onClick={() => handelClick(assessment?._id)}
                  className="inline-flex items-center mt-2 md:mt-0 px-4 py-2 text-sm font-medium font-poppins text-center text-[#28282899] bg-[#e4e4e4] rounded-lg hover:bg-[#5fb370] hover:text-white focus:ring-4 focus:outline-none focus:ring-[#75AE80] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Start
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
        {showInstructions && (
          <InstructionsModal
            setShowInstructions={setShowInstructions}
            selectedId={selectedId}
          />
        )}
      </div>
    </>
  );
};

export default Default;

{
  /* <div className="w-4/5 mx-auto grid grid-cols-1 gap-5 pt-4 px-5">
      {assessments?.map((assessment, i) => (
        <div
          key={assessment?._id}
          className="max-w-[1063px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                {assessment?.assessmentName} ({assessment?.categoryName})
              </h5>
            </a>
            <p className="flex gap-2 items-center mb-3 font-normal font-poppins leading-normal text-gray-700 dark:text-gray-400">
              <img src={question} alt="" /> {assessment?.questions?.length}{" "}
              Questions
            </p>
            <p className="flex gap-2 items-center mb-3 font-normal font-poppins leading-normal text-gray-700 dark:text-gray-400">
              <img src={time} alt="" /> {assessment?.duration} Mins
            </p>

            <Link
              to={`/on-processing/${assessment?._id}`}
              className="inline-flex items-center font-poppins px-3 py-2 text-sm font-medium text-center text-[#28282899] bg-[#e4e4e4] rounded-lg hover:bg-[#5fb370] hover:text-white focus:ring-4 focus:outline-none focus:ring-[#75AE80] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Start
              <svg
                aria-hidden="true"
                className="w-4 h-4 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div> */
}
