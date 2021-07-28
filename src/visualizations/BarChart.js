import React, { useEffect, useState } from "react";
import api from "../lib/api";
import { Button } from "@material-ui/core";
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

/* transform data to the form that is easy to display in graph */
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
  return <text>{"AAAAAAA"}</text>;
};

const Example = ({ filterData, rank }) => {
  const [data, setData] = useState([]);
  /* data is shown 10 at a time so this variable helps to determine which frame is that, 
  for example initionally it is zero and if i press next then data that needs to be 
  displayed are data no 10 to data no 20 */
  const [dataFrameNo, setDataFrameNo] = useState(0);
  const [currentFrame, setCurrentFrame] = useState([]);

  useEffect(() => {
    const data = new FormData();
    data.set("college", filterData[0]["selected"]);
    data.set("faculty", filterData[2]["selected"]);
    data.set("rank", rank);

    api.post("/prediction", data).then((res) => {
      setData(foo(res.data));

      setCurrentFrame(
        foo(res.data).slice(0, 10 > data.length ? data.length : 10)
      );
      setDataFrameNo(0);
    });
  }, [filterData, rank]);

  // data1 = foo(data);
  // data1 = data1.slice(0, 10);
  // data1.sort((a, b) => (a.probVal > b.probVal ? -1 : 1));

  return (
    <div>
      <ResponsiveContainer width="100%" height={500}>
        {/* <h1>for rank =123</h1> */}
        <BarChart
          layout="vertical"
          data={currentFrame}
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
            tick={false}
            axisLine={false}
            type="number"
            dataKey="probVal"
            // ticks={[0, 1, 2, 3, 4, 5]}
          />
          <Tooltip />
          <Legend />
          <Bar
            label={<CustomizedLabel />}
            name="Score"
            background
            dataKey="probVal"
          >
            {currentFrame.map((entry, index) => (
              <React.Fragment key={entry["label"]}>
                <Cell key={entry["label"]} fill={entry.color} />
                <LabelList
                  key={entry["label"]}
                  dataKey="probString"
                  position="inside"
                  fill="#ffffff"
                />
              </React.Fragment>
            ))}
          </Bar>
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
      </ResponsiveContainer>
      <div
        style={{
          padding: "0 2rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          disabled={dataFrameNo <= 0}
          variant="contained"
          color="primary"
          onClick={() => {
            if (dataFrameNo > 0) {
              let a = dataFrameNo - 1;
              let b = a * 10 + 10;
              setCurrentFrame(
                data.slice(a * 10, b > data.length ? data.length : b)
              );
              setDataFrameNo(a);
            }
          }}
        >
          Previous
        </Button>
        <Button
          disabled={(dataFrameNo + 1) * 10 > data.length}
          variant="contained"
          color="primary"
          onClick={() => {
            if ((dataFrameNo + 1) * 10 <= data.length) {
              let a = dataFrameNo + 1;
              let b = a * 10 + 10;
              console.log(a);
              console.log();

              setCurrentFrame(
                data.slice(a * 10, b > data.length ? data.length : b)
              );
              setDataFrameNo(a);
              console.log(currentFrame);
            }
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Example;
