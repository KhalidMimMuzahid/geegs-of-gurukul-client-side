import React from "react";
import { BsXCircleFill } from "react-icons/bs";

const WarningModal = ({ greaterThanTen, lessThanZero, setOpenModal }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-[20010] outline-none focus:outline-none h-100 mx-4">
        <div className="relative w-full h-[600px] sm:w-[500px] md:w-[750px] lg:w-[900px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-4 bg-white rounded-lg shadow-2xl">
          <div className="px-2 pt-2 flex w-full justify-between">
            <h3 className="font-semibold">Warning in Upload CSV file</h3>
            <button
              onClick={() => setOpenModal(false)}
              className="hover:rotate-90 transition-all duration-500"
            >
              <BsXCircleFill color="red" size={25} />
            </button>
          </div>

          <div className="mt-5 ml-4">
            {lessThanZero?.length > 0 &&
              lessThanZero?.map((each, i) => (
                <h1 key={i} className="text-lg mb-2 ">
                  <strong className="text-2xl font-semibold mr-2">*</strong>
                  line Number <span className="text-red-500">{each}</span> mark
                  is less-than <span className="text-red-500">0</span>.
                </h1>
              ))}
            {greaterThanTen?.length > 0 &&
              greaterThanTen?.map((each, i) => (
                <h1 key={i} className="text-lg mb-2">
                  <strong className="text-2xl font-semibold mr-2">*</strong>
                  line Number <span className="text-red-500">{each}</span> mark
                  is greater-than <span className="text-red-500">10</span>.
                </h1>
              ))}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
    </>
  );
};

export default WarningModal;
