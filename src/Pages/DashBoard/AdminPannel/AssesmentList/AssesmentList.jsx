import React, { useEffect, useState } from "react";
import "./AssesmentList.css";
import deleteIcon from "../../../../assets/icons/delete.svg";
import editIcon from "../../../../assets/icons/edit.svg";
import copyIcon from "../../../../assets/icons/copy.svg";
import { Modal } from "flowbite";

const AssesmentList = () => {
  const $targetEl = document.getElementById("staticModal");
  // const [windowSize, setWindowSize] = useState();
  const options = {
    placement: "bottom-right",
    backdrop: "dynamic",
    backdropClasses:
      "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-5 z-[4000000]",
    closable: true,
    onHide: () => {
      console.log("modal is hidden");
    },
    onShow: () => {
      console.log("modal is shown");
    },
    onToggle: () => {
      console.log("modal has been toggled");
    },
  };
  const modal = new Modal($targetEl, options);
  const courses = [
    {
      CourseName: "Introduction to JavaScript",
      Topic: "Variables and Data Types",
      BatchNo: 1234,
    },
    {
      CourseName: "Advanced JavaScript",
      Topic: "Functions and Scope",
      BatchNo: 5678,
    },
    {
      CourseName: "Web Development with React",
      Topic: "React Components",
      BatchNo: 9012,
    },
    {
      CourseName: "Python Fundamentals",
      Topic: "Data Structures",
      BatchNo: 3456,
    },
    {
      CourseName: "Machine Learning with Python",
      Topic: "Regression Analysis",
      BatchNo: 7890,
    },
    { CourseName: "iOS App Development", Topic: "UI Design", BatchNo: 1235 },
    {
      CourseName: "Android App Development",
      Topic: "Intents and Activities",
      BatchNo: 6789,
    },
  ];
  // useEffect(() => {
  //   const width = window.screen.width;
  //   setWindowSize(width);
  // });
  // useEffect(() => {
  //   const handleWindowResize = () => {
  //     setWindowSize(window.innerWidth);
  //   };
  //   console.log("windowSize: ", windowSize);
  //   window.addEventListener("resize", handleWindowResize);

  //   return () => {
  //     window.removeEventListener("resize", handleWindowResize);
  //   };
  // });
  return (
    <div className='mt-5'>
      {/* filtering form */}
      <div className='container mt-5'>
        <form>
          <div className='font-poppins font-medium p-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='assesmentList'>
                <p>Assessment Name</p>
                <input type='text' />
              </div>

              <div className='assesmentList'>
                <p>Topic</p>
                <input type='text' />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='assesmentList'>
                <p>Batch ID</p>
                <input type='text' />
              </div>

              <div className=''>
                <button
                  type='submit'
                  className='px-16 py-3 mt-7 text-white rounded-lg bg-green-500'
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Table */}
      {/* <div
        style={{
          maxWidth: `${windowSize - 200}px`,
          width: `${windowSize - 200}px`,
          overflowX: "scroll",
        }}
        class={`w-[400px] md:w-[750px] `}
      >
        <table
          style={{ minWidth: `800px` }}
          class=' border-r-slate-950 table-auto'
        >
          <thead>
            <tr>
              <th class='px-4 py-2'>Field 1</th>
              <th class='px-4 py-2'>Field 2</th>
              <th class='px-4 py-2'>Field 3</th>
              <th class='px-4 py-2'>Field 4</th>
              <th class='px-4 py-2'>Field 5</th>
            </tr>
          </thead>
          <tbody>
            <tr class='bg-gray-100'>
              <td class='border px-4 py-2'>Data 1</td>
              <td class='border px-4 py-2'>Data 2</td>
              <td class='border px-4 py-2'>Data 3</td>
              <td class='border px-4 py-2'>Data 4</td>
              <td class='border px-4 py-2'>Data 5</td>
            </tr>
            <tr>
              <td class='border px-4 py-2'>Data 1</td>
              <td class='border px-4 py-2'>Data 2</td>
              <td class='border px-4 py-2'>Data 3</td>
              <td class='border px-4 py-2'>Data 4</td>
              <td class='border px-4 py-2'>Data 5</td>
            </tr>
            <tr class='bg-gray-100'>
              <td class='border px-4 py-2'>Data 1</td>
              <td class='border px-4 py-2'>Data 2</td>
              <td class='border px-4 py-2'>Data 3</td>
              <td class='border px-4 py-2'>Data 4</td>
              <td class='border px-4 py-2'>Data 5</td>
            </tr>
            <!-- Add more rows here -->
          </tbody>
        </table>
      </div> */}
      <div className="">
      <div class='grid grid-cols-5 gap-0 overflow-x-auto w-full font-poppins p-5'>
        <div class='bg-gray-100 px-4 py-2 w-full font-semibold'>SL No.</div>
        <div class='bg-gray-100 px-4 py-2 w-full font-semibold'>
          Assesment Name
        </div>
        <div class='bg-gray-100 px-4 py-2 w-full font-semibold'>Topic</div>
        <div class='bg-gray-100 px-4 py-2 w-full font-semibold'>Batch No</div>
        <div class='bg-gray-100 px-4 py-2 w-full font-semibold'>Action</div>

        {courses.map((c, i) => (
          <>
            <div class='bg-white px-4 py-2 '>{i + 1}</div>
            <div class='bg-white px-4 py-2 '>{c?.CourseName}</div>
            <div class='bg-white px-4 py-2 '>{c?.Topic}</div>
            <div class='bg-white px-4 py-2 '>{c?.BatchNo}</div>
            <div class='bg-white px-4 py-2 '>
              <button
                type='button'
                className='px-1 py-1 rounded-full bg-red-200'
              >
                {/* svg */}
                <img height='15px' width='15px' src={deleteIcon} alt='' />
              </button>
              <button
                type='button'
                className='px-1 py-1 rounded-full bg-sky-100'
              >
                {/* svg */}
                <img height='15px' width='15px' src={editIcon} alt='' />
              </button>

              <button
                data-modal-target='staticModal'
                data-modal-toggle='staticModal'
                class='px-1 py-1 rounded-full bg-green-100'
                type='button'
              >
                {/* svg */}
                <img height='15px' width='15px' src={copyIcon} alt='' />
              </button>
            </div>
          </>
        ))}

        {/* <!-- Add more rows as needed --> */}
      </div>
      </div>
      {/* Table */}

      {/* <!-- Main modal --> */}
      <div
        id='staticModal'
        data-modal-backdrop='static'
        tabindex='-1'
        aria-hidden='true'
        class='fixed top-0 left-0 right-0 z-[4000000] hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'
      >
        <div class='relative w-full max-w-2xl max-h-full'>
          {/* <!-- Modal content --> */}
          <div class='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            {/* <!-- Modal header --> */}
            <div class='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
              <h3 class='text-xl font-semibold text-gray-900 dark:text-white'>
                Assesment Info
              </h3>
              <button
                type='button'
                class='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-hide='staticModal'
              >
                <svg
                  class='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form class='p-6 space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className=''>
                  <input
                    type='text'
                    className='form-control w-full rounded-lg'
                    placeholder='Assesment name'
                    aria-label='Assesment name'
                  />
                </div>
                <div className=''>
                  <input
                    type='text'
                    className='form-control w-full rounded-lg'
                    placeholder='Assesment Topic'
                    aria-label='Assesment Topic'
                  />
                </div>
                <div className=''>
                  <input
                    type='text'
                    className='form-control w-full rounded-lg'
                    placeholder='Batch ID'
                    aria-label='Batch ID'
                  />
                </div>
                <div className=''>
                  <input
                    type='text'
                    className='form-control w-full rounded-lg'
                    placeholder='Schedule at'
                    aria-label='Schedule at'
                  />
                </div>
                <div className=''>
                  <input
                    type='text'
                    className='form-control w-full rounded-lg'
                    placeholder='Duration'
                    aria-label='Duration'
                  />
                </div>
              </div>
            </form>
            {/* <!-- Modal footer --> */}
            <div class='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
              <button
                data-modal-hide='staticModal'
                type='button'
                class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                I accept
              </button>
              <button
                data-modal-hide='staticModal'
                type='button'
                class='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssesmentList;
