import "@blueprintjs/core/lib/css/blueprint.css";
import React, { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import { createUseStyles } from "react-jss";

import Search from "../components/search";
import MyChart from "../visualizations/BarChart";

const useStyles = createUseStyles({
  App: {
    padding: "1rem 0",
    // marginLeft: "auto",
    // marginRight: "auto",
    // textAlign: "center",
  }
});

const PredictionPage = ({ filterData, rank, setRank }) => {
  const [showResult, setShowResult] = useState(false);
  const styles = useStyles();
  return showResult ? (
    <MyChart filterData={filterData} rank={rank} />
  ) : (
    <div className={styles.App}>
      <Typography align="center" variant="h4">
        Decide fast,Decide smart
        <Search
          rank={rank}
          onRankChange={(data) => {
            setRank(data);
          }}
        />
        <div>
          <Button
            onClick={() => setShowResult(true)}
            variant="contained"
            color="primary"
          >
            Predict
          </Button>
        </div>
      </Typography>
    </div>
  );
};
export default PredictionPage;
