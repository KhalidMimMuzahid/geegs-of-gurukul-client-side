import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const TestPageHeader = ({ setAssessments }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSearch = (data) => {
    setLoading(true);
    fetch("http://localhost:5000/api/v1/assessments/search-assessment", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        data: JSON.stringify(data),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          setAssessments(result?.data);
          setLoading(false);
        } else {
          toast.error(result?.message);
          setLoading(false);
        }
        console.log("Server response:", result);
        // Handle the server response
      })
      .catch((error) => {
        console.error(
          "Error occurred while sending data to the server:",
          error
        );
        // Handle the error
      });
  };
  return (
    <div className="w-[88%] mx-auto my-3 font-poppins">
      <form onSubmit={handleSubmit(onSearch)}>
        <div className="flex justify-center gap-4 items-center flex-wrap">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Enter assessment name"
              {...register("assessmentName")}
              name="assessmentName"
              className="w-full rounded-full z-[998] border-black hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 text-sm"
            />
            <BsSearch className="text-[18px] absolute top-2.5 right-4 z-[999]" />
          </div>
          <div className="relative flex-grow">
            <input
              type="text"
              {...register("categoryName")}
              placeholder="Enter category"
              name="categoryName"
              className="w-full rounded-full z-[998] border-black hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 text-sm"
            />
            <BsSearch className="text-[18px] absolute top-2.5 right-4 z-[999]" />
          </div>
          <div className="relative">
            <button
              type="submit"
              disabled={loading}
              className="w-36 h-full rounded-full bg-[#4BA25D] hover:bg-[#5fb370] text-white hover:shadow z-[998] duration-200 py-2 text-sm"
            >
              {loading ? "searching..." : "Search"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TestPageHeader;
