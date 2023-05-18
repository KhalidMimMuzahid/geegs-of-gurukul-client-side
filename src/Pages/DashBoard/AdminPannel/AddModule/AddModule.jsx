import React, { useContext } from "react";
import style from "./AddModule.module.css";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import { useForm } from "react-hook-form";
import moment from "moment";

const AddModule = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const justNow = moment().format();
    const moduleDetails = {
      moduleName: data?.moduleName,
      programName: data?.programName,
      courseName: data?.courseName,
      batchName: data?.batchName,
      actionsDetails: {
        isDeleted: false,
        creation: {
          createdAt: justNow,
          creatorEmail: user.email,
        },
        updation: {
          updatedAt: justNow,
          updaterEmail: user.email,
        },
      },
    };
  };

  return (
    <div className="container p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10 font-poppins font-medium">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Course Name */}
            <div className={style?.addCourse}>
              <label htmlFor="moduleName">Module Name</label>
              <input
                type="text"
                // required
                name="moduleName"
                {...register("moduleName", {
                  required: "Module Name is required",
                })}
                aria-invalid={errors.moduleName ? "true" : "false"}
                // onChange={handleInputChange}
              />
              {errors.moduleName && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.moduleName?.message}
                </p>
              )}
            </div>

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
                <option value="">Choose a Program</option>
                <option value="School-Champs">School-Champs</option>
                <option value="Coding-Bees">Coding-Bees</option>
                <option value="Engineering-Nerds">Engineering-Nerds</option>
                <option value="Industrial-Courses">Industrial-Courses</option>
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
                <option value="">Choose a Program</option>
                <option value="School-Champs">School-Champs</option>
                <option value="Coding-Bees">Coding-Bees</option>
                <option value="Engineering-Nerds">Engineering-Nerds</option>
                <option value="Industrial-Courses">Industrial-Courses</option>
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
          </div>
        </div>

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

export default AddModule;
