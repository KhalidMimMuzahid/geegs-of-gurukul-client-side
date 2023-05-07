import React from "react";
import editIcon from "../../../../assets/profileIcon/editIcon.svg";
import { useForm } from "react-hook-form";
const Education = () => {
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
    <div className='p-8 font-poppins'>
      {/* Header */}
      <div className='w-full flex items-center justify-between'>
        <h3 className='font-poppins font-bold'>Education</h3>
        <img src={editIcon} alt='' />
      </div>
      {/* Header */}
      {/* Main content */}
      <div className='py-2'>
        {/* input group */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='yourEducation'>Your Education level</label>
              <input
                type='text'
                name='yourEducation'
                {...register("yourEducation", {
                  required: "This field is required",
                })}
                aria-invalid={errors.yourEducation ? "true" : "false"}
                className='rounded-lg'
              />
              {errors.yourEducation && (
                <p
                  className='text-red-500 font-poppins font-medium'
                  role='alert'
                >
                  {errors.yourEducation?.message}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='yourDegree'>Exam/Degree Title</label>
              <input
                type='text'
                name='yourDegree'
                {...register("yourDegree", {
                  required: "This field is required",
                })}
                aria-invalid={errors.yourDegree ? "true" : "false"}
                className='rounded-lg'
              />
              {errors.yourDegree && (
                <p
                  className='text-red-500 font-poppins font-medium'
                  role='alert'
                >
                  {errors.yourDegree?.message}
                </p>
              )}
            </div>
            <div className='col-span-full'>
              <label htmlFor='institutionName'>Institution Name</label>
              <input
                type='text'
                name='institutionName'
                {...register("institutionName", {
                  required: "This field is required",
                })}
                aria-invalid={errors.institutionName ? "true" : "false"}
                className='w-full rounded-lg my-4'
              />
              {errors.institutionName && (
                <p
                  className='text-red-500 font-poppins font-medium'
                  role='alert'
                >
                  {errors.institutionName?.message}
                </p>
              )}
            </div>
            <input
              type='submit'
              value='Save'
              className='w-24 rounded-lg bg-[#2DC97E] px-2 py-2 text-white'
            />
          </div>
        </form>
        {/* input group */}
      </div>
      {/* Main content */}
    </div>
  );
};

export default Education;
