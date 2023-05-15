import React, { useState } from "react";
import { BsFillCheckCircleFill, BsFillCaretRightFill } from "react-icons/bs";

function AccordionItem({ content, setSelectedLecture }) {
  const [isOpen, setIsOpen] = useState(false);
  const { moduleName, lecturesList } = content;
  return (
    <div className="border rounded-md mb-2">
      <button
        type="button"
        className="w-full py-2 px-4 text-left font-medium focus:outline-none focus:bg-green-100 text-gray-900 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {moduleName}{" "}
        <BsFillCaretRightFill
          className="ease-in-out duration-300"
          style={isOpen && { color: "green", transform: "rotate(90deg)" }}
        />
      </button>

      <div className={`${isOpen && "p-4"}`}>
        {isOpen && (
          <>
            {lecturesList.map((lecture) => (
              <button
                type="button"
                className="w-full px-4 py-2 my-1 text-left border border-gray-200 bg-gray-50 flex items-center focus:bg-green-100"
                onClick={() => {
                  setSelectedLecture(lecture);
                }}
                key={lecture._id}
              >
                <BsFillCheckCircleFill color="green" className="flex-none" />
                <p className="flex-1 pl-3">{lecture.lectureName}</p>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default AccordionItem;
