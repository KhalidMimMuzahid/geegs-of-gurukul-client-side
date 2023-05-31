import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { uploadFile } from "react-s3";
window.Buffer = window.Buffer || require("buffer").Buffer;
const config = {
  bucketName: "all-files-for-gog",
  dirName: "assets/any-types",
  region: "ap-south-1",
  accessKeyId: process.env.REACT_APP_S3AccessKeyId,
  secretAccessKey: process.env.REACT_APP_S3SecretAccessKey,
};

const EditingMode = ({ setIsEditing, refetch, userDetail }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(userDetail?.photoURL);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (value?.photoURL[0]) {
        const file = value?.photoURL[0];
        setImage(URL.createObjectURL(file));
        console.log(file);
      }
      return;
    });
    return () => subscription.unsubscribe();
  });

  const onSubmit = (data) => {
    setLoading(true);
    if (data?.photoURL[0]) {
      const file = data?.photoURL[0];
      uploadFile(file, config)
        .then((fileData) => {
          const updatedUser = {
            name: data?.name,
            address: data?.address,
            photoURL: fileData?.location,
          };
          setImage(fileData?.location);
          userProfileUpdate(updatedUser);
          console.log("fileData", fileData);
        })
        .catch((err) => {
          toast.error(err?.message);
          setLoading(false);
        });
    } else {
      const updatedUser = {
        name: data?.name,
        address: data?.address,
      };
      userProfileUpdate(updatedUser);
    }
  };

  const userProfileUpdate = (updatedUser) => {
    // return;
    fetch(`http://localhost:5000/edit-user/${userDetail?.email}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          toast.success(data?.message);
          console.log(data);
          refetch();
          setLoading(false);
          setIsEditing(false);
          reset();
        } else {
          toast.error(data?.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);

        setLoading(false);
      });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="font-poppins font-medium">
            <div className="flex flex-col justify-center mb-5">
              <img
                src={image}
                className="h-36 w-36 rounded-full border-2 border-green-400 shadow-lg"
                alt=""
              />
              <div className="relative my-4">
                <button className="px-4 py-2 bg-green-500 text-white">
                  Upload Image
                </button>
                <input
                  type="file"
                  name="photoURL"
                  {...register("photoURL")}
                  id=""
                  className="absolute top-0 left-0 opacity-0"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="assesmentList">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="Name"
                  defaultValue={userDetail?.name}
                  {...register("name")}
                  placeholder="Write name"
                />
              </div>
              <div className="assesmentList">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userDetail?.email}
                  readOnly
                  {...register("email")}
                  nonce=""
                  placeholder="Email address in required"
                />
              </div>
              <div className="assesmentList">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  defaultValue={userDetail?.address}
                  {...register("address")}
                  placeholder="Write Address"
                />
              </div>
              <div className="assesmentList">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="phone"
                  name="phoneNumber"
                  defaultValue={userDetail?.phoneNumber}
                  readOnly
                  {...register("phoneNumber")}
                  placeholder="Write Phone Number"
                />
              </div>

              <div className="flex gap-4">
                <div className="">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-10 py-3
                text-white hover:text-green-500
                bg-green-500 hover:bg-white
                border-green-500 rounded-lg border-4
                transition-all duration-300"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditingMode;
