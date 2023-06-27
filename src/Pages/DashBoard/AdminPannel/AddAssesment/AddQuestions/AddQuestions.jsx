import React, { useState } from "react";
import EachAssesment from "../EachAssesment/EachAssesment";
import { BiSearch } from "react-icons/bi";
import ReactPaginate from "react-paginate";

const inputStyle =
  "border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg w-full";

function AddQuestions({
  addedQuestion,
  handleSearchQueryInputChange,
  handleSearchQueryFormSubmit,
  setSearchParameteres,
  setAddedQuestion,
  question,
}) {
  const [itemOffset, setItemOffset] = useState(0);

  // pagination calculation
  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;

  const currentQuestions = question?.slice(itemOffset, endOffset);
  const pageCount = Math?.ceil(question?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event?.selected * itemsPerPage) % question?.length;
    // console.log(
    //   `User requested page number ${event?.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <>
      <hr />
      <h4 className="text-center font-semibold text-lg mt-3 mb-6 text-[#4BA25D]">
        Add questions here
      </h4>
      <h4 className="font-medium mb-2">
        {addedQuestion?.length === 0
          ? "No questions added yet"
          : `You have added ${addedQuestion?.length} ${
              addedQuestion?.length > 1 ? "questions" : "question"
            }`}
      </h4>

      <div id="search-parameteres">
        <div className="font-sm">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <div className="col-span-1">
              <input
                type="text"
                name="questionName"
                placeholder="Enter question name"
                onChange={handleSearchQueryInputChange}
                className={`${inputStyle} input`}
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                placeholder="Enter topic name"
                name="topicName"
                onChange={handleSearchQueryInputChange}
                className={`${inputStyle} input`}
              />
            </div>
            <div className="col-span-1">
              <select
                name="difficultyLevel"
                id=""
                defaultValue="any"
                onChange={handleSearchQueryInputChange}
                className={`${inputStyle} input`}
              >
                <option value="any" disabled>
                  Difficulty
                </option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center items-center gap-4 mt-8 mb-10">
            <div className="">
              <button
                type="reset"
                onClick={() => setSearchParameteres({})}
                className="w-full p-2 px-8 rounded-lg hover:text-white border border-[#747880] hover:bg-[#8A8F98]"
              >
                Clear
              </button>
            </div>
            <div className="">
              <button
                onClick={handleSearchQueryFormSubmit}
                type="button"
                className="w-full p-2 px-4 rounded-lg text-white flex bg-[#4BA25D] hover:bg-[#5fb370]"
              >
                <BiSearch size={24} className="mr-1"></BiSearch>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="lg:max-w-[1180px] md:max-w-[580px] max-w-[300px] flex flex-col justify-center mx-auto">
        <div className="w-full mx-auto bg-white rounded-lg border border-gray-200 mb-10">
          <header className="py-4 border-b border-gray-100">
            <h2 className="font-medium text-center">Lectures</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full overflow-x-auto">
                <thead className="text-xs font-semibold uppercase bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">SL No:</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Question</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Topic</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Difficulty</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {currentQuestions?.length > 0 &&
                    currentQuestions?.map((eachQues, i) => (
                      <EachAssesment
                        eachQues={eachQues}
                        key={eachQues?._id}
                        i={i}
                        addedQuestion={addedQuestion}
                        setAddedQuestion={setAddedQuestion}
                      />
                    ))}
                </tbody>
              </table>
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
    </>
  );
}

export default AddQuestions;
