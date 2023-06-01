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
}) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md col-span-12 lg:col-span-4 h-[80vh] md:h-[90vh]">
      {/* Course progress tracker */}
      <div className="mb-2 grid grid-cols-2">
        <p className="col-span-1">Course progress</p>
        <div className="w-full h-2 col-span-1 my-auto rounded-md border">
          <div
            className="bg-green-400 h-full rounded-md"
            style={{ width: `${percentCompleted}%` }}
          ></div>
        </div>
      </div>
      {/* search box */}
      <input
        type="text"
        placeholder="search lesson"
        className="w-full rounded-md border-2 border-green-300 focus:border-green-400 focus:ring-0"
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContentLists;
