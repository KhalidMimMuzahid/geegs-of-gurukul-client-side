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
    <div className="w-full px-2 md:px-8 font-poppins font-normal text-[20px] ">
      <div className={`${style.clickBtn} flex gap-4  justify-center`}>
        <span
          disabled={selectedQuestionIndex === 0}
          onClick={() => changeSelectedQuestionIndexOneByOne(-1)}
          className={`px-12 font-normal py-2 rounded-lg flex items-center hover:cursor-pointer ${
            selectedQuestionIndex === 0
              ? "hover:bg-[#ECECEC] active:bg-[#bbbbbb] bg-[#e6e6e6]"
              : "hover:bg-[#ECECEC] active:bg-[#bbbbbb] bg-gray-300 "
          }`}
          type="button"
        >
          <FaAngleLeft />
          Back
        </span>
        <span
          disabled={selectedQuestionIndex + 1 === totalQuestions}
          onClick={() => changeSelectedQuestionIndexOneByOne(+1)}
          type="button"
          className={`px-12 font-normal py-2 rounded-lg flex items-center hover:cursor-pointer ${
            selectedQuestionIndex + 1 === totalQuestions
              ? "hover:bg-red-400 active:bg-red-500 bg-red-300"
              : "hover:bg-[#53A871] active:bg-[#58b97a] bg-[#58b97a] text-white"
          }`}
        >
          Next
          <FaAngleRight />
        </span>
      </div>
      <div className="w-full flex justify-end">
        <span
          className={`${style?.submit} hover:cursor-pointer py-1 text-xl font-semibold text-white px-16 bg-[#53A871] rounded-xl hover:bg-[#5ab67a]`}
          onClick={() => setSubmitModalIsOpen(true)}
        >
          Submit
        </span>
      </div>
    </div>
  );
};

export default Actions;
