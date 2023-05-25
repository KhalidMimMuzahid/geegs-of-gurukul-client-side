import React from "react";
import { BsXCircleFill, BsCheckCircleFill } from "react-icons/bs";

function QuestionList({ answers, question, index, setQues, ques }) {
  const answered = answers.find((answer) => answer.questionId === question._id);
  return (
    <button
      type="button"
      key={question._id}
      onClick={() => setQues(index)}
      className={`relative border font-thin rounded-full p-3 h-12 w-12 m-2 hover:border-green-400 transition-all duration-300 ${
        answered
          ? answered.isCorrect
            ? "bg-green-200"
            : "bg-rose-200"
          : "bg-gray-200"
      } ${
        index === ques &&
        "shadow-md border-1 border-[#333333] bg-black transform translate-y-[-8px]"
      }`}
    >
      {index + 1}
      {/* <div className="absolute top-[-3px] right-[-2px]">
        {answered ? (
          answered.isCorrect ? (
            <BsCheckCircleFill color="green" />
          ) : (
            <BsXCircleFill color="red" />
          )
        ) : null}
      </div> */}
    </button>
  );
}

export default QuestionList;

{
  /* <div className="mt-5 flex">
          {answered ? (
            answered.isCorrect ? (
              <p className="border rounded-xl py-1 px-2 text-green-400 border-green-400">
                Correct
              </p>
            ) : (
              <p className="border rounded-xl py-1 px-2 text-rose-400 border-rose-400">
                Incorrect
              </p>
            )
          ) : (
            <p className="border rounded-xl py-1 px-2 text-gray-400 border-gray-400">
              Not answered
            </p>
          )}
        </div> */
}
