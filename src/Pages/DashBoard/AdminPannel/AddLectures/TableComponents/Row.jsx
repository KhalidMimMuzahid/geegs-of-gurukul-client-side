import React, { useState, useEffect } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

function Row({ assignment, selectedAssignments, setSelectedAssignments }) {
  const [add, setAdd] = useState(false);

  useEffect(() => {
    if (selectedAssignments.includes(assignment._id)) {
      setAdd(true);
    }
  }, []);

  const handleChange = () => {
    setAdd(!add);
    if (add) {
      const temp = selectedAssignments.filter(
        (element) => element != assignment._id
      );
      setSelectedAssignments(temp);
    } else {
      setSelectedAssignments([...selectedAssignments, assignment._id]);
    }
  };

  return (
    <tr>
      <td className="px-6 py-3 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {assignment._id}
        </div>
      </td>
      <td className="px-6 py-3 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {assignment.assignmentName}
        </div>
      </td>
      <td className="px-6 py-3 whitespace-nowrap">
        <div className="text-sm text-gray-900">{assignment.topic}</div>
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 flex align-center justify-center">
        <button type="button">
          <BsFillPlusCircleFill
            color={add ? "red" : "#22c55e"}
            className={`${add && "rotate-45"} duration-200`}
            size={20}
            onClick={handleChange}
          />
        </button>
      </td>
    </tr>
  );
}

export default Row;
