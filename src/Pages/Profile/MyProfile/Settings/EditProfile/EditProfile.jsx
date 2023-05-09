import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../../contexts/UserProvider/UserProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const updatedUser = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      address1: data?.address1,
      address2: data?.address2,
    }
    fetch(`http://localhost:5000/user-detailse/${user?.email}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success('Successfully updated data!')
        console.log(data)
        navigate('/profile/my-profile');
      })
      .catch((error) => console.error(error));
    console.log(updatedUser);
    reset();
  };

  return (
    <div className='p-8 font-poppins'>
      {/* Header */}
      <div className='w-full flex items-center justify-between'>
        <h3 className='font-poppins font-bold'>Edit Information</h3>
      </div>
      {/* Header */}
      {/* Main content */}
      <div className='py-2'>
        {/* input group */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='currentPassword'>First Name</label>
              <input
                type='text'
                name='firstName'
                {...register("firstName", {
                  required: "Enter Your First Name",
                })}
                aria-invalid={errors.firstName ? "true" : "false"}
                className='rounded-lg'
              />
              {errors.firstName && (
                <p
                  className='text-red-500 font-poppins font-medium'
                  role='alert'
                >
                  {errors.firstName?.message}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='newPassword'>Last Name</label>
              <input
                type='text'
                name='lastName'
                {...register("lastName", {
                  required: "Enter Your Last Name",
                })}
                aria-invalid={errors.lastName ? "true" : "false"}
                className='rounded-lg'
              />
              {errors.lastName && (
                <p
                  className='text-red-500 font-poppins font-medium'
                  role='alert'
                >
                  {errors.lastName?.message}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='newPassword'>Email Address</label>
              <input
                type='email'
                name='yourEmail'
                {...register("yourEmail", {
                  required: "Enter Your Email",
                })}
                aria-invalid={errors.yourEmail ? "true" : "false"}
                className='rounded-lg'
              />
              {errors.yourEmail && (
                <p
                  className='text-red-500 font-poppins font-medium'
                  role='alert'
                >
                  {errors.yourEmail?.message}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='newPassword'>Address Line 1</label>
              <input
                type='text'
                name='address1'
                {...register("address1", {
                  required: "Enter Your Address",
                })}
                aria-invalid={errors.address1 ? "true" : "false"}
                className='rounded-lg'
              />
              {errors.address1 && (
                <p
                  className='text-red-500 font-poppins font-medium'
                  role='alert'
                >
                  {errors.address1?.message}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='address2'>Address Line 2</label>
              <input
                type='text'
                name='address2'
                {...register("address2")}
                aria-invalid={errors.address2 ? "true" : "false"}
                className='rounded-lg'
              />
              {errors.address2 && (
                <p
                  className='text-red-500 font-poppins font-medium'
                  role='alert'
                >
                  {errors.address2?.message}
                </p>
              )}
            </div>
            
            <input
              type='submit'
              value='Save'
              className='w-24 rounded-lg bg-[#2DC97E] px-2 py-2 text-white col-span-full'
            />
          </div>
        </form>
        {/* input group */}
      </div>
      {/* Main content */}
    </div>
  );
};

export default EditProfile;
