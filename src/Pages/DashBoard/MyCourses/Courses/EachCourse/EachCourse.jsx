import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillJournalBookmarkFill, BsClock } from "react-icons/bs";

const EachCourse = ({ course }) => {
  const [specificCourse, setSpecificCourse] = useState({});

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/v1/courses/course/${course?.course?.course_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Course data: ", data);
        if (data?.success) {
          setSpecificCourse(data?.data);
        }
      });
  }, [course?.course?.course_id]);

  return (
    <Link
      to={`/dashboard/courses/course/course_id=${course?.course?.course_id}&batch_id=${course?.batch?.batch_id}`}
    >
      <div className="w-full border border-gray-200 rounded-2xl grid grid-cols-2 hover:shadow-md">
        <div
          style={{
            backgroundImage:
              'url("https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_640.jpg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className="rounded-l-2xl"
        ></div>
        <div className="lg:p-6 lg:px-8 p-6">
          <p className="md:text-md text-sm">{course?.program?.programName}</p>
          <p className="font-semibold text-lg md:text-xl md:my-6 my-4">
            {course?.course?.courseName}
          </p>
          <div className="flex flex-col gap-2.5">
            {/* <div className="flex items-center gap-3">
              <BsFillJournalBookmarkFill size={20} />
              <p className="md:text-md text-sm">24 lessons</p>
            </div> */}
            <div className="flex items-center gap-3">
              <BsClock size={20} />
              <p className="md:text-md text-sm">
                {specificCourse?.duration} weeks
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EachCourse;
