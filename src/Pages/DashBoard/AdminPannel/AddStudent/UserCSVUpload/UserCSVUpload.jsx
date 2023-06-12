import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Papa from "papaparse";
import { AuthContext } from "../../../../../contexts/UserProvider/UserProvider";
import moment from "moment";
import { toast } from "react-hot-toast";

const UserCSVUpload = ({ batch, courseObject }) => {
  // console.log("programs", programs);
  // console.log("courses", courses);
  // console.log("batch", batchTemp);
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

  const StudentData = function (purchaseInfo, justNow) {
    this.program = courseObject?.program;

    this.course = {
      course_id: courseObject?._id,
      courseName: courseObject?.courseName,
    };
    this.batch = {
      batch_id: batch?._id,
      batchName: batch?.batchName,
    };
    this.isPaid = true;
    this.regularPrice = courseObject?.regularPrice;
    this.discount = 100;
    this.appliedPrice = "";
    this.couponCode = "";
    this.paymentId = "";
    this.addedBy = {
      adderName: user?.name,
      adderEmail: user?.email,
      addedAt: justNow,
    };
    this.purchaseInfo = purchaseInfo;
  };

  const onUpload = (data) => {
    if (!courseObject?._id || !batch?._id) {
      toast.error("please select a course first");
      return;
    }
    Papa.parse(data?.fileInput[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const students = result?.data;
        console.log("students: ", students);

        const justNow = moment().format();
        const studentsForCourse = students?.map((student) => {
          const purchaseInfo = {
            purchaseByEmail: student?.studentEmail,
            enrolledAt: justNow,
            paidAt: justNow,
          };
          const studentData = new StudentData(purchaseInfo, justNow);
          return studentData;
        });
        console.log("studentsForCourse: ", studentsForCourse);
        (async () => {
          const res = await Promise.all(
            studentsForCourse?.map((coursePurchaseDetails) => {
              return fetch(
                `http://localhost:5000/api/v1/purchasesCourse/add-student-to-course`,
                {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(coursePurchaseDetails),
                }
              );
            })
          );
          const resParse = await Promise.allSettled(
            res?.map((each) => each.json())
          );

          // console.log("resParse : ", resParse);
          const successfullyHittedRes = resParse.filter(
            (eachRes) => eachRes?.status === "fulfilled"
          );
          console.log("successfullyHittedRes: ", successfullyHittedRes);
          const successfullyUpdatedRes = successfullyHittedRes?.filter(
            (each) => each?.value?.success
          );
          console.log("successfullyUpdatedRes: ", successfullyUpdatedRes);
          if (successfullyUpdatedRes?.length) {
            toast.success(
              `${successfullyUpdatedRes?.length} student successfully added to ${courseObject?.courseName}`
            );
          } else {
            toast.error(`no student added to ${courseObject?.courseName}`);
          }
        })();
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
