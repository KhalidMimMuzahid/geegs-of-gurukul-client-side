import React, { useState } from "react";
import Options from "./Options";

function Answers({ answers, question, index }) {
  // console.log("Answers: ", answers);
  // console.log("Question: ", question);
  const answered = answers.find((answer) => answer.questionId === question._id);
  const isMultiple = question.optionObject.answers.length === 1 ? false : true;
  return (
    <div>
      <div className="my-3">
        <div className="flex w-full items-center">
          <p className="font-semibold pr-4">Question {index}</p>
          <div
            className={`border rounded-xl text-xs py-1 px-2 ${
              question.difficultyLevel === "Easy"
                ? ` border-green-500 bg-green-200 text-green-500`
                : question.difficultyLevel === "Medium"
                ? ` border-yellow-500 bg-yellow-200 text-yellow-500`
                : ` border-rose-500 bg-rose-200 text-rose-500`
            } `}
          >
            {question.difficultyLevel}
          </div>
        </div>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <p className="pr-2 text-sm font-semibold">Topic: </p>
            <div className="text-sm">{question.topicName}</div>
          </div>
          <div className="flex items-center ml-5">
            <p className="pr-2 text-sm font-semibold">Sub topic: </p>
            <div className="text-sm">{question.subTopic}</div>
          </div>
        </div>
        <p className="mt-4">{question.questionName}</p>
        {/* Options */}
        <div className="space-y-2">
          {question.optionObject.choices?.map((option, index) => (
            <Options
              option={option}
              key={index}
              answers={question.optionObject.answers}
              isMultiple={isMultiple}
              id={question._id}
              chosenOptions={answered ? answered.chosenOptions : false}
            />
          ))}
        </div>
        {/* Options */}
        <div className="mt-4">
          Answer:{" "}
          {question.optionObject.answers.map((answer) => answer).join(", ")}
        </div>

        <hr className="mt-10" />
      </div>
    </div>
  );
}

export default Answers;
