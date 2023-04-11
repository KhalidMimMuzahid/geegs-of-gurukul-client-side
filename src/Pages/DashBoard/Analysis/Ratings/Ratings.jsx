import React from 'react';

const Ratings = () => {
    return (
        <div className='mt-20'>
      <h4 className='font-poppins text-2xl font-medium mb-8'>Ranking </h4>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {/* card-1 */}
        <div className='w-52 h-32 bg-green-200 font-poppins font-medium text-center p-4 shadow-lg rounded-lg'>
          <p>Percentile</p>
          <p>85%</p>
        </div>
        {/* card-2 */}
        <div className='w-52 h-32 bg-green-200 font-poppins font-medium text-center p-4 shadow-lg rounded-lg'>
          <p className=''>Rating</p>
          <p>Above Average</p>
        </div>
        {/* card-3 */}
        <div className='w-52 h-32 bg-green-200 font-poppins font-medium text-center p-4 shadow-lg rounded-lg'>
          <p className=''>Overall rank</p>
          <p>80%</p>
        </div>
      </div>
    </div>
    );
};

export default Ratings;