import React, { useState, useEffect } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

function Row({
  assignment,
  assignments,
  setAssignments,
  selectedAssignment,
  setSelectedAssignment,
}) {
  const handleAddId = (assignment_id, assignmentName) => {
    setSelectedAssignment([
      ...selectedAssignment,
      { assignment_id, assignmentName },
    ]);
    // setAssignments(assignments);
    // console.log(selectedAssignment);
  };

  const handleRemoveId = (assignment_id) => {
    const newAssignment = selectedAssignment.filter(
      (each) => each?.assignment_id !== assignment_id
    );
    setSelectedAssignment(newAssignment);
    // setAssignments(assignments);
    // console.log(selectedAssignment);
  };

  return (
    <tr>
      <td className='px-6 py-3 whitespace-nowrap'>
        <div className='text-sm font-medium text-gray-900'>
          {assignment._id}
        </div>
      </td>
      <td className='px-6 py-3 whitespace-nowrap'>
        <div className='text-sm font-medium text-gray-900'>
          {assignment.assignmentName}
        </div>
      </td>
      <td className='px-6 py-3 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{assignment.topic}</div>
      </td>
      <td className='px-6 py-3 whitespace-nowrap text-sm text-gray-500 flex align-center justify-center'>
        {selectedAssignment?.some(
          (selectedAssignments) =>
            selectedAssignments?.assignment_id === assignment?._id
        ) ? (
          <button type='button'>
            <BsFillPlusCircleFill
              color={"red"}
              className={`rotate-45 duration-200`}
              size={20}
              onClick={() => handleRemoveId(assignment?._id)}
            />{" "}
          </button>
        ) : (
          <button type='button'>
            <BsFillPlusCircleFill
              color={"#22c55e"}
              size={20}
              onClick={() =>
                handleAddId(assignment?._id, assignment?.assignmentName)
              }
            />
          </button>
        )}
      </td>
    </tr>
  );
}

export default Row;
