import React from "react";
import { useForm } from "react-hook-form";
import style from './AddBatch.module.css'
const AddBatch = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
      } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="container p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" font-poppins font-medium">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lecture Name */}
            <div className={style?.addBatch}>
              <label>Lecture Name</label>
              <input
                type="text"
                // required
                name="lectureName"
                {...register("lectureName", {
                  required: "Lecture Name is required",
                })}
                aria-invalid={errors.lectureName ? "true" : "false"}
                // onChange={handleInputChange}
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
            <div className={style?.addBatch}>
              <label>Topic Name</label>
              <input
                type="text"
                // required
                name="topicName"
                {...register("topicName", {
                  required: "Topic Name is required",
                })}
                aria-invalid={errors.topicName ? "true" : "false"}
                // onChange={handleInputChange}
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
            <div className={style?.addBatch}>
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
            <div className={style?.addBatch}>
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
            {/* Sceduled At */}
            <div className={style?.addBatch}>
              <label>Sceduled At</label>
              <input
                // required
                type="datetime-local"
                name="sceduledAt"
                // onChange={handleInputChange}
                {...register("sceduledAt", {
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
            <div className={style?.addBatch}>
              <label>Ends At</label>
              <input
                // required
                type="datetime-local"
                name="endsAt"
                // onChange={handleInputChange}
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
            {/* Attachment File */}
            <div class="w-full font-poppins">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                for="file_input"
              >
                Upload file
              </label>
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
            {/* Zoom Link */}
            <div className={style?.addBatch}>
              <label>Zoom Link</label>
              <input
                // required
                type="url"
                name="zoomLink"
                // onChange={handleInputChange}
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
            {/* Upload Video */}
            <div class="w-full font-poppins">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                for="file_input"
              >
                Upload Video
              </label>
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
        <div class="w-full mx-auto my-10 font-poppins">
          <label
            for="notes"
            class="block mb-2 text-md font-poppins font-medium text-gray-900 dark:text-gray-400"
          >
            <div className="flex items-center justify-between">
              <p>Notes:</p>

              <label
                for="Optional"
                class="flex items-center cursor-pointer relative mb-4"
              >
                <input
                  type="checkbox"
                  id="Optional"
                  name="Optional"
                  {...register("Optional")}
                  class="sr-only"
                />
                <div class="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
                <span class="ml-3 text-gray-900 text-sm font-medium">
                  Optional
                </span>
              </label>

              <p
                
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
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Your message..."
            
            aria-invalid={errors.notes ? "true" : "false"}
          ></textarea>
          {errors.notes && (
            <p role="alert" className="text-red-500 font-poppins font-medium">
              {errors.notes?.message}
            </p>
          )}
          <button
            
            className="my-2 font-poppins font-medium text-white px-2 py-2 bg-green-400 hover:bg-green-500 rounded-md"
          >
            Preview
          </button>
          
        </div>
        {/* Search Lecture */}
        <button
          
          className="px-2 py-2 bg-green-500 text-white font-poppins font-medium rounded-lg my-2"
        >
          + Add Attachments
        </button>
        
        {/* Submit Button */}
        <button
          type="submit"
          class="group relative h-12 w-full overflow-hidden rounded-lg bg-white text-lg shadow"
        >
          <div class="absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span class="relative text-black group-hover:text-white font-poppins font-medium">
            Submit
          </span>
        </button>
      </form>
    </div>
  );
};

export default AddBatch;
