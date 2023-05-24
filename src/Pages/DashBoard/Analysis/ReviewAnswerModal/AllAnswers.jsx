import React, { useState } from "react";
import Answers from "./Answers/Answers";
import QuestionList from "./AllAnswersComponents/QuestionList";

function AllAnswers({
  questions,
  response,
  ques,
  setQues,
  setIsInstruction,
  isInstruction,
}) {
  // console.log(questions);
  return (
    <div className="grid grid-cols-6 gap-10 items-center">
      <div className="relative col-span-6 md:col-span-2 text-center">
        <div className="rounded-xl shadow-md h-auto p-5">
          <div className="flex flex-wrap justify-center">
            {questions.map((question, index) => (
              <QuestionList
                answers={response.aboutResponse.chosenAnswers}
                question={question}
                index={index}
                setQues={setQues}
                ques={ques}
                key={index}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="mt-5 border rounded-lg py-2 px-3 border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
          onClick={() => setIsInstruction(!isInstruction)}
        >
          Instructions
        </button>
      </div>
      <div className="col-span-6 md:col-span-4 pl-5 pb-5">
        <div className="flex flex-col">
          {/* assessment.questions */}
          <Answers
            answers={response.aboutResponse.chosenAnswers}
            question={questions[ques]}
            key={questions[ques]._id}
            index={ques + 1}
          />
        </div>
        <div className="flex justify-between w-full">
          <button
            type="button"
            className="border border-2 px-3 py-2 rounded-lg hover:text-green-500 hover:border-green-400"
            onClick={() => ques !== 0 && setQues(ques - 1)}
          >
            Back
          </button>
          <button
            type="button"
            className="border border-2 border-green-500 px-3 py-2 rounded-lg bg-green-400 text-white hover:bg-green-500"
            onClick={() => ques !== questions.length - 1 && setQues(ques + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllAnswers;
