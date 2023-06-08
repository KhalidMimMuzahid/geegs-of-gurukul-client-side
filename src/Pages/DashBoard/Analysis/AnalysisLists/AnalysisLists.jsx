import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import EachRes from "./EachRes/EachRes";
import Loading from "../../../../Components/Loading/Loading";
import AnalysisPageHeader from "../AnalysisPageHeader/AnalysisPageHeader";

const AnalysisLists = () => {
  const [responses, setResponses] = useState([]);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
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
  console.log("responses", responses);
  return (
    <div className="">
      <AnalysisPageHeader setResponses={setResponses} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 w-4/5 mx-auto">
        {responses?.length > 0 ? (
          responses?.map((response) => (
            <EachRes key={response?._id} response={response} />
          ))
        ) : (
          <div className="w-full h-full justify-center items-center text-2xl font-bold">
            <h1 className="">you have not attempted any assessment </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisLists;
