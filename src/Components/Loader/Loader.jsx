import React from "react";
import gogLoader from "../../assets/gif/gog-loader.gif";
const Loader = ({ type = "default" }) => {
  return (
    <div className="">
      <div className="h-[90vh] w-screen flex justify-center items-center">
        <img className="w-[200px] h-auto" src={gogLoader} alt="" />
      </div>
    </div>
  );
};

export default Loader;
