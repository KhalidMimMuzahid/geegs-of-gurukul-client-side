import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import { toast } from "react-hot-toast";

const inputStyle =
  "border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg w-full mt-1";

const AddCourse = () => {
  const [data, setData] = useState([]);
  const [program, setProgram] = useState({});
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch("https://api.geeksofgurukul.com/api/v1/programs/all-program")
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
      duration: parseInt(data?.duration),
      regularPrice: parseInt(data?.regularPrice),
      currentBatch: "",
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
    // console.log(course);
    fetch("https://api.geeksofgurukul.com/api/v1/courses/add-course", {
      method: "POST",
      body: JSON.stringify(course),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          toast.success(data?.message);
          // reset();
        } else {
          toast.error(data?.message);
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="container p-8 font-poppins">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {/* Course Name */}
            <div>
              <label htmlFor="courseName">Course Name</label>
              <input
                type="text"
                name="courseName"
                {...register("courseName", {
                  required: "Course Name is required",
                })}
                aria-invalid={errors.courseName ? "true" : "false"}
                placeholder="Enter course name"
                className={`${inputStyle} input border-[#5FB370]`}
              />
              {errors.courseName && (
                <p
                      className="text-red-500 text-[14px] font-poppins font-normal"
                      role="alert"
                    >
                  {errors.courseName?.message}
                </p>
              )}
            </div>
            {/*course Name */}
            {/* Duration */}
            <div>
              <label htmlFor="duration">Duration in weeks</label>
              <input
                type="number"
                name="duration"
                {...register("duration", {
                  required: "Duration is required",
                })}
                aria-invalid={errors.duration ? "true" : "false"}
                placeholder="Enter duration"
                className={`${inputStyle} input border-[#5FB370]`}
              />
              {errors.duration && (
                <p
                      className="text-red-500 text-[14px] font-poppins font-normal"
                      role="alert"
                    >
                  {errors.duration?.message}
                </p>
              )}
            </div>
            {/* Duration */}

            {/* Program Name */}
            <div>
              <label htmlFor="programName">Program Name</label>
              <select
                name="programName"
                {...register("programName", {
                  required: "Program Name is required",
                })}
                aria-invalid={errors.programName ? "true" : "false"}
                defaultValue=""
                className={`${inputStyle} input border-[#5FB370]`}
              >
                <option disabled value="">
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
                      className="text-red-500 text-[14px] font-poppins font-normal"
                      role="alert"
                    >
                  {errors.programName?.message}
                </p>
              )}
            </div>
            {/* Program Name */}
            {/* Regular Price */}
            <div>
              <label htmlFor="regularPrice">Regular Price(In Rupee)</label>
              <input
                type="number"
                name="regularPrice"
                {...register("regularPrice", {
                  required: "Regular Price is required",
                })}
                aria-invalid={errors.regularPrice ? "true" : "false"}
                placeholder="Enter regular price"
                className={`${inputStyle} input border-[#5FB370]`}
              />
              {errors.regularPrice && (
                <p
                      className="text-red-500 text-[14px] font-poppins font-normal"
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
        <div className="w-full flex items-center justify-center">
        <button
          type="submit"
          className="bg-[#4BA25D] hover:bg-[#5fb370] py-3 text-white w-full md:w-28 rounded-lg"
        >
          Submit
        </button>
       </div>
      </form>
    </div>
  );
};

export default AddCourse;
