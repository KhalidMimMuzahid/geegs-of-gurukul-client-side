import React from "react";
import "./ProfileInfo.css";
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
const ProfileInfo = ({ assessment }) => {
  const { user } = useContext(AuthContext);
  console.log("user: ", user);
  return (
    <div className="container flex flex-col justify-center md:flex-row  md:justify-between">
      {/* left */}
      <div className="flex items-center gap-4">
        <div className="">
          <img
            className="rounded-full w-20 border-2 border-[#4BA25D]"
            src={
              user?.photoURL
                ? user?.photoURL
                : "https://i.ibb.co/jkbWws1/blank-profile-picture-973460-340.png"
            }
            alt=""
          />
        </div>
        <div className="">
          <h5 className="font-poppins text-2xl font-bold">{user?.name}</h5>
          <p className="font-poppins fw-bold">
            Works as{" "}
            <span className="text-[#4BA25D]">{user?.profession?.workAs}</span>
          </p>
        </div>
      </div>
      {/* Right */}
      <div className="flex flex-col items-start justify-center gap-2 text-lg">
        <h6 className="font-poppins">
          Assessment name:{" "}
          <span className="text-[#4BA25D]">{assessment?.assessmentName}</span>
        </h6>
        <h6 className="font-poppins">
          Duration:{" "}
          <span className="text-[#4BA25D]">{assessment?.duration} min</span>
        </h6>
      </div>
    </div>
  );
};

export default ProfileInfo;
