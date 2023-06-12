import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { BsQuestionCircle, BsClock, BsArrowRightShort } from "react-icons/bs";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import textIcon from "../../../../assets/svg/test.svg";

function EachAssessment({ assessment, handleClick, index }) {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    const justNow = moment().format("YYYY-MM-DDTHH:mm");
    if (justNow >= assessment?.scheduledAt) {
      setAvailable(true);
    }
  }, []);
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-md dark:bg-gray-800 dark:border-gray-700 font-poppins">
      <div className="p-6">
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col gap-4 justify-between">
            <div>
              <p className="text-sm md:text-base font-medium capitalize">
                {index}. {assessment?.assessmentName}
              </p>
              <p className="text-xs md:text-sm capitalize">
                {assessment?.categoryName}
              </p>
            </div>
            <div className="text-xs md:text-sm">
              <p className="flex w-full gap-2 md:gap-6 items-center mb-3 font-normal font-poppins leading-normal text-gray-700 dark:text-gray-400">
                <BsQuestionCircle size={20} />
                <span>Total Questions</span>
                {assessment?.questions?.length}
              </p>

              <div className="flex w-full gap-2 md:gap-6 items-center mb-3 font-normal font-poppins leading-normal text-gray-700 dark:text-gray-400">
                <BsClock size={20} />
                <div className="relative">
                  <span className=" text-white">Total Questions</span>
                  <span className="absolute inset-0">Time {"(mins)"}</span>
                </div>
                {assessment?.duration}
              </div>
            </div>
            <div>
              <button
                onClick={() => handleClick(assessment?._id)}
                className={`inline-flex items-center mt-2 md:mt-0 px-4 py-2 text-sm font-medium font-poppins text-center ${
                  available
                    ? "bg-[#4BA25D] text-white hover:bg-[#5fb370]"
                    : "bg-[#e4e4e4] text-[#28282899]"
                } rounded-full focus:ring-4 focus:outline-none focus:ring-[#75AE80] md:text-sm text-xs`}
                disabled={!available}
              >
                Start Test
                {available ? (
                  <BsArrowRightShort size={20} className="ml-2" />
                ) : (
                  <AiFillLock size={20} color="#28282899" className="ml-2" />
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 items-end">
            {!available ? (
              <div className="flex gap-1 items-center">
                <AiFillLock size={20} className="text-gray-400" />
                <h1 className="text-xs md:text-sm text-gray-400 text-right">
                  Available from
                  <br />
                  {assessment?.scheduledAt
                    ?.slice(0, 10)
                    .split("-")
                    .reverse()
                    ?.join("-")}
                </h1>
              </div>
            ) : (
              <div className="flex gap-1 items-center">
                <AiFillUnlock size={20} className="" />
                <h1 className="text-xs md:text-sm text-right">Available now</h1>
              </div>
            )}
            <img src={textIcon} className="w-[70%] md:w-[70%] mb-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EachAssessment;
