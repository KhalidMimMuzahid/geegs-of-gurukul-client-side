import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";

const Genarel = () => {
   const {user} = useContext(AuthContext)
  // Fetching User info from server
  const {data:userDetail,isLoading } = useQuery({
    queryKey: ['userDetailse'],
    queryFn: ()=>fetch(`http://localhost:5000/user-detailse/${user?.email}`)
    .then((res) => res.json())
  })
  if (isLoading) {
    return <div>loading...</div>
  }
  // console.log(userDetail)
  return (
    <div className='p-8 flex flex-col items-center gap-8 md:gap-16 md:flex-row md:items-center w-4/5 rounded-md shadow-lg mx-auto'>
      <div className='flex flex-col items-center gap-2'>
        {/* image side */}
        <img
          className='w-36 rounded-full'
          src={`${userDetail?.photoURL}`}
          alt=''
        />
        <button className='bg-[#2DC97E] px-2 py-2 rounded-md font-poppins font-normal text-white'>
          Edit Photo
        </button>
        {/* image side */}
      </div>
      {/* info side */}
      <div className='font-poppins font-normal fex flex-col'>
        <h3 className='text-xl font-mediumm-2'>
          <span className='text-[#2DC97E]'>Student ID</span> : {userDetail?._id}
        </h3>
        <p className='m-2'>
          <span>Name:</span>
          <span>{user?.name}</span>
        </p>
        <p className='m-2'>
          <span>Email:</span>
          <span>{userDetail?.email}</span>
        </p>
        {/* <p className='m-2'>
          <span>Address:</span>
          <span>Dinajpur, Rangpur, Bangladesh</span>
        </p> */}
        <p className='m-2'>
          <span>Phone:</span>
          <span>{userDetail?.phoneNumber}</span>
        </p>
        {/* <p className='m-2'>
          <span>Role:</span> 
          <span>{userDetail?.role}</span>
        </p> */}
        {/* <p className='m-2'>
          <span>Degree:</span> 
          <span>{userDetail?.degree}</span>
        </p>
        <p className='m-2'>
          <span>Education:</span> 
          <span>{userDetail?.education}</span>
        </p>
        <p className='m-2'>
          <span>Institute:</span> 
          <span>{userDetail?.institute}</span>
        </p> */}
      </div>
      {/* info side */}
    </div>
  );
};

export default Genarel;
