import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import style from "./AddLecture.module.css";
import AddAssignmentModal from "./Modal/AddAssignmentModal";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import moment from "moment";

const AddLectures = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignments, setSelectedAssignments] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const justNow = moment().format();

    const lectureData = {
      courseId: "",
      courseName: data.courseName,
      batchId: "",
      batchName: data.batchName,
      programeId: "",
      programName: data.programName,
      startAt: data.scheduledAt,
      endSAt: data.endsAt,
      isOptional: data.optional,
      lectureName: data.lectureName,
      topic: data.topicName,
      assignment: {
        sheduledAt: data.scheduledAt,
        deadLine: data.endsAt,
        assignments_id: selectedAssignments,
      },
      lectureVideo: {
        liveLink: data.zoomLink,
        videoLink: {
          s3Hoster: "",
          vimeoHoster: "",
        },
      },
      notes: data.notes,
      additionalFiles: data.fileInput,

      actionsDetails: {
        isDeleted: false,
        creation: {
          createdAt: justNow,
          creatorEmail: user.email,
        },
        updation: {
          updatedAt: justNow,
          updatorEmail: user.email,
        },
      },
    };

    console.log(lectureData);
  };

  const [text, setText] = useState("");
  const [preview, setPreview] = useState(false);
  const [instructions, setInstructions] = useState(false);
  const [search, setSearch] = useState(false);
  return (
    <div className="container p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" font-poppins font-medium">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lecture Name */}
            <div className={style?.addLecture}>
              <label>Lecture Name</label>
              <input
                type="text"
                name="lectureName"
                {...register("lectureName", {
                  required: "Lecture Name is required",
                })}
                aria-invalid={errors.lectureName ? "true" : "false"}
              />
              {errors.lectureName && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.lectureName?.message}
                </p>
              )}
            </div>
            {/* Lecture Name */}
            {/* Topic Name */}
            <div className={style?.addLecture}>
              <label>Topic Name</label>
              <input
                type="text"
                name="topicName"
                {...register("topicName", {
                  required: "Topic Name is required",
                })}
                aria-invalid={errors.topicName ? "true" : "false"}
              />
              {errors.topicName && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.topicName?.message}
                </p>
              )}
            </div>
            {/* Topic Name */}
            {/* Batch Name */}
            <div className={style?.addLecture}>
              <label htmlFor="batchName">Batch Name</label>
              <select
                name="batchName"
                {...register("batchName", {
                  required: "Batch Name is required",
                })}
                aria-invalid={errors.batchName ? "true" : "false"}
                className="w-full border-2 border-green-400 rounded-xl"
              >
                <option value="">Choose a Batch</option>
                <option value="Batch-001">Batch-001</option>
                <option value="Batch-002">Batch-002</option>
                <option value="Batch-003">Batch-003</option>
              </select>
              {errors.batchName && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.batchName?.message}
                </p>
              )}
            </div>
            {/* Batch Name */}
            {/* Course Name */}
            <div className={style?.addLecture}>
              <label htmlFor="courseName">Course Name</label>
              <select
                name="courseName"
                {...register("courseName", {
                  required: "Course Name is required",
                })}
                aria-invalid={errors.courseName ? "true" : "false"}
                className="w-full border-2 border-green-400 rounded-xl"
              >
                <option value="">Choose a Course</option>
                <option value="Python">Python</option>
                <option value="DataScience">Data Science</option>
                <option value="CodingChamps">Coding Champs</option>
              </select>
              {errors.courseName && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.courseName?.message}
                </p>
              )}
            </div>
            {/* Course Name */}
            {/* Programe Name */}
            <div className={style?.addLecture}>
              <label htmlFor="programName">Program Name</label>
              <select
                name="programName"
                {...register("programName", {
                  required: "Program Name is required",
                })}
                aria-invalid={errors.programName ? "true" : "false"}
                className="w-full border-2 border-green-400 rounded-xl"
              >
                <option value="">Choose a Programe</option>
                <option value="Program1">Program1</option>
                <option value="Program2">Program2</option>
                <option value="Program3">Program3</option>
              </select>
              {errors.programName && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.programName?.message}
                </p>
              )}
            </div>
            {/* Programe Name */}
            {/* Sceduled At */}
            <div className={style?.addLecture}>
              <label>Sceduled At</label>
              <input
                type="datetime-local"
                name="scheduledAt"
                {...register("scheduledAt", {
                  required: "Select A Date",
                })}
                aria-invalid={errors.sceduledAt ? "true" : "false"}
              />
              {errors.sceduledAt && (
                <p
                  role="alert"
                  className="text-red-500 font-poppins font-medium"
                >
                  {errors.sceduledAt?.message}
                </p>
              )}
            </div>
            {/* Sceduled At */}
            {/* Ends At */}
            <div className={style?.addLecture}>
              <label>Ends At</label>
              <input
                type="datetime-local"
                name="endsAt"
                {...register("endsAt", {
                  required: "Select A Date",
                })}
                aria-invalid={errors.endsAt ? "true" : "false"}
              />
              {errors.endsAt && (
                <p
                  role="alert"
                  className="text-red-500 font-poppins font-medium"
                >
                  {errors.endsAt?.message}
                </p>
              )}
            </div>
            {/* Ends At */}
            {/* Zoom Link */}
            <div className={style?.addLecture}>
              <label>Zoom Link</label>
              <input
                type="url"
                name="zoomLink"
                {...register("zoomLink", {
                  required: "Provide Zoom Link",
                })}
                aria-invalid={errors.zoomLink ? "true" : "false"}
              />
              {errors.zoomLink && (
                <p
                  role="alert"
                  className="text-red-500 font-poppins font-medium"
                >
                  {errors.zoomLink?.message}
                </p>
              )}
            </div>
            {/* Zoom Link */}
            {/* Attachment File */}
            <div className="w-full font-poppins">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                htmlFor="file_input"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="fileInput"
                name="fileInput"
                type="file"
                {...register("fileInput", {
                  required: "File is required",
                })}
                aria-invalid={errors.fileInput ? "true" : "false"}
              />
              {errors.fileInput && (
                <p
                  role="alert"
                  className="text-red-500 font-poppins font-medium"
                >
                  {errors.fileInput?.message}
                </p>
              )}
            </div>
            {/* Attachment File */}

            {/* Upload Video */}
            <div className="w-full font-poppins">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                htmlFor="file_input"
              >
                Upload Video
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="videoInput"
                name="videoInput"
                type="file"
                accept=".mp4"
                {...register("videoInput", {
                  required: "Add a video file",
                })}
                aria-invalid={errors.videoInput ? "true" : "false"}
              />
              {errors.videoInput && (
                <p
                  role="alert"
                  className="text-red-500 font-poppins font-medium"
                >
                  {errors.videoInput?.message}
                </p>
              )}
            </div>
            {/* Upload Video */}
          </div>
        </div>

        {/* Text Area */}
        <div className="w-full mx-auto mt-10 mb-5 font-poppins">
          <label
            htmlFor="notes"
            className="block mb-2 text-md font-poppins font-medium text-gray-900 dark:text-gray-400"
          >
            <div className="flex items-center justify-between">
              <p>Notes:</p>

              <label
                htmlFor="optional"
                className="flex items-center cursor-pointer relative mb-4"
              >
                <input
                  type="checkbox"
                  id="optional"
                  name="optional"
                  {...register("optional")}
                  className="sr-only"
                />
                <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
                <span className="ml-3 text-gray-900 text-sm font-medium">
                  Optional
                </span>
              </label>

              <p
                onClick={() => setInstructions(true)}
                className="hover:text-sky-500 hover:cursor-pointer"
              >
                Instructions
              </p>
            </div>
          </label>
          <textarea
            id="notes"
            name="notes"
            {...register("notes")}
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-invalid={errors.notes ? "true" : "false"}
          ></textarea>
          {errors.notes && (
            <p role="alert" className="text-red-500 font-poppins font-medium">
              {errors.notes?.message}
            </p>
          )}
          <button
            type="button"
            onClick={() => setPreview(true)}
            className="my-2 font-poppins font-medium text-white px-2 py-2 bg-green-400 hover:bg-green-500 rounded-md"
          >
            Preview
          </button>
          {/* For Preview only */}
          {preview && (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none">
                <div className="relative w-[360px] h-[600px] sm:w-[400px] md:w-[600px] lg-[700px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-auto max-w-3xl  bg-white rounded-lg shadow-2xl">
                  <button
                    onClick={() => setPreview(false)}
                    className="absolute right-5 top-5 px-2 py-2 bg-red-400 rounded-full"
                  >
                    ❌
                  </button>
                  <h3 className="text-2xl font-poppins font-medium mt-1">
                    Preview:
                  </h3>
                  <div className=" mt-6 w-full h-4/5 p-4 mx-auto bg-white border border-green-400 rounded-md overflow-x-auto overflow-y-auto">
                    <ReactMarkdown
                      children={text}
                      remarkPlugins={[remarkGfm]}
                    ></ReactMarkdown>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
            </>
          )}
          {/* For Instructions to teachers to write markdown */}
          {instructions && (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none">
                <div className="relative w-[360px] h-[600px] sm:w-[400px] md:w-[600px] lg-[700px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-auto max-w-3xl  bg-white rounded-lg shadow-2xl">
                  <button
                    onClick={() => setInstructions(false)}
                    className="absolute right-5 top-5 px-2 py-2 bg-red-400 rounded-full"
                  >
                    ❌
                  </button>
                  <h3 className="text-2xl font-poppins font-medium mt-1">
                    Instructions:
                  </h3>
                  <iframe
                    title="markdown instructions"
                    src="https://padomi.id.lv/PRG/par__/Markdown-Cheat-Sheet.pdf"
                    width="100%"
                    height="500px"
                  ></iframe>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
            </>
          )}
        </div>

        {/* add assignment button */}
        <div className="flex justify-between align-center">
          <button
            type="button"
            onClick={() => setSearch(true)}
            className="px-2 py-2 bg-green-500 text-white font-poppins font-medium rounded-lg mb-3"
          >
            + Add Assignments
          </button>
          <p className="font-bold text-green-500">
            Assignments selected: {selectedAssignments.length}
          </p>
        </div>
        {/* add assignment button */}

        {/* Submit Button */}
        <button
          type="submit"
          className="group relative h-12 w-full overflow-hidden rounded-lg bg-white text-lg shadow"
        >
          <div className="absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span className="relative text-black group-hover:text-white font-poppins font-medium">
            Submit
          </span>
        </button>
      </form>
      {/* Add assignment modal */}
      {search && (
        <AddAssignmentModal
          setSearch={setSearch}
          assignments={assignments}
          setAssignments={setAssignments}
          selectedAssignments={selectedAssignments}
          setSelectedAssignments={setSelectedAssignments}
        />
      )}
      {/* Add assignment modal */}
    </div>
  );
};

export default AddLectures;
