import React, { useEffect, useState } from "react";
import deleteIcon from "../../../../assets/icons/delete.svg";
import editIcon from "../../../../assets/icons/edit.svg";
import copyIcon from "../../../../assets/icons/copy.svg";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";

const inputStyle =
  "border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg w-full mt-1";

const BatchList = () => {
  const [shouldDelete, setShouldDelete] = useState(false);
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  // const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [program, setProgram] = useState({});
  const [course, setCourse] = useState({});
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);

  const {
    register,
    handleSubmit,
    isLoading,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      // console.log("value", value);
      // console.log("\nname", name);
      // console.log("\ntype", type);
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
    fetch("http://localhost:5000/api/v1/programs/all-program")
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
        `http://localhost:5000/api/v1/courses/all-courses-by-program?_id=${program?.program_id}`
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
      fetch(
        `http://localhost:5000/api/v1/batches/all-batches-by-course?_id=${course?.course_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log("data", data?.data);
        });
    }
  }, [course?.course_id]);

  //delete a batch
  const handelDeleteBatch = (id) => {
    fetch(`http://localhost:5000/api/v1/batches/batch/${id}`, {
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

  const onSearch = (data) => {
    const searchData = {
      course_id: course?.course_id,
      program_id: program?.program_id,
      batchName: data?.batchName,
    };

    setLoading(true);
    fetch(`http://localhost:5000/api/v1/batches/search-batch`, {
      headers: {
        "content-type": "application/json",
        data: JSON.stringify(searchData),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.success) {
          const data = result?.data;
          console.log("first", data);
          setBatches(data);
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

  console.log(batches);

  //pagination calculation
  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;

  const currentBatches = batches?.slice(itemOffset, endOffset);
  const pageCount = Math?.ceil(batches?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event?.selected * itemsPerPage) % batches?.length;
    console.log(
      `User requested page number ${event?.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div>
      {/* Search */}
      <div className="container mt-5 relative">
        <form onSubmit={handleSubmit(onSearch)}>
          <div className="font-poppins p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p>Batch Name</p>
                <input
                  type="text"
                  {...register("batchName")}
                  className={inputStyle}
                  placeholder="Enter batch name"
                />
              </div>

              <div>
                <label htmlFor="programName">Program Name</label>
                <select
                  name="programName"
                  {...register("programName")}
                  aria-invalid={errors.programName ? "true" : "false"}
                  className={inputStyle}
                  defaultValue=""
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
                  className={inputStyle}
                  defaultValue=""
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
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="">
                <button
                  type="submit"
                  disabled={loading}
                  className="py-3 w-full my-10 text-white rounded-lg bg-[#4BA25D] hover:bg-[#5fb370]"
                >
                  {loading ? "Searching" : "Search"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Search */}
      {/* Table */}
      <div className="flex flex-col justify-center h-full mx-auto">
        <div className="w-full mx-auto bg-white rounded-lg border border-gray-300">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-medium text-center font-poppins text-gray-800">
              Batches
            </h2>
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
                      <div className="font-semibold text-left">Course ID</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Batch ID </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Duration</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">
                        Start Date
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {currentBatches?.length > 0 &&
                    currentBatches?.map((batch, i) => (
                      <tr key={i}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">{i + 1}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {batch?.course?.courseName}
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {batch?.batchName}
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {batch?.duration}
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {batch?.startedAt?.slice(0, 10)}
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
                              <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
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
                                      handelDeleteBatch(batch?._id) &&
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

      {isLoading ||
        (loading && (
          <div className=" absolute top-0 left-0 h-screen w-full flex justify-center items-center bg-transparent">
            <svg
              aria-hidden="true"
              className=" w-14 h-14 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
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
        ))}
    </div>
  );
};

export default BatchList;
