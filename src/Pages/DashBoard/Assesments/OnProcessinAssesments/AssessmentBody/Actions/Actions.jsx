import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import style from "../../onProcessinAssesments.module.css";
const Actions = ({
  selectedQuestionIndex,
  setSelectedQuestionIndex,
  changeSelectedQuestionIndexOneByOne,
  totalQuestions,
}) => {
  return (
    <div className="w-full px-2 md:px-8 ">
      <div className={`${style.clickBtn} flex gap-4  justify-center`}>
        <button
          onClick={() => changeSelectedQuestionIndexOneByOne(-1)}
          disabled={selectedQuestionIndex === 0}
          className={` ${
            selectedQuestionIndex === 0
              ? "hover:bg-red-400 active:bg-red-500 bg-red-300"
              : "hover:bg-green-400 active:bg-green-500 bg-green-300"
          }`}
          type="button"
        >
          <FaAngleLeft />
          Back
        </button>
        <button
          disabled={selectedQuestionIndex + 1 === totalQuestions}
          onClick={() => changeSelectedQuestionIndexOneByOne(+1)}
          type="button"
          className={` ${
            selectedQuestionIndex + 1 === totalQuestions
              ? "hover:bg-red-400 active:bg-red-500 bg-red-300"
              : "hover:bg-green-400 active:bg-green-500 bg-green-300"
          }`}
        >
          Next
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default Actions;
