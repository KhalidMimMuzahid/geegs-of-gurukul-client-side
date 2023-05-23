import React, { useState } from "react";
import { useForm } from "react-hook-form";
import deleteIcon from "../../../../assets/icons/delete.svg";
import editIcon from "../../../../assets/icons/edit.svg";
import copyIcon from "../../../../assets/icons/copy.svg";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const ProgramList = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const programDetails = {
      programName: data?.programName,
    };
    fetch("https://geeks-of-gurukul-server-side.vercel.app/program-list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        data: JSON.stringify(programDetails),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          setItems(result?.data);
          setLoading(false);
        } else {
          toast.error(result?.message);
          setLoading(false);
        }
        console.log("Server response:", result);
        // Handle the server response
      })
      .catch((error) => {
        console.error(
          "Error occurred while sending data to the server:",
          error
        );
        // Handle the error
      });
    console.log(items);
    reset();
  };

  // Fetching Programs info from server
  // const {data:programs,isLoading } = useQuery({
  //   queryKey: ['userDetailse'],
  //   queryFn: ()=>fetch(`https://geeks-of-gurukul-server-side.vercel.app/all-program`)
  //   .then((res) => res.json())
  // })
  //   const Allprograms = programs?.data;
  //   // console.log(Allprograms)
  // if (isLoading) {
  //   return <div>loading...</div>
  // }
  return (
    <div>
      {/* Search Form */}
      <div className='container p-8'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Text Area */}
          <div class='w-full mx-auto my-3 font-poppins'>
            <label
              for='Course'
              class='block mb-2 text-md font-poppins font-medium text-gray-900 dark:text-gray-400'
            >
              <div className='flex items-center justify-between'>
                <p>Program Name:</p>
              </div>
            </label>
            <input
              id='programName'
              name='programName'
              {...register(
                "programName"
                //   {
                // required: "Program Name is required",
                //   }
              )}
              class='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'
              placeholder='Write program name'
              aria-invalid={errors.programName ? "true" : "false"}
            ></input>
            {errors.programName && (
              <p role='alert' className='text-red-500 font-poppins font-medium'>
                {errors.programName?.message}
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
              Search
            </span>
          </button>
        </form>
      </div>
      {/* Search Form */}

      {/* Table */}
      <div class='flex flex-col justify-center h-full mx-auto'>
        <div class='w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200'>
          <header class='px-5 py-4 border-b border-gray-100'>
            <h2 class='font-semibold font-poppins text-gray-800'>Programs</h2>
          </header>
          <div class='p-3'>
            <div class='max-w-[90vw] overflow-x-scroll'>
              <table class='table-auto w-full font-poppins font-medium overflow-x-auto'>
                <thead class='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
                  <tr>
                    <th class='p-2 whitespace-nowrap'>
                      <div class='font-semibold text-left'>SL No:</div>
                    </th>
                    <th class='p-2 whitespace-nowrap'>
                      <div class='font-semibold text-left'>Program Name</div>
                    </th>

                    <th class='p-2 whitespace-nowrap'>
                      <div class='font-semibold text-center'>Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody class='text-sm divide-y divide-gray-100'>
                  {items.map((program, i) => (
                    <tr key={i}>
                      <td class='p-2 whitespace-nowrap'>
                        <div class='flex items-center'>{i + 1}</div>
                      </td>
                      <td class='p-2 whitespace-nowrap'>
                        {program?.programName}
                      </td>

                      <td class='p-2 whitespace-nowrap flex gap-2'>
                        <div class='mx-auto flex w-[100px] gap-2'>
                          <button type='button' className='px-1 py-1 '>
                            {/* svg */}
                            <img
                              height='15px'
                              width='15px'
                              src={deleteIcon}
                              alt=''
                            />
                          </button>
                          <button type='button' className='px-1 py-1'>
                            {/* svg */}
                            <img
                              height='15px'
                              width='15px'
                              src={editIcon}
                              alt=''
                            />
                          </button>

                          <button
                            data-modal-target='staticModal'
                            data-modal-toggle='staticModal'
                            class='px-1 py-1 '
                            type='button'
                          >
                            {/* svg */}
                            <img
                              height='15px'
                              width='15px'
                              src={copyIcon}
                              alt=''
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Table */}
    </div>
  );
};

export default ProgramList;
