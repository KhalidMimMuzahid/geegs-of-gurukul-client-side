import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressbarCir from "../../../../Components/ProgressbarCir/ProgressbarCir";
import PerformanceChart from "./PerformanceChart/PerformanceChart";

const HomePageLeftSiteCard = () => {
  const courses = [
    {
      courseName: "Python",
      time: "2 hr every day",
      totalLecture: "80 lecture",
      date: "Mon to Sat",
    },
    {
      courseName: "PHP",
      time: "2 hr every day",
      totalLecture: "70 lecture",
      date: "Mon to Sat",
    },
    {
      courseName: "Javascript",
      time: "2 hr every day",
      totalLecture: "90 lecture",
      date: "Mon to Sat",
    },
  ];

  return (
    <div className="w-full md:w-3/5 lg:w-3/5">
      {/* Performance card  start */}
      <div className="w-full rounded-xl bg-[#FFC1DB] p-5 font-poppins">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold">Performance</h3>
          <div className="flex items-center">
            <div className="h-4 w-20 rounded-full bg-gradient-to-r from-[#D93FE6] to-[#6B8AEB]"></div>
            <h3 className="text-lg">Week 1</h3>
          </div>
          <div className="">
            <select className=" border-2 border-black bg-transparent">
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>
        <PerformanceChart />
      </div>
      {/* Performance card end */}
      {/* Popular course  start */}
      <div className="w-full rounded-xl bg-[#81FBB8] p-5 mt-6 font-poppins">
        <h3 className="text-lg font-bold">Popular course</h3>
        <div className=" mt-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.length > 0 &&
            courses?.map((course, i) => (
              <div key={i} className="w-full p-4 bg-[#CFFFE5] rounded-2xl">
                <h2 className="text-lg font-semibold">{course?.courseName}</h2>
                <h3 className="text-md my-4">
                  <svg
                    className="inline mr-3"
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
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 3.25C9.67936 3.25 7.45376 4.17187 5.81282 5.81282C4.17187 7.45376 3.25 9.67936 3.25 12C3.25 14.3206 4.17187 16.5462 5.81282 18.1872C7.45376 19.8281 9.67936 20.75 12 20.75C14.3206 20.75 16.5462 19.8281 18.1872 18.1872C19.8281 16.5462 20.75 14.3206 20.75 12C20.75 9.67936 19.8281 7.45376 18.1872 5.81282C16.5462 4.17187 14.3206 3.25 12 3.25ZM4.75 12C4.75 11.0479 4.93753 10.1052 5.30187 9.22554C5.66622 8.34593 6.20025 7.5467 6.87348 6.87348C7.5467 6.20025 8.34593 5.66622 9.22554 5.30187C10.1052 4.93753 11.0479 4.75 12 4.75C12.9521 4.75 13.8948 4.93753 14.7745 5.30187C15.6541 5.66622 16.4533 6.20025 17.1265 6.87348C17.7997 7.5467 18.3338 8.34593 18.6981 9.22554C19.0625 10.1052 19.25 11.0479 19.25 12C19.25 13.9228 18.4862 15.7669 17.1265 17.1265C15.7669 18.4862 13.9228 19.25 12 19.25C10.0772 19.25 8.23311 18.4862 6.87348 17.1265C5.51384 15.7669 4.75 13.9228 4.75 12Z"
                      fill="black"
                    />
                  </svg>
                  {course?.time}
                </h3>
                <h3 className="text-md my-4">
                  <svg
                    className="inline mr-3"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 14H16M8 10H10M8 18H12M10 3H6C5.46957 3 4.96086 3.21071 4.58579 3.58579C4.21071 3.96086 4 4.46957 4 5V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V5C20 4.46957 19.7893 3.96086 19.4142 3.58579C19.0391 3.21071 18.5304 3 18 3H14.5M10 3V1M10 3V5"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {course?.totalLecture}
                </h3>
                <h3 className="text-md">
                  <svg
                    className="inline mr-3"
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
                  {course?.date}
                </h3>

                <div className="mt-4">
                  <button className="px-4 py-2 rounded-full border-2 border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-700">
                    See more <IoIosArrowForward className="inline ml-2" />{" "}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Popular course Card End */}
      {/* Test Card start */}
      <div className="w-full rounded-xl bg-[#D9A8FF] p-5 mt-6 font-poppins">
        <h3 className="text-lg font-bold">Test</h3>
        <div className="flex items-center gap-3 flex-col md:flex-row">
          <div className="flex justify-center items-center gap-3 flex-col lg:flex-row">
            <ProgressbarCir
              percentage={90}
              centerText={`Test-1`}
              circleColor="#8F00FF"
              textColor="#282828"
            ></ProgressbarCir>

            <ProgressbarCir
              percentage={60}
              centerText={`Test-2`}
              circleColor="#8F00FF"
              textColor="#282828"
            ></ProgressbarCir>

            <ProgressbarCir
              percentage={70}
              centerText={`Test-3`}
              circleColor="#8F00FF"
              textColor="#282828"
            ></ProgressbarCir>
          </div>
          <div className="rounded-2xl bg-[#EAD4FC] p-3">
            <h2 className="text-lg font-medium text-center">Start new test</h2>
            <p className="text-md text-center">
              Embrace the challenge of a new test. Let your potential shine.
            </p>
            <div className="mt-4 text-center">
              <button className="px-4 py-2 rounded-full border-2 border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-700">
                Start Test <IoIosArrowForward className="inline ml-2" />{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Test Card End */}
    </div>
  );
};

export default HomePageLeftSiteCard;
