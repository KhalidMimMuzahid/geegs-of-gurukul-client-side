import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function DropDown({ item,currentPath }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className='relative'>
      <button
        className='flex flex-col w-full md:flex-row md:inline-flex justify-center items-center space-x-2 border border-gray-300 rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{item?.name}</span>
        <svg
          className='-mr-1 ml-2 h-5 w-5'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className='origin-top-right absolute z-[1000] right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='options-menu'
        >
          <div className='py-1 bg-[#c1fdb9]' role='none'>
            {item?.submenu.map((menu, i) => (
              <Link key={i} to={menu?.link}>
                <p className={`px-2 py-2 font-poppins text-center ${currentPath === menu.link ? "bg-green-500 text-white" : "hover:bg-green-300 bg-green-200"}`}
                aria-current={menu.current ? "page" : undefined}
                >{menu?.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropDown;
