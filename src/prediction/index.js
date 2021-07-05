import "@blueprintjs/core/lib/css/blueprint.css";
import React, { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import { createUseStyles } from "react-jss";
import api from "../lib/api";
import Search from "../components/search";

const useStyles = createUseStyles({
  App: {
    padding: "1rem 0",
    // marginLeft: "auto",
    // marginRight: "auto",
    // textAlign: "center",
  },
  chart: {
    width: "400px",
    height: "400px",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const PredictionPage = ({ filterData }) => {
  const [fetching, setFetching] = useState(false);
  const [rank, setRank] = React.useState("");

  const onClickPredict = (prop) => {
    /* prepare the form containg, rank and filters for college year and faculty and make post request */
    setFetching(true);
    const data = new FormData();
    api.post("/predict", data).then((res) => {
      console.log(res);
      setFetching(false);
    });
  };

  api.get("/programs/").then((data) => {
    console.log(data);
  });

  const styles = useStyles();
  return (
    <div className={styles.App}>
      <Typography align="center" variant="h4">
        Decide fast,Decide smart
        <Search rank={rank} onRankChange={setRank} />
        <div>
          <Button onClick={onClickPredict} variant="contained" color="primary">
            Predict
          </Button>
        </div>
      </Typography>
    </div>
  );
};
export default PredictionPage;
