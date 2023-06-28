import React from "react";
import EachModule from "../Accordions/EachModule";
import { useQuery } from "@tanstack/react-query";
const percentCompleted = 40;

function ContentLists({
  modules,
  selected,
  setSelected,
  setSelectedModuleLectureList,
  changingModuleStatus,
  changingAssignmentStatus,
  changingEvaluationStatus,
}) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md col-span-12 lg:col-span-4 h-[80vh] md:h-[90vh]">
      {/* Course progress tracker */}
      <div className="mb-2 grid grid-cols-2">
        <p className="col-span-1">Course progress</p>
        <div className="w-full h-2 col-span-1 my-auto rounded-md border">
          <div
            className="bg-[#4BA25D] h-full rounded-md"
            style={{ width: `${percentCompleted}%` }}
          ></div>
        </div>
      </div>
      {/* search box */}
      <input
        type="text"
        placeholder="search lesson"
        className="w-full input rounded-md border-2 border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200"
      />
      {/* Accordions */}
      <div className="overflow-y-auto mt-4 h-[80%]">
        <div className="w-full max-w-lg mx-auto">
          {modules.map((module, contentPosition) => (
            <EachModule
              module={module}
              key={module._id}
              selected={selected}
              setSelected={setSelected}
              contentPosition={contentPosition}
              setSelectedModuleLectureList={setSelectedModuleLectureList}
              changingModuleStatus={changingModuleStatus}
              changingAssignmentStatus={changingAssignmentStatus}
              changingEvaluationStatus={changingEvaluationStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContentLists;
