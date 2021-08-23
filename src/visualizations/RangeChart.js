import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/*
source for default tooptip
https://github.com/recharts/recharts/blob/master/src/component/DefaultTooltipContent.tsx
*/

const CustomizedTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          margin: 0,
          padding: 10,
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          whiteSpace: "nowrap",
        }}
      >
        <p>
          {payload[0].payload["program_name"]}{" "}
          {payload[0].payload["type"] === "R" ? "Regular" : "Full Fee"}
        </p>
        <p>{payload[0].payload["college_name"]}</p>
        <p>{`Rank Range: ${payload[0].payload["lower"]} - ${
          payload[0].payload["upper_minus_lower"] + payload[0].payload["lower"]
        }`}</p>
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
      </div>
    );
  }

  return null;
};
const RangeChart = ({ yaxis_data, currentFrame }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        layout="vertical"
        data={currentFrame}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis tickCount={5} type="number" />
        <YAxis
          type="category"
          dataKey={yaxis_data}
          axisLine={false}
          padding={{ right: 10 }}
        />

        <Tooltip
          // cursor={{ stroke: "#A0A0A0", strokeWidth: 1, fill: "#eeeeee" }}
          content={<CustomizedTooltip />}
        />
        {/*
        <Legend /> */}
        <Bar
          // radius={[10, 0, 0, 10]}
          barSize={15}
          opacity={0}
          dataKey="lower"
          stackId="a"
          fill="#fafafa"
        />
        <Bar
          radius={[10, 10, 10, 10]}
          barSize={15}
          dataKey="upper_minus_lower"
          stackId="a"
          fill="#8884d8"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default RangeChart;
