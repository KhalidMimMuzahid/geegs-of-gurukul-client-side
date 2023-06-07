import React, { useEffect, useState } from "react";
import Loading from "../../../../Components/Loading/Loading";
import InstructionsModal from "../InstructionsModal/InstructionsModal";
import TestPageHeader from "../TestPageHeader/TestPageHeader";
import EachAssessment from "../EachAssessment/EachAssessment";

const Default = () => {
  const [assessments, setAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/assessments/assessments")
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
  return (
    <>
      <TestPageHeader setAssessments={setAssessments} />
      <div className="w-11/12 mx-auto grid md:grid-cols-1 lg:grid-cols-2 gap-5 pt-4 px-5 mb-10 font-poppins">
        {assessments?.map((assessment) => (
          <EachAssessment
            key={assessment?._id}
            handleClick={handleClick}
            assessment={assessment}
          />
        ))}
        {showInstructions && (
          <InstructionsModal
            setShowInstructions={setShowInstructions}
            selectedId={selectedId}
          />
        )}
      </div>
    </>
  );
};

export default Default;
