import React, { useContext, useState } from "react";
import "./AssesmentList.css";
import deleteIcon from "../../../../assets/icons/delete.svg";
import editIcon from "../../../../assets/icons/edit.svg";
import copyIcon from "../../../../assets/icons/copy.svg";
// import { Modal } from "flowbite";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import ReactPaginate from "react-paginate";

const inputStyle =
  "border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg w-full mt-1";

const AssesmentList = () => {
  const { user } = useContext(AuthContext);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const FetchAssessment = (searchData) => {
    setLoading(true);
    fetch(
      "https://api.geeksofgurukul.com/api/v1/assessments/search-assessment",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          data: JSON.stringify(searchData),
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          setAssessments(result?.data);
          setLoading(false);
        } else {
          toast.error(result?.message);
          setLoading(false);
        }
        // console.log("Server response:", result);
        // Handle the server response
      })
      .catch((error) => {
        console.error(
          "Error occurred while sending data to the server:",
          error
        );
        // Handle the error
      });
    // console.log("Assessment founds :", assessments);
  };

  //my creation
  const handelToMyCreation = () => {
    // console.log("clicked");
    setLoading(true);
    const SearchData = {
      creatorEmail: user?.email,
    };
    FetchAssessment(SearchData);
  };

  const onSubmit = (data) => {
    const searchData = {
      assessmentName: data?.assessmentName,
      batchId: data?.batchName,
      creatorEmail: data?.creatorEmail,
      updaterEmail: data?.updaterEmail,
    };
    FetchAssessment(searchData);
    // console.log(assessments);
    // reset();
  };
  const $targetEl = document.getElementById("staticModal");
  // const [windowSize, setWindowSize] = useState();
  const options = {
    placement: "bottom-right",
    backdrop: "dynamic",
    backdropClasses:
      "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-5 z-[4000000]",
    closable: true,
    onHide: () => {
      // console.log("modal is hidden");
    },
    onShow: () => {
      // console.log("modal is shown");
    },
    onToggle: () => {
      // console.log("modal has been toggled");
    },
  };
  // const modal = new Modal($targetEl, options);

  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;

  const currentAssessments = assessments?.slice(itemOffset, endOffset);
  const pageCount = Math?.ceil(assessments?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event?.selected * itemsPerPage) % assessments?.length;
    // console.log(
    //   `User requested page number ${event?.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  return (
    <div className="mt-5 mb-10">
      {/* filtering form */}
      <div className="container mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="font-poppins text-sm p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="assessmentName">Assessment Name</label>
                <input
                  type="text"
                  name="assessmentName"
                  {...register("assessmentName")}
                  placeholder="Enter assessment name"
                  aria-invalid={errors.assessmentName ? "true" : "false"}
                  className={inputStyle}
                />
                {errors.assessmentName && (
                  <p
                    role="alert"
                    className="text-red-500 font-poppins font-medium"
                  >
                    {errors.assessmentName?.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="batchName">Batch Name</label>
                <input
                  type="text"
                  name="batchName"
                  {...register("batchName")}
                  placeholder="Enter batch name"
                  aria-invalid={errors.batchName ? "true" : "false"}
                  className={inputStyle}
                />
                {errors.batchName && (
                  <p
                    role="alert"
                    className="text-red-500 font-poppins font-medium"
                  >
                    {errors.batchName?.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="creatorEmail">Creator </label>
                <input
                  type="email"
                  name="creatorEmail"
                  {...register("creatorEmail")}
                  placeholder="Enter creator name"
                  aria-invalid={errors.creatorEmail ? "true" : "false"}
                  className={inputStyle}
                />
                {errors.creatorEmail && (
                  <p
                    role="alert"
                    className="text-red-500 font-poppins font-medium"
                  >
                    {errors.creatorEmail?.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="updaterEmail">Updater Email</label>
                <input
                  type="email"
                  name="updaterEmail"
                  {...register("updaterEmail")}
                  placeholder="Enter updater name"
                  aria-invalid={errors.updaterEmail ? "true" : "false"}
                  className={inputStyle}
                />
                {errors.updaterEmail && (
                  <p
                    role="alert"
                    className="text-red-500 font-poppins font-medium"
                  >
                    {errors.updaterEmail?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4 my-10 items-center justify-center">
              <div className="">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 py-3 text-white border border-[#4BA25D] bg-[#4BA25D] hover:bg-[#5fb370] rounded-lg transition-all duration-200"
                >
                  {loading ? "Searching" : "Search"}
                </button>
              </div>
              <div className="">
                <button
                  type="button"
                  onClick={handelToMyCreation}
                  disabled={loading}
                  className="px-10 py-3 hover:text-white border border-[#747880] hover:bg-[#8A8F98] rounded-lg transition-all duration-200"
                >
                  {loading ? "Searching" : "My Creation"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Table */}
      <div className="flex flex-col justify-center h-full mx-auto">
        <div className="w-full mx-auto bg-white rounded-lg border border-gray-300">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-medium font-poppins text-center text-gray-800">
              Assesments
            </h2>
          </header>
          <div className="p-3">
            <div className="max-w-[90vw] overflow-x-auto">
              <table className="table-auto w-full font-poppins font-medium overflow-x-auto">
                <thead className="text-xs font-medium uppercase bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">SL No:</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        Assesment Name
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Batch ID</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">
                        Created By
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y font-normal divide-gray-100">
                  {currentAssessments.map((assesment, i) => (
                    <tr key={i}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">{i + 1}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {assesment?.assessmentName}
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {assesment?.batchId}
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {assesment?.actionDetailse?.creation?.creatorEmail}
                      </td>
                      <td className="p-2 whitespace-nowrap flex gap-2">
                        <div className="mx-auto flex w-[100px] gap-2">
                          <button type="button" className="px-1 py-1">
                            {/* svg */}
                            <img
                              height="15px"
                              width="15px"
                              src={deleteIcon}
                              alt=""
                            />
                          </button>
                          <button type="button" className="px-1 py-1 ">
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
                            className="px-1 py-1"
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

      {/* <!-- Main modal --> */}
      <div
        id="staticModal"
        data-modal-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-[4000000] hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Assesment Info
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="staticModal"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="">
                  <input
                    type="text"
                    className="form-control w-full rounded-lg"
                    placeholder="Assesment name"
                    aria-label="Assesment name"
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    className="form-control w-full rounded-lg"
                    placeholder="Assesment Topic"
                    aria-label="Assesment Topic"
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    className="form-control w-full rounded-lg"
                    placeholder="Batch ID"
                    aria-label="Batch ID"
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    className="form-control w-full rounded-lg"
                    placeholder="Schedule at"
                    aria-label="Schedule at"
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    className="form-control w-full rounded-lg"
                    placeholder="Duration"
                    aria-label="Duration"
                  />
                </div>
              </div>
            </form>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="staticModal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                data-modal-hide="staticModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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
