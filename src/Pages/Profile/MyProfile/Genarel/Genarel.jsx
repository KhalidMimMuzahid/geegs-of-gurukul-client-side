import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import { BiEdit } from "react-icons/bi";
import { TbEditOff } from "react-icons/tb";
import EditingMode from "./EditingMode/EditingMode";
import GeneralMode from "./GeneralMode/GeneralMode";

const Genarel = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  // Fetching User info from server
  const {
    data: userDetail,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userDetailse"],
    queryFn: () =>
      fetch(
        `https://api.geeksofgurukul.com/api/v1/users/userinfo/${user?.email}`
      ).then((res) => res.json()),
  });
  if (isLoading) {
    return <div>loading...</div>;
  }
  console.log(userDetail);
  return (
    <div className="relative w-4/5 md:min-h-[580px] h-[750px] mx-auto rounded-xl shadow-lg bg-white text-black p-10">
      {isEditing ? (
        <EditingMode
          refetch={refetch}
          setIsEditing={setIsEditing}
          userDetail={userDetail}
        />
      ) : (
        <GeneralMode userDetail={userDetail} />
      )}
      <div
        onClick={() => setIsEditing(!isEditing)}
        className=" absolute top-4 right-4"
      >
        {isEditing ? (
          <TbEditOff
            title="edit user profile"
            className="text-3xl text-black hover:text-green-500 hover:cursor-pointer transition-all duration-300"
          />
        ) : (
          <BiEdit
            title="edit user profile"
            className="text-3xl text-black hover:text-green-500 hover:cursor-pointer transition-all duration-300"
          />
        )}
      </div>
    </div>
  );
};

export default Genarel;
