import React, { useEffect, useState } from "react";

import LectureVideo from "./LectureVideo/LectureVideo";
import AssignmentDetails from "./AssignmentDetails";
import Loading from "../../../../../Components/Loading/Loading";

function ContentDetails({
  selected,
  setSelected,
  modules,
  selectedModuleLectureList,
  setChangingModuleStatus,
}) {
  // console.log("selected: ", selected);
  const [DetailsComponent, setDetailsComponent] = useState(null);
  useEffect(() => {
    if (!selected) {
      <Loading />;
    } else {
      setDetailsComponent(
        selected?.type === "lecture" ? (
          <LectureVideo
            selected={selected}
            setSelected={setSelected}
            modules={modules}
            selectedModuleLectureList={selectedModuleLectureList}
            setChangingModuleStatus={setChangingModuleStatus}
          />
        ) : (
          <AssignmentDetails
            selected={selected}
            selectedModuleLectureList={selectedModuleLectureList}
          />
        )
      );
    }
  }, [selected]);

  return DetailsComponent;
}

export default ContentDetails;
