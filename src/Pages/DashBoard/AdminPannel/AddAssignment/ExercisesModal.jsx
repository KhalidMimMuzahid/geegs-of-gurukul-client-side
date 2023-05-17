import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { BiMinus } from "react-icons/bi";

const ExercisesModal = ({ setExercisesModal, setExercisesId, exercisesId }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  // console.log(items);

  const onSubmit = (data) => {
    // console.log(data);
    setLoading(true);
    fetch(`http://localhost:5000/exerciseSearch`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        data: JSON.stringify(data),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.success) {
          const data = result?.data;
          console.log("first", data);
          setItems(data);
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

  // add exercise
  const handelToAddItem = (id) => {
    setExercisesId([...exercisesId, id]);
    setItems(items);
    // console.log(id);
  };

  // remove exercise
  const handelToRemoveItem = (id) => {
    const frr = exercisesId?.filter((arr) => arr !== id);
    setExercisesId(frr);
    setItems(items);
  };
  console.log(exercisesId);
  return (
    <>
      <div
        className='p-5 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none 
      focus:outline-none'>
        <div className='relative bg-white h-3/4 w-screen md:w-3/4 mx-auto rounded-md flex justify-center'>
          <button
            onClick={() => setExercisesModal(false)}
            // relative w-screen h-[600px] sm:w-[400px] md:w-screen   py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-auto max-w-3xl
            //        bg-white rounded-lg shadow-2xl
            className='absolute right-5 top-5 px-2 py-2  rounded-full hover:rotate-90 transition-all duration-500 bg-red-400'>
            <AiOutlineClose className='text-white text-2xl font-extrabold' />
          </button>
          <div className='p-10 pb-5'>
            <h3 className='text-2xl  font-poppins font-medium mt-1 text-center'>
              exercisesModal:
            </h3>
            <h3 className='text-2xl  font-poppins font-medium mt-1 text-center'>
              Selected Exercises : {exercisesId?.length}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='md:flex items-center gap-3'>
                <div className='flex gap-3 my-5'>
                  <div className=''>
                    <label
                      htmlFor='search'
                      className='block text-gray-700 font-bold mb-2 sm:text-sm'>
                      Exercise Name
                    </label>
                    <input
                      type='search'
                      {...register("exerciseName")}
                      id='search'
                      placeholder='search exercises...'
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                  </div>
                  <div className=''>
                    <label
                      htmlFor='topic'
                      className='block text-gray-700 font-bold mb-2'>
                      Topic
                    </label>
                    <input
                      type='search'
                      id='topic'
                      {...register("topic")}
                      placeholder='Topic '
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                  </div>
                </div>
                <div className='flex gap-3 my-4'>
                  <div className=''>
                    <label
                      htmlFor='subTopic'
                      className='block text-gray-700 font-bold mb-2'>
                      Sub Topic
                    </label>
                    <input
                      type='search'
                      id='subTopic'
                      {...register("subTopic")}
                      placeholder='Sub Topic '
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                  </div>

                  <div className=''>
                    <label
                      htmlFor='type'
                      className='block text-gray-700 font-bold mb-2'>
                      Type
                    </label>
                    <select
                      id='type'
                      {...register("type")}
                      className=' w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                      <option value='project'>project</option>
                      <option value='evaluation'>evaluation</option>
                      <option value='assignments'>Assignments</option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                type='submit'
                className='w-ful items-end bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                {loading ? "Loading" : "Search"}
              </button>
            </form>
            <div className=' h-screen'>
              <div className='relative overflow-y-scroll h-72 mt-4 shadow-md sm:rounded-lg'>
                <table className='text-sm text-left mx-auto'>
                  <thead className='text-xs text-gray-700 uppercase bg-gray-200'>
                    <tr>
                      <th scope='col' className='px-6 py-3'>
                        Exercise Name
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Topic
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Sub Topic
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Type
                      </th>
                      <th scope='col' className='px-6 py-3'></th>
                    </tr>
                  </thead>
                  <tbody className=''>
                    {loading ? (
                      <div className='text-center'>
                        <div role='status'>
                          <svg
                            ariaHidden='true'
                            className='inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                            viewBox='0 0 100 101'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                              fill='currentColor'
                            />
                            <path
                              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                              fill='currentFill'
                            />
                          </svg>
                          <span className='sr-only'>Loading...</span>
                        </div>
                      </div>
                    ) : (
                      items.map((item) => (
                        <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                          <th
                            scope='row'
                            className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                            {item?.exerciseName}
                          </th>
                          <td className='px-6 py-4'>{item?.topic}</td>
                          <td className='px-6 py-4'>{item?.subTopic}</td>
                          <td className='px-6 py-4'>{item?.type}</td>
                          <td className='px-6 py-4'>
                            {exercisesId?.includes(item?._id) ? (
                              <button
                                onClick={() => {
                                  handelToRemoveItem(item?._id);
                                }}
                                className='px-3 rounded-lg py-2'>
                                <BiMinus className='text-4xl hover:text-green-400' />
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  handelToAddItem(item?._id);
                                }}
                                className='px-3 rounded-lg py-2'>
                                <MdAdd className='text-4xl hover:text-green-400' />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                    {}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0  z-[20000] bg-black'></div>
    </>
  );
};

export default ExercisesModal;
