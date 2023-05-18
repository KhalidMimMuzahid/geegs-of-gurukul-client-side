import React from "react";
import { description } from "../../DummyData/dummyData";
function LectureVideo({ selected, changeLecture, setSelected }) {
  return (
    <div>
      <video className="w-full h-auto" src="video.mp4" controls></video>
      <div>
        <div className="text-xl font-medium mt-5 flex justify-between align-center">
          <p>{selected?.lectureName}</p>
          <div className="flex justify-between">
            <button
              className="bg-green-300 hover:bg-green-400 text-white py-2 px-4 rounded text-sm"
              onClick={() => changeLecture(-1)}
            >
              Prev
            </button>
            <button
              className="bg-green-300 hover:bg-green-400 text-white py-2 px-4 rounded text-sm ml-4"
              onClick={() => changeLecture(+1)}
            >
              Next
            </button>
          </div>
        </div>
        <hr className="my-3" />
        <div className="overflow-y-auto h-40">
          <p className="text-lg font-medium text-green-500 mb-4">Description</p>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default LectureVideo;
