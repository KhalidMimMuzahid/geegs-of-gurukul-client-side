import React from "react";
import Chart from "react-apexcharts";
const PieChart = ({ details }) => {
  const series = details?.map((each) => parseInt(Object?.values(each)));
  const labels = details?.map((each) => Object?.keys(each));

  var options = {
    labels: labels,
    title: {},
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              fontSize: 15,
            },
          },
        },
      },
    },
  };

  return (
    <div className="my-8">
      {/* <h4 className="font-poppins text-xl font-bold "> Pie Chart</h4> */}

      <Chart
        width={400}
        height={400}
        type="donut"
        series={series}
        options={options}
      ></Chart>
    </div>
  );
};

export default PieChart;
