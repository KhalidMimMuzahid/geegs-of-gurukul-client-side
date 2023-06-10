import React from "react";
import { Link } from "react-router-dom";
import { BsFillJournalBookmarkFill, BsClock } from "react-icons/bs";
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
  useEffect(() => setCourses(dummyData), []);
  // useEffect(() => {
  // setLoading(true);
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
  // setLoading(false);
  // }, [dummyData]);
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-[#ffffff6b]">
        <svg
          aria-hidden="true"
          className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }
  // return <UnderConstruction/>
  return (
    <div className="w-full font-poppins pb-10">
      {/* we hav to use each courses  */}
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-7 pt-4 px-5">
        {courses?.length > 0 &&
          courses?.map((course) => (
            <Link to={"/dashboard/courses/course"} key={course?._id}>
              <div className="w-full border border-gray-200 rounded-xl grid grid-cols-2 hover:shadow-md">
                <div
                  style={{
                    backgroundImage:
                      'url("https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_640.jpg")',
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                  className="rounded-l-xl"
                ></div>
                <div className="lg:p-8 p-6">
                  <p className="md:text-md text-sm">
                    {course?.program?.programName}
                  </p>
                  <p className="font-semibold text-lg md:text-xl md:mb-11 md:mt-7 mb-6 mt-4">
                    {course?.courseName}
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-3">
                      <BsFillJournalBookmarkFill size={20} />
                      <p className="md:text-md text-sm">24 lessons</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <BsClock size={20} />
                      <p className="md:text-md text-sm">20 weeks</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
export default Courses;
