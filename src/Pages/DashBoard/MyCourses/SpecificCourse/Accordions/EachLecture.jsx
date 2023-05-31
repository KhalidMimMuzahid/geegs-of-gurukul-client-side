import React, { useState, useEffect } from "react";
import {
  BsFillCheckCircleFill,
  BsFillCaretRightFill,
  BsPersonVideo3,
} from "react-icons/bs";
import {
  AiFillCheckCircle,
  AiFillEyeInvisible,
  AiFillEye,
  AiFillLock,
} from "react-icons/ai";
import EachAssignment from "./EachAssignment";

function EachLecture({
  lecture,
  selected,
  setSelected,
  module_id,
  setSelectedModuleLectureList,
  lecturesList,
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(
      lecture?._id === selected?._id
        ? true
        : selected?.lecture_id === lecture?._id
        ? true
        : false
    );
  }, [selected]);

  return (
    <div className="flex flex-col w-full px-4 py-2 my-1 text-left border border-gray-200 bg-green-50 rounded-md">
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex items-center justify-between w-full"
      >
        <p className="text-green-600">{lecture?.lectureName}</p>
        <BsFillCaretRightFill
          className="ease-in-out duration-300"
          style={isOpen && { color: "green", transform: "rotate(90deg)" }}
        />
      </button>
      {isOpen && (
        <div>
          <button
            type="button"
            className="relative flex items-center p-2 border border-gray-200 w-full rounded-md bg-white my-2"
            onClick={() => {
              setSelected(lecture);
              setSelectedModuleLectureList(lecturesList);
            }}
          >
            {selected?._id === lecture?._id && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-md"></span>
            )}
            <BsPersonVideo3 color="green" className="ml-1" />
            <p className="text-sm text-green-600 ml-3">Lecture video</p>
          </button>
          {lecture?.assignment?.assignments?.map((eachAssignment) => (
            <EachAssignment
              eachAssignment={eachAssignment}
              lecture={lecture}
              module_id={module_id}
              setSelected={setSelected}
              selected={selected}
              lecturesList={lecturesList}
              setSelectedModuleLectureList={setSelectedModuleLectureList}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default EachLecture;
