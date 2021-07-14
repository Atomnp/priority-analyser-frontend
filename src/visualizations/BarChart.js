import React from "react";
import { useHistory } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: " A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: " B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: " C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: " D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: " E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: " F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: " G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const foo = (data) => {
  const mapping = {
    "very high": 5,
    high: 4,
    critical: 3,
    low: 2,
    "very low": 1,
  };

  const color = {
    "very high": "#69B34C",
    high: "#ACB334",
    critical: "#FAB733",
    low: "#FF8E15",
    "very low": "#FF4E11",
  };

  return data.map((data) => {
    return {
      probVal: mapping[data["probablity"]],
      label: `${data["college"]} ${data["program"]} ${data["type"]}`,
      color: color[data["probablity"]],
      probString: data["probablity"] + " chance",
    };
  });
};

const CustomizedLabel = (props) => {
  console.log("Customized label", props);
  return <text>{"AAAAAAA"}</text>;
};

const Example = () => {
  const history = useHistory();
  let data = history.location.state;
  data = foo(data);
  console.log(data);
  data = data.slice(0, 10);
  data.sort((a, b) => (a.probVal > b.probVal ? -1 : 1));
  return (
    <ResponsiveContainer width="100%" height={500}>
      {/* <h1>for rank =123</h1> */}
      <BarChart
        layout="vertical"
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <YAxis
          type="category"
          dataKey="label"
          width={200}
          axisLine={false}
          orientation="right"
          tick={5}
        />
        <XAxis
          orientation="top"
          // tick={false}
          axisLine={false}
          type="number"
          dataKey="probVal"
          ticks={[0, 1, 2, 3, 4, 5]}
        />
        <Tooltip />
        <Legend />
        <Bar
          label={<CustomizedLabel />}
          name="Score"
          background
          dataKey="probVal"
        >
          {data.map((entry, index) => (
            <>
              <Cell fill={entry.color} />
              <LabelList
                dataKey="probString"
                position="inside"
                fill="#ffffff"
              />
            </>
          ))}
        </Bar>
        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Example;
