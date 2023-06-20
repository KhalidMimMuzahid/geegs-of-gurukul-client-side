import React, { useState, useEffect, useContext } from "react";
import { BsFillCaretRightFill, BsPersonVideo3 } from "react-icons/bs";
import EachAssignment from "./EachAssignment";
import moment from "moment/moment";
import { AuthContext } from "../../../../../contexts/UserProvider/UserProvider";
import EachEveluation from "./EachEveluation";

function EachLecture({
  lecture,
  selected,
  setSelected,
  module_id,
  setSelectedModuleLectureList,
  lecturesList,
  changingAssignmentStatus,
  changingEvaluationStatus,
}) {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const evaluationClick = () => {
    const justNow = moment().format();

    const evaluationData = {
      status: "visited",
      program: {
        program_id: lecture?.program?.program_id,
        programName: lecture?.program?.programName,
      },
      course: {
        course_id: lecture?.course?.course_id,
        courseName: lecture?.course?.courseName,
      },
      batch: {
        batch_id: lecture?.batch?.batch_id,
        batchName: lecture?.batch?.batchName,
      },

      module: {
        module_id: lecture?.module?.module_id,
        moduleName: lecture?.module?.moduleName,
      },
      evaluation: {
        evaluation_id: lecture?._id,
        evaluationName: lecture?.evaluationName,
      },
      submissionDetails: {
        studentEmail: user?.email,
        startedAt: justNow,
        finishedAt: "",
      },
    };
    // console.log("evaluationData: ", evaluationData);
    fetch("http://localhost:5000/api/v1/evaluations/evaluation-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evaluationData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data for eveluation", data);
        if (data?.success) {
          // to do
          // setAssignmentResponse({
          //   ...assignmentData,
          //   _id: data?.result?.insertedId,
          // });
        } // Log the response from the server
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    setIsOpen(
      lecture?._id === selected?._id && selected?.type === "lecture"
        ? true
        : selected?.lecture_id === lecture?._id
        ? true
        : false
    );
  }, [selected]);

  return (
    <div className="flex flex-col w-full px-4 py-2 my-1 text-left border border-gray-200 bg-green-50 rounded-md relative">
      {lecture?.type === "lecture" && (
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="flex items-center justify-between w-full"
        >
          <p className="text-green-600">
            {lecture?.lectureName || lecture?.evaluationName}
          </p>
          <BsFillCaretRightFill
            className="ease-in-out duration-300"
            style={isOpen && { color: "green", transform: "rotate(90deg)" }}
          />
        </button>
      )}
      {lecture?.type === "evaluation" && (
        <EachEveluation
          selected={selected}
          lecture={lecture}
          setSelected={setSelected}
          evaluationClick={evaluationClick}
          changingEvaluationStatus={changingEvaluationStatus}
        />
      )}

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
            <BsPersonVideo3 color="#4BA25D" className="ml-1" />
            <p className="text-sm text-[#4BA25D] ml-3">Lecture video</p>
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
              changingAssignmentStatus={changingAssignmentStatus}
              key={eachAssignment._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default EachLecture;
