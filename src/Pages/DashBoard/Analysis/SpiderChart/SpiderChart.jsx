import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
const SpiderChart = ({ topicsDetails }) => {
  console.log("topicsDetails: ", topicsDetails);
  //   const data= topicsDetails?.map
  return (
    <div>
      <ResponsiveContainer width={350} height={350}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={topicsDetails}>
          <PolarGrid />
          <PolarAngleAxis dataKey="topicName" />
          <PolarRadiusAxis angle={30} domain={[0, 6]} />
          <Radar
            name="questions"
            dataKey="totalQuestions"
            stroke="#8884d8"
            fill="#302d67"
            fillOpacity={0.6}
          />
          <Radar
            name="corrects"
            dataKey="totalCorrect"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpiderChart;
