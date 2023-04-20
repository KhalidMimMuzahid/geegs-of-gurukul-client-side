import React from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ details }) => {
  const series = details?.map((each) => parseInt(Object?.values(each)));
  const labels = details?.map((each) => Object?.keys(each));

  var options = {
    chart: {
      width: 380,
      type: "pie",
      stacked: true,
      stackType: "100",
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="my-8">
      <h4 className="font-poppins text-xl font-bold "> Pie Chart</h4>
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        height={350}
      />
    </div>
  );
};

export default PieChart;
