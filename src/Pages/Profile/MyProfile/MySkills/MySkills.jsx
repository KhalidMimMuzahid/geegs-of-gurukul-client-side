import React from "react";

const skills = ["HTML", "CSS", "JavaScript", "React"];

const MySkills = () => {
  return (
    <div className="relative w-4/5 md:min-h-[580px] sm:h-[750px] overflow-hidden overflow-y-scroll mx-auto border border-gray-200 rounded-xl shadow-lg bg-white text-black p-10">
      <h2 className="text-2xl font-medium">My Skills</h2>
      <div className="my-5">
        <div className="grid grid-cols-5 gap-4">
          {skills?.map((skill, index) => (
            <h2
              className="px-2 py-2 bg-green-200 text-green-700 rounded-3xl"
              key={index}
            >
              {skill}
            </h2>
          ))}
        </div>
      </div>

      <div className="absolute top-4 right-4">
        <button></button>
      </div>
    </div>
  );
};

export default MySkills;
