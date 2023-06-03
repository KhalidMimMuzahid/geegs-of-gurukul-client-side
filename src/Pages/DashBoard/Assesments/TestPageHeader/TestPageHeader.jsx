import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import InstructionsModal from "../InstructionsModal/InstructionsModal";
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
    <div className='w-4/5 mx-auto my-3'>
      <form onSubmit={handleSubmit(onSearch)}>
        <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3'>
          <div className='relative'>
            <input
              type='search'
              placeholder='search by assessment name'
              {...register("assessmentName")}
              name='assessmentName'
              className=' w-full rounded-3xl border-2 z-[998]'
            />
            <FaSearch className='text-[18px] absolute top-3 right-4 z-[999]' />
          </div>
          <div className='relative'>
            <input
              type='search'
              {...register("categoryName")}
              placeholder='search by category'
              name='categoryName'
              className=' w-full rounded-3xl border-2 z-[998]'
            />
            <FaSearch className='text-[18px] absolute top-3 right-4 z-[999]' />
          </div>
          <div className='relative'>
            <button
              type='submit'
              disabled={loading}
              className='w-36 h-full rounded-3xl border-2 z-[998] border-black hover:bg-black hover:text-white transition-all duration-700'
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
