import React from "react";

function Options({ option, answers, isMultiple, id, chosenOptions }) {
  const checked = answers.includes(Object.keys(option)[0]);
  const optionId = id + Object.keys(option)[0];
  const userAnswer = chosenOptions
    ? chosenOptions.includes(Object.keys(option)[0])
    : false;
  return (
    <div className="flex items-center">
      {checked ? (
        "✅"
      ) : userAnswer ? (
        "❌"
      ) : (
        <input
          type={isMultiple ? "checkbox" : "radio"}
          name="answer"
          id={optionId}
          disabled
          className="ml-0.5"
          checked={false}
        />
      )}
      <label
        className={`ml-2 ${
          checked ? "text-green-400" : userAnswer && "text-rose-500"
        }`}
        htmlFor={optionId}
      >
        {Object.values(option)[0]}
      </label>
    </div>
  );
}

export default Options;
