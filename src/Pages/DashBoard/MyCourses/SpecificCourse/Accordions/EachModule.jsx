import React, { useEffect, useState } from "react";
import EachLecture from "./EachLecture";
import { BsFillCaretRightFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
function EachModule({
  module,
  selected,
  setSelected,
  contentPosition,
  setSelectedModuleLectureList,
  changingModuleStatus,
  changingAssignmentStatus,
}) {
  const [isOutterOpen, setIsOutterOpen] = useState(false);
  const { moduleName, _id } = module;
  const [lecturesList, setLecturesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/lecturesbymodule?_id=${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setLecturesList(data);

        if (contentPosition === 0) {
          setSelected(data[0]);
          setSelectedModuleLectureList(data);
        }

        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    // changingModuleStatus

    try {
      if (changingModuleStatus?.module_id === module?._id) {
        if (changingModuleStatus?.lectureIndexStatus === "first") {
          setSelected(lecturesList[0]);
          setSelectedModuleLectureList(lecturesList);
        }
        if (changingModuleStatus?.lectureIndexStatus === "last") {
          setSelected(lecturesList[lecturesList?.length - 1]);
          setSelectedModuleLectureList(lecturesList);
        }
      }
    } catch {
      // end point reached
      console.log("erorrrrrrrrr");
    }
  }, [changingModuleStatus?.module_id]);
  useEffect(() => {
    if (selected?.module?.module_id === _id) {
      setIsOutterOpen(true);
    }
  }, [selected]);
  if (isLoading) {
    return (
      <div>
        <downloading className="">downloading</downloading>
      </div>
    );
  }
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
            {lecturesList?.map((lecture) => (
              <EachLecture
                lecture={lecture}
                selected={selected}
                setSelected={setSelected}
                key={lecture._id}
                module_id={_id}
                setSelectedModuleLectureList={setSelectedModuleLectureList}
                lecturesList={lecturesList}
                changingAssignmentStatus={changingAssignmentStatus}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default EachModule;
