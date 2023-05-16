import React from "react";
import style from "./ExerciseList.module.css";
import { useForm } from "react-hook-form";
import deleteIcon from "../../../../assets/icons/delete.svg";
import editIcon from "../../../../assets/icons/edit.svg";
import copyIcon from "../../../../assets/icons/copy.svg";
const ExerciseList = () => {
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
  const courses = [
    {
      CourseName: "Introduction to JavaScript",
      Topic: "Variables and Data Types",
      BatchNo: 1234,
    },

    {
      CourseName: "Machine Learning with Python",
      Topic: "Regression Analysis",
      BatchNo: 7890,
    },
    { CourseName: "iOS App Development", Topic: "UI Design", BatchNo: 1235 },
    {
      CourseName: "Android App Development",
      Topic: "Intents and Activities",
      BatchNo: 6789,
    },
  ];
  return (
    <div>
      {/* filtering form */}
      <div className='container mt-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='font-poppins font-medium p-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className={style?.exerciseList}>
                <label htmlFor='exerciseName'>Exercise Name</label>
                <input
                  type='text'
                  name='exerciseName'
                  {...register("exerciseName",
                    // {
                    // required: "Enter Exercise Name",
                    // }
                  )}
                  aria-invalid={errors.exerciseName ? "true" : "false"}
                />
              </div>

              {/* Batch Name */}
              <div className={style?.exerciseList}>
                <label htmlFor='batchName'>Topic</label>
                <select
                  name='topic'
                  {...register("topic",
                    // {
                    // required: "Select your topic",
                    // }
                  )}
                  aria-invalid={errors.topic ? "true" : "false"}
                  className='w-full border-2 border-green-400 rounded-xl'
                >
                  <option value=''>Choose a Topic</option>
                  <option value='Python'>Python</option>
                  <option value='Data-Science'>Data-Science</option>
                  <option value='Tools'>Tools</option>
                </select>
                {errors.topic && (
                  <p
                    className='text-red-500 font-poppins font-medium'
                    role='alert'
                  >
                    {errors.topic?.message}
                  </p>
                )}
              </div>
              {/* Batch Name */}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className={style?.exerciseList}>
                <p>Sub-Topic</p>
                <input type='text' name='subTopic' 
                  {...register("subTopic",
                  //   {
                  // required: "Sub topic",
                  //   }
                  )}
                aria-invalid={errors.subTopic ? "true" : "false"}
                />
                
              </div>

              <div className=''>
                <button
                  type='submit'
                  className='px-16 py-3 mt-7 text-white rounded-lg bg-green-500'
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* filtering form */}
      {/* Tables */}
      <div class="flex flex-col justify-center h-full mx-auto">
        <div class="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header class="px-5 py-4 border-b border-gray-100">
            <h2 class="font-semibold font-poppins text-gray-800">Exercises</h2>
          </header>
          <div class="p-3">
            <div class="max-w-[90vw] overflow-x-scroll">
              <table class="table-auto w-full font-poppins font-medium overflow-x-auto">
                <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">SL No:</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">Exercise Name</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">Topic</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-center">Sub-Topic</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody class="text-sm divide-y divide-gray-100">
                  {courses.map((course, i) => (
                    <tr key={i}>
                      <td class="p-2 whitespace-nowrap">
                        <div class="flex items-center">{i + 1}</div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        {course?.CourseName}
                      </td>
                      <td class="p-2 whitespace-nowrap">{course?.Topic}</td>
                      <td class="p-2 whitespace-nowrap">{course?.Topic}</td>
                      <td class="p-2 whitespace-nowrap flex gap-2">
                        <div class="mx-auto flex w-[100px] gap-2">
                          <button
                            type="button"
                            className="px-1 py-1 "
                          >
                            {/* svg */}
                            <img
                              height="15px"
                              width="15px"
                              src={deleteIcon}
                              alt=""
                            />
                          </button>
                          <button
                            type="button"
                            className="px-1 py-1"
                          >
                            {/* svg */}
                            <img
                              height="15px"
                              width="15px"
                              src={editIcon}
                              alt=""
                            />
                          </button>

                          <button
                            data-modal-target="staticModal"
                            data-modal-toggle="staticModal"
                            class="px-1 py-1 "
                            type="button"
                          >
                            {/* svg */}
                            <img
                              height="15px"
                              width="15px"
                              src={copyIcon}
                              alt=""
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Tables */}
    </div>
  );
};

export default ExerciseList;
