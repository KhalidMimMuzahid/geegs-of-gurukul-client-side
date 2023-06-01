import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import { useState } from "react";
import EditSkillModal from "./EditSkill/EditSkillModal";


const MySkills = () => {
  // const skills = ["HTML", "CSS", "JavaScript", "React"];
  const [userData, setUserdata] = useState({});
  const [editSkill, setEditSkill] = useState(false);

  const { user } = useContext(AuthContext);

  // fetching user data
  useEffect(() => {
    fetch(`http://localhost:5000/userinfo/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setUserdata(data));
  }, [userData]);

  const skills = userData?.skills;

  return (
    <div className='relative w-4/5 md:min-h-[580px] sm:h-[750px] overflow-hidden overflow-y-scroll mx-auto border border-gray-200 rounded-xl shadow-lg bg-white text-black p-10'>
      <h2 className='text-2xl font-medium'>My Skills</h2>
      <div className='my-5'>
        <div className='grid grid-cols-5 gap-4'>
          {
            skills ? skills?.map((skill, index) => (
              <h2
                className='font-poppins font-medium text-center px-2 py-2 bg-green-200 text-green-700 rounded-3xl hover:bg-green-500 hover:cursor-pointer hover:text-white'
                key={index}
              >
                {skill}
              </h2>
            )) : <h3 className="col-span-5 font-poppins font-medium">You Didn't Add any skill yet. Please add one first.</h3>
          }
        </div>
      </div>

      <div className=' my-12'>
        <button onClick={()=>setEditSkill(true)} className='font-poppins font-medium text-center px-2 py-2 bg-green-500 text-white rounded-xl hover:cursor-pointer'>
          Add Skills
        </button>
        {editSkill && 
          <EditSkillModal editSkill={editSkill} setEditSkill ={setEditSkill}/>
        }
      </div>
    </div>
  );
};

export default MySkills;
