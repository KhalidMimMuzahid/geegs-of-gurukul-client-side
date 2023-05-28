import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import style from "../../onProcessinAssesments.module.css";
const Actions = ({
  selectedQuestionIndex,
  setSelectedQuestionIndex,
  changeSelectedQuestionIndexOneByOne,
  totalQuestions,
  setSubmitModalIsOpen,
}) => {
  return (
    <div className="w-full px-2 md:px-5 font-poppins font-normal mt-10">
      <div
        className={`${style.clickBtn} flex justify-between flex-wrap lg:gap-0 gap-5`}
      >
        <div className="flex gap-4">
          <span
            disabled={selectedQuestionIndex === 0}
            onClick={() => changeSelectedQuestionIndexOneByOne(-1)}
            className={`px-8 font-normal py-2 rounded-lg flex items-center hover:cursor-pointer ${
              selectedQuestionIndex === 0
                ? "hover:bg-[#ECECEC] active:bg-[#bbbbbb] bg-[#e6e6e6]"
                : "hover:bg-[#ECECEC] active:bg-[#bbbbbb] bg-gray-300 "
            }`}
            type="button"
          >
            Back
          </span>
          <span
            disabled={selectedQuestionIndex + 1 === totalQuestions}
            onClick={() => changeSelectedQuestionIndexOneByOne(+1)}
            type="button"
            className={`px-8 font-normal py-2 rounded-lg flex items-center hover:cursor-pointer ${
              selectedQuestionIndex + 1 === totalQuestions
                ? "hover:bg-red-400 active:bg-red-500 bg-red-300"
                : "hover:bg-[#58b97a] active:bg-[#58b97a] bg-[#27DC69] text-white"
            }`}
          >
            Next
          </span>
        </div>
        <span
          className="hover:cursor-pointer rounded-lg py-2 md:w-auto w-full text-center text-white px-8 bg-[#27DC69] hover:bg-[#58b97a]"
          onClick={() => setSubmitModalIsOpen(true)}
        >
          Submit
        </span>
      </div>
    </div>
  );
};

export default Actions;
