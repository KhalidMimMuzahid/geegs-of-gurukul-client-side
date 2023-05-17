import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import style from "./AddCourse.module.css";
import moment from "moment";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";

const AddCourse = () => {
  const [data, setData] = useState([]);
  const [program, setProgram] = useState({});
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch("http://localhost:5000/all-program")
      .then((response) => response.json())
      .then((data) => {
        // console.log("data", data?.data);
        setData(data?.data);
      });
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      // console.log("value", value);
      // console.log("\nname", name);
      // console.log("\ntype", type);
      if (name === "programName") {
        data?.forEach((each) => {
          if (each?._id === value?.programName) {
            setProgram({
              program_id: each?._id,
              programName: each?.programName,
            });
            return;
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  });
  const onSubmit = (data) => {
    const justNow = moment().format();
    const course = {
      courseName: data?.courseName,
      courseId: data?.courseId,
      duration: data?.duration,
      regularPrice: data?.regularPrice,
      offerPrice: data?.offerPrice,
      courseDetail: data?.offerPrice,
      program,
      actionsDetails: {
        isDeleted: false,
        creation: {
          createdAt: justNow,
          creatorEmail: user?.email,
        },

        updation: {
          updateAt: justNow,
          updatorEmail: user?.email,
        },
      },
    };

    // fetch("https://geeks-of-gurukul-server-side.vercel.app/add-course", {
    //   method: "POST",
    //   body: JSON.stringify(course),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error));
    console.log(course);
    //reset();
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
              <label htmlFor="duration">Duration in weeks</label>
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
              <label htmlFor="currentBatch">First Batch</label>
              <input
                type="text"
                name="currentBatch"
                {...register("currentBatch", {
                  required: "current Batch is required",
                })}
                aria-invalid={errors.currentBatch ? "true" : "false"}
                className="w-full border-2 border-green-400 rounded-xl"
              />

              {errors?.currentBatch && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors?.currentBatch?.message}
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
                <option disabled selected value="">
                  Choose a Program
                </option>
                {data?.length > 0 &&
                  data?.map((each) => (
                    <option key={each?._id} value={each?._id}>
                      {each?.programName}
                    </option>
                  ))}
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

export default AddCourse;
