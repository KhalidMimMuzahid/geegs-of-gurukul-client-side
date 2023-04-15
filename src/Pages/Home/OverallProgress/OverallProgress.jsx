import React from 'react';
import DoughnutChart from '../../../Components/DoughnutChart/DoughnutChart';
import QuizChart from '../../../Components/QuizChart/QuizChart';
import AttendanceChart from '../../../Components/AttendanceChart/AttendanceChart';

const OverallProgress = () => {
  return (
    <div className='my-10'>
      <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div>
        <h3 className="text-3xl font-poppins font-medium">Overall Progress</h3>
        <DoughnutChart/>
        </div>
        <div>
        <h3 className="text-3xl font-poppins font-medium">Quizes</h3>
        <QuizChart/>
        </div>
        <div>
        <h3 className="text-3xl font-poppins font-medium">Attandance</h3>
        <AttendanceChart/>
        </div>
        </div>
    </div>
  );
};

export default OverallProgress;
