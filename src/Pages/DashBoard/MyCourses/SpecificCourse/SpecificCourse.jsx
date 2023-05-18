import React, { useState } from "react";
import style from "./EachModule/EachModule.module.css";
import { Link } from "react-router-dom";
import ContentDetails from "./ContentDetails/ContentDetails";
import { contents, description } from "./DummyData/dummyData";
import ContentLists from "./ContentLists/ContentLists";

const SpecificCourse = () => {
  const [selected, setSelected] = useState(contents[0].lecturesList[0]);

  const changeLecture = (direction) => {
    if (direction === +1) {
      const moduleIndex = contents.findIndex(
        (element) => element._id === selected.module_id
      );
      const lectureIndex = contents[moduleIndex].lecturesList.findIndex(
        (element) => element._id === selected._id
      );
      try {
        if (lectureIndex === contents[moduleIndex].lecturesList.length - 1) {
          setSelected(contents[moduleIndex + 1].lecturesList[0]);
        } else {
          setSelected(contents[moduleIndex].lecturesList[lectureIndex + 1]);
        }
      } catch {
        console.log("end reached");
      }
    } else if (direction === -1) {
      const moduleIndex = contents.findIndex(
        (element) => element._id === selected.module_id
      );
      const lectureIndex = contents[moduleIndex].lecturesList.findIndex(
        (element) => element._id === selected._id
      );
      try {
        if (lectureIndex === 0) {
          setSelected(
            contents[moduleIndex - 1].lecturesList[
              contents[moduleIndex - 1].lecturesList.length - 1
            ]
          );
        } else {
          setSelected(contents[moduleIndex].lecturesList[lectureIndex - 1]);
        }
      } catch {
        console.log("start reached");
      }
    }
  };

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
              changeLecture={changeLecture}
              setSelected={setSelected}
            />
          </div>

          {/* course list section */}
          <ContentLists
            contents={contents}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>
    </div>
  );
};

export default SpecificCourse;

{
  /* <div className="grid grid-cols-1  gap-7 pt-4 px-5">
          {modules?.map((module, i) => (
            <EachModule key={i} module={module} />
          ))}
        </div> 

<h2 className= {`${style.upcomming}`}>Upcomingggggggggggggggggggggggggggggg</h2>

        <div className="grid grid-cols-1  gap-7 pt-4 px-5">
          <div className={`${style.timeCurs}`}>
            <div>
              <h3>HTML : HTML Advanced Tutoriaxxxxxxxxxxxxxxxxxxxxxxxl </h3>
              <p>Language : English</p>
            </div>
            <Link
              target={"_blank"}
              to={"https://meet.google.com/afk-iedz-jhk?authuser=0"}
              className={`${style.activezoom}`}
            >
              Zoom
            </Link>
          </div>
        </div> 

const modules = [
  { moduleName: "Html", Language: "English", videourl :"https://vimeo.com/tompeyrat/gaucho" },
  { moduleName: "Html", Language: "English", videourl :"https://vimeo.com/tompeyrat/gaucho" },
  { moduleName: "Html", Language: "English", videourl :"https://vimeo.com/tompeyrat/gaucho" },
  { moduleName: "Html", Language: "English", videourl :"https://vimeo.com/tompeyrat/gaucho" },
]; */
}
