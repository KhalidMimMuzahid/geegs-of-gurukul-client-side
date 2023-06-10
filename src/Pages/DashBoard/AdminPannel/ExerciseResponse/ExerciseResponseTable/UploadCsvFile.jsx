import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Papa from "papaparse";
import WarningModal from "./WarningModal";

const UploadCsvFile = ({ setRefreshExcerciseResponse }) => {
  const [openModal, setOpenModal] = useState(false);
  const [errorInResponse, setErrorInResponse] = useState([]);
  const [exercisesResponses, setExercisesResponses] = useState([]);
  const {
    register,
    handleSubmit,
    isLoading,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onUpload = (data) => {
    setOpenModal(false);
    setErrorInResponse([]);
    setExercisesResponses([]);
    // console.log(data?.fileInput[0]);
    Papa.parse(data?.fileInput[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const exercisesResponsesTemp = result?.data;
        // console.log("exercisesResponses:   ", exercisesResponses);
        const exerciseWithMarks = exercisesResponsesTemp?.filter(
          (eachRes, i) => {
            if (
              parseInt(eachRes?.mark) >= 0 &&
              parseInt(eachRes?.mark) <= 10 &&
              eachRes?.mark &&
              eachRes?.response_id
            ) {
              return true;
            } else {
              // to do :   throw the error here
              if (!eachRes?.response_id) {
                setErrorInResponse((prev) => [
                  ...prev,
                  {
                    line: i + 2,
                    error: "response_id is missing",
                  },
                ]);
              } else if (!eachRes?.mark) {
                setErrorInResponse((prev) => [
                  ...prev,
                  {
                    line: i + 2,
                    error: "mark  is missing",
                  },
                ]);
              } else if (isNaN(parseInt(eachRes?.mark))) {
                setErrorInResponse((prev) => [
                  ...prev,
                  {
                    line: i + 2,
                    error: "mark must be the number",
                  },
                ]);
              } else if (parseInt(eachRes?.mark) < 0) {
                setErrorInResponse((prev) => [
                  ...prev,
                  {
                    line: i + 2,
                    error: "mark can't be negative",
                  },
                ]);
              } else if (!parseInt(eachRes?.mark) > 10) {
                setErrorInResponse((prev) => [
                  ...prev,
                  {
                    line: i + 2,
                    error: "mark can't be more than 10",
                  },
                ]);
              }

              return false;
            }
          }
        );
        // console.log("exerciseWithMarks: ", exerciseWithMarks);
        const exercisesRes = exerciseWithMarks?.map((exerciseRes) => {
          return {
            response_id: exerciseRes?.response_id,
            mark: parseInt(exerciseRes?.mark),
          };
        });
        // console.log("exercisesResponses: ", exercisesRes);
        setExercisesResponses(exercisesRes);
        setOpenModal(true);
      },
    });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onUpload)}
        className="flex gap-3 items-center"
      >
        <div className="">
          <input
            className="block w-full text-sm text-green-400 border border-gray-300 rounded-lg cursor-pointer bg-green-50 focus:outline-none"
            id="file_input"
            {...register("fileInput", {
              required: "Input is required",
              accept: "application/csv",
            })}
            type="file"
            accept="csv"
          />
          {errors.fileInput && (
            <p role="alert" className="text-red-500 font-poppins font-medium">
              {errors.fileInput?.message}
            </p>
          )}
        </div>
        <div className="">
          <button className="px-4 py-2 hover:bg-white hover:text-green-500 border-2 border-green-500 bg-green-500/90 text-white rounded-md transition-all duration-500">
            Upload
          </button>
        </div>
      </form>
      {openModal && (
        <WarningModal
          exercisesResponses={exercisesResponses}
          errorInResponse={errorInResponse}
          setOpenModal={setOpenModal}
          setRefreshExcerciseResponse={setRefreshExcerciseResponse}
        />
      )}
    </div>
  );
};

export default UploadCsvFile;
