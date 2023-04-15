import React from "react";
import Chart from "react-apexcharts";

const AttendanceChart = () => {
  return (
    <React.Fragment>
      <div>
        <Chart
          width={350}
          height={350}
          type="donut"
          series={[60, 40]}
          options={{
            labels: ["Present", "Absent"],
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
          }}
        ></Chart>
      </div>
    </React.Fragment>
  );
};

export default AttendanceChart;
