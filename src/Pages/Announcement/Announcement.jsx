import React from "react";
import anouncement from "../../assets/Anouncement/anouncement.svg";
import { useState } from "react";
import hamburger from "../../assets/Anouncement/hamburger.svg";
import save from "../../assets/Anouncement/save-flag.svg";
import UnderConstruction from "../../Components/UnderConstruction/UnderConstruction";
import { AnouncementDropdwon } from "./AnouncementDropdwon";
const Announcement = () => {
  const announcements = [
    {
      _id: 1,
      isVisited: false,
      isSaved: true,
      anouncementTitle: "Your First Lecture has been relised!",
      anouncementBody:
        "Your first lecture is going to be live in few hours. So tighten your belt and get prepaired to fly with us.",
      type: "lecture-realised",
      details: {
        lecture_id: "fdrtfdrtdrdsrs45r567r5",
        lectureName: "Lecture 1",
        startAt: "21 June 2023",
      },
    },
    {
      _id: 2,
      isVisited: false,
      isSaved: false,
      anouncementTitle: "Yeay! Your first assessment has been landed!",
      anouncementBody:
        "Yeay! Your first assessment has been landed! Go and check!",
      type: "assessment-realised",
      details: {
        assessment_id: "tfd6rtydfyuuigtdyu5",
        assessmentName: "Assessment 1",
        scheduledAt: "23 June 2023",
      },
    },
    {
      _id: 3,
      isVisited: false,
      isSaved: false,
      anouncementTitle: "We are launching New Data Science Course Soon!",
      anouncementBody:
        "Good News! We are launching New Data Science Course Soon",
      type: "new-course-launched",
      details: {
        course_id: "tfd6rtydfyuuigtdyu5",
        courseName: "Assessment 1",
        scheduledAt: "23 June 2023",
      },
    },
  ];

  //state for  open or close menu
  const [isOpen, setIsOpen] = useState(false);

  // for setting the status of announcements
  const [status, setStatus] = useState("All");
  // return <UnderConstruction/>,
  return (
    <div className='font-poppins'>
      <div className='relative bg-white w-[90vw] h-4/5 mx-auto my-8 rounded-xl'>
        <div className='flex items-center justify-between'>
          <h3 className='p-2 font-medium'>Announcement</h3>
          <button onClick={() => setIsOpen(true)}>
            <img src={hamburger} alt='menu-icon' className='w-[5px]' />
          </button>
          {isOpen && (
            <AnouncementDropdwon
              status={status}
              setStatus={setStatus}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          )}
        </div>
        {announcements?.length > 0 ? (
          <div>
            {status === "All" &&
              announcements?.map((announcement, i) => (
                <div
                  key={i}
                  className='font-poppins p-7 my-4 flex flex-col gap-4 shadow-lg rounded-[16px]'
                >
                  <div className=''>
                    <div className='flex items-center justify-between'>
                      <h3 className='font-medium text-[20px]'>
                        {announcement?.anouncementTitle}
                      </h3>
                      <div className='flex items-center gap-7'>
                        <span>
                          {announcement?.details?.scheduledAt ||
                            announcement?.details?.startAt}
                        </span>
                        <img src={save} alt='bookmark-announcement' />
                      </div>
                    </div>
                    <div>
                      <p>{announcement?.anouncementBody}</p>
                    </div>
                  </div>
                </div>
              ))}
            {status === "Saved" &&
              announcements
                .filter((saved) => saved?.isSaved === true)
                ?.map((announcement, i) => (
                  <div
                    key={i}
                    className='font-poppins p-7 my-4 flex flex-col gap-4 shadow-lg rounded-[16px]'
                  >
                    <div className=''>
                      <div className='flex items-center justify-between'>
                        <h3 className='font-medium text-[20px]'>
                          {announcement?.anouncementTitle}
                        </h3>
                        <div className='flex items-center gap-7'>
                          <span>
                            {announcement?.details?.scheduledAt ||
                              announcement?.details?.startAt}
                          </span>
                          <img src={save} alt='bookmark-announcement' />
                        </div>
                      </div>
                      <div>
                        <p>{announcement?.anouncementBody}</p>
                      </div>
                    </div>
                  </div>
                ))}
            {status === "Un-Saved" &&
              announcements
                .filter((unsaved) => unsaved?.isSaved === false)
                ?.map((announcement, i) => (
                  <div
                    key={i}
                    className='font-poppins p-7 my-4 flex flex-col gap-4 shadow-lg rounded-[16px]'
                  >
                    <div className=''>
                      <div className='flex items-center justify-between'>
                        <h3 className='font-medium text-[20px]'>
                          {announcement?.anouncementTitle}
                        </h3>
                        <div className='flex items-center gap-7'>
                          <span>
                            {announcement?.details?.scheduledAt ||
                              announcement?.details?.startAt}
                          </span>
                          <img src={save} alt='bookmark-announcement' />
                        </div>
                      </div>
                      <div>
                        <p>{announcement?.anouncementBody}</p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <p className='font-poppins font-normal'>
              You dont receive any Announcement{" "}
            </p>
            <img src={anouncement} alt='announcement-icon' />
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
