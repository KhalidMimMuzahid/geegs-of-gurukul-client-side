import React, { useContext } from "react";
import editIcon from "../../../../assets/profileIcon/editIcon.svg";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const Education = () => {
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
    // const updatedUser = {
    //   education: data?.yourEducation,
    //   degree: data?.yourDegree,
    //   institute: data?.institutionName
    // }
    // fetch(`https://api.geeksofgurukul.com/api/v1/users/user-detailse/${user?.email}`, {
    //   method: "PUT",
    //   body: JSON.stringify(updatedUser),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     toast.success('Successfully updated data!')
    //     console.log(data)
    //     navigate('/profile/my-profile');
    //   })
    //   .catch((error) => console.error(error));
    // console.log(updatedUser);
    console.log(data);
    reset();
  };

  // Showing User info from server
  // const {data:userDetail,isLoading } = useQuery({
  //   queryKey: ['userDetailse'],
  //   queryFn: ()=>fetch(`https://api.geeksofgurukul.com/api/v1/users/user-detailse/${user?.email}`)
  //   .then((res) => res.json())
  // })
  // if (isLoading) {
  //   return <div>loading...</div>
  // }
  // console.log(userDetail)
  return (
    <div className="p-8 font-poppins">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <h3 className="font-poppins font-bold">Education</h3>
        <img src={editIcon} alt="" />
      </div>
      {/* Header */}
      {/* Main content */}
      <div className="py-2">
        {/* input group */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="yourEducation">Your Education level</label>
              <input
                type="text"
                name="yourEducation"
                // placeholder={userDetail?.degree}
                {...register("yourEducation", {
                  required: "This field is required",
                })}
                aria-invalid={errors.yourEducation ? "true" : "false"}
                className="rounded-lg"
              />
              {errors.yourEducation && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.yourEducation?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="yourDegree">Exam/Degree Title</label>
              <input
                type="text"
                name="yourDegree"
                // placeholder={userDetail?.education}
                {...register("yourDegree", {
                  required: "This field is required",
                })}
                aria-invalid={errors.yourDegree ? "true" : "false"}
                className="rounded-lg"
              />
              {errors.yourDegree && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.yourDegree?.message}
                </p>
              )}
            </div>
            <div className="col-span-full">
              <label htmlFor="institutionName">Institution Name</label>
              <input
                type="text"
                name="institutionName"
                // placeholder={userDetail?.institute}
                {...register("institutionName", {
                  required: "This field is required",
                })}
                aria-invalid={errors.institutionName ? "true" : "false"}
                className="w-full rounded-lg my-4"
              />
              {errors.institutionName && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.institutionName?.message}
                </p>
              )}
            </div>
            <input
              type="submit"
              value="Save"
              className="w-24 rounded-lg bg-[#2DC97E] px-2 py-2 text-white"
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
