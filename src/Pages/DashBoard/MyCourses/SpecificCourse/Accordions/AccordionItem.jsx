import React, { useState } from "react";
import InnerAccordion from "./InnerAccordion";
import { BsFillCaretRightFill } from "react-icons/bs";

function AccordionItem({ content, selected, setSelected }) {
  const [isOutterOpen, setIsOutterOpen] = useState(false);
  const { moduleName, lecturesList } = content;
  return (
    <div className="border rounded-md mb-2">
      <button
        type="button"
        className="w-full py-2 px-4 text-left font-medium focus:outline-none focus:bg-green-100 text-gray-900 flex justify-between items-center"
        onClick={() => setIsOutterOpen(!isOutterOpen)}
      >
        {moduleName}
        <BsFillCaretRightFill
          className="ease-in-out duration-300"
          style={isOutterOpen && { color: "green", transform: "rotate(90deg)" }}
        />
      </button>

      <div className={`${isOutterOpen && "p-4"}`}>
        {isOutterOpen && (
          <>
            {lecturesList.map((lecture) => (
              <InnerAccordion
                lecture={lecture}
                selected={selected}
                setSelected={setSelected}
                key={lecture._id}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default AccordionItem;
