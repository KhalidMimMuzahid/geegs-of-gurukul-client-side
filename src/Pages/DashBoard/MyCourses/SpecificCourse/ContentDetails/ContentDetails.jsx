import React from "react";

function ContentDetails({ description, selectedLecture }) {
  console.log("selectedLecture: ", selectedLecture);
  return (
    <div>
      <video className="w-full h-auto" src="video.mp4" controls></video>
      <div>
        <div className="text-xl font-medium mt-5 flex justify-between align-center">
          <p>{selectedLecture?.lectureName}</p>
          <div class="flex justify-between">
            <button class="bg-green-300 hover:bg-green-400 text-white py-2 px-4 rounded text-sm">
              Prev
            </button>
            <button class="bg-green-300 hover:bg-green-400 text-white py-2 px-4 rounded text-sm ml-4">
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
