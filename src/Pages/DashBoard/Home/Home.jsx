import React from "react";
import robot from "../../../assets/Home/robot.svg";
import book from "../../../assets/Home/book.svg";
import calendar from "../../../assets/Home/meeting.svg";
import user from "../../../assets/Home/profile.svg";
import assignment from "../../../assets/Home/Assignment.svg";
import announcement from "../../../assets/Home/Announcements.svg";
import arrow from "../../../assets/Home/arrow.svg";
import green from "../../../assets/Home/cardGreen.svg";
import orange from "../../../assets/Home/cardOrange.svg";
import red from "../../../assets/Home/cardChoco.svg";
import AttendanceChart from "../../../Components/AttendanceChart/AttendanceChart";
import ProgressbarCir from "../../../Components/ProgressbarCir/ProgressbarCir";

const Home = () => {
  return (
    <div className='grid grid-cols-12 gap-6 font-poppins'>
      <div className='col-span-12 md:col-span-6 lg:col-span-7'>
        <div className='flex flex-col gap-6'>
          <div className='w-full bg-[#B1FFFA] grid grid-cols-12 rounded-[20px]'>
            <div className='col-span-12 md:col-span-3 p-5'>
              <img className='w-[121px]' src={robot} alt='robot' />
            </div>
            <div className='col-span-12 md:col-span-9'>
              <div className='w-full flex flex-col my-20'>
                <div>
                  <h3 className='text-[24px] font-semibold'>“Hii Akash”</h3>
                  <h5 className='text-[16px] font-semibold'>Welcome back</h5>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full bg-[#EDFFF4] rounded-[20px] p-5'>
            <div>
              <p className='text-[16px] font-semibold'>Overall</p>
              <div className='mt-4 flex flex-col md:flex-row gap-[27px]'>
                <div className=' relative w-[180px] h-[188px] bg-[#B8FFD5] rounded-[20px]'>
                  <img className='absolute bottom-0' src={green} alt='bg' />
                  <div className='p-6 text-center'>
                    <p className='text-[18px] font-semibold'>Attendance</p>
                    <p className='text-[32px] font-semibold'>80%</p>
                  </div>
                </div>
                <div className='relative w-[180px] h-[188px] bg-[#FFD8AB] rounded-[20px]'>
                  <img className='absolute bottom-0' src={orange} alt='bg' />
                  <div className='p-6 text-center'>
                    <p className='text-[18px] font-semibold'>Assignment</p>
                    <p className='text-[32px] font-semibold'>50%</p>
                  </div>
                </div>
                <div className='relative w-[180px] h-[188px] bg-[#FFC6BE] rounded-[20px]'>
                  <img className='absolute bottom-0' src={red} alt='bg' />
                  <div className='p-6 text-center'>
                    <p className='text-[18px] font-semibold'>Performance</p>
                    <p className='text-[32px] font-semibold'>40%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full bg-[#EDFFF4] rounded-[20px] p-5 my-6'>
            <div>
              <p className='text-[16px] font-semibold'>Today’s Schedule</p>
              <div className='mt-4 flex flex-col gap-[27px]'>
                {/* card1 */}
                <div className='w-full border border-[#37ED81] rounded-[20px] p-[10px] flex flex-col md:flex-row'>
                  <div className='col-span-6 md:col-span-3'>
                    <div className='flex items-center'>
                      <div className='relative h-[72px] w-[72px] rounded-full bg-white'>
                        <div>
                          <img
                            className='absolute top-4 left-4'
                            src={book}
                            alt='book'
                          />
                        </div>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div className='bg-[#B1FFFA] px-1 py-4 rounded-[25px]'>
                          <p className='text-[14px] font-normal text-center'>
                            Lecture 01
                          </p>
                        </div>
                        <div className='flex flex-row items-center gap-[29px]'>
                          <div className='py-[6px] px-4 bg-[#B8FFD5] rounded-[25px]'>
                            <div className='flex items-center justify-center gap-2'>
                              <img src={calendar} alt='calendar' />
                              <p>25-06-23</p>
                            </div>
                          </div>
                          <div className='py-[6px] px-4 bg-[#B8FFD5] rounded-[25px]'>
                            <div className='flex items-center justify-center gap-2'>
                              <img src={user} alt='calendar' />
                              <p>Akash</p>
                            </div>
                          </div>
                          <div className='py-[6px] px-4'>
                            <div className='flex items-center justify-center gap-2'>
                              <p>View</p>
                              <img src={arrow} alt='calendar' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* card2 */}
                <div className='w-full border border-[#37ED81] rounded-[20px] p-[10px] flex flex-col md:flex-row'>
                  <div className='col-span-6 md:col-span-3'>
                    <div className='flex items-center'>
                      <div className='relative h-[72px] w-[72px] rounded-full bg-white'>
                        <div>
                          <img
                            className='absolute top-4 left-4'
                            src={assignment}
                            alt='assignment'
                          />
                        </div>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div className='bg-[#B1FFFA] px-1 py-4 rounded-[25px]'>
                          <p className='text-[14px] font-normal text-center'>
                            Assignment
                          </p>
                        </div>
                        <div className='flex flex-row items-center gap-[29px]'>
                          <div className='py-[6px] px-4 bg-[#B8FFD5] rounded-[25px]'>
                            <div className='flex items-center justify-center gap-2'>
                              <img src={calendar} alt='calendar' />
                              <p>25-06-23</p>
                            </div>
                          </div>
                          <div className='py-[6px] px-4 bg-[#B8FFD5] rounded-[25px]'>
                            <div className='flex items-center justify-center gap-2'>
                              <img src={user} alt='calendar' />
                              <p>Akash</p>
                            </div>
                          </div>
                          <div className='py-[6px] px-4'>
                            <div className='flex items-center justify-center gap-2'>
                              <p>View</p>
                              <img src={arrow} alt='calendar' />
                            </div>
                          </div>
                        </div>
                      </div>
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
              <div className="">
                <div className="flex items-center gap-2 justify-center font-semibold">
                  <p>See more</p>
                  <img src={arrow} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className='row-span-4 bg-[#EDFFF4] rounded-[20px] p-5 my-4'>
            <p className="font-semibold">Test</p>
            <div className="my-2 flex flex-col md:flex-row items-center justify-center gap-4 overflow-x-auto">
              <div className="flex flex-col items-center">
              <ProgressbarCir />
              <p>Test-1</p>
              </div>
              <div className="flex flex-col items-center">
              <ProgressbarCir />
              <p>Test-1</p>
              </div>
              <div className="flex flex-col items-center">
              <ProgressbarCir />
              <p>Test-1</p>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-center font-semibold">
                  <p>Start Test</p>
                  <img src={arrow} alt="" />
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
