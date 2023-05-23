import React, { useState } from "react";
import "react-tabs/style/react-tabs.css";
import ticket from "../../assets/ticket/ticket.svg";
import { useForm } from "react-hook-form";

const Help = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  const [ticketStatus, setTicketStatus] = useState("Create new ticket");

  return (
    <div className=' bg-[#C4F0CE] h-screen overflow-auto'>
      <div className={ticketStatus === 'Create new ticket'?`bg-white w-[90vw] h-auto mx-auto my-8 rounded-xl pt-10`:`bg-white w-[90vw] h-4/5 mx-auto my-8 rounded-xl pt-10`}>
        <div className='flex justify-evenly font-poppins text-xl'>
          <button
            onClick={() => setTicketStatus("Create new ticket")}
            className={`${
              ticketStatus === "Create new ticket" &&
              "border-b-[3px] border-[#0ABD67]"
            }`}
          >
            Create new ticket
          </button>

          <div className='h-10 w-[0.5px] bg-black'></div>

          <button
            onClick={() => setTicketStatus("Previous ticket")}
            className={`${
              ticketStatus === "Previous ticket" &&
              "border-b-[3px] border-[#0ABD67]"
            }`}
          >
            Previous ticket
          </button>
        </div>
        {/* If ticketStatus === "Previous ticket" then */}
        {ticketStatus === "Previous ticket" && (
          <div
            style={{ backgroundImage: `url(${ticket})` }}
            className='flex flex-col justify-center items-center gap-y-8 h-full bg-center bg-no-repeat'
          >
            <h3 className='text-xl'>You don't have any previous ticket</h3>
            <button
              onClick={() => setTicketStatus("Create new ticket")}
              className='py-5 px-4 bg-[#0ABD67] text-white text-xl rounded-2xl font-semibold tracking-wide'
            >
              Create new ticket
            </button>
          </div>
        )}

        {/* If ticketStatus === "Create new ticket" then */}

        {ticketStatus === "Create new ticket" && (
          <div className='p-16'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=' font-poppins font-medium'>
                <div className='grid grid-cols-1 gap-2'>
                  <div className='addAssessment'>
                    <label htmlFor='name'> Name</label>
                    <input
                      type='text'
                      // required
                      name='name'
                      {...register("name", {
                        required: " Name is required",
                      })}
                      aria-invalid={errors.name ? "true" : "false"}
                      // onChange={handleInputChange}
                    />
                    {errors.name && (
                      <p
                        role='alert'
                        className='text-red-500 font-poppins font-medium'
                      >
                        {errors.name?.message}
                      </p>
                    )}
                  </div>
                  <div className='addAssessment'>
                    <label htmlFor='email'>Your Email</label>
                    <input
                      type='email'
                      // required
                      name='email'
                      {...register("email", {
                        required: "Assesment Name is required",
                      })}
                      aria-invalid={errors.email ? "true" : "false"}
                      // onChange={handleInputChange}
                    />
                    {errors.email && (
                      <p
                        role='alert'
                        className='text-red-500 font-poppins font-medium'
                      >
                        {errors.email?.message}
                      </p>
                    )}
                  </div>
                  {/* Category Name */}
                  <div>
                    <label htmlFor='categoryName'>Category Name</label>
                    <select
                      name='categoryName'
                      {...register("categoryName", {
                        required: "Program Name is required",
                      })}
                      aria-invalid={errors.categoryName ? "true" : "false"}
                      className='w-full border-2 border-green-400 rounded-xl'
                    >
                      <option selected disabled value='Choose a Category'>
                        Choose a Category
                      </option>
                      <option value='Category1'>Category 1</option>
                      <option value='Category2'>Category 2</option>
                      <option value='Category3'>Category 3</option>
                    </select>
                    {errors.categoryName && (
                      <p
                        className='text-red-500 font-poppins font-medium'
                        role='alert'
                      >
                        {errors.categoryName?.message}
                      </p>
                    )}
                  </div>
                  {/* Text Area */}
                  <div class='w-full mx-auto mb-3 font-poppins'>
                    <label
                      for='description'
                      class='block mb-2 text-md font-poppins font-medium text-gray-900 dark:text-gray-400'
                    >
                      Description :
                    </label>
                    <textarea
                      id='description'
                      name='description'
                      {...register(
                        "description",
                        {
                        required: "Describe Your Issue",
                        }
                      )}
                      rows='4'
                      class='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='Elaborate your isue here...'
                      aria-invalid={errors.description ? "true" : "false"}
                    ></textarea>
                    {errors.description && (
                      <p
                        role='alert'
                        className='text-red-500 font-poppins font-medium'
                      >
                        {errors.description?.message}
                      </p>
                    )}
                  </div>
                  {/* Attachments (optional) */}
                  <div class='w-full mx-auto mb-3 font-poppins'>
                    <label
                      for='attachment'
                      class='block mb-2 text-md font-poppins font-medium text-gray-900 dark:text-gray-400'
                    >
                      Add Attachment (Optional) :
                    </label>
                    <input
                      {...register("attachment")}
                      class='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                      name="attachment"
                      id='attachment'
                      type='file'
                    ></input>
                    {errors.attachment && (
                      <p
                        role='alert'
                        className='text-red-500 font-poppins font-medium'
                      >
                        {errors.attachment?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* <button type='submit'>submit</button> */}
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
        )}
      </div>
    </div>
  );
};

export default Help;
