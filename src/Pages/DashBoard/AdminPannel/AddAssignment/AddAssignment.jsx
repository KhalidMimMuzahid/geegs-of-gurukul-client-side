import { useForm } from "react-hook-form";

function AddAssignment() {
  const { register, handleSubmit } = useForm();

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
            Text Area
          </label>
          <textarea
            id='textArea'
            {...register("textArea")}
            className='shadow appearance-none border rounded w-full py-1 px-2 h-28 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          ></textarea>
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
