import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
        <p className="label">{`${label} : lower= ${
          payload[0].payload["lower"]
        } , upper =  ${
          payload[0].payload["upper_minus_lower"] + payload[0].payload["lower"]
        }`}</p>
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        <p className="desc">Anything you want can be displayed here.</p>
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
        <Bar opacity={0} dataKey="lower" stackId="a" fill="#fafafa" />
        <Bar dataKey="upper_minus_lower" stackId="a" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default RangeChart;
