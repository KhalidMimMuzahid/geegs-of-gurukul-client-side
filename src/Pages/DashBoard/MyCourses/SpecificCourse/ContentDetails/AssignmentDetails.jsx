import React from "react";

function AssignmentDetails({ selected }) {
  return (
    <div className="m-3">
      <h2 className="font-semibold text-lg">Assignment Details</h2>
      <div className="my-3">
        <p className="text-green-600">Assignment Name:</p>
        <p className="ml-4">{selected.assignmentName}</p>
      </div>
      <div className="my-3">
        <p className="text-green-600">Assignment Type:</p>
        <p className="ml-4">{selected.type}</p>
      </div>
      <div className="my-3">
        <p className="text-green-600">Exercises: </p>
        {selected.exercises.map((exercise) => (
          <p className="ml-4" key={exercise._id}>
            {exercise.exerciseName}
          </p>
        ))}
      </div>
    </div>
  );
}

export default AssignmentDetails;
