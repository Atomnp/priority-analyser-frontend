// import PieChart from "../visualizations/PieChart";

// const AnalysisPage = ({ filterData, rank, setRank }) => {
//   return <PieChart />;
// };
// export default AnalysisPage;
import "@blueprintjs/core/lib/css/blueprint.css";
import React, { useState, useEffect } from "react";
import api from "../lib/api";
// import { createUseStyles } from "react-jss";
import MyChart from "../visualizations/RangeChart";
import SeatPieChart from "../visualizations/PieChart";
import { Typography, Button } from "@material-ui/core";
import { ResponsiveContainer } from "recharts";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// const useStyles = createUseStyles({
//   charts: {
//     display: "flex",
//   },
// });
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
      seats: Number(data["seats"]),
      college: `${data["college"]} ${data["type"]}`,
    };
  });
};
const AnalysisPage = ({ filterData }) => {
  let classes = useStyles();

  const noOfDataPerFrame = 8;
  const [data, setData] = useState([]);
  const [dataFrameNo, setDataFrameNo] = useState(0);
  const [currentFrame, setCurrentFrame] = useState([]);
  useEffect(() => {
    const data = new FormData();
    data.set("college", filterData[0]["selected"]);
    data.set("faculty", filterData[2]["selected"]);
    data.set("rank", 200);

    api.post("/analysis", data).then((res) => {
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
  }, [filterData]);
  return (
    <>
      <Typography variant="h4">Range Chart For Each Faculty</Typography>
      <div className={classes.charts}>
        <ResponsiveContainer width="100%" height={500}>
          {/* y axis maa k rakhne vanera pani pathaune, faculty garda one college all faculty aauxa ani college garda all college one faculty dekhauxa aile lai(filter  aafaile manually choose garnu parxa)  */}
          <MyChart yaxis_data={"faculty"} currentFrame={currentFrame} />
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={500}>
          {/* <MyChart currentFrame={currentFrame} /> */}
          <SeatPieChart currentFrame={currentFrame} />
        </ResponsiveContainer>
      </div>

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
              console.log(a);
              console.log();

              setCurrentFrame(
                data.slice(
                  a * noOfDataPerFrame,
                  b > data.length ? data.length : b
                )
              );
              setDataFrameNo(a);
              console.log(currentFrame);
            }
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
};
export default AnalysisPage;
