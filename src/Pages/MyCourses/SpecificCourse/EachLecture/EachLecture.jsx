import React from "react";

const EachLecture = ({ lecture }) => {
  return (
    <div>
      <h1>{lecture?.lectureName}</h1>
    </div>
  );
};

export default EachLecture;
