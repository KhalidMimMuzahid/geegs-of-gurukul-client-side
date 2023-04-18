import React from "react";

const OverView = ({ aboutResponse, totalMark }) => {
  // const []
  console.log(aboutResponse);
  const { attemptOn, correct, wrong } = aboutResponse;
  return (
    // parent
    <div className="mt-24">
      <h4 className="text-2xl font-poppins font-medium">Overview</h4>
      <div className="flex flex-col md:flex-row justify-between border border-1 border-[#D4D4D4] rounded-lg">
        <div className="flex flex-col items-center justify-center px-4 py-12">
          <h4 className="text-md lg:text-2xl font-poppins">{totalMark}</h4>
          <p className="font-poppins font-medium">totalMark</p>
        </div>
        <div className="h-16 border border-1 my-auto hidden md:block"></div>
        <div className="flex flex-col items-center justify-center px-4 py-12">
          <h4 className="text-md lg:text-2xl font-poppins">
            {Math.round((correct / attemptOn) * 100)}%
          </h4>
          <p className="font-poppins font-medium">Success Rate</p>
        </div>
        <div className="h-16 border border-1 my-auto hidden md:block"></div>
        <div className="flex flex-col items-center justify-center px-4 py-12">
          <h4 className="text-md lg:text-2xl font-poppins">1st</h4>
          <p className="font-poppins font-medium">Overall rank</p>
        </div>
      </div>
    </div>
  );
};

export default OverView;
