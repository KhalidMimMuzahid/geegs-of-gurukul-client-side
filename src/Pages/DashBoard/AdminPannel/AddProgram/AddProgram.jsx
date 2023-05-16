import React, { useContext } from "react";
import style from "./AddProgram.module.css";
import { useForm } from "react-hook-form";
import moment from "moment";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";

const AddProgram = () => {
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
    const programDetails = {
      programName: data?.programName,
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
        {/* Text Area */}
        <div class="w-full mx-auto my-10 font-poppins">
          <label
            for="Course"
            class="block mb-2 text-md font-poppins font-medium text-gray-900 dark:text-gray-400"
          >
            <div className="flex items-center justify-between">
              <p>Program Name:</p>
            </div>
          </label>
          <input
            id="programName"
            name="programName"
            {...register("programName", {
              required: "Program Name is required",
            })}
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Write program name"
            aria-invalid={errors.programName ? "true" : "false"}
          ></input>
          {errors.programName && (
            <p role="alert" className="text-red-500 font-poppins font-medium">
              {errors.programName?.message}
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

export default AddProgram;
