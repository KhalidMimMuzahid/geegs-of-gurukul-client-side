import React, { useState } from "react";
import { BsXCircleFill } from "react-icons/bs";

const WarningModal = ({
  errorInResponse,
  setOpenModal,
  exercisesResponses,
  setRefreshExcerciseResponse,
}) => {
  const [successfullyUpdatedStatus, setSuccessfullyUpdatedStatus] = useState({
    shouldShow: false,
    totalSuccessfullyUpdated: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const uploadMarkAsCSV = async () => {
    setIsLoading(true);
    setSuccessfullyUpdatedStatus({
      shouldShow: false,
      totalSuccessfullyUpdated: 0,
    });
    // console.log(" exercisesResponses: ", exercisesResponses);
    const res = await Promise.all(
      exercisesResponses?.map((eachRes) => {
        return fetch(
          `http://localhost:5000/api/v1/exercises/exercise-response-update/${eachRes?.response_id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              mark: eachRes?.mark,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      })
    );

    const resParse = await Promise.allSettled(res?.map((each) => each.json()));
    setRefreshExcerciseResponse((prev) => !prev);
    // console.log("resParse : ", resParse);
    const successfullyHittedRes = resParse.filter(
      (eachRes) => eachRes?.status === "fulfilled"
    );
    // console.log("successfullyHittedRes: ", successfullyHittedRes);
    const successfullyUpdatedRes = successfullyHittedRes?.filter(
      (each) => each?.value?.success
    );
    // console.log("successfullyUpdatedRes: ", successfullyUpdatedRes);
    setIsLoading(false);
    setSuccessfullyUpdatedStatus({
      shouldShow: true,
      totalSuccessfullyUpdated: successfullyUpdatedRes?.length,
    });
  };
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
            {errorInResponse?.length > 0 ? (
              <div>
                {errorInResponse?.map((each, i) => (
                  <h1 key={i} className="text-lg mb-2 ">
                    <strong className="text-2xl font-semibold mr-2">*</strong>
                    Row:{" "}
                    <span className="text-red-500">
                      {each?.line} {"==>"}
                    </span>
                    <span className="text-red-500 "> error: {each?.error}</span>
                  </h1>
                ))}
              </div>
            ) : (
              <div>
                <h1>Every Exercise data is fine.</h1>
              </div>
            )}

            <div>
              <h1>
                Are you want to update the mark for the remaining responses
              </h1>
              <button
                className="px-12 py-4 bg-black text-white font-bold text-lg"
                onClick={uploadMarkAsCSV}
              >
                {isLoading
                  ? "Updating"
                  : successfullyUpdatedStatus?.shouldShow
                  ? "Updated"
                  : "Update"}
              </button>
            </div>

            <div>
              {successfullyUpdatedStatus?.shouldShow && (
                <div>
                  {successfullyUpdatedStatus?.totalSuccessfullyUpdated ? (
                    <div>
                      {successfullyUpdatedStatus?.totalSuccessfullyUpdated}{" "}
                      exercise response data has updated successfully
                    </div>
                  ) : (
                    <div>no exercise response data updated successfully</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
    </>
  );
};

export default WarningModal;
