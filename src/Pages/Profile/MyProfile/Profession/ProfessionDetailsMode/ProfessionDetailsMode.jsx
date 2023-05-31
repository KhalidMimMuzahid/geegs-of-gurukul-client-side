import React, { useContext } from "react";
import { AuthContext } from "../../../../../contexts/UserProvider/UserProvider";

const ProfessionDetailsMode = ({ userDetails }) => {
  const { user } = useContext(AuthContext);
  //   if (data?.workAs === "schoolStudent") {
  //       const updateData = {
  //         profession: {
  //           user: data?.workAs,
  //           institutionName: data?.institutionName,
  //           grade: data?.grade,
  //           country: data?.country,
  //           state: data?.state,
  //           city: data?.city,
  //         },
  //       };
  return (
    <div>
      <div className="">
        <h3 className="text-lg font-semibold">Profession</h3>
        <h3 className="text-lg font-medium">{user?.profession?.workAs}</h3>
      </div>
      <div className="">
        <h3 className="text-lg font-semibold">Name Of Institute</h3>
        <h3 className="text-lg font-medium">
          {user?.profession?.institutionName}
        </h3>
      </div>
      <div className="">
        <h3 className="text-lg font-semibold">Grade</h3>
        <h3 className="text-lg font-medium">{user?.profession?.grade}</h3>
      </div>
      <div className="">
        <h3 className="text-lg font-semibold">Country Name</h3>
        <h3 className="text-lg font-medium">{user?.profession?.country}</h3>
      </div>
      <div className="">
        <h3 className="text-lg font-semibold">Country Name</h3>
        <h3 className="text-lg font-medium">{user?.profession?.country}</h3>
      </div>
    </div>
  );
};

export default ProfessionDetailsMode;
