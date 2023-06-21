import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import style from "./ExerciseResponse.module.css";
import ExerciseResponseTable from "./ExerciseResponseTable/ExerciseResponseTable";
import { toast } from "react-hot-toast";
import Papa from "papaparse";

const ExerciseResponse = () => {
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  // const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [program, setProgram] = useState({});
  const [course, setCourse] = useState({});
  const [batch, setBatch] = useState({});
  const [batches, setBatches] = useState([]);
  const [modules, setModules] = useState([]);
  const [module, setModule] = useState({});
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [assignment, setAssignment] = useState({});
  const [exercises, setExercises] = useState([]);
  const [exercise, setExercise] = useState({});
  const [loading, setLoading] = useState(false);
  const [exerciseResponses, setExerciseResponses] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [refreshExcerciseResponse, setRefreshExcerciseResponse] =
    useState(false);
  const {
    register,
    handleSubmit,
    isLoading,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  // input field watch onchange event
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
      //batch
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
      if (name === "lectureName") {
        lectures?.forEach((each) => {
          if (each?._id === value?.lectureName) {
            setLecture({
              lecture_id: each?._id,
              lectureName: each?.lectureName,
            });
            setAssignments(each?.assignment?.assignments);
            return;
          }
        });
      }
      if (name === "assignmentName") {
        assignments?.forEach((each) => {
          if (each?.assignment_id === value?.assignmentName) {
            setAssignment(each);
            return;
          }
        });
      }
      if (name === "exerciseName") {
        // console.log("value", value);
        exercises?.forEach((each) => {
          if (each?._id === value?.exerciseName) {
            // console.log("exerciseName", value?.exerciseName);
            setExercise(each);
            return;
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  });

  // find program
  useEffect(() => {
    fetch("https://api.geeksofgurukul.com/api/v1/programs/all-program")
      .then((response) => response.json())
      .then((data) => {
        // console.log("data", data?.data);
        setData(data?.data);
      });
  }, []);

  // find all courses
  useEffect(() => {
    if (program?.program_id) {
      setCourses([]);
      setBatches([]);
      setModules([]);
      setLectures([]);
      setAssignments([]);
      setExercises([]);

      setCourse({});
      setBatch({});
      setModule({});
      setLecture({});
      setAssignment({});
      setExercise({});

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

  //find all batch
  useEffect(() => {
    if (course?.course_id) {
      setBatches([]);
      setModules([]);
      setLectures([]);
      setAssignments([]);
      setExercises([]);

      setBatch({});
      setModule({});
      setLecture({});
      setAssignment({});
      setExercise({});
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
      setModules([]);
      setLectures([]);
      setAssignments([]);
      setExercises([]);

      setModule({});
      setLecture({});
      setAssignment({});
      setExercise({});
      fetch(
        `https://api.geeksofgurukul.com/api/v1/modules/all-modules-by-batch?_id=${batch?.batch_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log("data", data);
          setModules(data?.data);
        });
    }
  }, [batch?.batch_id]);

  //lecture
  useEffect(() => {
    if (module?.module_id) {
      setExercises([]);
      setLectures([]);
      setAssignments([]);

      setLecture({});
      setAssignment({});
      setExercise({});
      fetch(
        `https://api.geeksofgurukul.com/api/v1/lectures/lecturesbymodule?_id=${module?.module_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log("data", data);
          setLectures(data);
        });
    }
  }, [module?.module_id]);

  //exercise by assignment
  useEffect(() => {
    setExercises([]);

    setExercise({});
    if (assignment?.assignment_id) {
      fetch(
        `https://api.geeksofgurukul.com/api/v1/assignments/assignmentby_id?_id=${assignment?.assignment_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setExercises(data?.exercises);
        });
    }
  }, [assignment?.assignment_id]);

  // console.log("exercise")
  useEffect(() => {
    const searchData = {
      program_id: program?.program_id,
      course_id: course?.course_id,
      batch_id: batch?.batch_id,
      module_id: module?.module_id,
      lecture_id: lecture?.lecture_id,
      assignment_id: assignment?.assignment_id,
      exercise_id: exercise?._id,
    };
    fetchExerciseResponse(searchData);
  }, [refreshExcerciseResponse]);
  const onSearch = (data) => {
    const searchData = {
      program_id: program?.program_id,
      course_id: course?.course_id,
      batch_id: batch?.batch_id,
      module_id: module?.module_id,
      lecture_id: lecture?.lecture_id,
      assignment_id: assignment?.assignment_id,
      exercise_id: exercise?._id,
    };
    fetchExerciseResponse(searchData);
    // console.log("searchData", searchData);
  };
  // console.log("assignment", assignment);
  // exe
  const fetchExerciseResponse = (SearchData) => {
    console.log("searchData: ", SearchData);
    fetch(
      `https://api.geeksofgurukul.com/api/v1/exercises/search-exercise-response`,
      {
        headers: {
          "content-type": "application/json",
          data: JSON.stringify(SearchData),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result?.success) {
          const data = result?.data;
          setExerciseResponses(data);
          // console.log("firstX", data);
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

  // function for download as CSV

  const dwonloadAsCsv = () => {
    if (!!!exerciseResponses?.length) {
      toast.error("No data is available in this table!");
      return;
    }
    const fields = [
      "response_id",
      "exerciseName",
      "submittedLink",
      "studentEmail",
      "mark",
    ];
    const data = exerciseResponses?.map((eachResponse) => {
      const targetRes = [
        eachResponse?._id,
        eachResponse?.exercise?.exerciseName,
        eachResponse?.submittedLink,
        eachResponse?.submissionDetails?.studentEmail,
        eachResponse?.mark ? eachResponse?.mark : "",
      ];
      return targetRes;
    });
    const tableData = {
      fields,
      data,
    };
    // console.log("table data", tableData);
    const tabledataString = JSON.stringify(tableData);
    console.log(tabledataString);
    const csv = Papa.unparse(tabledataString);
    // console.log("csv", csv);
    const element = document.createElement("a");
    element.setAttribute("href", `data:text/csv;charset=utf-8,${csv}`);
    element.setAttribute("download", "exercise-response.csv");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      {/* Search */}
      <div className="container mt-5 relative">
        <form onSubmit={handleSubmit(onSearch)}>
          <div className="font-poppins font-medium p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/*
              <div className={style?.exerciseResponse}>
                <p>Batch Name</p>
                 <input type="text" {...register("batchName")} /> 
              </div>
                */}
              <div className={style?.addLecture}>
                <label htmlFor="programName">Program Name</label>
                <select
                  name="programName"
                  {...register("programName")}
                  aria-invalid={errors.programName ? "true" : "false"}
                  className="w-full border-2 border-green-400 rounded-xl"
                >
                  <option disabled selected value="">
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
              <div className={style?.addLecture}>
                <label htmlFor="courseName">Course Name</label>
                <select
                  name="courseName"
                  {...register("courseName")}
                  aria-invalid={errors.courseName ? "true" : "false"}
                  className="w-full border-2 border-green-400 rounded-xl"
                >
                  <option disabled selected value="">
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

              <div className={style?.addLecture}>
                <label htmlFor="batchName">Batch Name</label>
                <select
                  name="batchName"
                  {...register("batchName")}
                  aria-invalid={errors.batchName ? "true" : "false"}
                  className="w-full border-2 border-green-400 rounded-xl"
                >
                  <option disabled selected value="">
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
              <div className={style?.addLecture}>
                <label htmlFor="moduleName">Module Name</label>
                <select
                  name="moduleName"
                  {...register("moduleName")}
                  aria-invalid={errors.moduleName ? "true" : "false"}
                  className="w-full border-2 border-green-400 rounded-xl"
                >
                  <option disabled selected value="">
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
              {/* lecture name */}
              <div className={style?.addLecture}>
                <label htmlFor="lectureName">Lecture Name</label>
                <select
                  name="lectureName"
                  {...register("lectureName")}
                  aria-invalid={errors?.lectureName ? "true" : "false"}
                  className="w-full border-2 border-green-400 rounded-xl"
                >
                  <option disabled selected value="">
                    Choose a Lecture
                  </option>
                  {lectures?.length > 0 &&
                    lectures?.map((each) => (
                      <option key={each?._id} value={each?._id}>
                        {each?.lectureName || each?.evaluationName}
                      </option>
                    ))}
                </select>
                {errors.lectureName && (
                  <p
                    className="text-red-500 font-poppins font-medium"
                    role="alert"
                  >
                    {errors.lectureName?.message}
                  </p>
                )}
              </div>
              {/* lecture name */}
              {/* assignment name */}
              <div className={style?.addLecture}>
                <label htmlFor="lectureName">Assignment Name</label>
                <select
                  name="assignmentName"
                  {...register("assignmentName")}
                  aria-invalid={errors?.assignmentName ? "true" : "false"}
                  className="w-full border-2 border-green-400 rounded-xl"
                >
                  <option disabled selected value="">
                    Choose a assignment
                  </option>
                  {assignments?.length > 0 &&
                    assignments?.map((each) => (
                      <option
                        key={each?.assignment_id}
                        value={each?.assignment_id}
                      >
                        {each?.assignmentName}
                      </option>
                    ))}
                </select>
                {errors.assignmentName && (
                  <p
                    className="text-red-500 font-poppins font-medium"
                    role="alert"
                  >
                    {errors?.assignmentName?.message}
                  </p>
                )}
              </div>
              {/* lecture name */}
              {/* exercises name */}
              <div className={style?.addLecture}>
                <label htmlFor="exerciseName">Exercise Name</label>
                <select
                  name="exerciseName"
                  {...register("exerciseName")}
                  aria-invalid={errors?.exerciseName ? "true" : "false"}
                  className="w-full border-2 border-green-400 rounded-xl"
                >
                  <option disabled selected value="">
                    Choose a exercise
                  </option>
                  {exercises?.length > 0 &&
                    exercises?.map((each) => (
                      <option key={each?.exercise_id} value={each?.exercise_id}>
                        {each?.exerciseName}
                      </option>
                    ))}
                </select>
                {errors.exerciseName && (
                  <p
                    className="text-red-500 font-poppins font-medium"
                    role="alert"
                  >
                    {errors.exerciseName?.message}
                  </p>
                )}
              </div>
              {/* exercises name */}
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-16 py-3 w-full mt-7 text-white rounded-lg bg-green-500"
                >
                  {loading ? "Searching" : "Search"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Search */}

      <ExerciseResponseTable
        setRefreshExcerciseResponse={setRefreshExcerciseResponse}
        dwonloadAsCsv={dwonloadAsCsv}
        exerciseResponses={exerciseResponses}
      />

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

export default ExerciseResponse;
