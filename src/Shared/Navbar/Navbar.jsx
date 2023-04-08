import React from 'react';

function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src="logo.png" alt="Logo" className="h-8 w-8" />
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
          <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0zm0 6h20v2H0zm0 6h20v2H0z"/></svg>
        </button>
      </div>
      <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 hidden">
        <div className="text-sm lg:flex-grow">
          <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">
            Home
          </a>
          <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">
            About
          </a>
          <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
