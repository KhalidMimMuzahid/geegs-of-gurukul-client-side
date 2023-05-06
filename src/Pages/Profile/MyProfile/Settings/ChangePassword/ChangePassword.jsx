import React from "react";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
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
        <h3 className='font-poppins font-bold'>Change PassWord</h3>
      </div>
      {/* Header */}
      {/* Main content */}
      <div className='py-2'>
        {/* input group */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='currentPassword'>Current Password</label>
              <input
                type='password'
                name='currentPassword'
                {...register("currentPassword", {
                  required: "Enter your Current Password",
                })}
                aria-invalid={errors.currentPassword ? "true" : "false"}
                className='rounded-lg'
              />
              {errors.currentPassword && (
                <p
                  className='text-red-500 font-poppins font-medium'
                  role='alert'
                >
                  {errors.currentPassword?.message}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='newPassword'>New Password</label>
              <input
                type='password'
                name='newPassword'
                {...register("newPassword", {
                  required: "Enter new password",
                })}
                aria-invalid={errors.newPassword ? "true" : "false"}
                className='rounded-lg'
              />
              {errors.newPassword && (
                <p
                  className='text-red-500 font-poppins font-medium'
                  role='alert'
                >
                  {errors.newPassword?.message}
                </p>
              )}
            </div>
            <div className='col-span-full'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                type='password'
                name='confirmPassword'
                {...register("confirmPassword", {
                  required: "Confirm password",
                })}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                className='w-full rounded-lg my-4'
              />
              {errors.confirmPassword && (
                <p
                  className='text-red-500 font-poppins font-medium'
                  role='alert'
                >
                  {errors.confirmPassword?.message}
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

export default ChangePassword;
