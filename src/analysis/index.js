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

// const useStyles = createUseStyles({
//   App: {
//     padding: "1rem 0",
//     // marginLeft: "auto",
//     // marginRight: "auto",
//     // textAlign: "center",
//   },
// });
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
const AnalysisPage = ({ filterData }) => {
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
      <MyChart currentFrame={currentFrame} />
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
