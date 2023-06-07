import React from "react";

export const AnouncementDropdwon = ({
  setStatus,
  status,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div
      className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'
      role='menu'
      aria-orientation='vertical'
      aria-labelledby='options-menu'
    >
      <div className='py-1' role='none'>
        <p
          onClick={() => {
            setStatus("All");
            setIsOpen(false);
            console.log("status now", status);
          }}
          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          role='menuitem'
        >
          All
        </p>
        <p
          onClick={() => {
            setStatus("Saved");
            setIsOpen(false);
            console.log("status now", status);
          }}
          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          role='menuitem'
        >
          Saved
        </p>
        <p
          onClick={() => {
            setStatus("Un-Saved");
            setIsOpen(false);
            console.log("status now", status);
          }}
          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          role='menuitem'
        >
          Un-Saved
        </p>
      </div>
    </div>
  );
};
