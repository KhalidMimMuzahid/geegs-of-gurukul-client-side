import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./Users.css";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
const Users = () => {
  const [loading, setLoading] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);

  const [items, setData] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSearch = (data) => {
    fetch(`http://localhost:5000/api/v1/users/search-user`, {
      headers: {
        "content-type": "application/json",
        data: JSON.stringify(data),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.success) {
          const data = result?.data;
          setData(data);
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

  console.log(items);

  const itemsPerPage = 6;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = items?.slice(itemOffset, endOffset);
  const pageCount = Math?.ceil(items?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event?.selected * itemsPerPage) % items?.length;
    console.log(
      `User requested page number ${event?.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSearch)}>
        <div className='container p-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
            <div className='w-full'>
              <input
                type='text'
                className='form-control w-full rounded-lg'
                placeholder='Name'
                aria-label='Name'
                {...register("name")}
              />
            </div>
            <div className='w-full'>
              <input
                type='text'
                className='form-control w-full rounded-lg'
                placeholder='Email'
                aria-label='Email'
                {...register("email")}
              />
            </div>
            <div className='w-full'>
              <input
                type='text'
                className='form-control w-full rounded-lg'
                placeholder='Phone Number'
                aria-label='Phone Number'
                {...register("phoneNumber")}
              />
            </div>
            <div className='w-full'>
              <button
                type='submit'
                disabled={loading}
                className='font-poppins font-medium text-white px-12 py-2 rounded-lg hover:bg-green-400 bg-green-500'
              >
                {loading ? "Searching" : "Search"}
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
