import React from "react";
import { Link } from "react-router-dom";
import courseimg from "../../../../assets/imga/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg";
import style from "./course.module.css";
import { useEffect } from "react";
import { useState } from "react";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const dummyData = [
    {
      courseName: "Full Stack Development",
      currentBatch: "FSWD-001",
      program: {
        programName: "Coding-Bees",
      },
    },
    {
      courseName: "Full Stack Development",
      currentBatch: "FSWD-002",
      program: {
        programName: "Coding-Bees",
      },
    },
    {
      courseName: "Full Stack Development",
      currentBatch: "FSWD-003",
      program: {
        programName: "Coding-Bees",
      },
    },
    {
      courseName: "Full Stack Development",
      currentBatch: "FSWD-004",
      program: {
        programName: "Coding-Bees",
      },
    },
    {
      courseName: "Full Stack Development",
      currentBatch: "FSWD-005",
      program: {
        programName: "Coding-Bees",
      },
    },
    {
      courseName: "Full Stack Development",
      currentBatch: "FSWD-006",
      program: {
        programName: "Coding-Bees",
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    // fetch(`http://localhost:5000/api/v1/courses/allCourses`)
    //   .then((res) => res.json())
    //   .then((result) => {
    //     // console.log("result", result);
    //     if (result?.success) {
    //       const data = result?.data;
    //       // console.log("first", data);
    //       setCourses(data);
    //       setLoading(false);
    //     } else {
    //       toast.error(result?.message);
    //       setLoading(false);
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error(err.message);
    //     setLoading(false);
    //   });

    setCourses(dummyData);
    setLoading(false);
  }, [dummyData]);

  if (loading) {
    return (
      <div className='h-screen w-full flex justify-center items-center bg-[#ffffff6b]'>
        <svg
          aria-hidden='true'
          className='w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600'
          viewBox='0 0 100 101'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
            fill='currentColor'
          />
          <path
            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
            fill='currentFill'
          />
        </svg>
      </div>
    );
  }
  // return <UnderConstruction/>

  return (
    <div className='w-full'>
      {/* we hav to use each courses  */}
      <div className='grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-7 pt-4 px-5'>
        {/* <div className={`${style.singleCourse}`}>
                <img src={courseimg} alt='' />
                <h2>Css</h2>
                <Link to={"/dashboard/courses/course"}>Start Learn</Link>
              </div> */}
        {/* <div className={`${style.drop}`}>
                <div className={`${style.content}`}>
                  <h2 className={`${style.h2} text-green-400 font-semibold`}>
                    Html
                  </h2>
                  <p>Program Name</p>
                  <p>Batch Name</p>
                  <Link
                    to={"/dashboard/courses/course"}
                    className='relative px-[25px] py-[10px] bg-green-400 text-white font-poppins font-medium rounded-3xl shadow-md hover:bg-green-400/90'>
                    Start Learn
                  </Link>
                </div>
              </div> */}
        {courses?.length > 0 &&
          courses?.map((course) => (
            <div
              key={course?._id}
              className={`${style.droop} w-[350px] sm:w-[400px] md:w-[450px]`}
            >
              <div className={`${style.content} p-6`}>
                <h2
                  className={`text-xl sm:text-2xl md:text-3xl text-green-400 font-semibold`}
                >
                  {course?.courseName}
                </h2>
                <p className='text-lg font-medium'>
                  <span className='text-xl'>Program Name:</span>
                  {course?.program?.programName}
                </p>
                <p className='text-lg font-medium'>
                  <span className='text-xl'>Batch Name:</span>
                  {course?.currentBatch}
                </p>
                <Link
                  to={"/dashboard/courses/course"}
                  className='relative px-[25px] py-[10px] bg-green-400 text-white font-poppins font-medium rounded-3xl shadow-md hover:bg-green-400/90'
                >
                  Start Learn
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Courses;
