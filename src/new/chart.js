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

  return (
    data
      .map((data) => {
        return {
          label: `${data["collegeprogram__college"]}`,
          //   college_name: data["college_name"],
          count: data["count"],
          program_name: data["program_name"],
          fill: "red",
        };
      })
      // .sort((a, b) => a.program_name - b.program_name)
      .sort((a, b) => Number(a.count) - Number(b.count))
  );
};

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
        {/* <p className="label">{`${label} : lower= ${
          payload[0].payload["college_name"]
        } , upper =  ${
          payload[0].payload["upper_minus_lower"] + payload[0].payload["lower"]
        }`}</p> */}
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        <p>{payload[0].payload["college_name"]}</p>
        <p>
          {payload[0].payload["program_name"]}{" "}
          {payload[0].payload["type"] === "R" ? "Regular" : "Full Fee"}
        </p>
      </div>
    );
  }

  return null;
};
const MyBarChart = ({ selectedCollege, minRank, maxRank }) => {
  const noOfDataPerFrame = 8;
  const [data, setData] = useState([]);
  /* data is shown "noOfDataFrame"(eg.10) at a time so this variable helps to determine which frame is that, 
  for example initionally it is zero and if i press next then data that needs to be 
  displayed are data no 10 to data no 20 */
  const [dataFrameNo, setDataFrameNo] = useState(0);
  const [currentFrame, setCurrentFrame] = useState([]);

  useEffect(() => {
    /* should make a request to api includeing college selected,min-rank and max-rank */
    if (
      Number(maxRank) < Number(minRank) ||
      Number(minRank) < 1 ||
      Number(maxRank) < 1
    )
      return;
    let form = new FormData();
    form.append("min_rank", minRank);
    form.append("max_rank", maxRank);
    form.append("college", selectedCollege);

    api.post("/rank/", form).then((res) => {
      setData(res.data);
      setCurrentFrame(
        foo(res.data).slice(
          0,
          noOfDataPerFrame > data.length ? data.length : noOfDataPerFrame
        )
      );
      setDataFrameNo(0);
      console.log(res.data);
    });
  }, [minRank, maxRank, selectedCollege]);

  //   console.log("current frame", currentFrame);
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
          <XAxis
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
            height={5}
            tickCount={0}
            type="number"
          />
          <YAxis
            type="category"
            dataKey={"label"}
            axisLine={false}
            tickLine={false}
            padding={{ right: 10 }}
            width={100}
            // orientation="right"
          />
          <Tooltip
            // cursor={{ stroke: "#A0A0A0", strokeWidth: 1, fill: "#eeeeee" }}
            content={<CustomizedTooltip />}
          />

          <Bar radius={[10, 10, 10, 10]} barSize={15} dataKey="count" />
        </BarChart>
      </ResponsiveContainer>

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
