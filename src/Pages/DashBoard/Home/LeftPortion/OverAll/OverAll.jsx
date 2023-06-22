import React from "react";
import green from "../../../../../assets/Home/cardGreen.svg";
import orange from "../../../../../assets/Home/cardOrange.svg";
import red from "../../../../../assets/Home/cardChoco.svg";
const OverAll = () => {
  return (
    <div className='p-5 bg-[#EDFFF4] rounded-[20px]'>
      <p className='font-semibold my-2'>OverAll</p>
      <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
        {/* cards */}
        <div className='w-60 h-[188px] bg-[#B8FFD5] flex flex-col items-center justify-center rounded-[20px]'>
          <div className='my-6 flex flex-col items-center justify-center'>
            <p className='text-[18px] font-semibold'>Attendance</p>
            <p className='text-[32px] font-semibold'>80%</p>
          </div>
          <div>
            <img className='w-screen' src={green} alt='' />
          </div>
        </div>
        {/* cards */}
        <div className='w-60 h-[188px] bg-[#FFD8AB] flex flex-col items-center justify-center rounded-[20px]'>
          <div className='my-6 flex flex-col items-center justify-center'>
            <p className='text-[18px] font-semibold'>Assignment</p>
            <p className='text-[32px] font-semibold'>50%</p>
          </div>
          <div>
            <img className='w-screen' src={orange} alt='' />
          </div>
        </div>
        {/* cards */}
        <div className='w-60 h-[188px] bg-[#FFC6BE] flex flex-col items-center justify-center rounded-[20px]'>
          <div className='my-6 flex flex-col items-center justify-center'>
            <p className='text-[18px] font-semibold'>Performance</p>
            <p className='text-[32px] font-semibold'>40%</p>
          </div>
          <div>
            <img className='w-screen' src={red} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverAll;
