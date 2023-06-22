import React from "react";
import robot from "../../../../../assets/Home/robot.svg";
const Cover = () => {
  return (
    <div>
      <div className='w-full bg-[#B1FFFA] grid grid-cols-12 rounded-[20px]'>
            <div className='col-span-12 md:col-span-3 w-full flex justify-center'>
              <img className='w-[90px]' src={robot} alt='robot' />
            </div>
            <div className='col-span-12 md:col-span-9 w-full flex justify-center'>
              <div className='w-full flex flex-col items-center my-8'>
                <div>
                  <h3 className='text-[24px] font-semibold'>“Hii Akash”</h3>
                  <h5 className='text-[16px] font-semibold'>Welcome back</h5>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};

export default Cover;
