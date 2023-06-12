import React, { useEffect, useState } from "react";
import style from "./EachModule/EachModule.module.css";
import { Link, useLoaderData } from "react-router-dom";
import ContentDetails from "./ContentDetails/ContentDetails";
import ContentLists from "./ContentLists/ContentLists";
import { useQuery } from "@tanstack/react-query";

const SpecificCourse = () => {
  const [selected, setSelected] = useState(null);
  const [selectedModuleLectureList, setSelectedModuleLectureList] = useState(
    []
  );
  const [changingModuleStatus, setChangingModuleStatus] = useState({});
  const [changingAssignmentStatus, setChangingAssignmentStatus] = useState({});
  // const [isLoading, setisLoading] = useState(true);
  const [modules, setModules] = useState([]);
  const [course, setCourse] = useState({});

  // useEffect(() => {
  //   console.log("specific useEffect called");
  //   fetch(
  //     `http://localhost:5000/api/v1/modules/modulesbycourseandbatch?course_id=${"6465c48a3a22da5a8518d942"}&batch_id=${"6469c5010664f5003c9be953"}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setModules(data);
  //       setisLoading(false);
  //     });
  // }, []);

  const modulesTemp = useLoaderData();
  useEffect(() => {
    setModules(modulesTemp);
    const course_id = modulesTemp[0]?.course?.course_id;
    console.log("course_id: ", course_id);
    fetch(`http://localhost:5000/api/v1/courses/course/${course_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Course data: ", data);
        if (data?.success) {
          setCourse(data?.data);
        }
      });
  }, [modulesTemp]);

  // if (isLoading) {
  //   return (
  //     <div>
  //       <downloading className="">downloading</downloading>
  //     </div>
  //   );
  // }

  // console.log("modules: ", selectedModuleLectureList);

  return (
    <div>
      <div className="md:m-auto md:mb-10 ml-10 font-poppins pl-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-1">
          {/* heading */}
          <div className="bg-white col-span-12 text-[#4BA25D] text-2xl font-medium">
            {course?.courseName}
          </div>
          {/* video section */}
          <div className="p-4 bg-white rounded-lg shadow-md col-span-12 lg:col-span-8 h-auto md:h-[90vh]">
            <ContentDetails
              selected={selected}
              modules={modules}
              setSelected={setSelected}
              selectedModuleLectureList={selectedModuleLectureList}
              setChangingModuleStatus={setChangingModuleStatus}
              setChangingAssignmentStatus={setChangingAssignmentStatus}
            />
          </div>

          {/* course list section */}
          <ContentLists
            modules={modules}
            selected={selected}
            setSelected={setSelected}
            setSelectedModuleLectureList={setSelectedModuleLectureList}
            changingModuleStatus={changingModuleStatus}
            changingAssignmentStatus={changingAssignmentStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default SpecificCourse;
