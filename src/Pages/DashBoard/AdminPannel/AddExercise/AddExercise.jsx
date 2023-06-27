import React, { useContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import moment from "moment";
import { uploadFile } from "react-s3";
import { toast } from "react-hot-toast";
import { BsXCircleFill } from "react-icons/bs";
window.Buffer = window.Buffer || require("buffer").Buffer;
const config = {
  bucketName: "all-files-for-gog",
  dirName: "assets/any-types",
  region: "ap-south-1",
  accessKeyId: process.env.REACT_APP_S3AccessKeyId,
  secretAccessKey: process.env.REACT_APP_S3SecretAccessKey,
};

const inputStyle =
  "border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg w-full";

const AddExercise = () => {
  const { user } = useContext(AuthContext);

  const [text, setText] = useState("");
  const [preview, setPreview] = useState(false);
  const [instructions, setInstructions] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    const justNow = moment().format();

    if (data?.file) {
      const file = data?.file[0];
      console.log(file);
      uploadFile(file, config)
        .then((fileData) => {
          // fileData.location
          if (fileData.location) {
            const outputData = {
              exerciseName: data.exerciseName,
              topic: data.topic,
              subTopic: data.subTopic,
              submissionType: data.submissionType,
              additionals: {
                instructions: data.notes,
                files: fileData.location,
              },
              type: data.type,
              actionsDetails: {
                isDeleted: false,
                creation: {
                  createdAt: justNow,
                  creatorEmail: user.email,
                },
                updation: {
                  updatedAt: justNow,
                  updaterEmail: user.email,
                },
              },
            };

            FetchData(outputData, reset, data);
          } else {
            toast.error("internal error");
            setLoading(false);
          }
        })
        .catch((err) => {
          toast.error(err.message);
          setLoading(false);
        });
    } else {
      const outputData = {
        exerciseName: data.exerciseName,
        topic: data.topic,
        subTopic: data.subTopic,
        submissionType: data.submissionType,
        additionals: {
          instructions: data.notes,
        },
        type: data.type,

        actionsDetails: {
          isDeleted: false,
          creation: {
            createdAt: justNow,
            creatorEmail: user.email,
          },
          updation: {
            updatedAt: justNow,
            updaterEmail: user.email,
          },
        },
      };
      FetchData(outputData, reset, data);
    }
  };

  // fetch function
  const FetchData = (outputData, reset, result) => {
    fetch(`https://api.geeksofgurukul.com/api/v1/exercises/exerciseDetails`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(outputData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          setLoading(false);
          // reset()
        } else {
          toast.error(result?.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
        setLoading(false);
      });
  };
  return (
    <div className="container p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="font-poppins">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* Exercise Name */}
            <div>
              <label>Exercise Name</label>
              <input
                type="text"
                name="exerciseName"
                {...register("exerciseName", {
                  required: "Exercise Name is required",
                })}
                aria-invalid={errors.exerciseName ? "true" : "false"}
                placeholder="Enter assignment name"
                className={inputStyle}
              />
              {errors.exerciseName && (
                <p
                      className="text-red-500 text-[14px] font-poppins font-normal"
                      role="alert"
                    >
                  {errors.exerciseName?.message}
                </p>
              )}
            </div>

            {/* Topic Name */}
            <div>
              <label>Topic</label>
              <input
                type="text"
                name="topic"
                {...register("topic", {
                  required: "Topic Name is required",
                })}
                aria-invalid={errors.exerciseName ? "true" : "false"}
                placeholder="Enter topic name"
                className={inputStyle}
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

            {/* Sub-topic Name */}
            <div>
              <label>Sub topic</label>
              <input
                type="text"
                name="subTopic"
                {...register("subTopic", {
                  required: "Sub topic Name is required",
                })}
                aria-invalid={errors.subTopic ? "true" : "false"}
                placeholder="Enter subtopic name"
                className={inputStyle}
              />
              {errors.subTopic && (
                <p
                      className="text-red-500 text-[14px] font-poppins font-normal"
                      role="alert"
                    >
                  {errors.subTopic?.message}
                </p>
              )}
            </div>

            {/* Exercise type */}
            <div>
              <label htmlFor="type">Exercise type</label>
              <select
                name="type"
                {...register("type", {
                  required: "Exercise type is required",
                })}
                aria-invalid={errors.type ? "true" : "false"}
                defaultValue=""
                className={inputStyle}
              >
                <option value="">Choose exercise type</option>
                <option value="project">Project</option>
                <option value="evaluation">Evaluation</option>
                <option value="general">General</option>
              </select>
              {errors.type && (
                <p
                      className="text-red-500 text-[14px] font-poppins font-normal"
                      role="alert"
                    >
                  {errors.type?.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {/* submission type */}
            <div>
              <label htmlFor="submissionType">Submission type</label>
              <select
                name="submissionType"
                {...register("submissionType")}
                className={inputStyle}
              >
                <option value="file">Upload File</option>
                <option value="link">Provide link</option>
              </select>
            </div>

            {/* fileupload */}

            <div className="w-full font-poppins">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                htmlFor="file_input"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file"
                name="file"
                type="file"
                {...register("file")}
                aria-invalid={errors.file ? "true" : "false"}
              />
              {/* {errors.file && (
                <p
                  role='alert'
                  className='text-red-500 font-poppins font-medium'>
                  {errors.file?.message}
                </p>
              )} */}
            </div>
          </div>
        </div>

        {/* notes and markdown preview */}
        {/* Text Area */}
        <div className="w-full mx-auto my-10 font-poppins">
          <label
            htmlFor="notes"
            className="block mb-2 text-md font-poppins font-medium text-gray-900 dark:text-gray-400"
          >
            <div className="flex items-center justify-between">
              <p>Notes:</p>
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
            className={inputStyle}
            placeholder="Your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setPreview(true)}
              className="my-4 px-8 py-2 hover:text-white border border-[#747880] hover:bg-[#8A8F98] rounded-lg duration-150"
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
                  ></iframe>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
            </>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
        <button
          type="submit"
          className="w-full md:w-28 bg-[#4BA25D] hover:bg-[#5fb370] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        >
          {loading ? "Submitting" : "Submit"}
        </button>
        </div>
      </form>
    </div>
  );
};

export default AddExercise;
