import React, { useContext } from "react";
import { AuthContext } from "../../../../../contexts/UserProvider/UserProvider";

const GeneralMode = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="">
      <div className="flex flex-col md:flex-row items-start gap-4">
        <img
          src={user?.photoURL}
          className="h-36 w-36 rounded-full border-2 border-green-400 shadow-lg"
          alt=""
        />
        <div className="">
          <div className="flex md:items-center gap-4">
            <h2 className="text-lg md:text-2xl lg:text-3xl font-poppins font-bold">
              {user?.name}{" "}
            </h2>
            <div className="">
              <span className="px-3 py-2 text-sm rounded-2xl text-green-700 bg-green-200">
                {user?.role}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-3">
            <div className=" flex gap-2 items-center">
              <svg
                className="w-6 h-6 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-600">
                {user?.profession?.workAs}
              </h3>
            </div>

            <div className="flex gap-2 items-center">
              <svg
                className="w-6 h-6 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-600">
                {user?.address?.city}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 dm:gap-3 md:gap-8">
        <div className="mt-5">
          <h3 className="text-lg font-bold text-green-400">Email address:</h3>
          <h3 className="text-md text-black">{user?.email}</h3>
        </div>
        <div className="mt-5">
          <h3 className="text-lg font-bold text-green-400">Phone number:</h3>
          <h3 className="text-lg text-black">{user?.phoneNumber}</h3>
        </div>
        <div className="mt-5">
          <h3 className="text-lg font-bold text-green-400">Country:</h3>
          <h3 className="text-lg text-black">{user?.address?.country}</h3>
        </div>
        <div className="mt-5">
          <h3 className="text-lg font-bold text-green-400">State:</h3>
          <h3 className="text-lg text-black">{user?.address?.state}</h3>
        </div>
        <div className="mt-5">
          <h3 className="text-lg font-bold text-green-400">City:</h3>
          <h3 className="text-lg text-black">{user?.address?.city}</h3>
        </div>
      </div>
    </div>
  );
};

export default GeneralMode;
