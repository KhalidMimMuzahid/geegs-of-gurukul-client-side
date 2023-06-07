import React from "react";

const OverView = ({ aboutResponse, totalMark }) => {
  // const []
  console.log(aboutResponse);
  const { attemptOn, correct, wrong } = aboutResponse;
  return (
    // parent
    <div className="mt-10">
      <h4 className="font-poppins text-xl font-medium my-3 ">Overview :</h4>
      <div className="flex flex-col md:flex-row justify-around border border-1 border-[#D4D4D4] rounded-lg">
        <div className="flex flex-col items-center justify-center px-4 py-12 ">
          <h4 className="text-md lg:text-2xl font-poppins">{totalMark}</h4>
          <p className="font-poppins font-medium">Total Mark</p>
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
          <p className="font-poppins font-medium">Overall Rank</p>
        </div>
      </div>
    </div>
  );
};

export default OverView;
