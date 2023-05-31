import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./../../../../contexts/UserProvider/UserProvider";
import { BiEdit } from "react-icons/bi";
import { TbEditOff } from "react-icons/tb";
import ProfessionEditingMode from "./ProfessionEditingMode/ProfessionEditingMode";
import ProfessionDetailsMode from "./ProfessionDetailsMode/ProfessionDetailsMode";
import { useQuery } from "@tanstack/react-query";

const Profession = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="relative w-4/5 md:min-h-[580px] sm:h-[750px] overflow-hidden overflow-y-scroll mx-auto border border-gray-200 rounded-xl shadow-lg bg-white text-black p-10">
      <h3 className="text-2xl font-bold">Profession </h3>
      {isEditing ? (
        <ProfessionEditingMode setIsEditing={setIsEditing} />
      ) : (
        <ProfessionDetailsMode />
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

export default Profession;
