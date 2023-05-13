import React from 'react'
import { motion } from "framer-motion";
const ReviewAnswerModal = ({setOpen}) => {
  return (
    <div className='fixed z-[1000000] inset-0 overflow-y-auto'>
    <div className='flex items-center justify-center min-h-screen'>
      <motion.div
        animate={{
          transform: "translateY(-170px)",
          transitionDuration: 500,
        }}
        className='relative rounded-lg p-6 bg-white shadow-md transform transition-all duration-1000 w-[90vw] max-h-[40vh] overflow-y-scroll'
      >
        <h2 className='text-xl font-bold mb-4'>Review Answer</h2>
        <div className='flex items-center justify-center p-12'></div>
        <div className='absolute top-2 right-2'>
          <button
            onClick={() => setOpen(false)}
            className='w-8 h-8 rounded-full bg-green-300 text-red-700 hover:bg-gray-400'
          >
            X
          </button>
        </div>
      </motion.div>
    </div>
  </div>
  )
}

export default ReviewAnswerModal