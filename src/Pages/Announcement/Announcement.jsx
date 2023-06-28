import React, { useContext, useEffect } from "react";
import anouncement from "../../assets/Anouncement/anouncement.svg";
import { useState } from "react";
import hamburger from "../../assets/Anouncement/hamburger.svg";
// import save from "../../assets/Anouncement/save-flag.svg";
import UnderConstruction from "../../Components/UnderConstruction/UnderConstruction";
import { AnouncementDropdwon } from "./AnouncementDropdwon";
import { SocketContext } from "../../contexts/SocketProvider/SocketProvider";
import EachAnnouncement from "./EachAnnouncement/EachAnnouncement";

const Announcement = () => {
  const { announcements } = useContext(SocketContext);

  //state for  open or close menu
  const [isOpen, setIsOpen] = useState(false);

  // for setting the status of announcements
  const [status, setStatus] = useState("All");
  // return <UnderConstruction />;
  return (
    <div className="font-poppins overflow-y-auto h-[90vh]">
      <div className=" rounded-xl">
        <div className="flex items-center justify-between">
          <h3 className="p-2 font-medium">Announcement</h3>
          <button onClick={() => setIsOpen(true)}>
            <img src={hamburger} alt="menu-icon" className="w-[5px]" />
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
            {announcements?.map((announcement) => (
              <EachAnnouncement
                key={announcement?._id}
                announcement={announcement}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="font-poppins font-normal">
              You dont receive any Announcement{" "}
            </p>
            <img src={anouncement} alt="announcement-icon" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
