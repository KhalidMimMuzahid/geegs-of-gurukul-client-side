import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "react-hot-toast";
import { AuthContext } from "./../../../../contexts/UserProvider/UserProvider";
import moment from "moment/moment";
import { uploadFile } from "react-s3";
import ExercisesModal from "./ExercisesModal";
import { BsXCircleFill } from "react-icons/bs";

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
function AddAssignment() {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(false);
  const [instructions, setInstructions] = useState(false);
  const [exercisesModal, setExercisesModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState("");
  const [exercises, setExercises] = useState([]);
  const onSubmit = (data) => {
    setLoading(true);
    if (exercises?.length === 0) {
      toast.error("Please Select Exercises");
      setLoading(false);
      return;
    }
    const justNow = moment().format();
    if (data?.fileInput[0]) {
      const file = data?.fileInput[0];
      //console.log(file);
      uploadFile(file, config)
        .then((fileData) => {
          setUploadedFile(fileData?.location);
          //console.log("fileData", fileData);
        })
        .catch((err) => {
          toast.error(err?.message);
          setLoading(false);
        });
    }
    const assignmentDetails = {
      assignmentName: data?.assignmentName,
      topic: data?.topic,
      score: 100,
      additions: {
        instructions: data?.textArea,
        files: uploadedFile,
      },
      // type: data?.type,
      exercises: exercises,
      actionsDetails: {
        isDeleted: false,
        creation: {
          createdAt: justNow,
          creatorEmail: user?.email,
        },
        updation: {
          updateAt: justNow,
          updatorEmail: user?.email,
        },
      },
    };
    //console.log(assignmentDetails);
    fetch(
      `https://api.geeksofgurukul.com/api/v1/assignments/assignmentDetails`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(assignmentDetails),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          setLoading(false);
          // reset();
          setExercises([]);
        } else {
          toast.error(result.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="px-8 py-8 font-poppins">
      <form onSubmit={handleSubmit(onSubmit)} className=" ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="mb-4">
            <label
              htmlFor="assignmentName"
              className="block text-gray-700 mb-1"
            >
              Assignment Name
            </label>
            <input
              type="text"
              id="assignmentName"
              {...register("assignmentName", {
                required: "Assignment name is required",
              })}
              className={inputStyle}
              placeholder="Enter assignment name"
            />
            {errors.assignmentName && (
              <p
                      className="text-red-500 text-[14px] font-poppins font-normal"
                      role="alert"
                    >
                {errors.assignmentName?.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="topic" className="block text-gray-700 mb-1">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              {...register("topic", {
                required: "Topic is required",
              })}
              className={inputStyle}
              placeholder="Enter topic name"
            />
            {errors.topic && (
              <p
                      className="text-red-500 text-[14px] font-poppins font-normal"
                      role="alert"
                    >
                {errors.topic?.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="textArea" className="block text-gray-700 mb-1">
            <div className="flex items-center justify-between">
              <p>Notes:</p>
              <p
                onClick={() => setInstructions(true)}
                className="hover:text-sky-500 hover:cursor-pointer"
              >
                Instructions
              </p>
            </div>
          </label>
          <textarea
            id="textArea"
            {...register("textArea")}
            className={`${inputStyle} h-32 mb-4`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your notes...."
          ></textarea>
          <div className="flex justify-center">
            <button
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
                  <h3 className="text-lg font-poppins font-medium mt-1">
                    Preview
                  </h3>
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
                  <label
                    onClick={() => setInstructions(false)}
                    className="absolute right-5 top-5 px-2 py-2 bg-red-400 rounded-full"
                  >
                    :x:
                  </label>
                  <h3 className="text-2xl font-poppins font-medium mt-1">
                    Instructions:
                  </h3>
                  <iframe
                    title="markdown instructions"
                    src="https://padomi.id.lv/PRG/par__/Markdown-Cheat-Sheet.pdf"
                    width="100%"
                    height="500px"
                  ></iframe>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
            </>
          )}
        </div>
        <div className="mb-6">
          <div className=" w-full">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-green-50 focus:outline-none"
              id="file_input"
              {...register("fileInput")}
              type="file"
            />
          </div>
        </div>
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
        <div className="flex items-center justify-center">
        <button
          type="submit"
          className="w-full md:w-28 bg-[#4BA25D] hover:bg-[#5fb370] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        >
          {loading ? "Submitting" : "Submit"}
        </button>
        </div>
      </form>
      {exercisesModal && (
        <ExercisesModal
          setExercisesModal={setExercisesModal}
          exercises={exercises}
          setExercises={setExercises}
        />
      )}
    </div>
  );
}
export default AddAssignment;
