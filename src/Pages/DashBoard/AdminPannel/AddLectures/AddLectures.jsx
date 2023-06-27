import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AddAssignmentModal from "./Modal/AddAssignmentModal";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import moment from "moment";
import { uploadFile } from "react-s3";
import { toast } from "react-hot-toast";
import AddModuleModel from "./Modal/AddModuleModel";
import Loading from "../../../../Components/Loading/Loading";
import { BsXCircleFill } from "react-icons/bs";
import ExercisesModal from "../AddAssignment/ExercisesModal";

const inputStyle =
  "border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg w-full mt-1";

window.Buffer = window.Buffer || require("buffer").Buffer;
const config = {
  bucketName: "all-files-for-gog",
  dirName: "assets/any-types",
  region: "ap-south-1",
  accessKeyId: process.env.REACT_APP_S3AccessKeyId,
  secretAccessKey: process.env.REACT_APP_S3SecretAccessKey,
};
const configForVideo = {
  bucketName: "all-files-for-gog",
  dirName: "assets/videos",
  region: "ap-south-1",
  accessKeyId: process.env.REACT_APP_S3AccessKeyId,
  secretAccessKey: process.env.REACT_APP_S3SecretAccessKey,
};

const AddLectures = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState([]);
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(false);
  const [instructions, setInstructions] = useState(false);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const [fileUploadingStatus, setFileUploadingStatus] = useState({});

  const [exercisesModal, setExercisesModal] = useState(false);
  const [exercises, setExercises] = useState([]);
  // State for Add Evalueations
  const [type, setType] = useState("lecture");
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

      if (name === "moduleName" && value?.moduleName === "createNewModule") {
        setAddNewModule(true);
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

  // console.log("course", course);
  // console.log("program", program);
  const onSubmitForLecture = async (data) => {
    console.log("Data:", data);
    if (data?.moduleName === "createNewModule") {
      toast.error("please select a module.");
      return;
    }
    setLoading(true);
    if (selectedAssignment?.length === 0) {
      toast.error("Please select an assignment");
      setLoading(false);
      return;
    }
    const justNow = moment().format();
    let attachment = "";
    let videoUpload = "";
    if (data?.attachment[0]) {
      setFileUploadingStatus({ isLoading: true, fileType: "attachment" });
      const file = data?.attachment[0];
      const fileData = await uploadFile(file, config);
      if (fileData?.location) {
        attachment = fileData?.location;
        setFileUploadingStatus({ isLoading: false, fileType: "" });
      } else {
        setLoading(false);
        setFileUploadingStatus({ isLoading: false, fileType: "" });
        toast.error("attachment could not be uploaded");
        return;
      }
    }
    if (data?.videoInput[0]) {
      setFileUploadingStatus({ isLoading: true, fileType: "video" });
      const file = data?.videoInput[0];
      const fileData = await uploadFile(file, configForVideo);
      if (fileData?.location) {
        videoUpload = fileData?.location;
        setFileUploadingStatus({ isLoading: false, fileType: "" });
      } else {
        setLoading(false);
        setFileUploadingStatus({ isLoading: false, fileType: "" });
        toast.error("attachment could not be uploaded");
        return;
      }
    }

    const lectureData = {
      program,
      course,
      batch,
      module,
      type: "lecture",
      startAt: data?.scheduledAt,
      endSAt: data?.endsAt,
      isOptional: data?.optional,
      lectureName: data?.lectureName,
      topic: data?.topicName,
      assignment: {
        sheduledAt: data?.scheduledAt,
        deadLine: data?.endsAt,
        assignments: selectedAssignment,
      },
      lectureVideo: {
        liveLink: data?.zoomLink,
        videoLink: {
          s3Hoster: videoUpload,
          vimeoHoster: "",
        },
      },
      notes: data?.notes,
      additionalFiles: [
        {
          fileType: "",
          link: attachment,
        },
      ],

      actionsDetails: {
        isDeleted: false,
        creation: {
          createdAt: justNow,
          creatorEmail: user?.email,
        },
        updation: {
          updatedAt: justNow,
          updatorEmail: user?.email,
        },
      },
    };

    // console.log(lectureData);
    setLoading(false);
    fetch(`https://api.geeksofgurukul.com/api/v1/lectures/lectureDetails`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(lectureData),
    })
      .then((res) => res?.json())
      .then((result) => {
        if (result?.success) {
          toast?.success(result?.message);
          setLoading(false);
          // reset();
        } else {
          toast.error(result?.error);
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });

    setLoading(false);
  };

  const onSubmitForEvaluation = async (data) => {
    console.log("Data:", data);
    if (data?.moduleName === "createNewModule") {
      toast.error("please select a module.");
      return;
    }
    setLoading(true);

    if (exercises?.length === 0) {
      toast.error("Please Select Exercises");
      setLoading(false);
      return;
    }
    const justNow = moment().format();
    let attachment = "";
    if (data?.attachment[0]) {
      setFileUploadingStatus({ isLoading: true, fileType: "attachment" });
      const file = data?.attachment[0];
      const fileData = await uploadFile(file, config);
      if (fileData?.location) {
        attachment = fileData?.location;
        setFileUploadingStatus({ isLoading: false, fileType: "" });
      } else {
        setLoading(false);
        setFileUploadingStatus({ isLoading: false, fileType: "" });
        toast.error("attachment could not be uploaded");
        return;
      }
    }

    const evaluationData = {
      program,
      course,
      batch,
      module,
      type: "evaluation",
      startAt: data?.scheduledAt,
      endSAt: data?.endsAt,
      isOptional: data?.optional,
      evaluationName: data?.evaluationName,
      topic: data?.topicName,
      evaluation: {
        sheduledAt: data?.scheduledAt,
        deadLine: data?.endsAt,
        exercises: exercises,
      },
      notes: data?.notes,
      additionalFiles: [
        {
          fileType: "",
          link: attachment,
        },
      ],

      actionsDetails: {
        isDeleted: false,
        creation: {
          createdAt: justNow,
          creatorEmail: user?.email,
        },
        updation: {
          updatedAt: justNow,
          updatorEmail: user?.email,
        },
      },
    };

    // console.log("evaluationData: ", evaluationData);
    fetch(`https://api.geeksofgurukul.com/api/v1/lectures/lectureDetails`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(evaluationData),
    })
      .then((res) => res?.json())
      .then((result) => {
        if (result?.success) {
          toast?.success(result?.message);
          setLoading(false);
          // reset();
        } else {
          toast.error(result?.error);
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
    setLoading(false);
  };
  return (
    <div className="container p-8 font-poppins">
      <div className="flex justify-end">
        <div className=" w-[200px]">
          <label
            htmlFor="type"
            className="flex items-center cursor-pointer relative mb-4"
          >
            <input
              type="checkbox"
              id="type"
              name="type"
              className="toggle bg-[#5FB370]"
              onChange={() =>
                setType((prev) =>
                  prev === "lecture" ? "evaluation" : "lecture"
                )
              }
            />
            
            <span className="ml-3 text-gray-900">for {type}</span>
          </label>
        </div>
      </div>

      <div>
        {type === "lecture" ? (
          <form onSubmit={handleSubmit(onSubmitForLecture)}>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {/* Lecture Name */}
                <div>
                  <label>Lecture Name</label>
                  <input
                    type="text"
                    name="lectureName"
                    {...register("lectureName", {
                      required: "Lecture Name is required",
                    })}
                    aria-invalid={errors.lectureName ? "true" : "false"}
                    className={`${inputStyle} input`}
                    placeholder="Enter lecture name"
                  />
                  {errors.lectureName && (
                    <p
                      className="text-red-500 text-[14px] font-poppins font-normal"
                      role="alert"
                    >
                      {errors.lectureName?.message}
                    </p>
                  )}
                </div>
                {/* Lecture Name */}
                {/* Topic Name */}
                <div>
                  <label>Topic Name</label>
                  <input
                    type="text"
                    name="topicName"
                    {...register("topicName", {
                      required: "Topic Name is required",
                    })}
                    aria-invalid={errors.topicName ? "true" : "false"}
                    className={`${inputStyle} input`}
                    placeholder="Enter topic name"
                  />
                  {errors.topicName && (
                    <p
                      className="text-red-500 text-[14px] font-poppins font-normal"
                      role="alert"
                    >
                      {errors.topicName?.message}
                    </p>
                  )}
                </div>
                {/* Topic Name */}
                {/* Batch Name */}
                {/* Program Name */}
                <div>
                  <label htmlFor="programName">Program Name</label>
                  <select
                    name="programName"
                    {...register("programName", {
                      required: "Program Name is required",
                    })}
                    aria-invalid={errors.programName ? "true" : "false"}
                    className={`${inputStyle} input border-[#5FB370]`}
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
                      className="text-red-500 text-[14px] font-poppins font-normal"
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
                    {...register("courseName", {
                      required: "Course Name is required",
                    })}
                    aria-invalid={errors.courseName ? "true" : "false"}
                    className={`${inputStyle} input border-[#5FB370]`}
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
                      className="text-red-500 text-[14px] font-poppins font-normal"
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
                    {...register("batchName", {
                      required: "Batch Name is required",
                    })}
                    aria-invalid={errors.batchName ? "true" : "false"}
                    className={`${inputStyle} input border-[#5FB370]`}
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
                      className="text-red-500 text-[14px] font-poppins font-normal"
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
                    {...register("moduleName", {
                      required: "Module Name is required",
                    })}
                    aria-invalid={errors.moduleName ? "true" : "false"}
                    className={`${inputStyle} input border-[#5FB370]`}
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
                    <option
                      // onClick={() => console.log("xxxxxx")}
                      value="createNewModule"
                    >
                      Create New Module
                    </option>
                  </select>
                  {errors.moduleName && (
                    <p
                      className="text-red-500 text-[14px] font-poppins font-normal"
                      role="alert"
                    >
                      {errors.moduleName?.message}
                    </p>
                  )}
                </div>
                {/* module name */}
                {/* Sceduled At */}
                <div>
                  <label>Sceduled At</label>
                  <input
                    type="datetime-local"
                    name="scheduledAt"
                    {...register("scheduledAt", {
                      required: "Select A Date",
                    })}
                    aria-invalid={errors.scheduledAt ? "true" : "false"}
                    className={`${inputStyle} input border-[#5FB370]`}
                  />
                  {errors.scheduledAt && (
                    <p
                      role="alert"
                      className="text-red-500 font-poppins font-medium"
                    >
                      {errors.scheduledAt?.message}
                    </p>
                  )}
                </div>
                {/* Sceduled At */}
                {/* Ends At */}
                <div>
                  <label>Ends At</label>
                  <input
                    type="datetime-local"
                    name="endsAt"
                    {...register("endsAt", {
                      required: "Select A Date",
                    })}
                    aria-invalid={errors.endsAt ? "true" : "false"}
                    className={`${inputStyle} input border-[#5FB370]`}
                  />
                  {errors.endsAt && (
                    <p
                      role="alert"
                      className="text-red-500 font-poppins font-medium"
                    >
                      {errors.endsAt?.message}
                    </p>
                  )}
                </div>
                {/* Ends At */}
                {/* Zoom Link */}
                <div>
                  <label>Zoom Link</label>
                  <input
                    type="url"
                    name="zoomLink"
                    {...register("zoomLink", {
                      required: "Provide Zoom Link",
                    })}
                    aria-invalid={errors.zoomLink ? "true" : "false"}
                    className={`${inputStyle} input border-[#5FB370]`}
                    placeholder="Enter zoom link"
                  />
                  {errors.zoomLink && (
                    <p
                      role="alert"
                      className="text-red-500 font-poppins font-medium"
                    >
                      {errors.zoomLink?.message}
                    </p>
                  )}
                </div>
                {/* Zoom Link */}
                {/* Attachment File */}
                <div className="w-full font-poppins">
                  <label
                    className="text-sm text-gray-900 dark:text-gray-300"
                    htmlFor="Attachment"
                  >
                    Attachment
                  </label>
                  <input
                    className="mt-1 file-input block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="Attachment"
                    name="Attachment"
                    type="file"
                    {...register("attachment")}
                    aria-invalid={errors.attachment ? "true" : "false"}
                  />
                  {errors.attachment && (
                    <p
                      role="alert"
                      className="text-red-500 font-poppins font-medium"
                    >
                      {errors.attachment?.message}
                    </p>
                  )}
                </div>
                {/* Attachment File */}

                {/* Upload Video */}
                <div className="w-full font-poppins">
                  <label
                    className="text-sm text-gray-900 dark:text-gray-300"
                    htmlFor="file_input"
                  >
                    Upload Video
                  </label>
                  <input
                    className="mt-1 file-input block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="videoInput"
                    name="videoInput"
                    type="file"
                    accept=".mp4,mov,avi,mkv,wmv,webm,mpeg-4,.ts"
                    {...register("videoInput")}
                    aria-invalid={errors.videoInput ? "true" : "false"}
                  />
                  {errors.videoInput && (
                    <p
                      role="alert"
                      className="text-red-500 font-poppins font-medium"
                    >
                      {errors.videoInput?.message}
                    </p>
                  )}
                </div>
                {/* Upload Video */}
              </div>
            </div>

            {/* Text Area */}
            <div className="w-full mx-auto mt-10 mb-5 font-poppins">
              <label
                htmlFor="notes"
                className="text-sm font-poppins text-gray-900 dark:text-gray-400"
              >
                <div className="flex items-center justify-between">
                  <p>Notes:</p>

                  <label
                    htmlFor="optional"
                    className="flex items-center cursor-pointer relative mb-4"
                  >
                    <input
                      type="checkbox"
                      id="optional"
                      name="optional"
                      {...register("optional")}
                      className="toggle bg-[#5FB370]"
                    />
                    
                    <span className="ml-3 text-gray-900">Optional</span>
                  </label>

                  <p
                    onClick={() => setInstructions(true)}
                    className="font-semibold text-[#4BA25D] hover:cursor-pointer"
                  >
                    Instructions
                  </p>
                </div>
              </label>
              <textarea
                id="notes"
                name="notes"
                {...register("notes")}
                rows="4"
                className={`${inputStyle} textarea border-[#5FB370]`}
                placeholder="Your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                aria-invalid={errors.notes ? "true" : "false"}
              ></textarea>
              {errors.notes && (
                <p
                      className="text-red-500 text-[14px] font-poppins font-normal"
                      role="alert"
                    >
                  {errors.notes?.message}
                </p>
              )}
              <div className="w-full flex justify-center">
                <button
                  type="button"
                  onClick={() => setPreview(true)}
                  className="mt-4 mb-3 font-poppins font-medium px-10 py-2 hover:text-white border border-[#747880] hover:bg-[#8A8F98] rounded-lg duration-150"
                >
                  Preview
                </button>
              </div>
              {/* For Preview only */}
              {preview && (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none">
                    <div className="relative w-[360px] h-[600px] sm:w-[400px] md:w-[600px] lg-[700px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-auto max-w-3xl  bg-white rounded-lg shadow-2xl">
                      <button
                        onClick={() => setPreview(false)}
                        className="absolute right-5 top-5 mx-1 my-1"
                      >
                        <BsXCircleFill size={20} className="text-rose-500" />
                      </button>
                      <h3 className="text-lg font-medium mt-1">Preview</h3>
                      <div className=" mt-6 w-full h-4/5 p-4 mx-auto bg-white border border-green-400 rounded-md overflow-x-auto overflow-y-auto">
                        <ReactMarkdown
                          children={text}
                          remarkPlugins={[remarkGfm]}
                        ></ReactMarkdown>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
                </>
              )}
              {/* For Instructions to teachers to write markdown */}
              {instructions && (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none">
                    <div className="relative w-[360px] h-[600px] sm:w-[400px] md:w-[600px] lg-[700px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-auto max-w-3xl  bg-white rounded-lg shadow-2xl">
                      <button
                        onClick={() => setInstructions(false)}
                        className="absolute right-5 top-5 mx-1 my-1"
                      >
                        <BsXCircleFill size={20} className="text-rose-500" />
                      </button>
                      <h3 className="text-lg font-medium mt-1 mb-5">
                        Instructions
                      </h3>
                      <iframe
                        title="markdown instructions"
                        src="https://padomi.id.lv/PRG/par__/Markdown-Cheat-Sheet.pdf"
                        width="100%"
                        height="500px"
                        className="rounded-lg"
                      ></iframe>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
                </>
              )}
            </div>
            <hr />
            {/* add assignment button */}
            <div className="my-4 flex flex-wrap justify-center items-center gap-6">
              <button
                type="button"
                onClick={() => setSearch(true)}
                className="px-6 py-2 bg-[#4BA25D] hover:bg-[#5fb370] text-white rounded-lg"
              >
                + Add Assignments
              </button>
              <p className="text-[#4BA25D]">
                Assignments selected: {selectedAssignment?.length}
              </p>
            </div>
            {/* add assignment button */}

            {/* Submit Button */}
            <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={loading}
              className="text-white w-full md:w-28 rounded-lg bg-[#4BA25D] hover:bg-[#5fb370] px-10 py-2 mt-6"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            </div>

            {fileUploadingStatus?.isLoading && (
              <div>
                <h1>{fileUploadingStatus?.fileType} is uploading</h1>
                <Loading type={"progressor"} />
              </div>
            )}
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmitForEvaluation)}>
            {/* this form is for evaluation  */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {/* Evaluation Name  */}
                <div>
                  <label>Evaluation Name</label>
                  <input
                    type="text"
                    name="evaluationName"
                    {...register("evaluationName", {
                      required: "Evaluation Name is required",
                    })}
                    aria-invalid={errors.evaluationName ? "true" : "false"}
                    className={`${inputStyle} input border-[#5FB370]`}
                    placeholder="Enter evaluation name"
                  />
                  {errors.evaluationName && (
                    <p
                      className="text-red-500 text-[14px] font-poppins font-normal"
                      role="alert"
                    >
                      {errors.evaluationName?.message}
                    </p>
                  )}
                </div>
                {/*  Evaluation Name*/}
                {/* Topic Name */}
                <div>
                  <label>Topic Name</label>
                  <input
                    type="text"
                    name="topicName"
                    {...register("topicName", {
                      required: "Topic Name is required",
                    })}
                    aria-invalid={errors.topicName ? "true" : "false"}
                    className={`${inputStyle} input border-[#5FB370]`}
                    placeholder="Enter topic name"
                  />
                  {errors.topicName && (
                    <p
                      className="text-red-500 text-[14px] font-poppins font-normal"
                      role="alert"
                    >
                      {errors.topicName?.message}
                    </p>
                  )}
                </div>
                {/* Topic Name */}
                {/* Batch Name */}
                {/* Program Name */}
                <div>
                  <label htmlFor="programName">Program Name</label>
                  <select
                    name="programName"
                    {...register("programName", {
                      required: "Program Name is required",
                    })}
                    aria-invalid={errors.programName ? "true" : "false"}
                    className={`${inputStyle} input border-[#5FB370]`}
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
                      className="text-red-500 text-[14px] font-poppins font-normal"
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
                    {...register("courseName", {
                      required: "Course Name is required",
                    })}
                    aria-invalid={errors.courseName ? "true" : "false"}
                    className={`${inputStyle} input border-[#5FB370]`}
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
                      className="text-red-500 text-[14px] font-poppins font-normal"
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
                    {...register("batchName", {
                      required: "Batch Name is required",
                    })}
                    aria-invalid={errors.batchName ? "true" : "false"}
                    className={`${inputStyle} input border-[#5FB370]`}
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
                      className="text-red-500 text-[14px] font-poppins font-normal"
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
                    {...register("moduleName", {
                      required: "Module Name is required",
                    })}
                    aria-invalid={errors.moduleName ? "true" : "false"}
                    className={`${inputStyle} input border-[#5FB370]`}
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
                    <option
                      // onClick={() => console.log("xxxxxx")}
                      value="createNewModule"
                    >
                      Create New Module
                    </option>
                  </select>
                  {errors.moduleName && (
                    <p
                      className="text-red-500 text-[14px] font-poppins font-normal"
                      role="alert"
                    >
                      {errors.moduleName?.message}
                    </p>
                  )}
                </div>
                {/* module name */}
                {/* Sceduled At */}
                <div>
                  <label>Sceduled At</label>
                  <input
                    type="datetime-local"
                    name="scheduledAt"
                    {...register("scheduledAt", {
                      required: "Select A Date",
                    })}
                    aria-invalid={errors.scheduledAt ? "true" : "false"}
                    className={`${inputStyle} input border-[#5FB370]`}
                  />
                  {errors.scheduledAt && (
                    <p
                      role="alert"
                      className="text-red-500 font-poppins font-medium"
                    >
                      {errors.scheduledAt?.message}
                    </p>
                  )}
                </div>
                {/* Sceduled At */}
                {/* Ends At */}
                <div>
                  <label>Ends At</label>
                  <input
                    type="datetime-local"
                    name="endsAt"
                    {...register("endsAt", {
                      required: "Select A Date",
                    })}
                    aria-invalid={errors.endsAt ? "true" : "false"}
                    className={`${inputStyle} input border-[#5FB370]`}
                  />
                  {errors.endsAt && (
                    <p
                      role="alert"
                      className="text-red-500 font-poppins font-medium"
                    >
                      {errors.endsAt?.message}
                    </p>
                  )}
                </div>
                {/* Ends At */}
                {/* Attachment File */}
                <div className="w-full font-poppins">
                  <label
                    className="text-sm text-gray-900 dark:text-gray-300"
                    htmlFor="Attachment"
                  >
                    Attachment
                  </label>
                  <input
                    className="mt-1 file-input border-[#5FB370] block w-full text-sm text-gray-900 border  rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="Attachment"
                    name="Attachment"
                    type="file"
                    {...register("attachment")}
                    aria-invalid={errors.attachment ? "true" : "false"}
                  />
                  {errors.attachment && (
                    <p
                      role="alert"
                      className="text-red-500 font-poppins font-medium"
                    >
                      {errors.attachment?.message}
                    </p>
                  )}
                </div>
                {/* Attachment File */}
              </div>
            </div>

            {/* Text Area */}
            <div className="w-full mx-auto mt-10 mb-5 font-poppins">
              <label
                htmlFor="notes"
                className="text-sm font-poppins text-gray-900 dark:text-gray-400"
              >
                <div className="flex items-center justify-between">
                  <p>Notes:</p>

                  <label
                    htmlFor="optional"
                    className="flex items-center cursor-pointer relative mb-4"
                  >
                    <input
                      type="checkbox"
                      id="optional"
                      name="optional"
                      {...register("optional")}
                      className="toggle bg-[#5FB370]"
                    />
                    
                    <span className="ml-3 text-gray-900">Optional</span>
                  </label>

                  <p
                    onClick={() => setInstructions(true)}
                    className="font-semibold text-[#4BA25D] hover:cursor-pointer"
                  >
                    Instructions
                  </p>
                </div>
              </label>
              <textarea
                id="notes"
                name="notes"
                {...register("notes")}
                rows="4"
                className={`${inputStyle} textarea border-[#5FB370]`}
                placeholder="Your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                aria-invalid={errors.notes ? "true" : "false"}
              ></textarea>
              {errors.notes && (
                <p
                      className="text-red-500 text-[14px] font-poppins font-normal"
                      role="alert"
                    >
                  {errors.notes?.message}
                </p>
              )}
              <div className="w-full flex justify-center">
                <button
                  type="button"
                  onClick={() => setPreview(true)}
                  className="mt-4 mb-3 font-poppins font-medium px-10 py-2 hover:text-white border border-[#747880] hover:bg-[#8A8F98] rounded-lg duration-150"
                >
                  Preview
                </button>
              </div>
              {/* For Preview only */}
              {preview && (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none">
                    <div className="relative w-[360px] h-[600px] sm:w-[400px] md:w-[600px] lg-[700px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-auto max-w-3xl  bg-white rounded-lg shadow-2xl">
                      <button
                        onClick={() => setPreview(false)}
                        className="absolute right-5 top-5 mx-1 my-1"
                      >
                        <BsXCircleFill size={20} className="text-rose-500" />
                      </button>
                      <h3 className="text-lg font-medium mt-1">Preview</h3>
                      <div className=" mt-6 w-full h-4/5 p-4 mx-auto bg-white border border-green-400 rounded-md overflow-x-auto overflow-y-auto">
                        <ReactMarkdown
                          children={text}
                          remarkPlugins={[remarkGfm]}
                        ></ReactMarkdown>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
                </>
              )}
              {/* For Instructions to teachers to write markdown */}
              {instructions && (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none">
                    <div className="relative w-[360px] h-[600px] sm:w-[400px] md:w-[600px] lg-[700px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-auto max-w-3xl  bg-white rounded-lg shadow-2xl">
                      <button
                        onClick={() => setInstructions(false)}
                        className="absolute right-5 top-5 mx-1 my-1"
                      >
                        <BsXCircleFill size={20} className="text-rose-500" />
                      </button>
                      <h3 className="text-lg font-medium mt-1 mb-5">
                        Instructions
                      </h3>
                      <iframe
                        title="markdown instructions"
                        src="https://padomi.id.lv/PRG/par__/Markdown-Cheat-Sheet.pdf"
                        width="100%"
                        height="500px"
                        className="rounded-lg"
                      ></iframe>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
                </>
              )}
            </div>
            <hr />
            {/* add exercise button */}

            <div className="my-4 flex flex-wrap justify-center items-center gap-6">
              <button
                type="button"
                onClick={() => setExercisesModal(true)}
                className="px-6 py-2 bg-[#4BA25D] hover:bg-[#5fb370] text-white rounded-lg"
              >
                + Add Exercises
              </button>
              <p className="text-[#4BA25D]">
                Exercises selected: {exercises?.length}
              </p>
            </div>
            {/* add assignment button */}

            {/* Submit Button */}
              <div className="w-full flex items-center justify-center">
              <button
              type="submit"
              disabled={loading}
              className="text-white text-center w-full md:w-28 px-10 py-2 rounded-lg bg-[#4BA25D] hover:bg-[#5fb370] mt-6"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            </div>

            {fileUploadingStatus?.isLoading && (
              <div>
                <h1>{fileUploadingStatus?.fileType} is uploading</h1>
                <Loading type={"progressor"} />
              </div>
            )}
          </form>
        )}

        {/* Add assignment modal */}
        {search && (
          <AddAssignmentModal
            setSearch={setSearch}
            assignments={assignments}
            setAssignments={setAssignments}
            selectedAssignment={selectedAssignment}
            setSelectedAssignment={setSelectedAssignment}
          />
        )}
        {exercisesModal && (
          <ExercisesModal
            setExercisesModal={setExercisesModal}
            exercises={exercises}
            setExercises={setExercises}
          />
        )}
        {/* Add assignment modal */}
        {/* Add module modal */}
        {addNewModule && (
          <AddModuleModel
            setAddNewModule={setAddNewModule}
            program={program}
            course={course}
            batch={batch}
            setRefreshModules={setRefreshModules}
          />
        )}
        {/* Add module modal */}
      </div>
    </div>
  );
};

export default AddLectures;
