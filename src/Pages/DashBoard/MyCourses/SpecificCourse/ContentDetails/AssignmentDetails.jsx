import { useQuery } from "@tanstack/react-query";
import React from "react";
import EachExercise from "../Accordions/EachExercise";

function AssignmentDetails({
  selected,
  selectedModuleLectureList,
  setChangingAssignmentStatus,
}) {
  // console.log("selected: ", selected);
  const { data: assignment, isLoading } = useQuery({
    queryKey: [selected?.assignment_id],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/assignmentby_id?_id=${selected?.assignment_id}`
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return (
      <div>
        <downloading className="">downloading</downloading>
      </div>
    );
  }
  return (
    <div className="m-3">
      <h2 className="font-semibold text-lg">Assignment Details</h2>
      <div className="my-3">
        <p className="text-green-600 font-medium">Assignment Name:</p>
        <p className="ml-4">{selected.assignmentName}</p>
      </div>
      {/* <div className="my-3">
        <p className="text-green-600 font-medium">Assignment Type:</p>
        <p className="ml-4">{selected.type}</p>
      </div> */}
      <div className="my-3">
        <p className="text-green-600 font-medium">Exercises: </p>
        <div className="h-[57vh] overflow-y-auto overflow-x-hidden mt-2">
          {assignment?.exercises?.length > 0 &&
            assignment?.exercises?.map((exercise, i) => (
              <EachExercise
                selected={selected}
                exercise={exercise}
                key={i}
                selectedModuleLectureList={selectedModuleLectureList}
                setChangingAssignmentStatus={setChangingAssignmentStatus}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default AssignmentDetails;
