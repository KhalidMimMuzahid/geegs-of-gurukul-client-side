import React from "react";

const Genarel = () => {
  return (
    <div className='p-8 flex flex-col items-center gap-8 md:gap-16 md:flex-row md:items-center w-4/5 rounded-md shadow-lg mx-auto'>
      <div className='flex flex-col items-center gap-2'>
        {/* image side */}
        <img
          className='w-36 rounded-full'
          src='https://randomuser.me/api/portraits/women/94.jpg'
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
          <span className='text-[#2DC97E]'>Student ID</span> : 234098543
        </h3>
        <p className='m-2'>
          <span>Name:</span>
          <span>Md. Shamim Sarkar</span>
        </p>
        <p className='m-2'>
          <span>Email:</span>
          <span>shamimibas@gmail.com</span>
        </p>
        <p className='m-2'>
          <span>Address:</span>
          <span>Dinajpur, Rangpur, Bangladesh</span>
        </p>
        <p className='m-2'>
          <span>Phone:</span>
          <span>000000000</span>
        </p>
      </div>
      {/* info side */}
    </div>
  );
};

export default Genarel;
