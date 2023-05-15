import React, { useState, useEffect } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

function Row({ assignment }) {
  const [add, setAdd] = useState(false);

  useEffect(() => {
    return () => {
      if(add){
        console.log("added");
      } else {
        console.log("removed");
      }
    }
  }, [add]);
  
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
      {/* <td className="px-6 py-3 whitespace-nowrap">
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
            </span>
        F</td> */}
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 flex align-center justify-center">
        <button type="button">
          <BsFillPlusCircleFill
            color={add ? "#22c55e" : "grey"}
            className={`${!add && 'rotate-45'} duration-200`}
            size={20}
            onClick={() => setAdd(!add)}
          />
        </button>
      </td>
    </tr>
  );
}

export default Row;
