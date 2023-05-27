import { useQuery } from "@tanstack/react-query";
import React, { useState, useContext } from "react";
import { BsFillCaretRightFill } from "react-icons/bs";
import moment from "moment/moment";
import { AuthContext } from "../../../../../contexts/UserProvider/UserProvider";

const EachExercise = ({
  exercise: exerciseTemp,
  selected,
  selectedModuleLectureList,
}) => {
  // console.log("selected: ", selected);
  // console.log("exercise: ", exerciseTemp);
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { data: exercise, isLoading } = useQuery({
    queryKey: [exerciseTemp?.exercise_id],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/exerciseby_id?_id=${exerciseTemp?.exercise_id}`
      );
      const data = await res.json();
      return data;
    },
  });

  const lecture = selectedModuleLectureList.find(
    (lecture) => lecture?._id === selected?.lecture_id
  );
  // console.log("lecture: ", lecture);

  const handleClick = () => {
    const justNow = moment().format();
    setIsOpen(!isOpen);
    const exerciseData = {
      isSubmitted: false,
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
      lecture: {
        lecture_id: selected?.lecture_id,
        lectureName: lecture?.lectureName,
      },
      module: {
        module_id: lecture?.module?.module_id,
        moduleName: lecture?.module?.moduleName,
      },
      assignment: {
        assignmentId: selected?.assignment_id,
        assignmentName: selected?.assignmentName,
      },
      exercise: {
        exercise_id: exerciseTemp?.exercise_id,
        exerciseName: exerciseTemp?.exerciseName,
      },
      submissionDetails: {
        studentEmail: user?.email,
        startedAt: justNow,
        finishedAt: "",
      },
    };
    console.log(exerciseData);
  };

  // console.log("exercise: ", exercise);
  if (isLoading) {
    return (
      <div>
        <downloading className="">downloading</downloading>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full px-4 py-2 my-1 text-left border border-gray-200 bg-green-50 rounded-md">
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center justify-between w-full"
      >
        <p className="text-green-600">{exercise?.exerciseName}</p>
        <BsFillCaretRightFill
          className="ease-in-out duration-300"
          style={isOpen && { color: "green", transform: "rotate(90deg)" }}
        />
      </button>
      {isOpen && (
        <div className="bg-white p-3 mt-2 rounded-md text-sm">
          <p className="w-full">
            <span className="font-semibold">Topic: </span>
            {exercise.topic}
          </p>
          <p className="mt-3 w-full">
            <span className="font-semibold">Sub topic: </span>
            {exercise.subTopic}
          </p>
          <p className="mt-3 w-full">
            <span className="font-semibold">Exercise type: </span>
            {exercise.type}
          </p>
          <div className="mt-3 w-full">
            <p className="font-semibold">Instructions: </p>
            <p>{exercise.additionals.instructions}</p>
          </div>
          <div className="mt-3 w-full">
            <p className="font-semibold">Files:</p>
            <a
              target="_blank"
              href={exercise.additionals.files}
              className="text-green-400 hover:text-green-500"
            >
              Click here {">>"}
            </a>
          </div>
          <div className="mt-3 w-full">
            <p className="font-semibold mb-2">Submission:</p>
            {exercise.submissionType === "link" ? (
              <input
                type="url"
                className="rounded w-full font-xs"
                placeholder="Enter submission file link"
              />
            ) : (
              <input type="file" className="rounded w-full border" />
            )}
          </div>
          <button
            className="mt-3 w-full p-3 bg-green-300 hover:bg-green-400 rounded"
            type="button"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default EachExercise;
