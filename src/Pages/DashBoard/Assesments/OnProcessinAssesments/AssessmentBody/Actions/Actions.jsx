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
    <div className="w-full px-2 md:px-8 ">
      <div className={`${style.clickBtn} flex gap-4  justify-center`}>
        <span
          onClick={() => changeSelectedQuestionIndexOneByOne(-1)}
          disabled={selectedQuestionIndex === 0}
          className={`px-12 font-bold py-2 rounded-lg flex items-center hover:cursor-pointer ${
            selectedQuestionIndex === 0
              ? "hover:bg-red-400 active:bg-red-500 bg-red-300"
              : "hover:bg-green-400 active:bg-green-500 bg-gray-300 "
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
          className={`px-12 font-bold py-2 rounded-lg flex items-center hover:cursor-pointer ${
            selectedQuestionIndex + 1 === totalQuestions
              ? "hover:bg-red-400 active:bg-red-500 bg-red-300"
              : "hover:bg-green-400 active:bg-green-500 bg-gray-300"
          }`}
        >
          Next
          <FaAngleRight />
        </span>
      </div>
      <div className="w-full flex justify-end">
        <span
          className="hover:cursor-pointer py-1 text-xl text-white font-bold px-16 bg-green-500 rounded-xl hover:bg-green-600"
          onClick={() => setSubmitModalIsOpen(true)}
        >
          Submit
        </span>
      </div>
    </div>
  );
};

export default Actions;
