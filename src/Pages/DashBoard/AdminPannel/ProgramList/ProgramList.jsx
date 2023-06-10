import React, { useState } from "react";
import { useForm } from "react-hook-form";
import deleteIcon from "../../../../assets/icons/delete.svg";
import editIcon from "../../../../assets/icons/edit.svg";
import copyIcon from "../../../../assets/icons/copy.svg";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";

const inputStyle =
  "p-3 border border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg w-full mt-1";

const ProgramList = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSearch = (data) => {
    setLoading(false);
    const programDetails = {
      programName: data?.programName,
    };
    fetch("http://localhost:5000/api/v1/programs/program-list", {
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
  };

  //pagination calculation

  const itemsPerPage = 10;

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
    <div className="relative">
      {/* Search Form */}
      <div className="container p-8 font-poppins">
        <form onSubmit={handleSubmit(onSearch)}>
          {/* Text Area */}
          <div className="w-full mx-auto my-3 text-sm">
            <label
              htmlFor="Course"
              className="text-md font-poppins text-gray-900 dark:text-gray-400"
            >
              <div className="flex items-center justify-between">
                <p>Program Name</p>
              </div>
            </label>
            <input
              id="programName"
              name="programName"
              {...register("programName")}
              className={inputStyle}
              placeholder="Write program name"
              aria-invalid={errors.programName ? "true" : "false"}
            ></input>
            {errors.programName && (
              <p role="alert" className="text-red-500 font-poppins font-medium">
                {errors.programName?.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-5 py-3 text-white w-full rounded-lg bg-[#4BA25D] hover:bg-[#5fb370]"
          >
            {loading ? "Searching" : "Search"}
          </button>
        </form>
      </div>
      {/* Search Form */}

      {/* Table */}
      <div className="flex flex-col justify-center h-full mx-auto font-poppins ">
        <div className="w-full mx-auto bg-white rounded-lg border border-gray-300">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-medium text-center text-gray-800">Programs</h2>
          </header>
          <div className="p-3">
            <div className="max-w-[90vw] overflow-x-auto">
              <table className="table-auto w-full overflow-x-auto">
                <thead className="text-xs font-semibold uppercase bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">SL No:</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        Program Name
                      </div>
                    </th>

                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {currentItems?.length > 0 &&
                    currentItems.map((program, i) => (
                      <tr key={i}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">{i + 1}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {program?.programName}
                        </td>

                        <td className="p-2 whitespace-nowrap flex gap-2">
                          <div className="mx-auto flex w-[100px] gap-2">
                            <button type="button" className="px-1 py-1 ">
                              {/* svg */}
                              <img
                                height="15px"
                                width="15px"
                                src={deleteIcon}
                                alt=""
                              />
                            </button>
                            <button type="button" className="px-1 py-1">
                              {/* svg */}
                              <img
                                height="15px"
                                width="15px"
                                src={editIcon}
                                alt=""
                              />
                            </button>

                            <button
                              data-modal-target="staticModal"
                              data-modal-toggle="staticModal"
                              className="px-1 py-1 "
                              type="button"
                            >
                              {/* svg */}
                              <img
                                height="15px"
                                width="15px"
                                src={copyIcon}
                                alt=""
                              />
                            </button>
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
      {/* Table */}
      {loading && (
        <div className=" absolute top-0 left-0 h-screen w-full flex justify-center items-center bg-transparent">
          <svg
            aria-hidden="true"
            className=" w-14 h-14 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default ProgramList;
