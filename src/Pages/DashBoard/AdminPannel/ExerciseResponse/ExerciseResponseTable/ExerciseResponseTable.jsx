import React from "react";

const ExerciseResponseTable = ({ exerciseResponses }) => {
  return (
    <div className="flex flex-col justify-center h-full mx-auto">
      <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold font-poppins text-gray-800">
            ExerciseResponse
          </h2>
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
                    <div className="font-semibold text-left">Exercise Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left"> </div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center"> </div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center"> Start Date</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center"> </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {exerciseResponses?.length > 0 &&
                  exerciseResponses?.map((each, i) => (
                    <tr>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">{i + 1}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {/* {batch?.course?.courseName} */}
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {/* {batch?.batchName} */}
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {/* {batch?.duration} */}
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {/* {batch?.startedAt?.slice(0, 10)} */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* pagination */}

            {/* <div>
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
      </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseResponseTable;
