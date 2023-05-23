import React from "react";
import Answers from "./Answers/Answers";

function AllAnswers({ questions, response, ques, setQues }) {
  console.log(questions);
  return (
    <div className="grid grid-cols-6 gap-10 items-center">
      <div className="col-span-6 md:col-span-2 text-center">
        <div className="border rounded-lg border-green-500 h-auto p-5">
          <div className="flex flex-wrap justify-center">
            {questions.map((question, index) => (
              <button
                type="button"
                key={question._id}
                onClick={() => setQues(index)}
                className={`border rounded-full p-2 h-10 w-10 m-2 hover:border-green-400 ${
                  index === ques && "border-green-400 bg-green-500 text-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="mt-5 border rounded-lg py-2 px-3 border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
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
            Previous
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
