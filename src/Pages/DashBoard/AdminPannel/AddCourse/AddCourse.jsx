import React from "react";
import { useForm } from "react-hook-form";
import style from "./AddCourse.module.css";

const AddCourse = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const course = {
      courseName: data?.courseName,
      courseId: data?.courseId,
      duration: data?.duration,
      programName: data.programName,
      regularPrice: data?.regularPrice,
      offerPrice: data?.offerPrice,
      courseDetail: data?.offerPrice,
    };

    fetch("https://geeks-of-gurukul-server-side.vercel.app/add-course", {
      method: "POST",
      body: JSON.stringify(course),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    console.log(course);
    reset();
  };
  return (
    <div className="container p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" font-poppins font-medium">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Course Name */}
            <div className={style?.addCourse}>
              <label htmlFor="courseName">Course Name</label>
              <input
                type="text"
                // required
                name="courseName"
                {...register("courseName", {
                  required: "Course Name is required",
                })}
                aria-invalid={errors.courseName ? "true" : "false"}
                // onChange={handleInputChange}
              />
              {errors.courseName && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.courseName?.message}
                </p>
              )}
            </div>
            {/*course Name */}
            {/* Duration */}
            <div className={style?.addCourse}>
              <label htmlFor="duration">Duration</label>
              <input
                type="number"
                // required
                name="duration"
                {...register("duration", {
                  required: "Duration is required",
                })}
                aria-invalid={errors.duration ? "true" : "false"}
                // onChange={handleInputChange}
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
            {/* CourseID */}
            <div className={style?.addCourse}>
              <label htmlFor="courseId">Course ID</label>
              <input
                type="text"
                name="courseId"
                {...register("courseId", {
                  required: "Course ID is required",
                })}
                aria-invalid={errors.courseId ? "true" : "false"}
                className="w-full border-2 border-green-400 rounded-xl"
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
            {/* Program Name */}
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
                <option value="">Choose a Program</option>
                <option value="School-Champs">School-Champs</option>
                <option value="Coding-Bees">Coding-Bees</option>
                <option value="Engineering-Nerds">Engineering-Nerds</option>
                <option value="Industrial-Courses">Industrial-Courses</option>
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
            {/* Program Name */}
            {/* Regular Price */}
            <div className={style?.addCourse}>
              <label htmlFor="regularPrice">Regular Price(In Rupee)</label>
              <input
                type="number"
                name="regularPrice"
                {...register("regularPrice", {
                  required: "Regular Price is required",
                })}
                aria-invalid={errors.regularPrice ? "true" : "false"}
                className="w-full border-2 border-green-400 rounded-xl"
              />
              {errors.regularPrice && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.regularPrice?.message}
                </p>
              )}
            </div>
            {/* Regular Price */}
            {/* Offer Price */}
            <div className={style?.addCourse}>
              <label htmlFor="offerPrice">Offer Price(In Rupee)</label>
              <input
                type="number"
                name="offerPrice"
                {...register("offerPrice", {
                  //   required: "Offer Price is required",
                })}
                aria-invalid={errors.offerPrice ? "true" : "false"}
                className="w-full border-2 border-green-400 rounded-xl"
              />
              {errors.offerPrice && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.offerPrice?.message}
                </p>
              )}
            </div>
            {/* Offer Price */}
          </div>
        </div>

        {/* Text Area */}
        <div class="w-full mx-auto my-10 font-poppins">
          <label
            for="Course"
            class="block mb-2 text-md font-poppins font-medium text-gray-900 dark:text-gray-400"
          >
            <div className="flex items-center justify-between">
              <p>Course Detailse:</p>
            </div>
          </label>
          <textarea
            id="courseDetail"
            name="courseDetail"
            {...register("courseDetail")}
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Write course detail here..."
            aria-invalid={errors.courseDetail ? "true" : "false"}
          ></textarea>
          {errors.courseDetail && (
            <p role="alert" className="text-red-500 font-poppins font-medium">
              {errors.courseDetail?.message}
            </p>
          )}
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

export default AddCourse;
