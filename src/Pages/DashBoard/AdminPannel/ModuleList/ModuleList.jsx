import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import deleteIcon from "../../../../assets/icons/delete.svg";
import editIcon from "../../../../assets/icons/edit.svg";
import copyIcon from "../../../../assets/icons/copy.svg";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";

const inputStyle =
  "border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg w-full mt-1";

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
    fetch("https://api.geeksofgurukul.com/api/v1/programs/all-program")
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
        `https://api.geeksofgurukul.com/api/v1/courses/all-courses-by-program?_id=${program?.program_id}`
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
        `https://api.geeksofgurukul.com/api/v1/batches/all-batches-by-course?_id=${course?.course_id}`
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
    fetch(`https://api.geeksofgurukul.com/api/v1/modules/search-module`, {
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
    <div className="mb-10">
      {/* Search Form */}
      <div className="container p-8 font-poppins">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* Program Name */}
            <div>
              <label htmlFor="programName">Program Name</label>
              <select
                name="programName"
                {...register("programName")}
                aria-invalid={errors.programName ? "true" : "false"}
                defaultValue=""
                className={inputStyle}
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
                className={inputStyle}
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
            {/* batch Name */}

            <div>
              <label htmlFor="batchName">Batch Name</label>
              <select
                name="batchName"
                {...register("batchName")}
                aria-invalid={errors.batchName ? "true" : "false"}
                defaultValue=""
                className={inputStyle}
              >
                <option disabled value="">
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
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.batchName?.message}
                </p>
              )}
            </div>

            {/* batch Name */}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-16 py-3 my-7 text-white rounded-lg bg-[#4BA25D] hover:bg-[#5fb370] text-sm"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {/* Search Form */}

      {/* Table */}
      <div className="flex flex-col justify-center h-full mx-auto font-poppins">
        <div className="w-full mx-auto bg-white rounded-lg border border-gray-300">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-medium text-center text-gray-800">Modules</h2>
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
                      <div className="font-semibold text-left">Module Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Course Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Batch Name</div>
                    </th>

                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {currentModules?.map((module, i) => (
                    <tr key={i}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">{i + 1}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {module?.moduleName}
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {module?.course?.courseName}
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {module?.batch?.batchName}
                      </td>

                      <td className="p-2 whitespace-nowrap flex gap-2">
                        <div className="mx-auto flex w-[100px] gap-2">
                          <button type="button" className="px-1 py-1 ">
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

export default ModuleList;
