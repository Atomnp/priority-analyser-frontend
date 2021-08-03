import "@blueprintjs/core/lib/css/blueprint.css";
import React, { useState } from "react";
import { Typography, Button, Hidden } from "@material-ui/core";
import { createUseStyles } from "react-jss";

import Search from "../components/search";
import MyChart from "../visualizations/BarChart";

const useStyles = createUseStyles({
  App: {
    padding: "1rem 0",
    // marginLeft: "auto",
    // marginRight: "auto",
    // textAlign: "center",
  },
});

const PredictionPage = ({ filterData, rank, setRank }) => {
  const [showResult, setShowResult] = useState(false);
  const styles = useStyles();
  return showResult ? (
    <div>
      <Hidden smUp implementation="css">
        <div style={{ textAlign: "center" }}>
          <Search
            rank={rank}
            onRankChange={(data) => {
              setRank(data);
            }}
          />
          <div>
            <MyChart filterData={filterData} rank={rank} />
          </div>
        </div>
      </Hidden>
      <Hidden xsDown implementation="css">
        <div style={{ display: "flex" }}>
          <div style={{ width: "70%" }}>
            <MyChart filterData={filterData} rank={rank} />
          </div>
          <div style={{}}>
            <Search
              rank={rank}
              onRankChange={(data) => {
                setRank(data);
              }}
            />
            {/* <Button color="primary">Reset</Button> */}
          </div>
        </div>
      </Hidden>
    </div>
  ) : (
    <div className={styles.App}>
      <Typography align="center" variant="h4">
        Decide fast, Decide smart
        <Search
          rank={rank}
          onRankChange={(data) => {
            setRank(data);
          }}
        />
        <div>
          <Button
            onClick={() => (rank ? setShowResult(true) : "")}
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
