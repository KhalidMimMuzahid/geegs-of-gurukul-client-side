import React from "react";

const HomePageRightSiteCard = () => {
  const notifications = [
    {
      title: "Notification-1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, numquam totam! Tempore, distinctio facere! Necessitatibus a corporis animi vel consequuntur.",
    },
    {
      title: "Notification-2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, numquam totam! Tempore, distinctio facere! Necessitatibus a corporis animi vel consequuntur.",
    },
  ];
  return (
    <div className="w-full md:w-2/5 lg:w-2/5">
      {/* Notification Card  Start */}
      <div className="w-full rounded-xl bg-[#FFFFFF] shadow-lg border-4 border-gray-300 p-5 font-poppins">
        <h3 className="text-lg font-bold">Notification</h3>
        <div className="mt-3 grid grid-cols-1 gap-4">
          {notifications?.length > 0 &&
            notifications.map((notification, i) => {
              return (
                <div className="w-full rounded-lg bg-[#F2F2F2] p-3" key={i}>
                  <h3 className="text-lg font-medium">{notification?.title}</h3>
                  <p className="mt-5 text-lg">
                    {notification?.description?.slice(0, 64)}
                    <span className=" font-bold cursor-pointer">
                      ...See more
                    </span>
                  </p>
                </div>
              );
            })}
        </div>
      </div>
      {/* Notification Card  End */}
      {/* Blog / event / workshop Card  start */}
      <div className="w-full rounded-xl bg-[#FFFFFF] shadow-lg border-4 border-gray-300 p-5 font-poppins mt-6">
        <h3 className="text-lg font-bold mb-4">Blog / event / workshop</h3>
        <h3 className="text-lg text-center mb-2">The Next gen AI tools</h3>
        <h2 className="text-lg font-medium text-center text-green-500">
          ChatGPT & Beyond
        </h2>
        <div className="flex justify-between mt-5">
          <button className="px-4 py-2 rounded bg-transparent border-2 border-gray-500 ">
            <svg
              className="inline mr-3 text-black"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V12H20V19ZM20 10H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V10Z"
                fill="black"
              />
            </svg>
            24 May 2023
          </button>
          <button className="px-4 py-2 rounded bg-transparent border-2 border-gray-500 ">
            <svg
              className="inline mr-3 text-black"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.75 7C12.75 6.80109 12.671 6.61032 12.5303 6.46967C12.3897 6.32902 12.1989 6.25 12 6.25C11.8011 6.25 11.6103 6.32902 11.4697 6.46967C11.329 6.61032 11.25 6.80109 11.25 7V12C11.2499 12.1272 11.2822 12.2522 11.3438 12.3635C11.4054 12.4747 11.4942 12.5685 11.602 12.636L14.602 14.511C14.7707 14.6166 14.9744 14.6508 15.1683 14.6061C15.2643 14.584 15.355 14.5433 15.4353 14.4861C15.5155 14.4289 15.5837 14.3565 15.636 14.273C15.6883 14.1895 15.7236 14.0965 15.7399 13.9993C15.7562 13.9022 15.7532 13.8027 15.7311 13.7067C15.709 13.6107 15.6683 13.52 15.6111 13.4397C15.5539 13.3595 15.4815 13.2913 15.398 13.239L12.75 11.584V7Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 3.25C9.67936 3.25 7.45376 4.17187 5.81282 5.81282C4.17187 7.45376 3.25 9.67936 3.25 12C3.25 14.3206 4.17187 16.5462 5.81282 18.1872C7.45376 19.8281 9.67936 20.75 12 20.75C14.3206 20.75 16.5462 19.8281 18.1872 18.1872C19.8281 16.5462 20.75 14.3206 20.75 12C20.75 9.67936 19.8281 7.45376 18.1872 5.81282C16.5462 4.17187 14.3206 3.25 12 3.25ZM4.75 12C4.75 11.0479 4.93753 10.1052 5.30187 9.22554C5.66622 8.34593 6.20025 7.5467 6.87348 6.87348C7.5467 6.20025 8.34593 5.66622 9.22554 5.30187C10.1052 4.93753 11.0479 4.75 12 4.75C12.9521 4.75 13.8948 4.93753 14.7745 5.30187C15.6541 5.66622 16.4533 6.20025 17.1265 6.87348C17.7997 7.5467 18.3338 8.34593 18.6981 9.22554C19.0625 10.1052 19.25 11.0479 19.25 12C19.25 13.9228 18.4862 15.7669 17.1265 17.1265C15.7669 18.4862 13.9228 19.25 12 19.25C10.0772 19.25 8.23311 18.4862 6.87348 17.1265C5.51384 15.7669 4.75 13.9228 4.75 12Z"
                fill="black"
              />
            </svg>
            2:00 PM
          </button>
        </div>
        <div className="w-full px-5 py-3 mt-5 bg-[#F2F2F2] rounded-2xl flex justify-between items-center">
          <div className="">
            <h1 className="text-2xl font-medium ">
              ₹199 <del className="text-lg font-normal">₹999</del>
            </h1>
            <h1 className=" text-sm md:text-lg font-normal mt-3">
              Offer Ends in 02:20
            </h1>
          </div>
          <div className="">
            <button className="text-white px-3 py-2 md:px-4 md:py-3 bg-black rounded-lg hover:bg-transparent hover:text-black border-2 border-black transition-all duration-500">
              Register now!
            </button>
          </div>
        </div>
      </div>
      {/* Blog / event / workshop Card  End */}
      {/* Refer and earn Card  start */}
      <div className="w-full h-48 rounded-xl bg-[#FFEBA5] p-5 mt-6 font-poppins">
        <div className="">
          <h2 className="font-poppins font-medium text-center px-2 py-2 bg-green-200 text-green-700 rounded-3xl hover:bg-green-500 hover:cursor-pointer hover:text-white">
            Refer and earn
          </h2>
        </div>
        {/* <div className="px-4 py-2 bg-white">
         
        </div> */}
      </div>
      {/* Refer and earn Card End */}
    </div>
  );
};

export default HomePageRightSiteCard;
