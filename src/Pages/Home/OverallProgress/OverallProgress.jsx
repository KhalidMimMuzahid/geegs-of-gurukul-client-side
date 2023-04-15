import React from 'react';
import DoughnutChart from '../../../Components/DoughnutChart/DoughnutChart';
import QuizChart from '../../../Components/QuizChart/QuizChart';

const OverallProgress = () => {
  return (
    <div>
      <div className="container w-full mx-auto flex-col items-center md:flex-row">
        <div>
        <h3 className="text-3xl font-poppins font-medium">Overall Progress</h3>
        <DoughnutChart/>
        </div>
        <div>
        <h3 className="text-3xl font-poppins font-medium">Quizes</h3>
        <QuizChart/>
        </div>
        </div>
    </div>
  );
};

export default OverallProgress;
