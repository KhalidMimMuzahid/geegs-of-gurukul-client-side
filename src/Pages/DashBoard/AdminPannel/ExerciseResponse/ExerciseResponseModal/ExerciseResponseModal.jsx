import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsXCircleFill } from "react-icons/bs";
import style from "./exerciseResponseModal.module.css";
import { toast } from "react-hot-toast";

const ExerciseResponseModal = ({
  setOpenModal,
  data,
  setRefreshExcerciseResponse,
}) => {
  const [loading, setLoading] = useState(false);
  const [updateButton, setUpdateButton] = useState(false);
  const [mark, setMark] = useState(data?.mark);
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const onUpdate = (d) => {
    setLoading(true);
    const updatedData = {
      mark: parseInt(d?.marks),
    };
    // console.log(updatedData);
    fetch(
      `http://localhost:5000/api/v1/exercises/exercise-response-update/${data?._id}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          toast.success(data?.message);
          // console.log(data);
          setRefreshExcerciseResponse((prev) => !prev);
          setMark(parseInt(d?.marks));
          setLoading(false);
          setUpdateButton(false);
          reset();
        } else {
          toast.error(data?.message);
          setLoading(false);
        }
      })
      .catch((error) => console.error(error));
    // console.log(updatedUser);
    setLoading(false);
  };

  useEffect(() => {
    data?.mark ? setUpdateButton(false) : setUpdateButton(true);
  }, [data?.mark]);
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
            {mark && (
              <div className="">
                <h3 className="text-lg font-semibold text-green-500">
                  Exercise Marks
                </h3>
                <h4 className="text-lg ml-2">{mark} Mark</h4>
              </div>
            )}
            <div className="">
              <h3 className="text-lg font-semibold text-green-500">
                Student Email
              </h3>
              <h4 className="text-lg ml-2">
                {data?.submissionDetails?.studentEmail}
              </h4>
            </div>
          </div>
          {updateButton ? (
            <form onSubmit={handleSubmit(onUpdate)}>
              <div className="flex justify-center items-center flex-col mt-10 gap-3">
                <div className={style?.Exercise}>
                  <label>Mark</label>
                  <input
                    type="text"
                    placeholder="Enter marksMark"
                    name="marks"
                    defaultValue={mark}
                    {...register("marks", {
                      required: "marks field is required",
                      max: {
                        value: 10,
                        message: "maximum marks is 10",
                      },
                      min: {
                        value: 0,
                        message: "Minimum marks is 0",
                      },
                    })}
                    aria-invalid={errors.marks ? "true" : "false"}
                  />
                  {errors.marks && (
                    <p
                      className="text-red-500 font-poppins font-medium"
                      role="alert"
                    >
                      {errors.marks?.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-1 bg-green-500 hover:bg-green-500/90 text-white"
                  >
                    {data?.mark ? (
                      <>{loading ? "Updating" : "Update"}</>
                    ) : (
                      <>{loading ? "Saving" : "Save"}</>
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex justify-center items-center mt-10">
              <button
                onClick={() => setUpdateButton(true)}
                className="px-4 py-1 bg-green-500 hover:bg-green-500/90 text-white"
              >
                Update Mark
              </button>
            </div>
          )}
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
