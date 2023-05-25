import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import deleteIcon from "../../../../assets/icons/delete.svg";
import editIcon from "../../../../assets/icons/edit.svg";
import copyIcon from "../../../../assets/icons/copy.svg";
import style from "../AddLectures/AddLecture.module.css";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";
const ModuleList = () => {
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  // const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [program, setProgram] = useState({});
  const [course, setCourse] = useState({});
  const [batch, setBatch] = useState({});
  const [batches, setBatches] = useState([]);
  const [modules, setmodules] = useState([]);
  const [loading, setLoading] = useState(false);
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
      if (name === "batchName") {
        batches?.forEach((each) => {
          if (each?._id === value?.batchName) {
            setBatch({
              batch_id: each?._id,
              batchName: each?.batchName,
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
      // setCourses([]);
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

  //batch
  useEffect(() => {
    if (course?.course_id) {
      // setCourses([]);
      fetch(
        `https://geeks-of-gurukul-server-side.vercel.app/all-batches-by-course?_id=${course?.course_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log("data", data?.data);
          setBatches(data?.data);
        });
    }
  }, [course?.course_id]);

  const onSubmit = (data) => {
    setLoading(true);
    const searchData = {
      program_id: program?.program_id,
      course_id: course?.course_id,
      batch_id: batch?.batch_id,
    };
    fetch(`http://localhost:5000/search-module`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        data: JSON.stringify(searchData),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          setmodules(result?.data);
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
    console.log(modules);
    reset();
  };

  //pagination calculations
  const itemsPerPage = 6;

  const endOffset = itemOffset + itemsPerPage;

  const currentModules = modules?.slice(itemOffset, endOffset);
  const pageCount = Math?.ceil(modules?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event?.selected * itemsPerPage) % modules?.length;
    console.log(
      `User requested page number ${event?.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div>
      {/* Search Form */}
      <div className='container p-8'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Program Name */}
            <div className={style?.addLecture}>
              <label htmlFor='programName'>Program Name</label>
              <select
                name='programName'
                {...register(
                  "programName"
                  // {
                  // required: "Program Name is required",
                  // }
                )}
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
                {...register(
                  "courseName"
                  //   {
                  //   required: "Course Name is required",
                  // }
                )}
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
            {/* batch Name */}

            <div className={style?.addLecture}>
              <label htmlFor='batchName'>Batch Name</label>
              <select
                name='batchName'
                {...register(
                  "batchName"
                  // {
                  // required: "batch Name is required",
                  // }
                )}
                aria-invalid={errors.batchName ? "true" : "false"}
                className='w-full border-2 border-green-400 rounded-xl'>
                <option disabled selected value=''>
                  Choose a Batch
                </option>
                {batches?.length > 0 &&
                  batches?.map((each) => (
                    <option key={each?._id} value={each?._id}>
                      {each?.batchName}
                    </option>
                  ))}
              </select>
              {errors.batchName && (
                <p
                  className='text-red-500 font-poppins font-medium'
                  role='alert'>
                  {errors.batchName?.message}
                </p>
              )}
            </div>

            {/* batch Name */}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            class='group relative h-12 w-full overflow-hidden rounded-lg bg-white text-lg shadow my-3'>
            <div class='absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full'></div>
            <span class='relative text-black group-hover:text-white font-poppins font-medium'>
              Search
            </span>
          </button>
        </form>
      </div>
      {/* Search Form */}

      {/* Table */}
      <div class='flex flex-col justify-center h-full mx-auto'>
        <div class='w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200'>
          <header class='px-5 py-4 border-b border-gray-100'>
            <h2 class='font-semibold font-poppins text-gray-800'>Modules</h2>
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
                      <div class='font-semibold text-left'>Module Name</div>
                    </th>
                    <th class='p-2 whitespace-nowrap'>
                      <div class='font-semibold text-left'>Course Name</div>
                    </th>
                    <th class='p-2 whitespace-nowrap'>
                      <div class='font-semibold text-left'>Batch Name</div>
                    </th>

                    <th class='p-2 whitespace-nowrap'>
                      <div class='font-semibold text-center'>Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody class='text-sm divide-y divide-gray-100'>
                  {currentModules?.map((module, i) => (
                    <tr key={i}>
                      <td class='p-2 whitespace-nowrap'>
                        <div class='flex items-center'>{i + 1}</div>
                      </td>
                      <td class='p-2 whitespace-nowrap'>
                        {module?.moduleName}
                      </td>
                      <td class='p-2 whitespace-nowrap'>
                        {module?.course?.courseName}
                      </td>
                      <td class='p-2 whitespace-nowrap'>
                        {module?.batch?.batchName}
                      </td>

                      <td class='p-2 whitespace-nowrap flex gap-2'>
                        <div class='mx-auto flex w-[100px] gap-2'>
                          <button type='button' className='px-1 py-1 '>
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

export default ModuleList;
