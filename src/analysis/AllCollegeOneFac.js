import "@blueprintjs/core/lib/css/blueprint.css";
import React, { useState, useEffect } from "react";
import api from "../lib/api";

import MyChart from "../visualizations/RangeChart";
import SeatPieChart from "../visualizations/PieChart";
import { Typography, Button } from "@material-ui/core";
import { ResponsiveContainer } from "recharts";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  /* we can do some javascript with theme object here */

  return {
    charts: {
      [theme.breakpoints.up("sm")]: {
        display: "flex",
      },
    },
  };
});

/* transform data to the form that is easy to display in graph */
const transform = (data) => {
  const colors = [
    "#0d47a1",
    "#1565c0",
    "#1976d2",
    "#1e88e5",
    "#2196f3",
    "#42a5f5",
    "#64b5f6",
    "#90caf9",
  ];

  return data.map((data, i) => {
    return {
      faculty: `${data["faculty"]} ${data["type"]}`,
      lower: data["lowerLimit"],
      /* to stack data as per required by graph */
      upper_minus_lower: data["upperLimit"] - data["lowerLimit"],
      seats: Number(data["seats"]),
      college: `${data["college"]} ${data["type"]}`,
      fill: colors[i % 8],
    };
  });
};
const OneCollegeOneFac = ({ facultyName }) => {
  let classes = useStyles();

  const noOfDataPerFrame = 8;
  const [data, setData] = useState([]);
  const [dataFrameNo, setDataFrameNo] = useState(0);
  const [currentFrame, setCurrentFrame] = useState([]);
  useEffect(() => {
    const data = new FormData();
    data.set("college", "All");
    data.set("faculty", facultyName);
    data.set("rank", 200);

    api.post("/analysis/", data).then((res) => {
      /* sanitize data in required form */
      setData(transform(res.data));
      setCurrentFrame(
        transform(res.data).slice(
          0,
          noOfDataPerFrame > data.length ? data.length : noOfDataPerFrame
        )
      );
      setDataFrameNo(0);
      // console.log("analysis data", res.data);
    });
  }, [facultyName]);
  return (
    <>
      <Typography variant="h4">Range Chart For Each Faculty</Typography>
      <div className={classes.charts}>
        {/* y axis maa k rakhne vanera pani pathaune, faculty garda one college all faculty aauxa ani college garda all college one faculty dekhauxa aile lai(filter  aafaile manually choose garnu parxa)  */}
        <MyChart yaxis_data={"college"} currentFrame={currentFrame} />

        <ResponsiveContainer width="100%" height={400}>
          {/* <MyChart currentFrame={currentFrame} /> */}
          <SeatPieChart yaxis_data={"college"} currentFrame={currentFrame} />
        </ResponsiveContainer>
      </div>

      <div
        style={{
          padding: "0 2rem",
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
    </>
  );
};
export default OneCollegeOneFac;
