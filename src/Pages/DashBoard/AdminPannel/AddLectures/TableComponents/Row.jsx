import React, { useState, useEffect } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

function Row({
  assignment,
  assignments,
  setAssignments,
  assignmentId,
  setAssignmentId,
}) {
  const handleAddId = (id) => {
    setAssignmentId([...assignmentId, id]);
    setAssignments(assignments);
    console.log(assignmentId);
  };

  const handleRemoveId = (id) => {
    const frr = assignmentId?.filter((arr) => arr !== id);
    setAssignmentId(frr);
    setAssignments(assignments);
    console.log(assignmentId);
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
        {assignmentId?.includes(assignment?._id) ? (
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
              onClick={() => handleAddId(assignment?._id)}
            />
          </button>
        )}
      </td>
    </tr>
  );
}

export default Row;
