import React, { useState } from "react";

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Madrid", "Rome", "London"],
    answer: "Paris",
  },
  {
    question: 'Who is the author of "To Kill a Mockingbird"?',
    options: [
      "Harper Lee",
      "F. Scott Fitzgerald",
      "John Steinbeck",
      "Ernest Hemingway",
    ],
    answer: "Harper Lee",
  },
  {
    question: "What is the tallest mountain in the world?",
    options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    answer: "Mount Everest",
  },
];

const PreQuestionire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption("");
    setCurrentQuestion(currentQuestion + 1);
  };

  const progressBarWidth = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-3/4 mx-auto">
        <div className="w-full h-2 bg-gray-200 rounded-lg">
          <div
            className="h-full bg-blue-600 rounded-lg"
            style={{ width: `${progressBarWidth}%` }}
          ></div>
        </div>
        <div className="w-full max-w-lg\\ bg-white rounded-lg shadow-lg p-4 mt-4">
          <h1 className="text-3xl font-bold mb-4">
            {quizData[currentQuestion].question}
          </h1>
          <div className="grid grid-cols-1 gap-4">
            {quizData[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-4">
            {currentQuestion < quizData.length - 1 ? (
              <button
                className="p-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                onClick={handleNextQuestion}
                disabled={selectedOption === ""}
              >
                Next
              </button>
            ) : (
              <p className="text-lg font-bold">{`You scored ${score} out of ${quizData.length}!`}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreQuestionire;
