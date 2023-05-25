import React, { useContext, useEffect, useState } from "react";
import style from "./courseList.module.css";
import deleteIcon from "../../../../assets/icons/delete.svg";
import editIcon from "../../../../assets/icons/edit.svg";
import copyIcon from "../../../../assets/icons/copy.svg";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "./../../../../contexts/UserProvider/UserProvider";
import ReactPaginate from "react-paginate";
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
    fetch("https://geeks-of-gurukul-server-side.vercel.app/all-program")
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
        `https://geeks-of-gurukul-server-side.vercel.app/all-courses-by-program?_id=${program?.program_id}`
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
    fetch(`http://localhost:5000/search-course`, {
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
    fetch(`https://geeks-of-gurukul-server-side.vercel.app/course/${id}`, {
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
    fetch(`https://geeks-of-gurukul-server-side.vercel.app/course/${id}`, {
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
      <div className='container mt-5'>
        <form onSubmit={handleSubmit(onSearch)}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 font-poppins font-medium p-5'>
            <div className={style?.addLecture}>
              <label htmlFor='programName'>Program Name</label>
              <select
                name='programName'
                {...register("programName")}
                aria-invalid={errors.programName ? "true" : "false"}
                className='w-full border-2 border-green-400 rounded-xl'>
                <option disabled selected value=''>
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
                  className='text-red-500 font-poppins font-medium'
                  role='alert'>
                  {errors.programName?.message}
                </p>
              )}
            </div>
            {/* Course Name */}
            <div className={style?.addLecture}>
              <label htmlFor='courseName'>Course Name</label>
              <select
                name='courseName'
                {...register("courseName")}
                aria-invalid={errors.courseName ? "true" : "false"}
                className='w-full border-2 border-green-400 rounded-xl'>
                <option disabled selected value=''>
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
                  className='text-red-500 font-poppins font-medium'
                  role='alert'>
                  {errors.courseName?.message}
                </p>
              )}
            </div>
            {/* Course Name */}

            <div className={style?.courseList}>
              <p>Creator Email</p>
              <input type='email' {...register("creatorEmail")} />
            </div>

            <div className={style?.courseList}>
              <p>Updater Email:</p>
              <input
                id='updaterEmail'
                name='updaterEmail'
                type='email'
                {...register("updaterEmail")}
              />
            </div>
            <div className='flex gap-4'>
              <div className=''>
                <button
                  type='submit'
                  disabled={loading}
                  className='px-10 py-3
                          text-white hover:text-green-500 
                          bg-green-500 hover:bg-white 
                          border-green-500 rounded-lg border-4    
                          transition-all duration-300'>
                  {loading ? "Searching" : "Search"}
                </button>
              </div>
              <div className=''>
                <button
                  onClick={() => handelToMyCreation}
                  disabled={loading}
                  className='px-10 py-3
                           text-green-500 hover:text-white 
                           bg-white hover:bg-green-500 
                           border-green-500 rounded-lg border-4    
                           transition-all duration-300'>
                  {loading ? "Searching" : "My Creation"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Table */}
      <div class='flex flex-col justify-center h-full mx-auto text-center'>
        <div class='w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200'>
          <header class='px-5 py-4 border-b border-gray-100'>
            <h2 class='font-semibold font-poppins text-gray-800'>Courses</h2>
          </header>
          <div class='p-3'>
            <div class='max-w-[90vw] overflow-x-scroll'>
              <table class='table-auto w-full font-poppins font-medium overflow-x-auto'>
                <thead class='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
                  <tr>
                    <th class='p-2 whitespace-nowrap'>
                      <div class='font-semibold text-left'>SL No:</div>
                    </th>
                    <th class='p-2 whitespace-nowrap'>
                      <div class='font-semibold text-left'>Course Name </div>
                    </th>
                    <th class='p-2 whitespace-nowrap'>
                      <div class='font-semibold text-left'>Course ID</div>
                    </th>
                    <th class='p-2 whitespace-nowrap'>
                      <div class='font-semibold text-center'>Duration</div>
                    </th>
                    <th class='p-2 whitespace-nowrap'>
                      <div class='font-semibold text-center'>Program Name</div>
                    </th>
                    <th class='p-2 whitespace-nowrap'>
                      <div class='font-semibold text-center'>Price</div>
                    </th>
                    <th class='p-2 whitespace-nowrap'>
                      <div class='font-semibold text-center'>Status</div>
                    </th>
                    <th class='p-2 whitespace-nowrap'>
                      <div class='font-semibold text-center'>Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody class='text-sm divide-y divide-gray-100'>
                  {currentItems?.length === 0 &&
                    currentItems?.map((item, i) => (
                      <tr key={item?._id}>
                        <td class='p-2 whitespace-nowrap text-center'>
                          <div class='flex items-center'>{i + 1}</div>
                        </td>
                        <td class='p-2 whitespace-nowrap text-center'>
                          {item?.courseName}
                        </td>
                        <td class='p-2 whitespace-nowrap text-center'>
                          {item?.courseId}
                        </td>
                        <td class='p-2 whitespace-nowrap text-center'>
                          {item?.duration}
                        </td>
                        <td class='p-2 whitespace-nowrap text-center'>
                          {item?.programName}
                        </td>
                        <td class='p-2 whitespace-nowrap text-center'>
                          {item?.regularPrice}
                        </td>
                        <td class='p-2 whitespace-nowrap text-center'>
                          {/* isActive */}
                          <div className={style?.addBatch}>
                            <label
                              for='isActive'
                              class='flex items-center cursor-pointer relative mb-4'>
                              <input
                                type='checkbox'
                                id='isActive'
                                name='isActive'
                                class='sr-only'
                              />
                              <div class='toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full'></div>
                              <span class='ml-3 text-gray-900 text-sm font-medium'>
                                isActive
                              </span>
                            </label>
                          </div>
                          {/* isActive */}
                        </td>
                        <td class='p-2 whitespace-nowrap flex gap-2'>
                          <div class='mx-auto flex w-[100px] gap-2'>
                            <button
                              type='button'
                              className='px-1 py-1 '
                              onClick={() => setShouldDelete(true)}>
                              {/* svg */}
                              <img
                                height='15px'
                                width='15px'
                                src={deleteIcon}
                                alt=''
                              />
                            </button>
                            <button type='button' className='px-1 py-1'>
                              {/* svg */}
                              <img
                                height='15px'
                                width='15px'
                                src={editIcon}
                                alt=''
                              />
                            </button>

                            <button
                              data-modal-target='staticModal'
                              data-modal-toggle='staticModal'
                              class='px-1 py-1 '
                              type='button'>
                              {/* svg */}
                              <img
                                height='15px'
                                width='15px'
                                src={copyIcon}
                                alt=''
                              />
                            </button>
                            {shouldDelete && (
                              <div class='bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-1000'>
                                <div class='bg-white px-16 py-14 rounded-md text-center'>
                                  <h1 class='text-xl mb-4 font-bold text-slate-500'>
                                    Do you Want Delete
                                  </h1>
                                  <button
                                    onClick={() => setShouldDelete(false)}
                                    class='bg-red-500 px-4 py-2 rounded-md text-md text-white'>
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() =>
                                      handelDeleteCourse(course?._id) &&
                                      setShouldDelete(false)
                                    }
                                    class='bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold'>
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
                <div className='pagination'>
                  <ReactPaginate
                    breakLabel='...'
                    nextLabel='>'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel='<'
                    renderOnZeroPageCount={null}
                    containerClassName='pagination-menu'
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
