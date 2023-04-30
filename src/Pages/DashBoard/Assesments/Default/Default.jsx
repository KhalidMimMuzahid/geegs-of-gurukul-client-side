import React from "react";
import { Link } from "react-router-dom";
import time from '../../../../assets/TestIcons/time.svg'
import question from '../../../../assets/TestIcons/question.svg'

const Default = () => {
  const assesments = [
    {
      assesmentName: "Topic Test (Algebra)",
      questions: 25,
      time:35
      
    },
    {
      assesmentName: "Topic Test (Sequence and Series)",
      questions: 25,
      time:35
      
    },
    {
      assesmentName: "Topic Test (Number System)",
      questions: 25,
      time:35
      
    },
    {
      assesmentName: "Topic Test (Time and Work)",
      questions: 25,
      time:35
      
    },
    {
      assesmentName: "Topic Test (Data Science)",
      questions: 25,
      time:35
      
    },
    {
      assesmentName: "Topic Test (Binary)",
      questions: 25,
      time:35
      
    },
    {
      assesmentName: "Topic Test (JavaScript)",
      questions: 25,
      time:35
      
    },
    {
      assesmentName: "Topic Test (CSS)",
      questions: 25,
      time:35
      
    },
    
  ];
  return (
    <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4 px-5">
      {assesments?.map((assesment, i) => (
        <div
          key={i}
          class="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          
          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                {assesment?.assesmentName}
              </h5>
            </a>
            <p class="flex gap-2 items-center mb-3 font-normal font-poppins leading-normal text-gray-700 dark:text-gray-400">
             <img src={question} alt="" />  {assesment?.questions} Questions
            </p>
            <p class="flex gap-2 items-center mb-3 font-normal font-poppins leading-normal text-gray-700 dark:text-gray-400">
              <img src={time} alt="" /> {assesment?.time} Mins
            </p>
            
            <Link
              to="/on-processing"
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
      ))}
    </div>
  );
};

export default Default;
