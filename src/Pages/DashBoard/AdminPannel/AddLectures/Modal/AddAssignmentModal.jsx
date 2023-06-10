import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsXCircleFill } from "react-icons/bs";
import Lecturetable from "../TableComponents/Lecturetable";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";

const inputStyle =
  "border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg w-full mt-1 text-sm";

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
    fetch(`http://localhost:5000/api/v1/assignments/searchAssignment`, {
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
        <div className="relative w-full h-[650px] sm:w-[500px] md:w-[750px] lg:w-[900px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-4 bg-white rounded-lg shadow-2xl">
          <div className="px-2 pt-2 flex w-full justify-between">
            <h4 className="font-semibold">Add assignments</h4>
            <button onClick={() => setSearch(false)}>
              <BsXCircleFill size={25} color="red" />
            </button>
          </div>
          {/* Contents */}
          <div className="w-full mx-auto my-6">
            <form onSubmit={handleSubmit(onSubmit)} className="text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="relative">
                  <input
                    type="search"
                    className={inputStyle}
                    placeholder="Search by name"
                    name="assignmentName"
                    {...register("assignmentName")}
                  />
                </div>
                <div className="relative">
                  <input
                    type="search"
                    className={inputStyle}
                    placeholder="Search by topic"
                    name="topic"
                    {...register("topic")}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#4BA25D] hover:bg-[#5fb370] rounded-lg text-white py-2 px-10 my-5"
                >
                  Search
                </button>
              </div>
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
