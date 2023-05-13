import React from "react";
import { useForm } from "react-hook-form";

const AddExercise = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handleOnSubmit = (data) => {
    console.log("data: ", data);
    const image = data.image[0];
    console.log("image: ", image);
    const formData = new FormData();
    formData.append("image", image);
    console.log("formData: ", formData);
  };
  return (
    <div>
      <h1>AddExercise</h1>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <input
          {...register("image", {
            required: "you must provide your bike photo",
          })}
          type="file"
          id=""
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default AddExercise;
