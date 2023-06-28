import React from "react";
import hamburger from "../../../assets/Anouncement/hamburger.svg";
const EachAnnouncement = ({ announcement }) => {
  return (
    <div className="font-poppins p-7 my-4  gap-4 shadow-lg rounded-[16px]">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-[20px]">
          {announcement?.announcement?.announcementTitle}
        </h3>
        <div className="flex items-center gap-7">
          <span>{announcement?.announcement?.triggeredAt}</span>
          {/* <img src="" alt="bookmark-announcement" /> */}
          <button
          //   onClick={() => console.log("")}
          >
            <img src={hamburger} alt="menu-icon" className="w-[5px]" />
          </button>
        </div>
      </div>
      <div>
        <p>{announcement?.announcement?.announcementBody}</p>
      </div>
    </div>
  );
};

export default EachAnnouncement;
