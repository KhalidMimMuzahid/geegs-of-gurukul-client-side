import React from "react";
import ReactApexChart from "react-apexcharts";

const StackedColumnChat = ({ categories, correct, wrong, notAttempt }) => {
  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      stackType: "100",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    xaxis: {
      categories,
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "right",
      offsetX: 0,
      offsetY: 50,
    },
  };
  const series = [
    {
      name: "notAttempt",
      data: notAttempt,
    },
    {
      name: "correct",
      data: correct,
    },
    {
      name: "wrong",
      data: wrong,
    },
  ];
  return (
    <div className="my-8">
      <h4 className="font-poppins text-xl font-bold ">
        Topics v/s (correct, wrong & not attempt)
      </h4>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default StackedColumnChat;
