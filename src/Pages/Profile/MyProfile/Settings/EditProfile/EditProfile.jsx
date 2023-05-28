import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../../../contexts/UserProvider/UserProvider";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  console.log("user", user);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onUpdate = (data) => {
    // const updatedUser = {
    //   firstName: data?.firstName,
    //   lastName: data?.lastName,
    //   email: data?.email,
    //   address1: data?.address1,
    //   address2: data?.address2,
    // };

    const updatedUser = {
      name: data?.name,
      address: data?.address,
    };
    fetch(`http://localhost:5000/user-detailse/${user?.email}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Successfully updated data!");
        console.log(data);
        Navigate("/profile/my-profile");
      })
      .catch((error) => console.error(error));
    console.log(updatedUser);
    console.log(data);
    reset();
  };

  return (
    <div className="p-8 font-poppins">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <h3 className="font-poppins font-bold">Edit Information</h3>
      </div>
      {/* Header */}
      {/* Main content */}
      <div className="py-2">
        {/* input group */}
        <form onSubmit={handleSubmit(onUpdate)}>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="currentPassword"> Name</label>
              <input
                type="text"
                name="name"
                {...register("name", {
                  required: "Enter Your  Name",
                })}
                aria-invalid={errors.name ? "true" : "false"}
                className="rounded-lg"
              />
              {errors.name && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.name?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                {...register("address", {
                  required: "Enter Your Address",
                })}
                aria-invalid={errors.address ? "true" : "false"}
                className="rounded-lg"
              />
              {errors.address && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.address?.message}
                </p>
              )}
            </div>

            <input
              type="submit"
              value="Save"
              className="w-24 rounded-lg bg-[#2DC97E] px-2 py-2 text-white col-span-full"
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
