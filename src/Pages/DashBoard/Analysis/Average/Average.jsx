import React from "react";
import ProgressbarCir from "../../../../Components/ProgressbarCir/ProgressbarCir";

const Average = ({ average }) => {
  return (
    <div className="block my-8">
      <h4 className="font-poppins text-xl font-bold ">Average :</h4>
      <div className="container">
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 justify-center items-center w-full">
          {average?.map((eachAverage, i) => (
            <div key={i} className="">
              <div className="flex flex-col justify-center items-center">
                <p className="font-poppins font-semibold text-center my-2">
                  {eachAverage?.topicName}
                </p>
                <ProgressbarCir
                  percentage={Math.round(eachAverage?.abilityRate)}
                  circleColor="#ffae00"
                  textColor="#ffae00"
                ></ProgressbarCir>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Average;
