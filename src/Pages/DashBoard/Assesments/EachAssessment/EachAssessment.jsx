import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  BsQuestionCircle,
  BsFillLockFill,
  BsListCheck,
  BsClock,
  BsArrowRightShort,
} from "react-icons/bs";

function EachAssessment({ assessment, handleClick, index }) {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    const justNow = moment().format("YYYY-MM-DDTHH:mm");
    if (justNow >= assessment?.scheduledAt) {
      setAvailable(true);
    }
  }, []);
  return (
    <div className=" bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700 ">
      <div className="p-5">
        <div className="md:flex justify-between items-center">
          <div className="">
            <h1 className="text-lg font-medium tracking-tight text-gray-900 dark:text-white capitalize">
              {index}. {assessment?.assessmentName}
            </h1>
            <h1 className="dark:text-white capitalize mb-2 text-[#4BA25D]">
              {assessment?.categoryName}
            </h1>
          </div>
          {!available && (
            <div className="flex mt-2 md:mt-0 gap-1 items-center">
              <BsFillLockFill size={20} />
              <h1 className=" text-sm tracking-tight text-gray">
                Available from
                <br />
                {assessment?.scheduledAt
                  ?.slice(0, 10)
                  .split("-")
                  .reverse()
                  ?.join("-")}
              </h1>
            </div>
          )}
        </div>
        <div className="mt-3">
          <p className="flex gap-8 items-center mb-3 font-normal font-poppins leading-normal text-gray-700 dark:text-gray-400">
            <BsQuestionCircle size={20} />
            <span>Num Questions</span>
            {assessment?.questions?.length}
          </p>
        </div>
        <div className="mt-3">
          <div className="flex gap-8 items-center mb-3 font-normal font-poppins leading-normal text-gray-700 dark:text-gray-400">
            <BsListCheck size={20} />
            <div className="relative">
              {/* Displaying Num questions in white to achieve same width */}
              <span className="text-white">Num Questions</span>
              <span className="absolute inset-0">Max Mark</span>
            </div>
            {assessment?.questions?.length}
          </div>
        </div>
        <div className="mt-3 md:flex md:flex-row md:justify-between md:items-center">
          <div className="flex gap-8 items-center mb-3 font-normal font-poppins leading-normal text-gray-700 dark:text-gray-400">
            <BsClock size={20} />
            <div className="relative">
              <span className="text-white">Num Questions</span>
              <span className="absolute inset-0">Time {"(mins)"}</span>
            </div>
            {assessment?.duration}
          </div>
          <button
            onClick={() => handleClick(assessment?._id)}
            className={`inline-flex items-center mt-2 md:mt-0 px-4 py-2 text-sm font-medium font-poppins text-center ${
              available
                ? "bg-[#4BA25D] text-white hover:bg-[#5fb370]"
                : "bg-[#e4e4e4] text-[#28282899]"
            } rounded-full focus:ring-4 focus:outline-none focus:ring-[#75AE80]`}
            disabled={!available}
          >
            Start
            {available ? (
              <BsArrowRightShort size={20} className="ml-1" />
            ) : (
              <BsFillLockFill size={14} color="#28282899" className="ml-1" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EachAssessment;
