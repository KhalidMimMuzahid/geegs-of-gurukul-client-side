import React from 'react';
import Chart from "react-apexcharts"

const DoughnutChart = () => {
    return (
        <React.Fragment>
            <div>
                <Chart
                    width={450}
                    height={450}
                    type='donut'
                    series={[
                        45,35,55,15,20
                    ]}
                    options={{
                        labels: ['Math', 'Physics', 'Biology', 'Python', 'Web Development'],
                        title: {
                            text:'Subject Name'
                        },
                        plotOptions: {
                            pie: {
                                donut: {
                                    labels: {
                                        show: true,
                                        total: {
                                            show:true
                                        }
                                    }
                                }
                            }
                        }
                    }}
                ></Chart>
            </div>
        </React.Fragment>
    );
};

export default DoughnutChart;