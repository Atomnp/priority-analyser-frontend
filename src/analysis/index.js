// import PieChart from "../visualizations/PieChart";

// const AnalysisPage = ({ filterData, rank, setRank }) => {
//   return <PieChart />;
// };
// export default AnalysisPage;
import "@blueprintjs/core/lib/css/blueprint.css";
import React from "react";
// import { createUseStyles } from "react-jss";
import MyChart from "../visualizations/RangeChart";
import { Typography } from "@material-ui/core";

// const useStyles = createUseStyles({
//   App: {
//     padding: "1rem 0",
//     // marginLeft: "auto",
//     // marginRight: "auto",
//     // textAlign: "center",
//   },
// });

const AnalysisPage = ({ filterData }) => {
  return (
    <>
      <Typography variant="h3">
        Range Chart For Each Faculty Only works if one college is selected
      </Typography>
      <MyChart filterData={filterData} />
    </>
  );
};
export default AnalysisPage;
