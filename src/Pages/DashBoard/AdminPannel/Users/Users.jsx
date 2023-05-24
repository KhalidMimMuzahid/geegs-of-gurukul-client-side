import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./Users.css";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
const Users = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  //function for fetching users
  const FetchAssessment = (searchUser) => {
    setLoading(true);
    fetch("http://localhost:5000/search-users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        data: JSON.stringify(searchUser),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          setUsers(result?.data);
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
    console.log("Users founds :", users);
  };

  const onSubmit = (data) => {
    const searchUser = {
      name: data?.name,
      email: data?.email,
      phoneNumber: data?.phoneNumber
    };
    FetchAssessment(searchUser);
    console.log(users);
    reset();
  };

  // // const
  // useEffect(() => {
  //   fetch("/user.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //     });
  // }, []);

  // console.log(items);

  const usersPerPage = 6;

  const endOffset = itemOffset + usersPerPage;

  const currentItems = users.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(users.length / usersPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * usersPerPage) % users.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='container p-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
            <div className='w-full'>
              <input
                type='text'
                name='name'
                {...register("name")}
                placeholder='Write user name'
                aria-invalid={errors.name ? "true" : "false"}
                className='form-control w-full rounded-lg'
                aria-label='Name'
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
            <div className='w-full'>
              <input
                type='email'
                name='email'
                {...register("email")}
                placeholder='Write user email'
                aria-invalid={errors.email ? "true" : "false"}
                className='form-control w-full rounded-lg'
                aria-label='Email'
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
            <div className='w-full'>
              <input
                type='tel'
                name='phoneNumber'
                {...register("phoneNumber")}
                placeholder='Write mobile number'
                aria-invalid={errors.phoneNumber ? "true" : "false"}
                className='form-control w-full rounded-lg'
                aria-label='Phone Number'
              />
              {errors.phoneNumber && (
                <p
                  role='alert'
                  className='text-red-500 font-poppins font-medium'
                >
                  {errors.phoneNumber?.message}
                </p>
              )}
            </div>
            <div className='w-full'>
              <button
                type='submit'
                className='font-poppins font-medium text-white px-12 py-2 rounded-lg hover:bg-green-400 bg-green-500'
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </form>

      <div class='flex flex-col justify-center h-full mx-auto'>
        <div class='w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200'>
          <header class='px-5 py-4 border-b border-gray-100'>
            <h2 class='font-semibold font-poppins text-gray-800'>Users</h2>
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
                      <div class='font-semibold text-left'>Profile Pic</div>
                    </th>
                    <th class='p-2 whitespace-nowrap'>
                      <div class='font-semibold text-left'>Name</div>
                    </th>
                    <th class='p-2 whitespace-nowrap'>
                      <div class='font-semibold text-center'>Email</div>
                    </th>
                    <th class='p-2 whitespace-nowrap'>
                      <div class='font-semibold text-center'>Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody class='text-sm divide-y divide-gray-100'>
                  {currentItems.map((profile, i) => (
                    <tr key={i}>
                      <td class='p-2 whitespace-nowrap'>
                        <div class='flex items-center'>{i + 1}</div>
                      </td>
                      <td class='p-2 whitespace-nowrap'>
                        <img
                          className='w-10 rounded-full shadow-lg'
                          src={profile?.photoURL}
                          alt=''
                        />
                      </td>
                      <td class='p-2 whitespace-nowrap'>{profile?.name}</td>
                      <td class='p-2 whitespace-nowrap'>{profile?.email}</td>
                      <td class='p-2 whitespace-nowrap flex gap-2'>
                        <div class=' w-38 mx-auto flex'>
                          <select
                            id='Roles'
                            class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          >
                            <option selected>Select Role</option>
                            <option value='US'>Admin</option>
                            <option value='CA'>Instructor</option>
                            <option value='FR'>Student</option>
                          </select>
                          <button className='px-2 py-2 rounded-full'>✅</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* pagination */}

              <div>
                <div className='pagination'>
                  <ReactPaginate
                    breakLabel='...'
                    nextLabel='>'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel='<'
                    renderOnZeroPageCount={null}
                    containerClassName='pagination-menu'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
