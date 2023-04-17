import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./AddLecture.css";
const AddLectures = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  // function for dynamic file selection
  const [fileType, setFileType] = useState("");

  const handleFileTypeChange = (event) => {
    const selectedFileType = event.target.value;
    setFileType(selectedFileType);
  };
  // function for dynamic file selection
  return (
    <div className='container p-8'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=' font-poppins font-medium'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='addLecture'>
              <label>Lecture Name</label>
              <input
                type='text'
                // required
                name='lectureName'
                {...register("lectureName", {
                  required: "Lecture Name is required",
                })}
                aria-invalid={errors.lectureName ? "true" : "false"}
                // onChange={handleInputChange}
              />
              {errors.lectureName && (
                <p
                  className='text-red-500 font-poppins font-medium'
                  role='alert'
                >
                  {errors.lectureName?.message}
                </p>
              )}
            </div>
            <div className='addLecture'>
              <label>Instructor Name</label>
              <input
                // required
                type='text'
                name='instructorName'
                // onChange={handleInputChange}
                {...register("instructorName", {
                  required: "Provide Instructor Name",
                })}
                aria-invalid={errors.instructorName ? "true" : "false"}
              />
              {errors.instructorName && (
                <p
                  role='alert'
                  className='text-red-500 font-poppins font-medium'
                >
                  {errors.instructorName?.message}
                </p>
              )}
            </div>
          </div>

          <div className='col-span-12 md:col-span-6'>
            <div className='addLecture'>
              <label>Video Title</label>
              <input
                // required
                type='text'
                name='videoTitle'
                // onChange={handleInputChange}
                {...register("videoTitle", {
                  required: "Video Title is required",
                })}
                aria-invalid={errors.videoTitle ? "true" : "false"}
              />
              {errors.videoTitle && (
                <p
                  role='alert'
                  className='text-red-500 font-poppins font-medium'
                >
                  {errors.videoTitle?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Select File type */}
        <div className='addLecture'>
          <label htmlFor='file-input'>Select a file:</label>
          <select
            onChange={handleFileTypeChange}
            className='w-full border-2 border-green-400 rounded-xl'
          >
            <option value=''>Choose a file type</option>
            <option value='.pdf'>PDF</option>
            <option value='.pptx'>PowerPoint/PPTX</option>
            <option value='.mp4'>Video</option>
          </select>
          {fileType && (
            <div className='my-4'>
              <div class='flex w-64 items-center justify-center bg-grey-lighter'>
                <label class='w-64 flex flex-col items-center px-4 py-6 bg-green-400 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white'>
                  <svg
                    class='w-8 h-8'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                  >
                    <path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
                  </svg>
                  <span class='mt-2 text-base leading-normal'>
                    {`Select a ${fileType} file`}
                  </span>

                  <input
                    className='addLecture hidden'
                    id='file-input'
                    name='file-input'
                    type='file'
                    accept={fileType}
                  />
                </label>
              </div>
            </div>
          )}
        </div>
        {/* Select File type */}

        {/* Text Area */}
        <div class='w-full mx-auto my-10 font-poppins'>
          <label
            for='instructions'
            class='block mb-2 text-md font-poppins font-medium text-gray-900 dark:text-gray-400'
          >
            Instructions :
          </label>
          <textarea
            id='instructions'
            name='instructions'
            {...register("instructions")}
            rows='4'
            class='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Your message...'
            aria-invalid={errors.instructions ? "true" : "false"}
          ></textarea>
          {errors.instructions && (
            <p role='alert' className='text-red-500 font-poppins font-medium'>
              {errors.instructions?.message}
            </p>
          )}
        </div>
        {/* Submit Button */}
        <button
          type='submit'
          class='group relative h-12 w-full overflow-hidden rounded-lg bg-white text-lg shadow'
        >
          <div class='absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full'></div>
          <span class='relative text-black group-hover:text-white font-poppins font-medium'>
            Submit
          </span>
        </button>
      </form>
    </div>
  );
};

export default AddLectures;
