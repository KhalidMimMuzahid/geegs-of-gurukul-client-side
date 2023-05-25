import React from "react";
function LectureVideo({
  selected,
  setSelected,
  modules,
  selectedModuleLectureList,
  setChangingModuleStatus,
}) {
  const changeLecture = (direction) => {
    const moduleIndex = modules.findIndex(
      (element) => element._id === selected?.module?.module_id
    );
    const lectureIndex = selectedModuleLectureList.findIndex(
      (element) => element?._id === selected?._id
    );
    if (direction === +1) {
      try {
        if (lectureIndex === selectedModuleLectureList?.length - 1) {
          // go to next module first lecture
          setChangingModuleStatus({
            module_id: modules[moduleIndex + 1]?._id,
            lectureIndexStatus: "first",
          });
        } else {
          // go to  next lecture in this module
          setSelected(selectedModuleLectureList[lectureIndex + 1]);
        }
      } catch {
        console.log("end reached");
      }
    } else if (direction === -1) {
      try {
        if (lectureIndex === 0) {
          // got to previous module and last lecture
          setChangingModuleStatus({
            module_id: modules[moduleIndex - 1]?._id,
            lectureIndexStatus: "last",
          });
        } else {
          // go to previous lecture in this module
          setSelected(selectedModuleLectureList[lectureIndex - 1]);
        }
      } catch {
        console.log("start reached");
      }
    }
  };
  return (
    <div>
      <video
        className="w-full h-auto"
        src={selected?.lectureVideo?.videoLink?.s3Hoster}
        controls
      ></video>
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
          <p className="text-sm">{selected?.notes}</p>
        </div>
      </div>
    </div>
  );
}

export default LectureVideo;
