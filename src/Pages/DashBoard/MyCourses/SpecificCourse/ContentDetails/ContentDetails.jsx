import React, { useEffect, useState } from "react";

import LectureVideo from "./LectureVideo/LectureVideo";
import AssignmentDetails from "./AssignmentDetails";

function ContentDetails({ selected, changeLecture, setSelected }) {
  // console.log("selected: ", selected);
  const [DetailsComponent, setDetailsComponent] = useState(null);

  useEffect(() => {
    setDetailsComponent(
      selected.type === "lecture" ? (
        <LectureVideo
          selected={selected}
          changeLecture={changeLecture}
          setSelected={setSelected}
        />
      ) : (
        <AssignmentDetails selected={selected} />
      )
    );
  }, [selected]);

  return DetailsComponent;
}

export default ContentDetails;
