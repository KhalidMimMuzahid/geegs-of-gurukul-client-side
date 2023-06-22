import React from "react";
import book from "../../../../../assets/Home/book.svg";
import calender from "../../../../../assets/Home/calendar.svg";
import assignment from "../../../../../assets/Home/Assignment.svg";
import people from "../../../../../assets/Home/profile.svg";
import arrow from "../../../../../assets/Home/arrow.svg";
const TodaysScedule = () => {
  return (
    <div className='p-5 bg-[#EDFFF4] rounded-[20px]'>
      <p className='mb-4 font-semibold'>Today’s Schedule</p>
      <div className='grid grid-cols-12 md:grid-cols-6 gap-2'>
        <div className='col-span-full md:col-span-6'>
          <div className='flex flex-col col-span-full md:col-span-6 items-center md:flex-row gap-4'>
            {/* card1 */}
            <div className='w-full px-5 py-2 flex items-center border border-[#37ED81] rounded-[20px]'>
              <div className='w-full text-[12px] md:text-[16px]'>
                <div className='flex items-center justify-between'>
                  <div className='p-4 bg-white rounded-[40px] w-[30px] md:w-[60px] '>
                    <img className='w-[60px] md:w-[60px]' src={book} alt='' />
                  </div>
                  <div className='w-56 px-4 py-1 bg-[#B1FFFA] rounded-[25px] text-center'>
                    <span>Lecture 01</span>
                  </div>
                </div>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center gap-7'>
                    <div className='w-40 px-4 py-[6px] bg-[#B8FFD5] rounded-[25px] flex items-center justify-center gap-1'>
                      <img src={calender} alt='calender' />
                      <span>25-06-23</span>
                    </div>
                    <div className='w-40 px-4 py-[6px] bg-[#B8FFD5] rounded-[25px] flex items-center justify-center gap-1'>
                      <img src={people} alt='people' />
                      <span>Akash</span>
                    </div>
                    <div className='w-40 px-4 py-[6px] bg-[#ffffff] rounded-[25px] flex items-center justify-center gap-1'>
                      <span>Join Now</span>
                      <img src={arrow} alt='arrow' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-full md:col-span-6'>
          <div className='flex flex-col col-span-full md:col-span-6 items-center md:flex-row gap-4'>
            {/* card1 */}
            <div className='w-full px-5 py-2 flex items-center border border-[#37ED81] rounded-[20px]'>
              <div className='w-full text-[12px] md:text-[16px]'>
                <div className='flex items-center justify-between'>
                  <div className='p-4 bg-white rounded-[40px] w-[30px] md:w-[60px] '>
                    <img className='w-[60px] md:w-[60px]' src={assignment} alt='' />
                  </div>
                  <div className='w-56 px-4 py-1 bg-[#FFE7A8] rounded-[25px] text-center'>
                    <span>Assignment 1</span>
                  </div>
                </div>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center gap-7'>
                    <div className='w-40 px-4 py-[6px] bg-[#B8FFD5] rounded-[25px] flex items-center justify-center gap-1'>
                      <img src={calender} alt='calender' />
                      <span>25-06-23</span>
                    </div>
                    <div className='w-40 px-4 py-[6px] bg-[#B8FFD5] rounded-[25px] flex items-center justify-center gap-1'>
                      <img src={people} alt='people' />
                      <span>Akash</span>
                    </div>
                    <div className='w-40 px-4 py-[6px] bg-[#ffffff] rounded-[25px] flex items-center justify-center gap-1'>
                      <span>Join Now</span>
                      <img src={arrow} alt='arrow' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysScedule;
