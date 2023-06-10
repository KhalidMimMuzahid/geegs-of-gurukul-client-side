import React, { useContext } from "react";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import { useForm } from "react-hook-form";
import moment from "moment";

const inputStyle =
  "border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg w-full mt-1";

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
    <div className="container p-8 font-poppins">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* Course Name */}
            <div>
              <label htmlFor="moduleName">Module Name</label>
              <input
                type="text"
                name="moduleName"
                {...register("moduleName", {
                  required: "Module Name is required",
                })}
                aria-invalid={errors.moduleName ? "true" : "false"}
                placeholder="Enter module name"
                className={inputStyle}
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

            <div>
              <label htmlFor="programName">Program Name</label>
              <select
                name="programName"
                {...register("programName", {
                  required: "Program Name is required",
                })}
                aria-invalid={errors.programName ? "true" : "false"}
                defaultValue=""
                className={inputStyle}
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
            <div>
              <label htmlFor="courseName">Course Name</label>
              <select
                name="courseName"
                {...register("courseName", {
                  required: "Course Name is required",
                })}
                aria-invalid={errors.courseName ? "true" : "false"}
                defaultValue=""
                className={inputStyle}
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
            <div>
              <label htmlFor="batchName">Batch Name</label>
              <select
                name="batchName"
                {...register("batchName", {
                  required: "Batch Name is required",
                })}
                aria-invalid={errors.batchName ? "true" : "false"}
                defaultValue=""
                className={inputStyle}
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
          className="w-full text-white py-3 bg-[#4BA25D] hover:bg-[#5fb370] rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddModule;
