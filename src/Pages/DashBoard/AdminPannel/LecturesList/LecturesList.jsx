import React, { useContext, useEffect, useState } from "react";
import style from "./LecturesList.module.css";
import deleteIcon from "../../../../assets/icons/delete.svg";
import editIcon from "../../../../assets/icons/edit.svg";
import copyIcon from "../../../../assets/icons/copy.svg";
// import { Modal } from "flowbite";
import { AuthContext } from "./../../../../contexts/UserProvider/UserProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";

const inputStyle =
  "border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg w-full mt-1";

const LecturesList = () => {
  const $targetEl = document.getElementById("staticModal");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  // const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [program, setProgram] = useState({});
  const [course, setCourse] = useState({});
  const [batch, setBatch] = useState({});
  const [batches, setBatches] = useState([]);
  const [addNewModule, setAddNewModule] = useState(false);
  const [modules, setModules] = useState([]);
  const [module, setModule] = useState([]);
  const [refreshModules, setRefreshModules] = useState(true);
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

      if (name === "moduleName") {
        modules?.forEach((each) => {
          if (each?._id === value?.moduleName) {
            setModule({
              module_id: each?._id,
              moduleName: each?.moduleName,
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

  //module
  useEffect(() => {
    if (batch?.batch_id) {
      fetch(
        `https://api.geeksofgurukul.com/api/v1/modules/all-modules-by-batch?_id=${batch?.batch_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log("data", data?.data);
          setModules(data?.data);
        });
    }
  }, [batch?.batch_id, refreshModules]);

  const onSearch = (data) => {
    const SearchData = {
      program_id: program?.program_id,
      course_id: course?.course_id,
      batch_id: batch?.batch_id,
      module_id: module?.module_id,
      lectureName: data?.lectureName,
    };

    // console.log(SearchData);
    fetchLecture(SearchData);
  };

  const handelToMyCreation = () => {
    setLoading(true);
    const SearchData = {
      creatorEmail: user?.email,
    };

    fetchLecture(SearchData);
  };

  const fetchLecture = (SearchData) => {
    setLectures([]);
    fetch(`https://api.geeksofgurukul.com/api/v1/lectures/search-lecture`, {
      headers: {
        "content-type": "application/json",
        data: JSON.stringify(SearchData),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.success) {
          const data = result?.data;
          // console.log("firstX", data);
          setLectures(data);
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

  //pagination calculation

  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;

  const currentLectures = lectures?.slice(itemOffset, endOffset);
  const pageCount = Math?.ceil(lectures?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event?.selected * itemsPerPage) % lectures?.length;
    // console.log(
    //   `User requested page number ${event?.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  return (
    <div className="mt-5 font-poppins">
      {/* filtering form */}
      <div className="container mt-5">
        <form onSubmit={handleSubmit(onSearch)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p>Lecture Name</p>
              <input
                type="text"
                {...register("lectureName")}
                className={inputStyle}
                placeholder="Enter lecture name"
              />
            </div>
            {/* Lecture Name */}

            {/* Program Name */}
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
            {/* batch Name */}

            <div>
              <label htmlFor="batchName">Batch Name</label>
              <select
                name="batchName"
                {...register("batchName")}
                aria-invalid={errors.batchName ? "true" : "false"}
                className={inputStyle}
                defaultValue=""
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
            {/* module name */}
            <div>
              <label htmlFor="moduleName">Module Name</label>
              <select
                name="moduleName"
                {...register("moduleName")}
                aria-invalid={errors.moduleName ? "true" : "false"}
                className={inputStyle}
                defaultValue=""
              >
                <option disabled value="">
                  Choose a Module
                </option>
                {modules?.length > 0 &&
                  modules?.map((each) => (
                    <option key={each?._id} value={each?._id}>
                      {each?.moduleName}
                    </option>
                  ))}
              </select>
              {errors.moduleName && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.moduleName?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4 my-10 items-center justify-center text-sm">
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
                type="button"
                onClick={handelToMyCreation}
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
      <div className="flex flex-col justify-center h-full mx-auto">
        <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-medium text-center font-poppins text-gray-800">
              Lectures
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
                      <div className="font-semibold text-left">
                        Lecture Name
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Topic</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Batch No</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {currentLectures?.length > 0 &&
                    currentLectures.map((lecture, i) => (
                      <tr key={i}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">{i + 1}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {lecture?.lectureName}
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {lecture?.topic}
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {lecture?.batch?.batchName}
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

      {/* <!-- Main modal --> */}
      <div
        id="staticModal"
        data-modal-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-[4000000] hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Lecture Info
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="staticModal"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="">
                  <input
                    type="text"
                    className="form-control w-full rounded-lg"
                    placeholder="Lecture name"
                    aria-label="Lecture name"
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    className="form-control w-full rounded-lg"
                    placeholder="Lecture Topic"
                    aria-label="Lecture Topic"
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    className="form-control w-full rounded-lg"
                    placeholder="Lecture ID"
                    aria-label="Lecture ID"
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    className="form-control w-full rounded-lg"
                    placeholder="Schedule at"
                    aria-label="Schedule at"
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    className="form-control w-full rounded-lg"
                    placeholder="Duration"
                    aria-label="Duration"
                  />
                </div>
              </div>
            </form>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="staticModal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                data-modal-hide="staticModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturesList;
