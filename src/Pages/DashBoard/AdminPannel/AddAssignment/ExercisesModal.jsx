import React, { useState } from "react";

const ExercisesModal = ({ setExercisesModal, items, handelAddExerciseId }) => {
  const [search, setSearch] = useState("");
  //   console.log(search);

  return (
    <>
      <div className='p-5 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none'>
        <div className='relative w-[360px] h-[600px] sm:w-[400px] md:w-[600px] lg-[700px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-auto max-w-3xl  bg-white rounded-lg shadow-2xl'>
          <button
            onClick={() => setExercisesModal(false)}
            className='absolute right-5 top-5 px-2 py-2 bg-red-400 rounded-full'>
            ❌
          </button>
          <div className='p-10 pb-5'>
            <h3 className='text-2xl font-poppins font-medium mt-1 text-center'>
              exercisesModal:
            </h3>

            <div className='my-5'>
              <label
                htmlFor='search'
                className='block text-gray-700 font-bold mb-2'>
                Assignment Name
              </label>
              <input
                type='search'
                onChange={(e) => setSearch(e.target.value)}
                id='search'
                placeholder='search exercises...'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>

            <ul className='h-[300px] overflow-hidden overflow-y-scroll'>
              {items
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item?.exerciseName?.toLowerCase()?.includes(search);
                })
                .map((item) => (
                  <li
                    onClick={() => handelAddExerciseId(item?._id)}
                    className='w-11/12 mx-auto text-xl text-center font-medium px-2 py-3 mb-2 border-2  border-green-400 hover:text-green-400 cursor-pointer'
                    key={item?._id}>
                    {item.exerciseName}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0  z-[20000] bg-black'></div>
    </>
  );
};

export default ExercisesModal;
