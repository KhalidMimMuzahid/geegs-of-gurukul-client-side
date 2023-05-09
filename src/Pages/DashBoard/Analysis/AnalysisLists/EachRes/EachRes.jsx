import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EachRes = ({ response }) => {
  const { aboutResponse } = response;
  const { correct, wrong, skipped } = aboutResponse;
  const total = correct + wrong + skipped;
  console.log("response", response);
  const [assessment, setAssessment] = useState(null);
  useEffect(() => {
    fetch(
      `https://geeks-of-gurukul-server-side.vercel.app/assessmentlabel?_id=${response?.assessmentId}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        setAssessment(data);
      });
  }, [response]);
  if (!assessment) {
    return null;
  }
  return (
    <div class="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
            {assessment?.assessmentName} ({assessment?.categoryName})
          </h5>
        </a>
        <p class="flex gap-2 items-center mb-3 font-normal font-poppins leading-normal text-gray-700 dark:text-gray-400">
          you got {response?.totalMark} out of {total}
        </p>
        <p class="flex gap-2 items-center mb-3 font-normal font-poppins leading-normal text-gray-700 dark:text-gray-400">
          {/* <img src={time} alt="" />  */}
          {assessment?.duration}
          Mins
        </p>

        <Link
          to={`/dashboard/analysis/specific/${response?._id}`}
          class="inline-flex items-center font-poppins px-3 py-2 text-sm font-medium text-center text-[#28282899] bg-[#e4e4e4] rounded-lg hover:bg-[#5fb370] hover:text-white focus:ring-4 focus:outline-none focus:ring-[#75AE80] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Start
          <svg
            aria-hidden="true"
            class="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default EachRes;
