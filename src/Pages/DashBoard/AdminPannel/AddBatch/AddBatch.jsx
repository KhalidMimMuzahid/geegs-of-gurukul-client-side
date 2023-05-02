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
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <div className="container p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" font-poppins font-medium">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Course ID */}
            <div className={style?.addBatch}>
              <label>Course ID</label>
              <input
                type="text"
                // required
                name="courseId"
                {...register("courseId", {
                  required: "Lecture Name is required",
                })}
                aria-invalid={errors.courseId ? "true" : "false"}
                // onChange={handleInputChange}
              />
              {errors.courseId && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.courseId?.message}
                </p>
              )}
            </div>
            {/* Course ID */}
            {/* Batch ID */}
            <div className={style?.addBatch}>
              <label>Batch ID</label>
              <input
                type="text"
                // required
                name="batchId"
                {...register("batchId", {
                  required: "Batch ID is required",
                })}
                aria-invalid={errors.batchId ? "true" : "false"}
                // onChange={handleInputChange}
              />
              {errors.batchId && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.batchId?.message}
                </p>
              )}
            </div>
            {/* Batch ID */}
            {/* Duration */}
            <div className={style?.addBatch}>
              <label htmlFor="duration">Duration</label>
              <input
                name="duration"
                type="number"
              placeholder="Duration in days"
                {...register("duration", {
                  required: "Duration is required",
                })}
                aria-invalid={errors.duration ? "true" : "false"}
                className="w-full border-2 border-green-400 rounded-xl"
              />
              {errors.duration && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.duration?.message}
                </p>
              )}
            </div>
            {/* Duration */}
            
            {/* Started At */}
            <div className={style?.addBatch}>
              <label>Started At</label>
              <input
                // required
                type="datetime-local"
                name="startedAt"
                // onChange={handleInputChange}
                {...register("startedAt", {
                  required: "Select A Date",
                })}
                aria-invalid={errors.startedAt ? "true" : "false"}
              />
              {errors.startedAt && (
                <p
                  role="alert"
                  className="text-red-500 font-poppins font-medium"
                >
                  {errors.startedAt?.message}
                </p>
              )}
            </div>
            {/* Started At */}
            {/* isActive */}
            <div className={style?.addBatch}>
            <label
                for="isActive"
                class="flex items-center cursor-pointer relative mb-4"
              >
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  {...register("isActive")}
                  class="sr-only"
                />
                <div class="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
                <span class="ml-3 text-gray-900 text-sm font-medium">
                  isActive
                </span>
              </label>
            </div>
            {/* isActive */}
          </div>
        </div>
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
