import moment from "moment";
import React from "react";
import { BsXCircleFill } from "react-icons/bs";

const ExerciseResponseModal = ({ setOpenModal, data }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none">
        <div className="relative w-full h-[600px] sm:w-[500px] md:w-[750px] lg:w-[900px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-4 bg-white rounded-lg shadow-2xl">
          <div className="px-2 pt-2 flex w-full justify-between">
            <h4 className="font-semibold">Exercise Response Details</h4>
            <button onClick={() => setOpenModal(false)}>
              <BsXCircleFill size={25} color="red" />
            </button>
          </div>
          {/* Contents */}
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 p-5">
            <div className="">
              <h3 className="text-lg font-semibold text-green-500">
                Program Name
              </h3>
              <h4 className="text-lg ml-2">{data?.program?.programName}</h4>
            </div>
            <div className="">
              <h3 className="text-lg font-semibold text-green-500">
                Course Name
              </h3>
              <h4 className="text-lg ml-2">{data?.course?.courseName}</h4>
            </div>
            <div className="">
              <h3 className="text-lg font-semibold text-green-500">
                Batch Name
              </h3>
              <h4 className="text-lg ml-2">{data?.batch?.batchName}</h4>
            </div>
            <div className="">
              <h3 className="text-lg font-semibold text-green-500">
                Module Name
              </h3>
              <h4 className="text-lg ml-2">{data?.module?.moduleName}</h4>
            </div>
            <div className="">
              <h3 className="text-lg font-semibold text-green-500">
                Lecture Name
              </h3>
              <h4 className="text-lg ml-2">{data?.lecture?.lectureName}</h4>
            </div>
            <div className="">
              <h3 className="text-lg font-semibold text-green-500">
                Assignment Name
              </h3>
              <h4 className="text-lg ml-2">
                {data?.assignment?.assignmentName}
              </h4>
            </div>
            <div className="">
              <h3 className="text-lg font-semibold text-green-500">
                Exercise Name
              </h3>
              <h4 className="text-lg ml-2">{data?.exercise?.exerciseName}</h4>
            </div>
            <div className="">
              <h3 className="text-lg font-semibold text-green-500">
                StartedAt
              </h3>
              <h4 className="text-lg ml-2">
                {moment(data?.submissionDetails?.startedAt).calendar()}
              </h4>
            </div>
            <div className="">
              <h3 className="text-lg font-semibold text-green-500">
                FinishedAt
              </h3>
              <h4 className="text-lg ml-2">
                {moment(data?.submissionDetails?.finishedAt).calendar()}
              </h4>
            </div>
            <div className="">
              <h3 className="text-lg font-semibold text-green-500">
                Submitted Link
              </h3>
              <h4 className="text-lg ml-2">
                <a
                  href={data?.submittedLink}
                  target="_blank"
                  className="text-blue-700 hover:border-b hover:border-blue-400"
                >
                  Link
                </a>
              </h4>
            </div>
            <div className="">
              <h3 className="text-lg font-semibold text-green-500">
                Student Email
              </h3>
              <h4 className="text-lg ml-2">
                {data?.submissionDetails?.studentEmail}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div
        className="opacity-25 fixed inset-0  z-[20000] bg-black"
        onClick={() => setOpenModal(false)}
      ></div>
    </>
  );
};

export default ExerciseResponseModal;
