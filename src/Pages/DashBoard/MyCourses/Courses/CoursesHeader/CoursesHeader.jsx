import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Coursesheader = ({}) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSearch = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="w-full mx-auto my-3 font-poppins px-3 mt-5">
      <form onSubmit={handleSubmit(onSearch)}>
        <div className="flex justify-center md:gap-8 gap-5 items-center flex-wrap">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Enter Course name"
              {...register("courseName")}
              name="courseName"
              className="w-full rounded-full z-[998] border-black hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 text-sm"
            />
            <BsSearch className="text-[18px] absolute top-2.5 right-4 z-[999]" />
          </div>
          <div className="relative flex-grow">
            <input
              type="text"
              {...register("programName")}
              placeholder="Enter program name"
              name="programName"
              className="w-full rounded-full z-[998] border-black hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 text-sm"
            />
            <BsSearch className="text-[18px] absolute top-2.5 right-4 z-[999]" />
          </div>
          <div className="relative">
            <button
              type="submit"
              disabled={loading}
              className="w-36 h-full rounded-full bg-[#37ED81] hover:bg-[#5fb370] text-black hover:text-[white] z-[998] duration-200 py-2 text-sm"
            >
              {loading ? "searching..." : "Search"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Coursesheader;
