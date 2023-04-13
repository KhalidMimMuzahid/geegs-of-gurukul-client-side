import React from "react";
import { Link } from "react-router-dom";

const Default = () => {
  const assesments = [
    {
      assesmentName: "School Kids",
      topic: "trigonmitry",
      durtion: "10",
      totalQuestion: 10,
      images:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcVkZtUJilsx2FeUwEUpp37MDl14OoloIIsQ&usqp=CAU",
    },
    {
      assesmentName: "School Kids",
      topic: "trigonmitry",
      durtion: "10",
      totalQuestion: 10,
      images:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcVkZtUJilsx2FeUwEUpp37MDl14OoloIIsQ&usqp=CAU",
    },
    {
      assesmentName: "School Kids",
      topic: "trigonmitry",
      durtion: "10",
      totalQuestion: 10,
      images:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcVkZtUJilsx2FeUwEUpp37MDl14OoloIIsQ&usqp=CAU",
    },
    {
      assesmentName: "School Kids",
      topic: "trigonmitry",
      durtion: "10",
      totalQuestion: 10,
      images:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcVkZtUJilsx2FeUwEUpp37MDl14OoloIIsQ&usqp=CAU",
    },
    {
      assesmentName: "School Kids",
      topic: "trigonmitry",
      durtion: "10",
      totalQuestion: 10,
      images:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcVkZtUJilsx2FeUwEUpp37MDl14OoloIIsQ&usqp=CAU",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-5 pt-4 px-5">
      {assesments?.map((assesment, i) => (
        <div
          key={i}
          class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#">
            <img class="rounded-t-lg" src={assesment.images} alt="" />
          </a>
          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {assesment?.assesmentName}
              </h5>
            </a>
            <p class="mb-3 font-normal font-poppins leading-normal text-gray-700 dark:text-gray-400">
              Topic : {assesment?.topic}
            </p>
            <p class="mb-3 font-normal font-poppins leading-normal text-gray-700 dark:text-gray-400">
              Duration : {assesment?.durtion}
            </p>
            <p class="mb-3 font-normal font-poppins leading-normal text-gray-700 dark:text-gray-400">
              Total Question : {assesment?.totalQuestion}
            </p>
            <Link
              to="/dashboard/assessment/on-processing"
              class="inline-flex items-center font-poppins px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Start
              <svg
                aria-hidden="true"
                class="w-4 h-4 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Default;
