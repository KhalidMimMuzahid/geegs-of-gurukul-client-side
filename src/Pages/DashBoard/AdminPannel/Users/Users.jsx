import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./Users.css";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const inputStyle =
  "border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg w-full mt-1";

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
        <div className="container p-5 font-poppins">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 text-sm">
            <div className="w-full">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={inputStyle}
                aria-label="Name"
                {...register("name")}
                placeholder="Enter user name"
              />
            </div>
            <div className="w-full">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                className={inputStyle}
                placeholder="Enter user email"
                aria-label="Email"
                {...register("email")}
              />
            </div>
            <div className="w-full">
              <label htmlFor="phno">Phone number</label>
              <input
                type="text"
                id="phno"
                name="phno"
                className={inputStyle}
                placeholder="Enter user phone number"
                aria-label="Phone Number"
                {...register("phoneNumber")}
              />
            </div>
          </div>
          <div className="flex justify-center w-full m-4">
            <button
              type="submit"
              disabled={loading}
              className="text-white text-sm px-12 py-3 rounded-lg bg-[#4BA25D] hover:bg-[#5fb370]"
            >
              {loading ? "Searching" : "Search"}
            </button>
          </div>
        </div>
      </form>

      <div className="flex flex-col justify-center h-full mx-auto">
        <div className="w-full mx-auto bg-white rounded-lg border border-gray-300">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-medium text-center font-poppins text-gray-800">
              Users
            </h2>
          </header>
          <div className="p-3">
            <div className="max-w-[90vw] overflow-x-auto">
              <table className="table-auto w-full font-poppins overflow-x-auto">
                <thead className="text-xs font-semibold uppercase bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">SL No:</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Profile Pic</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Email</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {currentItems.map((profile, i) => (
                    <tr key={i}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">{i + 1}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <img
                          className="w-10 rounded-full shadow-lg"
                          src={profile?.photoURL}
                          alt=""
                        />
                      </td>
                      <td className="p-2 whitespace-nowrap">{profile?.name}</td>
                      <td className="p-2 whitespace-nowrap">
                        {profile?.email}
                      </td>
                      <td className="p-2 whitespace-nowrap flex gap-2">
                        <div className=" w-38 mx-auto flex">
                          <select
                            id="Roles"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option selected>Select Role</option>
                            <option value="US">Admin</option>
                            <option value="CA">Instructor</option>
                            <option value="FR">Student</option>
                          </select>
                          <button className="px-2 py-2 rounded-full">✅</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* pagination */}

              <div>
                <div className="pagination">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination-menu"
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
