import React, { useEffect, useState } from "react";
import style from "./EachModule/EachModule.module.css";
import { Link } from "react-router-dom";
import ContentDetails from "./ContentDetails/ContentDetails";
import ContentLists from "./ContentLists/ContentLists";
import { useQuery } from "@tanstack/react-query";

const SpecificCourse = () => {
  const [selected, setSelected] = useState(null);
  const [selectedModuleLectureList, setSelectedModuleLectureList] = useState(
    []
  );
  const [changingModuleStatus, setChangingModuleStatus] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    console.log("specific useEffect called");
    fetch(
      `http://localhost:5000/modulesbycourseandbatch?course_id=${"6465c48a3a22da5a8518d942"}&batch_id=${"6469c5010664f5003c9be953"}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setModules(data);
        setisLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        <downloading className="">downloading</downloading>
      </div>
    );
  }

  return (
    <div>
      <div className="md:m-auto md:mb-10 ml-10 font-poppins pl-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-1">
          {/* heading */}
          <div className="bg-white col-span-12 text-green-400 text-2xl font-medium">
            Excellency in Professional Carrer
          </div>
          {/* video section */}
          <div className="p-4 bg-white rounded-lg shadow-md col-span-12 lg:col-span-8">
            <ContentDetails
              selected={selected}
              modules={modules}
              setSelected={setSelected}
              selectedModuleLectureList={selectedModuleLectureList}
              setChangingModuleStatus={setChangingModuleStatus}
            />
          </div>

          {/* course list section */}
          <ContentLists
            modules={modules}
            selected={selected}
            setSelected={setSelected}
            setSelectedModuleLectureList={setSelectedModuleLectureList}
            changingModuleStatus={changingModuleStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default SpecificCourse;
