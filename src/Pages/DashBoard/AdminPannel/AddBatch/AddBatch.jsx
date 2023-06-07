import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import style from "./AddBatch.module.css";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import moment from "moment";
import { toast } from "react-hot-toast";
const AddBatch = () => {
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  // const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [program, setProgram] = useState({});
  const [course, setCourse] = useState({});
  const { user } = useContext(AuthContext);
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
      if (name === "courseName") {
        courses?.forEach((each) => {
          if (each?._id === value?.courseName) {
            setCourse({
              course_id: each?._id,
              courseName: each?.courseName,
            });
            return;
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/programs/all-program")
      .then((response) => response.json())
      .then((data) => {
        // console.log("data", data?.data);
        setData(data?.data);
      });
  }, []);

  useEffect(() => {
    if (program?.program_id) {
      setCourses([]);
      fetch(
        `http://localhost:5000/api/v1/courses/all-courses-by-program?_id=${program?.program_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log("data", data?.data);
          setCourses(data?.data);
        });
    }
  }, [program?.program_id]);

  const onSubmit = (data) => {
    const justNow = moment().format();
    const batch = {
      batchName: data?.batchName,
      course,
      program,
      batchId: data?.batchId,
      startedAt: data?.startedAt,
      duration: parseInt(data?.duration),
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
    console.log("batchDetails: ", batch);
    fetch("http://localhost:5000/api/v1/batches/add-batch", {
      method: "POST",
      body: JSON.stringify(batch),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
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
    <div className='container p-8'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=' font-poppins font-medium'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Batch Name */}
            <div className={style?.addBatch}>
              <label>Batch Name</label>
              <input
                type='text'
                // required
                name='batchName'
                {...register("batchName", {
                  required: "Batc hName is required",
                })}
                aria-invalid={errors.batchName ? "true" : "false"}
                // onChange={handleInputChange}
              />
              {errors.batchName && (
                <p
                  className='text-red-500 font-poppins font-medium'
                  role='alert'
                >
                  {errors.batchName?.message}
                </p>
              )}
            </div>
            {/* Batch ID */}

            {/* Duration */}
            <div className={style?.addBatch}>
              <label htmlFor='duration'>Duration</label>
              <input
                name='duration'
                type='number'
                placeholder='Duration in days'
                {...register("duration", {
                  required: "Duration is required",
                })}
                aria-invalid={errors.duration ? "true" : "false"}
                className='w-full border-2 border-green-400 rounded-xl'
              />
              {errors.duration && (
                <p
                  className='text-red-500 font-poppins font-medium'
                  role='alert'
                >
                  {errors.duration?.message}
                </p>
              )}
            </div>
            {/* Duration */}
            {/* Program Name */}
            <div className={style?.addLecture}>
              <label htmlFor='programName'>Program Name</label>
              <select
                name='programName'
                {...register("programName", {
                  required: "Program Name is required",
                })}
                aria-invalid={errors.programName ? "true" : "false"}
                className='w-full border-2 border-green-400 rounded-xl'
              >
                <option disabled selected value=''>
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
                  className='text-red-500 font-poppins font-medium'
                  role='alert'
                >
                  {errors.programName?.message}
                </p>
              )}
            </div>
            {/* Course Name */}
            <div className={style?.addLecture}>
              <label htmlFor='courseName'>Course Name</label>
              <select
                name='courseName'
                {...register("courseName", {
                  required: "Course Name is required",
                })}
                aria-invalid={errors.courseName ? "true" : "false"}
                className='w-full border-2 border-green-400 rounded-xl'
              >
                <option disabled selected value=''>
                  Choose a Course
                </option>
                {courses?.length > 0 &&
                  courses?.map((each) => (
                    <option key={each?._id} value={each?._id}>
                      {each?.courseName}
                    </option>
                  ))}
              </select>
              {errors.courseName && (
                <p
                  className='text-red-500 font-poppins font-medium'
                  role='alert'
                >
                  {errors.courseName?.message}
                </p>
              )}
            </div>

            {/* Started At */}
            <div className={style?.addBatch}>
              <label>Started At</label>
              <input
                // required
                type='datetime-local'
                name='startedAt'
                // onChange={handleInputChange}
                {...register("startedAt", {
                  required: "Select A Date",
                })}
                aria-invalid={errors.startedAt ? "true" : "false"}
              />
              {errors.startedAt && (
                <p
                  role='alert'
                  className='text-red-500 font-poppins font-medium'
                >
                  {errors.startedAt?.message}
                </p>
              )}
            </div>
            {/* Started At */}
          </div>
        </div>
        {/* Submit Button */}
        <button
          type='submit'
          class='group relative h-12 w-full overflow-hidden rounded-lg bg-white text-lg shadow'
        >
          <div class='absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full'></div>
          <span class='relative text-black group-hover:text-white font-poppins font-medium'>
            Submit
          </span>
        </button>
      </form>
    </div>
  );
};

export default AddBatch;
