import React, { useEffect, useState } from "react";
import api from "../lib/api";
import { Button } from "@material-ui/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const colorsMapping = {
  "very high": "#69B34C",
  high: "#ACB334",
  critical: "#FAB733",
  low: "#FF8E15",
  "very low": "#FF4E11",
};
/* transform data to the form that is easy to display in graph */
const foo = (data) => {
  const mapping = {
    "very high": 5,
    high: 4,
    critical: 3,
    low: 2,
    "very low": 1,
  };

  return data.map((data) => {
    return {
      probVal: mapping[data["probablity"]],
      label: `${data["college"]} ${data["program"]} ${data["type"]}`,
      fill: colorsMapping[data["probablity"]],
      probString: data["probablity"] + " chance",
    };
  });
};

const CustomLabel = ({ x, y, fill, value }) => {
  return (
    <text
      dy={-4}
      fontSize="16"
      fontFamily="sans-serif"
      fill={"fill"}
      textAnchor="middle"
    >
      {value}%
    </text>
  );
};

const MyBarChart = ({ selectedCollege, selectedFaculty, rank }) => {
  const noOfDataPerFrame = 8;
  const [data, setData] = useState([]);
  /* data is shown "noOfDataFrame"(eg.10) at a time so this variable helps to determine which frame is that, 
  for example initionally it is zero and if i press next then data that needs to be 
  displayed are data no 10 to data no 20 */
  const [dataFrameNo, setDataFrameNo] = useState(0);
  const [currentFrame, setCurrentFrame] = useState([]);

  useEffect(() => {
    const data = new FormData();
    data.set("college", selectedCollege);
    data.set("faculty", selectedFaculty);
    data.set("rank", rank);

    api.post("/prediction/", data).then((res) => {
      setData(foo(res.data));
      setCurrentFrame(
        foo(res.data).slice(
          0,
          noOfDataPerFrame > data.length ? data.length : noOfDataPerFrame
        )
      );
      setDataFrameNo(0);
    });
  }, [selectedCollege, selectedFaculty, rank]);

  // data1 = foo(data);
  // data1 = data1.slice(0, 10);
  // data1.sort((a, b) => (a.probVal > b.probVal ? -1 : 1));

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
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
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            axisLine={false}
            tickLine={false}
            domain={[0, 5]}
            height={5}
            tickCount={0}
            type="number"
          />
          <YAxis
            type="category"
            dataKey={"label"}
            axisLine={false}
            padding={{ right: 10 }}
          />
          <Tooltip />

          {/* <Legend /> */}

          {/* <Bar name="Score" background dataKey="probVal">
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
          </Bar> */}
          <Bar
            // label={true}
            // name="probString"
            label={CustomLabel}
            // stroke="#FF0000"

            dataKey="probVal"
          />
        </BarChart>
      </ResponsiveContainer>
      <div
        style={{
          display: "flex",
          padding: "1rem",
          justifyContent: "space-around",
        }}
      >
        {/* color haina colors hunu parne variab */}
        {Object.keys(colorsMapping).map((prob) => (
          <div style={{ display: "flex" }}>
            <div
              style={{
                height: "1rem",
                width: "1rem",
                backgroundColor: colorsMapping[prob],
                marginRight: "0.5rem",
              }}
            ></div>
            <p>{prob}</p>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "0 3rem",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          style={{ marginRight: "2rem" }}
          disabled={dataFrameNo <= 0}
          variant="contained"
          color="primary"
          onClick={() => {
            if (dataFrameNo > 0) {
              let a = dataFrameNo - 1;
              let b = a * noOfDataPerFrame + noOfDataPerFrame;
              setCurrentFrame(
                data.slice(
                  a * noOfDataPerFrame,
                  b > data.length ? data.length : b
                )
              );
              setDataFrameNo(a);
            }
          }}
        >
          Previous
        </Button>
        <Button
          disabled={(dataFrameNo + 1) * noOfDataPerFrame >= data.length}
          variant="contained"
          color="primary"
          onClick={() => {
            if ((dataFrameNo + 1) * noOfDataPerFrame <= data.length) {
              let a = dataFrameNo + 1;
              let b = a * noOfDataPerFrame + noOfDataPerFrame;
              setCurrentFrame(
                data.slice(
                  a * noOfDataPerFrame,
                  b > data.length ? data.length : b
                )
              );
              setDataFrameNo(a);
            }
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MyBarChart;
