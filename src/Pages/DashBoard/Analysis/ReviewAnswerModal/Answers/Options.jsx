import React from "react";

function Options({ option, answers, isMultiple, id, chosenOptions }) {
  const checked = answers.find((answer) => answer === Object.keys(option)[0]);
  const optionId = id + Object.keys(option)[0];
  const userAnswer = chosenOptions
    ? chosenOptions.includes(Object.keys(option)[0])
    : false;
  return (
    <div className="mt-5">
      <div className="flex items-center mt-2">
        {/* {checked ? (
        "✅"
      ) : userAnswer ? (
        "❌"
      ) : ( */}
        <input
          type={isMultiple ? "checkbox" : "radio"}
          name="answer"
          id={optionId}
          disabled
          className="ml-0.5"
          checked={userAnswer}
        />
        {/* )} */}
        <label
          className={`ml-2 p-2 w-[100%] md:w-[90%] rounded ${
            checked ? "bg-[#AEFFCC]" : userAnswer && "bg-[#FFCCCC]"
          }`}
          htmlFor={optionId}
        >
          {Object.values(option)[0]}
        </label>
      </div>
    </div>
  );
}

export default Options;
