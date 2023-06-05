import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsXCircleFill } from "react-icons/bs";
import Lecturetable from "../TableComponents/Lecturetable";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";

function AddAssignmentModal({
  setSearch,
  assignments,
  setAssignments,
  selectedAssignment,
  setSelectedAssignment,
}) {
  const [loading, setLoading] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    fetch(`http://3.84.19.169:5000/api/v1/assignments/searchAssignment`, {
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
          // console.log("first", data);
          setAssignments(data);
          reset();
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

  //pagination functions

  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = assignments?.slice(itemOffset, endOffset);
  const pageCount = Math?.ceil(assignments?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event?.selected * itemsPerPage) % assignments?.length;
    console.log(
      `User requested page number ${event?.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none">
        <div className="relative w-full h-[600px] sm:w-[500px] md:w-[750px] lg:w-[900px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-4 bg-white rounded-lg shadow-2xl">
          <div className="px-2 pt-2 flex w-full justify-between">
            <h4 className="font-semibold">Add assignments</h4>
            <button onClick={() => setSearch(false)}>
              <BsXCircleFill size={25} color="red" />
            </button>
          </div>
          {/* Contents */}
          <div className="w-full mx-auto my-6">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="relative">
                <input
                  type="search"
                  className="p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Search by name"
                  name="assignmentName"
                  {...register("assignmentName")}
                />
              </div>
              <div className="relative">
                <input
                  type="search"
                  className="p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Search by topic"
                  name="topic"
                  {...register("topic")}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-green-400 rounded-lg text-white hover:bg-green-500 py-1"
              >
                Search
              </button>
            </form>
          </div>
          {/* Contents */}
          <p className="text-sm">Selected: {selectedAssignment?.length}</p>
          {/* Table */}
          <Lecturetable
            currentItems={currentItems}
            assignments={assignments}
            setAssignments={setAssignments}
            selectedAssignment={selectedAssignment}
            setSelectedAssignment={setSelectedAssignment}
          />
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
      <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
    </>
  );
}

export default AddAssignmentModal;
