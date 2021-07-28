import React, { useEffect, useState } from "react";
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

import api from "../lib/api";

/* transform data to the form that is easy to display in graph */
const transform = (data) => {
  const color = {
    "very high": "#69B34C",
    high: "#ACB334",
    critical: "#FAB733",
    low: "#FF8E15",
    "very low": "#FF4E11",
  };

  return data.map((data) => {
    return {
      faculty: `${data["faculty"]} ${data["type"]}`,
      lower: data["lowerLimit"],
      /* to stack data as per required by graph */
      upper_minus_lower: data["upperLimit"] - data["lowerLimit"],
      seats: data["seats"],
    };
  });
};

/* 
source for default tooptip
https://github.com/recharts/recharts/blob/master/src/component/DefaultTooltipContent.tsx 
*/

const CustomizedTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    console.log(payload);
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
const RangeChart = ({ filterData }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const data = new FormData();
    data.set("college", filterData[0]["selected"]);
    data.set("faculty", filterData[2]["selected"]);
    data.set("rank", 200);

    api.post("/analysis", data).then((res) => {
      /* sanitize data in required form */
      setData(transform(res.data));
      console.log("analysis data", res.data);
    });
  }, [filterData]);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        layout="vertical"
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis tickCount={5} type="number" />
        <YAxis type="category" dataKey="faculty" />

        <Tooltip
          cursor={{ stroke: "#A0A0A0", strokeWidth: 5, fill: "#eeeeee" }}
          content={<CustomizedTooltip />}
        />

        <Legend />
        <Bar opacity={0} dataKey="lower" stackId="a" fill="#fafafa" />
        <Bar dataKey="upper_minus_lower" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default RangeChart;
