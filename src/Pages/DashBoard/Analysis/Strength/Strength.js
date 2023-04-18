import React from "react";
import ProgressbarCir from "../../../../Components/ProgressbarCir/ProgressbarCir";

const Strength = ({ strength }) => {
  return (
    <div className="block">
      <h4 className="font-poppins text-2xl font-bold ">Strength :</h4>
      <div className="container">
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 justify-center items-center w-full">
          {strength?.map((eachStrengt, i) => (
            <div key={i} className="">
              <div className="flex flex-col justify-center items-center">
                <p className="font-poppins font-semibold text-center my-2">
                  {eachStrengt?.topicName}
                </p>
                <ProgressbarCir
                  percentage={Math.round(eachStrengt?.successRate)}
                  circleColor="#009302"
                  textColor="#009302"
                ></ProgressbarCir>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Strength;
