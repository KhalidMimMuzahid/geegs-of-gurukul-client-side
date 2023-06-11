import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import EachRes from "./EachRes/EachRes";
import Loading from "../../../../Components/Loading/Loading";
import AnalysisPageHeader from "../AnalysisPageHeader/AnalysisPageHeader";
import ReactPaginate from "react-paginate";

const AnalysisLists = () => {
  const [responses, setResponses] = useState([]);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/v1/assessments/assessment-responses?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        setResponses(data);
        setIsLoading(false);
      });
  }, [user]);
  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <Loading type={"search"} />
      </div>
    );
  }
  // console.log("responses", responses);

  // pagination calculation
  const itemsPerPage = 6;

  const endOffset = itemOffset + itemsPerPage;

  const currentResponses = responses?.slice(itemOffset, endOffset);
  const pageCount = Math?.ceil(responses?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event?.selected * itemsPerPage) % responses?.length;
    // console.log(
    //   `User requested page number ${event?.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <div className="font-poppins">
      <AnalysisPageHeader setResponses={setResponses} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 w-4/5 mx-auto">
        {currentResponses?.length > 0 ? (
          currentResponses?.map((response) => (
            <EachRes key={response?._id} response={response} />
          ))
        ) : (
          <div className="w-full h-full justify-center items-center text-2xl font-bold">
            <h1 className="">You have not attempted any assessment </h1>
          </div>
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
    </div>
  );
};

export default AnalysisLists;
