import React from "react";
import robot from "../../../assets/Home/robot.svg";
import book from "../../../assets/Home/book.svg";
import calendar from "../../../assets/Home/calendar.svg";
import user from "../../../assets/Home/profile.svg";
import Clock from "../../../assets/Home/Clock.svg";
import assignment from "../../../assets/Home/Assignment.svg";
import announcement from "../../../assets/Home/Announcements.svg";
import arrow from "../../../assets/Home/arrow.svg";
import green from "../../../assets/Home/cardGreen.svg";
import orange from "../../../assets/Home/cardOrange.svg";
import red from "../../../assets/Home/cardChoco.svg";
import ProgressbarCir from "../../../Components/ProgressbarCir/ProgressbarCir";

const Home = () => {
  return (
    <div className='grid grid-cols-12 gap-6 font-poppins'>
      <div className='col-span-12 md:col-span-6 lg:col-span-7'>
        <div className='flex flex-col gap-6'>
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
          <div className='w-full bg-[#EDFFF4] rounded-[20px] p-2'>
            <div>
              <p className='text-[16px] font-semibold'>Overall</p>
              <div className='mt-4 flex flex-col md:flex-row items-center justify-center gap-[27px]'>
                <div className=' relative bg-[#B8FFD5] rounded-[20px]'>
                  <div className='text-center'>
                    <div className='p-2'>
                      <p className='text-[16px] font-semibold'>Attendance</p>
                      <p className='text-[28px] font-semibold'>80%</p>
                    </div>
                    <div>
                      <img src={green} alt='bg' />
                    </div>
                  </div>
                </div>
                <div className='relative bg-[#FFD8AB] rounded-[20px]'>
                  <div className='text-center'>
                    <div className='p-2'>
                      <p className='text-[16px] font-semibold'>Assignment</p>
                      <p className='text-[28px] font-semibold'>50%</p>
                    </div>
                    <div>
                      <img src={orange} alt='bg' />
                    </div>
                  </div>
                </div>
                <div className='relative bg-[#FFC6BE] rounded-[20px]'>
                  <div className='text-center'>
                    <div className='p-2'>
                      <p className='text-[16px] font-semibold'>Performance</p>
                      <p className='text-[28px] font-semibold'>40%</p>
                    </div>
                    <div>
                      <img src={red} alt='bg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full bg-[#EDFFF4] rounded-[20px] p-2 my-0'>
            <div>
              <p className='text-[16px] font-semibold'>Today’s Schedule</p>
              <div className='mt-4 flex flex-col gap-[27px]'>
                <div className='w-full border border-[#37ED81] rounded-[20px] p-[10px] flex flex-col gap-2 md:flex-row'>
                  {/* card1 */}
                  <div className="p-[10px] flex flex-col gap-2 justify-center w-full md:w-1/2 border border-1 rounded-md">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center justify-center w-[40px] rounded-full bg-white">
                        <img className="w-4" src={book} alt="book" />
                      </div>
                      <div className=" w-24 rounded-[25px] bg-[#B1FFFA]">
                        <p className="p-1">Lecture 01</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={calendar} alt="" />
                        <p>25-06-23</p>
                    </div>
                      <div className="flex items-center gap-2">
                        <img src={Clock} alt="clock" />
                        <p>2:30 hour</p>
                    </div>
                    </div>
                    <div className="col-span-full">
                      <button className="w-full bg-[#B8FFD5] rounded-[20px] flex items-center justify-center gap-2 col-span-full">
                        <p>Join Now</p>
                        <img src={arrow} alt="" />
                      </button>
                    </div>
                  </div>
                  {/* card2 */}
                  <div className="p-[10px] flex flex-col gap-2 justify-center w-full md:w-1/2 border border-1 rounded-md">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center justify-center w-[40px] rounded-full bg-white">
                        <img className="w-4" src={book} alt="book" />
                      </div>
                      <div className=" w-24 rounded-[25px] bg-[#B1FFFA]">
                        <p className="p-1">Lecture 01</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={calendar} alt="" />
                        <p>25-06-23</p>
                    </div>
                      <div className="flex items-center gap-2">
                        <img src={Clock} alt="clock" />
                        <p>2:30 hour</p>
                    </div>
                    </div>
                    <div className="col-span-full">
                      <button className="w-full bg-[#B8FFD5] rounded-[20px] flex items-center justify-center gap-2 col-span-full">
                        <p>Join Now</p>
                        <img src={arrow} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-12 md:col-span-6 lg:col-span-5'>
        <div className='flex flex-col gap-2'>
          <div className='row-span-8 bg-[#EDFFF4] relative p-5 rounded-[20px]'>
            <img
              className='absolute top-0 right-0 z-[10] p-2'
              src={announcement}
              alt=''
            />
            <p className='text-[16px] font-semibold'>Announcement</p>
            <div className='my-2 flex flex-col gap-4 h-[40vh]'>
              <div className='w-full p-2 flex bg-white z-10'>
                <div className='w-[8px] h-[91px] rounded-[8px] bg-[#37ED81]'></div>
                <div className='ml-[19px]'>
                  <p className='font-medium'>Notification - 1</p>
                  <p>
                    description description description descriptio n description
                    ..see more
                  </p>
                </div>
              </div>
              <div className='w-full p-2 flex bg-white z-10'>
                <div className='w-[8px] h-[91px] rounded-[8px] bg-[#37ED81]'></div>
                <div className='ml-[19px]'>
                  <p className='font-medium'>Notification - 2</p>
                  <p>
                    description description description descriptio n description
                    ..see more
                  </p>
                </div>
              </div>
              <div className=''>
                <div className='flex items-center gap-2 justify-center font-semibold'>
                  <p>See more</p>
                  <img src={arrow} alt='' />
                </div>
              </div>
            </div>
          </div>
          <div className='row-span-4 bg-[#EDFFF4] rounded-[20px] p-3 my-4'>
            <p className='font-semibold'>Test</p>
            <div className='my-1 flex flex-col md:flex-row items-center justify-center gap-4 overflow-x-auto'>
              <div className='flex flex-col items-center'>
                <ProgressbarCir />
                <p className='my-2'>Test-1</p>
              </div>
              <div className='flex flex-col items-center'>
                <ProgressbarCir />
                <p className='my-2'>Test-1</p>
              </div>
              <div className='flex flex-col items-center'>
                <ProgressbarCir />
                <p className='my-2'>Test-1</p>
              </div>
            </div>
            <div className='flex items-center gap-2 justify-center font-semibold'>
              <p>Start Test</p>
              <img src={arrow} alt='' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
