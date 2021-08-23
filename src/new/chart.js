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
import { Grid, Typography, createTheme } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    primaryColor: {
      color: theme.palette.primary.light,
      fontSize: theme.breakpoints.xs,
    },
  };
});

const CustomizedTooltip = ({ active, payload, label }) => {
  //   console.log(payload);
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
          Admitted Students : {payload[0].payload["count"]}{" "}
          {/* {payload[0].payload["collegeprogram__program__name"]} */}
          {/* {payload[0].payload["type"] === "R" ? "Regular" : "Full Fee"} */}
        </p>
        <p>{payload[0].payload["college_name"]}</p>

        <p>{payload[0].payload["program_name"]}</p>
      </div>
    );
  }

  return null;
};
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
const theme = createTheme();

theme.typography.h4 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.8rem",
  },
};
const MyBarChart = ({ selectedCollege, minRank, maxRank }) => {
  const classes = useStyles();
  /* transform data to the form that is easy to display in graph */
  const transformData = (data) => {
    // console.log("inside transformData", data);

    return (
      data
        .map((data, i) => {
          const label =
            selectedCollege === "All"
              ? "collegeprogram__college"
              : "collegeprogram__program";
          return {
            label: `${data[label]}`,
            college_name: data["collegeprogram__college__name"],
            count: data["count"],
            program_name: data["collegeprogram__program__name"],
            fill: "#2196f3",
          };
        })
        // .sort((a, b) => a.program_name - b.program_name)
        .sort((a, b) => Number(b.count) - Number(a.count))
    );
  };

  const noOfDataPerFrame = 8;
  let [data, setData] = useState([]);
  /* data is shown "noOfDataFrame"(eg.10) at a time so this variable helps to determine which frame is that,
  for example initionally it is zero and if i press next then data that needs to be
  displayed are data no 10 to data no 20 */
  const [dataFrameNo, setDataFrameNo] = useState(0);
  let [currentFrame, setCurrentFrame] = useState([]);

  const fetchData = () => {
    /* should make a request to api includeing college selected,min-rank and max-rank */
    if (
      Number(maxRank) < Number(minRank) ||
      Number(minRank) < 1 ||
      Number(maxRank) < 1
    ) {
      console.log("not valid");
      return;
    }
    let form = new FormData();
    form.append("min_rank", minRank);
    form.append("max_rank", maxRank);
    form.append("college", selectedCollege);

    api.post("/rank/", form).then((res) => {
      console.log("res data", res.data);
      setData(transformData(res.data));
      setDataFrameNo(0);
    });
  };
  useEffect(fetchData, [minRank, maxRank, selectedCollege]);

  useEffect(() => {
    setCurrentFrame(
      data.slice(
        0,
        noOfDataPerFrame > data.length ? data.length : noOfDataPerFrame
      )
    );
  }, [data]);

  if (data.length == 0)
    return (
      <div>
        <h3>No students in this range!</h3>
      </div>
    );
  return (
    currentFrame.length > 0 && (
      <div>
        <Grid justify="center" container>
          <Grid item xs={9}>
            <ThemeProvider theme={theme}>
              <Typography
                align="center"
                className={classes.primaryColor}
                variant="h4"
              >
                {selectedCollege === "All"
                  ? "All Colleges"
                  : currentFrame[0]["college_name"]}
              </Typography>
            </ThemeProvider>
          </Grid>
          <Grid item xs={12} sm={10}>
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
                  domain={[0, 200]}
                  height={50}
                  tickCount={10}
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
          </Grid>
        </Grid>

        <div
          style={{
            padding: "0 3rem",
            marginBottom: "2rem",
            marginTop: "2rem",
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
    )
  );
};

export default MyBarChart;
