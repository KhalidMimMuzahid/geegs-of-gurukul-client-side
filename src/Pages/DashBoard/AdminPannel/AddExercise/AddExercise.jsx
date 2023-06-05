import React, { useContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useForm } from "react-hook-form";
import style from "./AddExercise.module.css";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import moment from "moment";
import { uploadFile } from "react-s3";
import { toast } from "react-hot-toast";
window.Buffer = window.Buffer || require("buffer").Buffer;
const config = {
  bucketName: "all-files-for-gog",
  dirName: "assets/any-types",
  region: "ap-south-1",
  accessKeyId: process.env.REACT_APP_S3AccessKeyId,
  secretAccessKey: process.env.REACT_APP_S3SecretAccessKey,
};
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
    fetch(`http://localhost:5000/api/v1/exercises/exerciseDetails`, {
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
        <div className=" font-poppins font-medium">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Exercise Name */}
            <div className={style?.addExercise}>
              <label>Exercise Name</label>
              <input
                type="text"
                name="exerciseName"
                {...register("exerciseName", {
                  required: "Exercise Name is required",
                })}
                aria-invalid={errors.exerciseName ? "true" : "false"}
              />
              {errors.exerciseName && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.exerciseName?.message}
                </p>
              )}
            </div>

            {/* Topic Name */}
            <div className={style?.addExercise}>
              <label>Topic</label>
              <input
                type="text"
                name="topic"
                {...register("topic", {
                  required: "Topic Name is required",
                })}
                aria-invalid={errors.exerciseName ? "true" : "false"}
              />
              {errors.topic && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.topic?.message}
                </p>
              )}
            </div>

            {/* Sub-topic Name */}
            <div className={style?.addExercise}>
              <label>Sub topic</label>
              <input
                type="text"
                name="subTopic"
                {...register("subTopic", {
                  required: "Sub topic Name is required",
                })}
                aria-invalid={errors.subTopic ? "true" : "false"}
              />
              {errors.subTopic && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.subTopic?.message}
                </p>
              )}
            </div>

            {/* Exercise type */}
            <div className={style?.addExercise}>
              <label htmlFor="type">Exercise type</label>
              <select
                name="type"
                {...register("type", {
                  required: "Exercise type is required",
                })}
                aria-invalid={errors.type ? "true" : "false"}
                className="w-full border-2 border-green-400 rounded-xl"
              >
                <option value="">Choose exercise type</option>
                <option value="project">Project</option>
                <option value="evaluation">Evaluation</option>
                <option value="general">General</option>
              </select>
              {errors.type && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.type?.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {/* submission type */}
            <div className={style?.addExercise}>
              <label htmlFor="submissionType">Submission type</label>
              <select
                name="submissionType"
                {...register("submissionType")}
                className="w-full border-2 border-green-400 rounded-xl"
              >
                <option value="file">Upload File</option>
                <option value="link">Provide link</option>
              </select>
            </div>

            {/* fileupload */}

            <div class="w-full font-poppins">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                for="file_input"
              >
                Upload file
              </label>
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
        <div class="w-full mx-auto my-10 font-poppins">
          <label
            for="notes"
            class="block mb-2 text-md font-poppins font-medium text-gray-900 dark:text-gray-400"
          >
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
            id="notes"
            name="notes"
            {...register("notes")}
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            type="button"
            onClick={() => setPreview(true)}
            className="my-2 font-poppins font-medium text-white px-2 py-2 bg-green-400 hover:bg-green-500 rounded-md"
          >
            Preview
          </button>
          {/* For Preview only */}
          {preview && (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none">
                <div className="relative w-[360px] h-[600px] sm:w-[400px] md:w-[600px] lg-[700px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-auto max-w-3xl  bg-white rounded-lg shadow-2xl">
                  <button
                    onClick={() => setPreview(false)}
                    className="absolute right-5 top-5 px-2 py-2 bg-red-400 rounded-full"
                  >
                    ❌
                  </button>
                  <h3 className="text-2xl font-poppins font-medium mt-1">
                    Preview:
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
                  <button
                    onClick={() => setInstructions(false)}
                    className="absolute right-5 top-5 px-2 py-2 bg-red-400 rounded-full"
                  >
                    ❌
                  </button>
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading ? true : false}
          class="group relative h-12 w-full overflow-hidden rounded-lg bg-white text-lg shadow mt-10 border-2 border-green-400 hover:cursor-pointer"
        >
          <div class="absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full "></div>
          <span class="relative text-black group-hover:text-white font-poppins font-medium">
            {loading ? "Submitting..." : "Submit"}
          </span>
        </button>
      </form>
    </div>
  );
};

export default AddExercise;
