import React, { useEffect, useState } from "react";
import Loading from "../../../../Components/Loading/Loading";
import InstructionsModal from "../InstructionsModal/InstructionsModal";
import TestPageHeader from "../TestPageHeader/TestPageHeader";
import EachAssessment from "../EachAssessment/EachAssessment";
import ReactPaginate from "react-paginate";

const Default = () => {
  const [assessments, setAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    fetch("https://api.geeksofgurukul.com/api/v1/assessments/assessments")
      .then((res) => res.json())
      .then((assessments) => {
        console.log("Assessments: ", assessments);
        setAssessments(assessments);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return (
      <div className="h-[90vh] flex justify-center items-center">
        <Loading type={"search"} />
      </div>
    );
  }

  const handleClick = (id) => {
    setShowInstructions(true);
    setSelectedId(id);
    console.log(id, showInstructions);
  };
  console.log(assessments);

  // pagination calculation
  const itemsPerPage = 4;

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
    <>
      <TestPageHeader setAssessments={setAssessments} />
      <div className="w-11/12 mx-auto grid md:grid-cols-1 lg:grid-cols-2 gap-5 pt-4 px-5 mb-10 font-poppins">
        {currentAssessments?.map((assessment, index) => (
          <EachAssessment
            key={assessment?._id}
            handleClick={handleClick}
            assessment={assessment}
            index={index + 1}
          />
        ))}
        {showInstructions && (
          <InstructionsModal
            setShowInstructions={setShowInstructions}
            selectedId={selectedId}
          />
        )}
      </div>
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
    </>
  );
};

export default Default;
