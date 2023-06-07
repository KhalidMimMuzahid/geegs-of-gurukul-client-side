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
      <div className="w-full rounded-xl bg-[#51FFFF] p-5 font-poppins">
        <h3 className="text-lg font-bold">Notification</h3>
        <div className="mt-3 grid grid-cols-1 gap-4">
          {notifications?.length > 0 &&
            notifications.map((notification, i) => {
              return (
                <div className="w-full rounded-lg bg-[#CDFFFF] p-3" key={i}>
                  <h3 className="text-lg font-medium">{notification?.title}</h3>
                  <p className="mt-5 text-lg">{notification?.description}</p>
                </div>
              );
            })}
        </div>
      </div>
      {/* Notification Card  End */}
      {/* Blog / event / workshop Card  start */}
      <div className="w-full rounded-xl bg-[#95C6FF] p-5 font-poppins mt-6">
        <h3 className="text-lg font-bold mb-4">Blog / event / workshop</h3>
        <h3 className="text-lg text-white text-center mb-2">
          The Next gen AI tools
        </h3>
        <h2 className="text-lg font-medium text-center text-green-500">
          ChatGPT & Beyond
        </h2>
        <div className="flex justify-between mt-5">
          <button className="px-4 py-2 rounded bg-[#213015] text-white ">
            <svg
              className="inline mr-3"
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.8333 2.83325H3.16667C2.24619 2.83325 1.5 3.57944 1.5 4.49992V16.1666C1.5 17.0871 2.24619 17.8333 3.16667 17.8333H14.8333C15.7538 17.8333 16.5 17.0871 16.5 16.1666V4.49992C16.5 3.57944 15.7538 2.83325 14.8333 2.83325Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.3333 1.16663V4.49996M5.66667 1.16663V4.49996M1.5 7.83329H16.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            24 May 2023
          </button>
          <button className="px-4 py-2 rounded bg-[#213015] text-white ">
            <svg
              className="inline mr-3"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.875 10.5V10.5003C9.87499 10.5214 9.88037 10.5423 9.89063 10.5608C9.90086 10.5793 9.91561 10.5949 9.93351 10.6062C9.93356 10.6062 9.93361 10.6062 9.93367 10.6063L12.4333 12.1685L12.4336 12.1687C12.4617 12.1863 12.4957 12.192 12.5281 12.1846C12.5441 12.1809 12.5593 12.1741 12.5726 12.1645L12.8627 12.5718L12.5727 12.1645C12.586 12.155 12.5974 12.1429 12.6062 12.129C12.6149 12.115 12.6208 12.0995 12.6235 12.0833C12.6262 12.0671 12.6257 12.0505 12.622 12.0345C12.6183 12.0184 12.6115 12.0033 12.602 11.9899C12.5925 11.9766 12.5805 11.9652 12.5667 11.9565L9.875 10.5ZM9.875 10.5V6.33337C9.875 6.30022 9.88817 6.26843 9.91161 6.24499C9.93505 6.22154 9.96685 6.20837 10 6.20837C10.0332 6.20837 10.0649 6.22154 10.0884 6.24499C10.1118 6.26843 10.125 6.30022 10.125 6.33337V10.1534V10.4305L10.36 10.5774L12.5664 11.9564L9.875 10.5Z"
                fill="black"
                stroke="white"
              />
              <path
                d="M5.19748 5.69761C6.47117 4.42392 8.19866 3.70837 9.99992 3.70837C11.8012 3.70837 13.5287 4.42392 14.8024 5.69761C16.076 6.97129 16.7916 8.69878 16.7916 10.5C16.7916 12.3013 16.076 14.0288 14.8024 15.3025C13.5287 16.5762 11.8012 17.2917 9.99992 17.2917C8.19866 17.2917 6.47117 16.5762 5.19748 15.3025C3.9238 14.0288 3.20825 12.3013 3.20825 10.5C3.20825 8.69878 3.9238 6.97129 5.19748 5.69761ZM3.95621 7.99665C3.62746 8.79032 3.45825 9.64098 3.45825 10.5C3.45825 12.235 4.14746 13.8989 5.37426 15.1257C6.60106 16.3525 8.26496 17.0417 9.99992 17.0417C11.7349 17.0417 13.3988 16.3525 14.6256 15.1257C15.8524 13.8989 16.5416 12.235 16.5416 10.5C16.5416 9.64098 16.3724 8.79032 16.0436 7.99665C15.7149 7.20298 15.233 6.48183 14.6256 5.87438C14.0181 5.26693 13.297 4.78508 12.5033 4.45633C11.7096 4.12758 10.859 3.95837 9.99992 3.95837C9.14085 3.95837 8.2902 4.12758 7.49653 4.45633C6.70286 4.78508 5.98171 5.26693 5.37426 5.87438C4.76681 6.48183 4.28496 7.20298 3.95621 7.99665Z"
                fill="black"
                stroke="white"
              />
            </svg>
            2:00 PM
          </button>
        </div>
        <div className="w-full px-5 py-3 mt-5 bg-[#101323] rounded-2xl flex justify-between items-center">
          <div className="text-white">
            <h1 className="text-2xl font-medium ">
              ₹199 <del className="text-lg font-normal">₹999</del>
            </h1>
            <h1 className=" text-sm md:text-lg font-normal mt-3">
              Offer Ends in 02:20
            </h1>
          </div>
          <div className="">
            <button className="text-black px-3 py-2 md:px-4 md:py-3 bg-[#A6EF67] rounded-lg">
              Register now!
            </button>
          </div>
        </div>
      </div>
      {/* Blog / event / workshop Card  End */}
      {/* Refer and earn Card  start */}
      <div className="w-full h-48 rounded-xl bg-[#FFEBA5] p-5 mt-6 font-poppins">
        <h3 className="text-lg font-bold">Refer and earn</h3>
      </div>
      {/* Refer and earn Card End */}
    </div>
  );
};

export default HomePageRightSiteCard;
