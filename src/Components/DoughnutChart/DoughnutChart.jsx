import React from "react";
import Chart from "react-apexcharts";

const DoughnutChart = () => {
  return (
    <React.Fragment>
      <div>
        <Chart
          width={400}
          height={400}
          type="donut"
          series={[20, 20, 20, 20, 20]}
          options={{
            labels: [
              "Assesment Mark",
              "Lecture",
              "Assignment",
              "Quiz",
              "Remaining",
            ],
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

export default DoughnutChart;
