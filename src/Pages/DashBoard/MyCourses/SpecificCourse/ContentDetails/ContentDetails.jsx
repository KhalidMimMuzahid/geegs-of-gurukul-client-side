import React, { useEffect, useState } from "react";

import LectureVideo from "./LectureVideo/LectureVideo";
import AssignmentDetails from "./AssignmentDetails";
import Loading from "../../../../../Components/Loading/Loading";
import EvaluationDetails from "./EvaluationDetails/EvaluationDetails";

function ContentDetails({
  selected,
  setSelected,
  modules,
  selectedModuleLectureList,
  setChangingModuleStatus,
  setChangingAssignmentStatus,
  setChangingEvaluationStatus,
}) {
  console.log("selected: ", selected);
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
        ) : selected?.type === "evaluation" ? (
          <EvaluationDetails
            selected={selected}
            setChangingEvaluationStatus={setChangingEvaluationStatus}
          />
        ) : (
          <AssignmentDetails
            selected={selected}
            selectedModuleLectureList={selectedModuleLectureList}
            setChangingAssignmentStatus={setChangingAssignmentStatus}
          />
        )
      );
    }
  }, [selected]);

  return DetailsComponent;
}

export default ContentDetails;
