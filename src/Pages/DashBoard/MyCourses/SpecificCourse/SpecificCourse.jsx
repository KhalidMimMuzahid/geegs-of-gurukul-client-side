import React, { useState } from "react";
import style from "./EachModule/EachModule.module.css";
import EachModule from "./EachModule/EachModule";
import { Link } from "react-router-dom";
import AccordionItem from "./AccordionItem";
import ContentDetails from "./ContentDetails/ContentDetails";

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

const contents = [
  {
    _id: "4trd12212df87543htttr4",
    moduleName: "html for beginners",
    lecturesList: [
      {
        _id: "fjedui4537yhbnerfgy4",
        module_id: "4trd12212df87543htttr4",
        lectureName: "lecture 1.1",
        duration: "1 hours",
      },
      {
        _id: "4tertr4554rtgtrfttry4",
        module_id: "4trd12212df87543htttr4",
        lectureName: "lecture 1.2",
        duration: "1 hours",
      },
      {
        _id: "fjgfgf45ret45rt45y4",
        module_id: "4trd12212df87543htttr4",
        lectureName: "lecture 1.3",
        duration: "1 hours",
      },
      {
        _id: "ftrgtrgtrgtrtr5445y4",
        module_id: "4trd12212df87543htttr4",
        lectureName: "lecture 1.4",
        duration: "1 hours",
      },
    ],
  },
  {
    _id: "4trdfidf87543htttr4",
    moduleName: "css for beginners",
    lecturesList: [
      {
        _id: "fjedui4537yhbnerfgy4",
        module_id: "4trdfidf87543htttr4",
        lectureName: "lecture 2.1",
        duration: "1 hours",
      },
      {
        _id: "4tertr4554rtgtrfttry4",
        module_id: "4trdfidf87543htttr4",
        lectureName: "lecture 2.2",
        duration: "1 hours",
      },
      {
        _id: "fjgfgf45ret45rt45y4",
        module_id: "4trdfidf87543htttr4",
        lectureName: "lecture 2.3",
        duration: "1 hours",
      },
      {
        _id: "ftrgtrgtrgtrtr5445y4",
        module_id: "4trdfidf87543htttr4",
        lectureName: "lecture 2.4",
        duration: "1 hours",
      },
    ],
  },
  {
    _id: "4trdfi121287543htttr4",
    moduleName: "advanced JavaScript",
    lecturesList: [
      {
        _id: "fjedui4537yhbnerfgy4",
        module_id: "4trdfi121287543htttr4",
        lectureName: "lecture 3.1",
        duration: "1 hours",
      },
      {
        _id: "4tertr4554rtgtrfttry4",
        module_id: "4trdfi121287543htttr4",
        lectureName: "lecture 3.2",
        duration: "1 hours",
      },
      {
        _id: "fjgfgf45ret45rt45y4",
        module_id: "4trdfi121287543htttr4",
        lectureName: "lecture 3.3",
        duration: "1 hours",
      },
      {
        _id: "ftrgtrgtrgtrtr5445y4",
        module_id: "4trdfi121287543htttr4",
        lectureName: "lecture 3.4",
        duration: "1 hours",
      },
    ],
  },
];

const SpecificCourse = () => {
  const [selectedLecture, setSelectedLecture] = useState(
    contents[0].lecturesList[0]
  );

  const percentCompleted = 40;

  return (
    <div>
      <div className="md:m-auto md:mb-10 ml-10 font-poppins pl-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-1">
          {/* heading */}
          <div className="pl-4 bg-white col-span-12 text-green-400 text-2xl font-medium">
            Excellency in Professional Carrer
          </div>
          {/* video section */}
          <div className="p-4 bg-white rounded-lg shadow-md col-span-12 lg:col-span-8">
            <ContentDetails
              description={description}
              selectedLecture={selectedLecture}
              contents = {contents}
              setSelectedLecture = {setSelectedLecture}
            />
          </div>
          {/* course list section */}
          <div className="p-4 bg-white rounded-lg shadow-md col-span-12 lg:col-span-4">
            {/* Course progress tracker */}
            <div className="mb-2 grid grid-cols-2">
              <p className="col-span-1">Course progress</p>
              <div className="w-full h-2 col-span-1 my-auto rounded-md border">
                <div
                  className="bg-green-400 h-full rounded-md"
                  style={{ width: `${percentCompleted}%` }}
                ></div>
              </div>
            </div>
            {/* search box */}
            <input
              type="text"
              placeholder="search lesson"
              className="w-full rounded-md border-2 border-green-300 focus:border-green-400 focus:ring-0"
            />
            {/* Accordions */}
            <div className="overflow-y-scroll mt-4" style={{ height: "550px" }}>
              <div className="w-full max-w-lg mx-auto">
                {contents.map((content) => (
                  <AccordionItem
                    content={content}
                    key={content._id}
                    setSelectedLecture={setSelectedLecture}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificCourse;

{/* <div className="grid grid-cols-1  gap-7 pt-4 px-5">
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
]; */}