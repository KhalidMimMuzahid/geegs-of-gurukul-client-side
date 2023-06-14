import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function DropDown({ item, currentPath }) {
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
    <div className="relative">
      <button
        className={`${
          currentPath?.startsWith(item?.parrentLink)
            ? "bg-[#4BA25D] hover:bg-[#5fb370] text-white"
            : "bg-gray-50 hover:bg-[#5fb370] hover:text-white text-gray-700"
        } flex w-full md:inline-flex justify-center items-center space-x-2 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium duration-200`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={``}>{item?.name}</span>
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-[1000] left-1/2 transform -translate-x-1/2 mt-2 w-56 shadow-lg bg-white border border-[#D0D5DD] rounded-lg"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="bg-white rounded-lg" role="none">
            {item?.submenu.map((menu, i) => (
              <Link key={i} to={menu?.link}>
                <p
                  className={`${i === 0 && "rounded-t-lg"} ${
                    item?.submenu?.length - 1 === i && "rounded-b-lg"
                  } border border-[#D0D5DD]px-2 py-2 font-poppins text-center ${
                    currentPath === menu.link
                      ? "bg-[#4BA25D] text-white"
                      : "hover:bg-[#69c57b] hover:text-white"
                  } duration-200`}
                  aria-current={menu.current ? "page" : undefined}
                >
                  {menu?.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropDown;
