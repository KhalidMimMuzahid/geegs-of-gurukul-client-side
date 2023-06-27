import React from 'react'
import ProgressbarCir from '../../../../../Components/ProgressbarCir/ProgressbarCir'
import arrow from "../../../../../assets/Home/arrow.svg";
const Stats = () => {
  return (
      <div>
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
  )
}

export default Stats