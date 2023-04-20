import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function AddAssignment() {
  const { register, handleSubmit } = useForm();
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(false);
  const [instructions, setInstructions] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className='py-20 px-10 bg-green-300 w-2/3 mx-auto my-16 rounded-xl font-poppins'>
      <form onSubmit={handleSubmit(onSubmit)} className='max-w-lg mx-auto'>
        <div className='mb-4'>
          <label
            htmlFor='assignmentName'
            className='block text-gray-700 font-bold mb-2'
          >
            Assignment Name
          </label>
          <input
            type='text'
            id='assignmentName'
            {...register("assignmentName")}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='textArea'
            className='block text-gray-700 font-bold mb-2'
          >
            <div className="flex items-center justify-between">
            <p>Notes:</p>
            <p onClick={()=>setInstructions(true)} className="hover:text-sky-500 hover:cursor-pointer">Instructions</p>
            </div>
          </label>
          <textarea
            id='textArea'
            {...register("textArea")}
            className='shadow appearance-none border rounded w-full py-1 px-2 h-28 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            onClick={() => setPreview(true)}
            className='font-poppins font-medium text-white px-4 py-2 bg-green-400 hover:bg-green-500 rounded-md'
          >
            Preview
          </button>
          {/* For Preview only */}
          {preview && (
            <>
              <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none'>
                <div className='relative w-[360px] h-[600px] sm:w-[400px] md:w-[600px] lg-[700px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-auto max-w-3xl  bg-white rounded-lg shadow-2xl'>
                  <button
                    onClick={() => setPreview(false)}
                    className='absolute right-5 top-5 px-2 py-2 bg-red-400 rounded-full'
                  >
                    ❌
                  </button>
                  <h3 className='text-2xl font-poppins font-medium mt-1'>
                    Preview:
                  </h3>
                  <div className=' mt-6 w-full h-4/5 p-4 mx-auto bg-white border border-green-400 rounded-md overflow-x-auto overflow-y-auto'>
                    <ReactMarkdown
                      children={text}
                      remarkPlugins={[remarkGfm]}
                    ></ReactMarkdown>
                  </div>
                </div>
              </div>
              <div className='opacity-25 fixed inset-0  z-[20000] bg-black'></div>
            </>
          )}
          {/* For Instructions to teachers to write markdown */}
          {instructions && (
            <>
              <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none'>
                <div className='relative w-[360px] h-[600px] sm:w-[400px] md:w-[600px] lg-[700px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-auto max-w-3xl  bg-white rounded-lg shadow-2xl'>
                  <button
                    onClick={() => setInstructions(false)}
                    className='absolute right-5 top-5 px-2 py-2 bg-red-400 rounded-full'
                  >
                    ❌
                  </button>
                  <h3 className='text-2xl font-poppins font-medium mt-1'>
                    Instructions:
                  </h3>
                  <iframe title="markdown instructions" src="https://padomi.id.lv/PRG/par__/Markdown-Cheat-Sheet.pdf" width="100%" height="500px"></iframe>
                </div>
              </div>
              <div className='opacity-25 fixed inset-0  z-[20000] bg-black'></div>
            </>
          )}
        </div>

        <div className='mb-6'>
          <div class='max-w-2xl mx-auto'>
            <label
              class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              for='file_input'
            >
              Upload file
            </label>
            <input
              class='block w-full text-sm text-green-400 border border-gray-300 rounded-lg cursor-pointer bg-green-50 focus:outline-none'
              id='file_input'
              {...register("fileInput")}
              type='file'
            />
          </div>
        </div>
        <button
          type='submit'
          className='w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddAssignment;
