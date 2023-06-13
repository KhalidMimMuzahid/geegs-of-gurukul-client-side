import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../../../contexts/UserProvider/UserProvider";
import { Transition } from "@headlessui/react";

const EditSkillModal = ({ editSkill, setEditSkill }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [skills, setSkills] = useState([]);
  const { user } = useContext(AuthContext);

  const onSubmit = (data) => {
    const { skill } = data;

    if (skill.trim() !== "") {
      const newSkill = skill.trim();
      setSkills([...skills, newSkill]);
      setValue("skill", "");
    }
  };

  const removeSkill = (skill) => {
    const updatedSkills = skills.filter((s) => s !== skill);
    setSkills(updatedSkills);
  };

  const updateSkills = (skills, user) => {
    const skillsData = {
      skills: skills,
      email: user?.email,
    };
    console.log("skills data is: ", skillsData);

    fetch("https://api.geeksofgurukul.com/api/v1/users/update-skill", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skillsData),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Skills updated successfully");
          setEditSkill(false);
        } else {
          toast.error("Failed to update skills");
        }
      })
      .catch((error) => {
        console.error("Error updating skills:", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Transition
        show={editSkill}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="bg-green-300 p-16 rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-4">Update User Skills</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex mb-4">
            <input
              type="text"
              className="w-full rounded-l py-2 px-4 focus:outline-none"
              placeholder="Enter a skill"
              {...register("skill")}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r"
            >
              Add
            </button>
          </div>
        </form>

        <div className="flex flex-wrap mb-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded py-1 px-2 mr-2 mb-2 flex items-center"
            >
              <span className="mr-1">{skill}</span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeSkill(skill)}
              >
                X
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-8">
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            onClick={() => updateSkills(skills, user)}
          >
            Update
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            onClick={() => setEditSkill(false)}
          >
            Cancel
          </button>
        </div>
      </Transition>
    </div>
  );
};

export default EditSkillModal;
