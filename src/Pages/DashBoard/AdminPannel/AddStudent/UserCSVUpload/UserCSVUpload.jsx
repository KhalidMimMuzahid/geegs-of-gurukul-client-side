import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Papa from "papaparse";
import { AuthContext } from "../../../../../contexts/UserProvider/UserProvider";
import moment from "moment";

const UserCSVUpload = ({ programs, courses, batch, CoursesObject }) => {
  console.log("programs", programs);
  console.log("courses", courses);
  console.log("batch", batch);
  const { user } = useContext(AuthContext);
  const [inputIsVisible, setInputIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    isLoading,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  function StudentData(
    program,
    course,
    batch,
    isPaid,
    discount,
    regularPrice,
    appliedPrice,
    couponCode,
    paymentId,
    purchaseInfo,
    addedBy
  ) {
    this.program = {
      program_id: program?.program_id,
      programName: program?.programName,
    };
    this.course = {
      course_id: course?.course_id,
      courseName: course?.courseName,
    };
    this.batch = {
      batch_id: batch?.batch_id,
      batchName: batch?.batchName,
    };
    this.isPaid = isPaid;
    this.regularPrice = regularPrice;
    this.discount = discount;
    this.appliedPrice = appliedPrice;
    this.couponCode = couponCode;
    this.paymentId = paymentId;
    this.purchaseInfo = {
      purchaseByEmail: purchaseInfo?.purchaseByEmail,
      purchaseByName: "data[0]?.name",
      enrolledAt: purchaseInfo?.justNow,
      paidAt: purchaseInfo?.justNow,
    };
    this.addedBy = {
      adderName: addedBy?.name,
      adderEmail: addedBy?.email,
      addedAt: addedBy?.justNow,
    };
  }

  const onUpload = (data) => {
    Papa.parse(data?.fileInput[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const students = result?.data;
        console.log(students);

        const justNow = moment().format();
        students?.map((student) => {
          const addedBy = {
            adderName: user?.name,
            adderEmail: user?.email,
            addedAt: justNow,
          };
          const purchaseInfo = {
            purchaseByEmail: student?.email,
            purchaseByName: "data[0]?.name",
            enrolledAt: justNow,
            paidAt: justNow,
          };

          const studentData = new StudentData(
            programs,
            courses,
            batch,
            true,
            100,
            "regularPrice",
            0,
            "couponCode",
            "paymentId",
            purchaseInfo,
            addedBy
          );

          console.log(studentData);
        });
      },
    });
  };

  return (
    <div>
      {inputIsVisible ? (
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
      ) : (
        <button
          onClick={() => setInputIsVisible(true)}
          className="px-4 py-2 hover:bg-white hover:text-green-500 border-2 border-green-500 bg-green-500/90 text-white rounded-md transition-all duration-500"
        >
          Upload user CSV
        </button>
      )}
    </div>
  );
};

export default UserCSVUpload;
