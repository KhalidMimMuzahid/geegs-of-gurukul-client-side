import React from "react";
import { BsXCircleFill } from "react-icons/bs";

const ExerciseResponseModal = ({ setOpenModal, data }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none">
        <div className="relative w-full h-[600px] sm:w-[500px] md:w-[750px] lg:w-[900px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-4 bg-white rounded-lg shadow-2xl">
          <div className="px-2 pt-2 flex w-full justify-between">
            <h4 className="font-semibold">Exercise Response Details</h4>
            <button onClick={() => setOpenModal(false)}>
              <BsXCircleFill size={25} color="red" />
            </button>
          </div>
          {/* Contents */}
          {data?.submissionDetails?.studentEmail}
        </div>
      </div>
    </>
  );
};

export default ExerciseResponseModal;
