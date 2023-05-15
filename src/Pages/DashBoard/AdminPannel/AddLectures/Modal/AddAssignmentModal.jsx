import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsXCircleFill } from "react-icons/bs";
import Lecturetable from "../TableComponents/Lecturetable";
import { assignmentData } from "../dummyData/dummyData";

function AddAssignmentModal({ setSearch, assignments, setAssignments }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const filteredAssignments = assignmentData.filter((obj) => {
      if (data.assignmentId && obj._id !== data.assignmentId) {
        return false;
      }
      if (data.assignmentName && obj.assignmentName !== data.assignmentName) {
        return false;
      }
      if (data.topic && obj.topic !== data.topic) {
        return false;
      }
      return true;
    });
    setAssignments(filteredAssignments);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none">
        <div className="relative w-[360px] h-[600px] sm:w-[400px] md:w-[600px] lg-[700px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-auto max-w-3xl  bg-white rounded-lg shadow-2xl">
          <div className="px-2 pt-2 flex w-full justify-between">
            <h4 className="font-semibold">Add assignments</h4>
            <button onClick={() => setSearch(false)}>
              <BsXCircleFill size={25} color="red" />
            </button>
          </div>
          {/* Contents */}
          <div className="w-full mx-auto my-6">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="relative">
                <input
                  type="search"
                  className="p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Search by ID"
                  name="assignmentId"
                  {...register("assignmentId")}
                />
              </div>
              <div className="relative">
                <input
                  type="search"
                  className="p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Search by name"
                  name="assignmentName"
                  {...register("assignmentName")}
                />
              </div>
              <div className="relative">
                <input
                  type="search"
                  className="p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Search by topic"
                  name="topic"
                  {...register("topic")}
                />
              </div>
              <button
                type="submit"
                className="bg-green-400 rounded-lg text-white hover:bg-green-500 py-1"
              >
                Search
              </button>
            </form>
          </div>
          {/* Contents */}

          {/* Table */}
          <Lecturetable assignments={assignments} />
        </div>
      </div>
      <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
    </>
  );
}

export default AddAssignmentModal;
