import React from "react";
import { useForm } from "react-hook-form";
import S3FileUpload from "react-s3";

import { uploadFile } from "react-s3";
window.Buffer = window.Buffer || require("buffer").Buffer;
const config = {
  bucketName: "all-files-for-gog",
  dirName: "assets/any-types",
  region: "ap-south-1",
  accessKeyId: process.env.REACT_APP_S3AccessKeyId,
  secretAccessKey: process.env.REACT_APP_S3SecretAccessKey,
};
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

    uploadFile(image, config)
      .then((data) => {
        console.log("data: ", data);
      })
      .catch((err) => console.error(err));
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
