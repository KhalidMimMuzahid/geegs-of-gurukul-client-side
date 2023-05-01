import React from "react";
import bookmarks from "../../assets/Anouncement/bookmarks.svg"
const Bookmark = () => {
  return (
    <div className=" bg-[#C4F0CE] h-screen">
      <div className="relative bg-white w-[90vw] h-4/5 mx-auto my-8 rounded-xl">
        <h3 className="font-poppins p-12 font-medium">Bookmark</h3>
        <div className="flex flex-col items-center justify-center">
          <p className="font-poppins font-normal p-6">You dint add any Bookmark </p>
          <img src={bookmarks} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
