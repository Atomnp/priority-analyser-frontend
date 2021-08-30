import React, { useState, useEffect } from "react";
import api from "../lib/api";
import MyChart from "../visualizations/RangeChart";
import SeatPieChart from "../visualizations/PieChart";
import {
  Typography,
  Button,
  Grid,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { ResponsiveContainer } from "recharts";

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    primaryColor: {
      color: theme.palette.primary.light,
      fontSize: theme.breakpoints.xs,
    },
  };
});

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

/* transform data to the form that is easy to display in graph */
const transform = (data) => {
  const colors = [
    "#1ABC9C",
    "#16A085",
    "#2ECC71",
    "#27AE60",
    "#3498DB",
    "#2980B9",
    "#9B59B6",
    "#8E44AD",
  ];

  return data
    .map((data, i) => {
      return {
        faculty: `${data["faculty"]} ${data["type"]}`,
        lower: data["lowerLimit"],
        /* to stack data as per required by graph */
        upper_minus_lower: data["upperLimit"] - data["lowerLimit"],
        seats: Number(data["seats"]),
        type: data["type"],
        /* college here represents college code PUL,THA etc for pulchowk and thapathali respectively */
        college: `${data["college"]} ${data["type"]}`,
        fill: colors[i % 8],
        college_name: data["college_name"],
        program_name: data["program_name"],
      };
    })

    .sort((a, b) => a.lower - b.lower);
  // .sort((a, b) => a.faculty.localeCompare(b.faculty));
};
const OneCollegeAllFac = ({ collegeName }) => {
  const noOfDataPerFrame = 8;
  const [data, setData] = useState([]);
  const [dataFrameNo, setDataFrameNo] = useState(0);
  const [currentFrame, setCurrentFrame] = useState([]);

  const classes = useStyles();
  useEffect(() => {
    const data = new FormData();
    data.set("college", collegeName);
    data.set("faculty", "All");
    data.set("rank", 200);

    api.post("/analysis/", data).then((res) => {
      /* sanitize data in required form */
      setData(transform(res.data));

      setDataFrameNo(0);
    });
  }, [collegeName]);

  useEffect(() => {
    setCurrentFrame(
      data.slice(
        0,
        noOfDataPerFrame > data.length ? data.length : noOfDataPerFrame
      )
    );
  }, [data]);

  return (
    <>
      <Grid justify="center" container>
        <Grid item xs={9}>
          <ThemeProvider theme={theme}>
            <Typography
              align="center"
              className={classes.primaryColor}
              variant="h4"
            >
              {currentFrame[0] ? currentFrame[0].college_name : ""}
            </Typography>
          </ThemeProvider>
        </Grid>

        <Grid item xs={12} sm={6}>
          <MyChart yaxis_data={"faculty"} currentFrame={currentFrame} />
        </Grid>
        {/* y axis maa k rakhne vanera pani pathaune, faculty garda one college all faculty aauxa ani college garda all college one faculty dekhauxa aile lai(filter  aafaile manually choose garnu parxa)  */}

        <Grid item xs={12} sm={6}>
          <ResponsiveContainer width="100%" height={400}>
            {/* <MyChart currentFrame={currentFrame} /> */}
            <SeatPieChart yaxis_data={"faculty"} currentFrame={currentFrame} />
          </ResponsiveContainer>
        </Grid>
      </Grid>

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
export default OneCollegeAllFac;
