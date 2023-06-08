import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Papa from "papaparse";
import { AuthContext } from "../../../../../contexts/UserProvider/UserProvider";
import moment from "moment";

const UserCSVUpload = () => {
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

  const onUpload = (data) => {
    Papa.parse(data?.fileInput[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const students = result?.data;

        students?.map((student) => {
          const justNow = moment().format();
          const userData = {
            program: {
              program_id: "",
              programName: "",
            },
            course: {
              course_id: "",
              courseName: "",
            },
            batch: {
              batch_id: "",
              batchName: "",
            },
            isPaid: true,
            regularPrice: "",
            discount: 100,
            appliedPrice: 0,
            couponCode: "",
            paymentId: "",
            purchaseInfo: {
              purchaseByEmail: "",
              purchaseByName: "data[0]?.name",
              enrolledAt: justNow,
              paidAt: justNow,
            },
            addedBy: {
              adderName: user?.name,
              adderEmail: user?.email,
              addedAt: justNow,
            },
          };
        });
        console.log(students);
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
