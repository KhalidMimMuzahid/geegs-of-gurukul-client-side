import React from "react";
import certificate from "../../../../assets/profileIcon/certificate.svg"
const Certification = () => {
  return (
    <div className=" bg-[#C4F0CE] h-screen">
      <div className="relative bg-white w-[90vw] h-4/5 mx-auto my-8 rounded-xl">
        <h3 className="font-poppins p-12 font-medium">Certification</h3>
        <div className="flex flex-col items-center justify-center">
          <p className="font-poppins font-normal">No Certificate Issued Yet. </p>
          <img className="w-40" src={certificate} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Certification;
