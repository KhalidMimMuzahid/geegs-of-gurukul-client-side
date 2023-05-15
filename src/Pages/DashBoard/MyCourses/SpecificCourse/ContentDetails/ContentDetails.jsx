import React from "react";

function ContentDetails({
  description,
  selectedLecture,
  contents,
  setSelectedLecture,
}) {
  const prevLecture = () => {
    const moduleIndex = contents.findIndex(
      (element) => element._id === selectedLecture.module_id
    );
    const lectureIndex = contents[moduleIndex].lecturesList.findIndex(
      (element) => element._id === selectedLecture._id
    );
    try {
      if (lectureIndex === 0) {
        setSelectedLecture(
          contents[moduleIndex - 1].lecturesList[
            contents[moduleIndex - 1].lecturesList.length - 1
          ]
        );
      } else {
        setSelectedLecture(
          contents[moduleIndex].lecturesList[lectureIndex - 1]
        );
      }
    } catch {
      console.log("start reached");
    }
  };
  const nextLecture = () => {
    const moduleIndex = contents.findIndex(
      (element) => element._id === selectedLecture.module_id
    );
    const lectureIndex = contents[moduleIndex].lecturesList.findIndex(
      (element) => element._id === selectedLecture._id
    );
    try {
      if (lectureIndex === contents[moduleIndex].lecturesList.length - 1) {
        setSelectedLecture(contents[moduleIndex + 1].lecturesList[0]);
      } else {
        setSelectedLecture(
          contents[moduleIndex].lecturesList[lectureIndex + 1]
        );
      }
    } catch {
      console.log("end reached");
    }
  };
  return (
    <div>
      <video className="w-full h-auto" src="video.mp4" controls></video>
      <div>
        <div className="text-xl font-medium mt-5 flex justify-between align-center">
          <p>{selectedLecture?.lectureName}</p>
          <div className="flex justify-between">
            <button
              className="bg-green-300 hover:bg-green-400 text-white py-2 px-4 rounded text-sm"
              onClick={prevLecture}
            >
              Prev
            </button>
            <button
              className="bg-green-300 hover:bg-green-400 text-white py-2 px-4 rounded text-sm ml-4"
              onClick={nextLecture}
            >
              Next
            </button>
          </div>
        </div>
        <hr className="my-3" />
        <div className="overflow-y-scroll h-40">
          <p className="text-lg font-medium text-green-500 mb-4">Description</p>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ContentDetails;
