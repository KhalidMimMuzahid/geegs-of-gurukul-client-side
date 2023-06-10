import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ExerciseResponseModal from "../ExerciseResponseModal/ExerciseResponseModal";
import UploadCsvFile from "./UploadCsvFile";

const ExerciseResponseTable = ({
  setRefreshExcerciseResponse,
  exerciseResponses,
  dwonloadAsCsv: downloadAsCsv,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const [uploadCsv, setUploadCsv] = useState(false);

  // pagination calculation
  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = exerciseResponses?.slice(itemOffset, endOffset);
  const pageCount = Math?.ceil(exerciseResponses?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset =
      (event?.selected * itemsPerPage) % exerciseResponses?.length;
    // console.log(
    //   `User requested page number ${event?.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  return (
    <div className="flex flex-col justify-center h-full mx-auto">
      <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <header className=" flex justify-between items-center px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold font-poppins text-gray-800">
            ExerciseResponse
          </h2>
          <div className="flex gap-3">
            {!uploadCsv && (
              <button
                onClick={() => setUploadCsv(true)}
                className="px-4 py-2 hover:bg-white hover:text-green-500 border-2 border-green-500 bg-green-500/90 text-white rounded-md transition-all duration-500"
              >
                Upload CSV
              </button>
            )}
            {uploadCsv && (
              <UploadCsvFile
                setRefreshExcerciseResponse={setRefreshExcerciseResponse}
              />
            )}
            <button
              onClick={downloadAsCsv}
              className="px-4 py-2 bg-white text-green-500 border-2 border-green-500 hover:bg-green-500/90 hover:text-white rounded-md transition-all duration-500"
            >
              Download as CSV
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="max-w-[90vw] overflow-x-scroll">
            <table className="table-auto w-full font-poppins font-medium overflow-x-auto">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">SL No:</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Course Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Batch Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">
                      Lecture Name
                    </div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">
                      Exercise Mark
                    </div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Submit Link</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">
                      Student Email
                    </div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {currentItems?.length > 0 &&
                  currentItems?.map((each, i) => (
                    <tr key={each?._id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">{i + 1}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {each?.course?.courseName}
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {each?.batch?.batchName}
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {each?.lecture?.lectureName}
                      </td>
                      <td className="p-2 whitespace-nowrap">{each?.mark}</td>
                      <td className="p-2 whitespace-nowrap">
                        <a
                          href={each?.submittedLink}
                          target="_blank"
                          className="text-blue-700 hover:border-b hover:border-blue-400"
                        >
                          Link
                        </a>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {each?.submissionDetails?.studentEmail}
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setOpenModal(true);
                            setData(each);
                          }}
                          className="px-2 py-1 bg-green-400 text-white hover:bg-white hover:text-green-400 border-2 border-green-400 rounded transition-all duration-500"
                        >
                          See Details
                        </button>
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
      {openModal && data && (
        <ExerciseResponseModal
          setRefreshExcerciseResponse={setRefreshExcerciseResponse}
          setOpenModal={setOpenModal}
          data={data}
        />
      )}
    </div>
  );
};

export default ExerciseResponseTable;
