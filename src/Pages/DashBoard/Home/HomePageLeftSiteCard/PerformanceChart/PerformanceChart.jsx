import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PerformanceChart = () => {
  const [option, setOption] = useState({
    series: [
      { name: "Class", data: [2, 5, 3, 2.5, 4, 1.5, 5] },
      { name: "Class", data: [0, 3, 5, 0, 2.5, 4, 2] },
    ],
    options: {
      chart: {
        id: "realtime",
        height: 350,
        type: "line",
        animations: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {},
      markers: {
        size: 0,
      },
      colors: ["#CC00FF", "#00492F"],
      xaxis: {
        categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
      yaxis: {
        max: ["01 Hr", "02 Hr", "03 Hr", "04 Hr", "05 Hr"],
      },
      legend: {
        show: false,
      },
    },
  });
  return (
    <div id="chart">
      <ReactApexChart
        options={option?.options}
        series={option?.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default PerformanceChart;
