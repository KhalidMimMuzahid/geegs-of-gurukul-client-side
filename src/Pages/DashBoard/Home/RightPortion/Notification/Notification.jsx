import React from 'react'
import announcement from "../../../../../assets/Home/Announcements.svg";
import arrow from "../../../../../assets/Home/arrow.svg";
const Notification = () => {
  return (
      <div>
          <div className='flex flex-col'>
          <div className='row-span-8 bg-[#EDFFF4] relative p-5 rounded-[20px]'>
            <img
              className='absolute top-0 right-0 z-[10] p-2'
              src={announcement}
              alt=''
            />
            <p className='text-[16px] font-semibold'>Announcement</p>
            <div className='my-2 flex flex-col gap-4 h-auto'>
              <div className='w-full p-2 flex bg-white z-10'>
                <div className='w-[8px] h-full rounded-[8px] bg-[#37ED81]'></div>
                <div className='ml-[19px]'>
                  <p className='font-medium'>Notification - 1</p>
                  <p>
                    description description description descriptio n description
                    ..see more
                  </p>
                </div>
              </div>
              <div className='w-full p-2 flex bg-white z-10'>
                <div className='w-[8px] h-full rounded-[8px] bg-[#37ED81]'></div>
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
        </div>
    </div>
  )
}

export default Notification