import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Papa from "papaparse";
import WarningModal from "./WarningModal";

const UploadCsvFile = () => {
  const [lessThanZero, setLessThanZero] = useState([]);
  const [greaterThanTen, setGreaterThanTen] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const {
    register,
    handleSubmit,
    isLoading,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const DummyData = [
    { mark: 25 },
    { mark: 25 },
    { mark: 8 },
    { mark: -25 },
    { mark: 10 },
    { mark: -22 },
  ];

  const onUpload = (data) => {
    // console.log(data?.fileInput[0]);
    Papa.parse(data?.fileInput[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const exercises = result?.data;
        const exerciseWithMarks = exercises.filter((exercise) => exercise.mark);
        console.log(exerciseWithMarks);

        for (let i = 0; i < DummyData.length; i++) {
          if (DummyData[i].mark > 10) {
            const sum = i + 1;
            // console.log(sum);
            greaterThanTen.push(sum);
          }
          if (DummyData[i].mark < 0) {
            const sum = i + 1;
            // console.log("sum", sum);
            lessThanZero.push(sum);
          }
        }
      },
    });

    setOpenModal(true);
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
      {openModal && (lessThanZero.length > 0 || greaterThanTen.length > 0) && (
        <WarningModal
          setOpenModal={setOpenModal}
          lessThanZero={lessThanZero}
          greaterThanTen={greaterThanTen}
        />
      )}
    </div>
  );
};

export default UploadCsvFile;
