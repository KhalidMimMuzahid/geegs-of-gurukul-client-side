import React, { useContext, useEffect, useState } from "react";
import deleteIcon from "../../../../assets/icons/delete.svg";
import editIcon from "../../../../assets/icons/edit.svg";
import copyIcon from "../../../../assets/icons/copy.svg";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "./../../../../contexts/UserProvider/UserProvider";
import ReactPaginate from "react-paginate";

const inputStyle =
  "border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg w-full mt-1";

const CourseList = () => {
  const { user } = useContext(AuthContext);
  const [shouldDelete, setShouldDelete] = useState(false);
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  // const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [program, setProgram] = useState({});
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "programName") {
        data?.forEach((each) => {
          if (each?._id === value?.programName) {
            setProgram({
              program_id: each?._id,
              programName: each?.programName,
            });
            return;
          }
        });
      }
      if (name === "courseName") {
        courses?.forEach((each) => {
          if (each?._id === value?.courseName) {
            setCourse({
              course_id: each?._id,
              courseName: each?.courseName,
            });
            return;
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  });

  useEffect(() => {
    fetch("https://api.geeksofgurukul.com/api/v1/programs/all-program")
      .then((response) => response.json())
      .then((data) => {
        // console.log("data", data?.data);
        setData(data?.data);
      });
  }, []);

  useEffect(() => {
    if (program?.program_id) {
      setCourses([]);
      fetch(
        `https://api.geeksofgurukul.com/api/v1/courses/all-courses-by-program?_id=${program?.program_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log("data", data?.data);
          setCourses(data?.data);
        });
    }
  }, [program?.program_id]);

  const onSearch = (data) => {
    setLoading(true);
    const SearchData = {
      program_id: program?.program_id,
      courseName: course?.courseName,
      creatorEmail: data?.creatorEmail,
      updaterEmail: data?.updaterEmail,
    };

    fetchCourses(SearchData);
  };

  //my creation
  const handelToMyCreation = () => {
    setLoading(true);
    const SearchData = {
      creatorEmail: user?.email,
    };

    fetchCourses(SearchData);
  };

  // fetch data

  const fetchCourses = (SearchData) => {
    setItems([]);
    fetch(`https://api.geeksofgurukul.com/api/v1/courses/search-course`, {
      headers: {
        "content-type": "application/json",
        data: JSON.stringify(SearchData),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.success) {
          const data = result?.data;
          console.log("first", data);
          setItems(data);
          setLoading(false);
        } else {
          toast.error(result?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  //delete a course
  const handelDeleteCourse = (id) => {
    fetch(`https://api.geeksofgurukul.com/api/v1/courses/course/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };
  //update a course
  const handelUpdateCourse = (id) => {
    fetch(`https://api.geeksofgurukul.com/api/v1/courses/course/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "John Smith",
        email: "john@example.com",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  //pagination calculation

  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = items?.slice(itemOffset, endOffset);
  const pageCount = Math?.ceil(items?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event?.selected * itemsPerPage) % items?.length;
    console.log(
      `User requested page number ${event?.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div>
      <div className="container mt-5">
        <form onSubmit={handleSubmit(onSearch)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-poppins text-sm p-5 mb-5">
            <div>
              <label htmlFor="programName">Program Name</label>
              <select
                name="programName"
                {...register("programName")}
                aria-invalid={errors.programName ? "true" : "false"}
                defaultValue=""
                className={`${inputStyle} input border-[#5FB370]`}
              >
                <option disabled value="">
                  Choose a Program
                </option>
                {data?.length > 0 &&
                  data?.map((each) => (
                    <option key={each?._id} value={each?._id}>
                      {each?.programName}
                    </option>
                  ))}
              </select>
              {errors.programName && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.programName?.message}
                </p>
              )}
            </div>
            {/* Course Name */}
            <div>
              <label htmlFor="courseName">Course Name</label>
              <select
                name="courseName"
                {...register("courseName")}
                aria-invalid={errors.courseName ? "true" : "false"}
                defaultValue=""
                className={`${inputStyle} input border-[#5FB370]`}
              >
                <option disabled value="">
                  Choose a Course
                </option>
                {courses?.length > 0 &&
                  courses?.map((each) => (
                    <option key={each?._id} value={each?._id}>
                      {each?.courseName}
                    </option>
                  ))}
              </select>
              {errors.courseName && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.courseName?.message}
                </p>
              )}
            </div>
            {/* Course Name */}

            <div>
              <p>Creator Email</p>
              <input
                type="email"
                {...register("creatorEmail")}
                placeholder="Enter creator email"
                className={`${inputStyle} input border-[#5FB370]`}
              />
            </div>

            <div>
              <p>Updater Email:</p>
              <input
                id="updaterEmail"
                name="updaterEmail"
                type="email"
                {...register("updaterEmail")}
                placeholder="Enter updator email"
                className={`${inputStyle} input border-[#5FB370]`}
              />
            </div>
          </div>
          <div className="flex justify-center gap-4 px-5 mb-8 font-poppins text-sm">
            <div className="">
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-3 text-white border border-[#4BA25D] bg-[#4BA25D] hover:bg-[#5fb370] rounded-lg transition-all duration-200"
              >
                {loading ? "Searching" : "Search"}
              </button>
            </div>
            <div className="">
              <button
                onClick={() => handelToMyCreation}
                disabled={loading}
                className="px-10 py-3 hover:text-white border border-[#747880] hover:bg-[#8A8F98] rounded-lg transition-all duration-200"
              >
                {loading ? "Searching" : "My Creation"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="flex flex-col justify-center h-full mx-auto text-center">
        <div className="w-full mx-auto bg-white rounded-lg border border-gray-300">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-medium font-poppins text-gray-800">Courses</h2>
          </header>
          <div className="p-3">
            <div className="max-w-[90vw] overflow-x-auto">
              <table className="table-auto w-full font-poppins overflow-x-auto">
                <thead className="text-xs font-semibold uppercase bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">SL No:</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        Course Name{" "}
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Course ID</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Duration</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">
                        Program Name
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Price</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Status</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {currentItems?.length > 0 &&
                    currentItems?.map((item, i) => (
                      <tr key={item?._id}>
                        <td className="p-2 whitespace-nowrap text-center">
                          <div className="flex items-center">{i + 1}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap text-center">
                          {item?.courseName}
                        </td>
                        <td className="p-2 whitespace-nowrap text-center">
                          {item?.courseId}
                        </td>
                        <td className="p-2 whitespace-nowrap text-center">
                          {item?.duration}
                        </td>
                        <td className="p-2 whitespace-nowrap text-center">
                          {item?.programName}
                        </td>
                        <td className="p-2 whitespace-nowrap text-center">
                          {item?.regularPrice}
                        </td>
                        <td className="p-2 whitespace-nowrap text-center">
                          {/* isActive */}
                          <div>
                            <label
                              htmlFor="isActive"
                              className="flex items-center cursor-pointer relative mb-4"
                            >
                              <input
                                type="checkbox"
                                id="isActive"
                                name="isActive"
                                className="sr-only"
                              />
                              <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
                              <span className="ml-3 text-gray-900 text-sm font-medium">
                                isActive
                              </span>
                            </label>
                          </div>
                          {/* isActive */}
                        </td>
                        <td className="p-2 whitespace-nowrap flex gap-2">
                          <div className="mx-auto flex w-[100px] gap-2">
                            <button
                              type="button"
                              className="px-1 py-1 "
                              onClick={() => setShouldDelete(true)}
                            >
                              {/* svg */}
                              <img
                                height="15px"
                                width="15px"
                                src={deleteIcon}
                                alt=""
                              />
                            </button>
                            <button type="button" className="px-1 py-1">
                              {/* svg */}
                              <img
                                height="15px"
                                width="15px"
                                src={editIcon}
                                alt=""
                              />
                            </button>

                            <button
                              data-modal-target="staticModal"
                              data-modal-toggle="staticModal"
                              className="px-1 py-1 "
                              type="button"
                            >
                              {/* svg */}
                              <img
                                height="15px"
                                width="15px"
                                src={copyIcon}
                                alt=""
                              />
                            </button>
                            {shouldDelete && (
                              <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-1000">
                                <div className="bg-white px-16 py-14 rounded-md text-center">
                                  <h1 className="text-xl mb-4 font-bold text-slate-500">
                                    Do you Want Delete
                                  </h1>
                                  <button
                                    onClick={() => setShouldDelete(false)}
                                    className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() =>
                                      handelDeleteCourse(course?._id) &&
                                      setShouldDelete(false)
                                    }
                                    className="bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
                                  >
                                    Ok
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {/* pagination */}

              <div>
                <div className="pagination">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination-menu"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
    </div>
  );
};

export default CourseList;
