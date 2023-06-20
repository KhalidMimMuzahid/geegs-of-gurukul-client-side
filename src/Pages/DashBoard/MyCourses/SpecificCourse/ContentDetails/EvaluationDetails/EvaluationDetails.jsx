import React from "react";
import EachExercise from "../../Accordions/EachExercise";
import EachExerciseForEvaluation from "../../Accordions/EachExerciseForEvaluation";

const EvaluationDetails = ({ selected, setChangingEvaluationStatus }) => {
  console.log("selected: ", selected);

  //   selected?.evaluation?.exercises

  return (
    <div className="m-3">
      <h2 className="font-semibold text-lg">Evaluation Details</h2>
      <div className="my-3">
        <p className="text-[#4BA25D] font-medium">Assignment Name:</p>
        <p className="ml-4">{selected.evaluationName}</p>
      </div>
      {/* <div className="my-3">
    <p className="text-green-600 font-medium">Assignment Type:</p>
    <p className="ml-4">{selected.type}</p>
  </div> */}
      <div className="my-3">
        <p className="text-[#4BA25D] font-medium">Exercises: </p>
        <div className="h-[57vh] overflow-y-auto overflow-x-hidden mt-2">
          {selected?.evaluation?.exercises?.length > 0 &&
            selected?.evaluation?.exercises?.map((exercise, i) => (
              <EachExerciseForEvaluation
                setChangingEvaluationStatus={setChangingEvaluationStatus}
                selected={selected}
                exercise={exercise}
                key={i}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default EvaluationDetails;
