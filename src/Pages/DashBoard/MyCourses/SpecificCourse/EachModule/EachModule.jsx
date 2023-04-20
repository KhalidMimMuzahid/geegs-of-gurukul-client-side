import React from "react";
const EachModule = ({ module }) => {
  return (
    <div className="text-center border p-5 rounded-sm hover:bg-green-400 hover:rounded-sm">
      <h1 className="font-semibold text-2xl">{module?.moduleName}</h1>
      <h3 className="my-2">{module?.instructor}</h3>
      <div className="flex justify-between">
        <span>  <b>Time </b>: {module?.time}</span>
        <span>  <b>Lecture </b>: {module?.totalLecture}</span>
      </div>
    </div>
  );
};

export default EachModule;
