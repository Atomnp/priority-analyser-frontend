import React from "react";
import { Typography, Button, Hidden } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Barsvg from "../static/1final.svg";
import Grid from '@material-ui/core/Grid';

import Search from "../components/search";
import MyChart from "../visualizations/BarChart";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "0.8rem 0"
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1, 0, 0, 0),
    textAlign: 'center',
  },
}));

const PredictionPage = ({
  selectedCollege,
  selectedFaculty,
  rank,
  setRank,
  setShowResult,
  showResult,
}) => {
  // const [showResult, setShowResult] = useState(false);
  const classes = useStyles();

  const onClickPredict = () => {
    if (rank > 0) {
      setShowResult(true);
    }
  };

  return showResult ? (
    <div>
      <Hidden smUp implementation="css">
        <div style={{ textAlign: "center" }}>
          <Search
            onPressEnter={onClickPredict}
            rank={rank}
            onRankChange={(data) => {
              setRank(data);
            }}
          />
          <div>
            <MyChart
              selectedCollege={selectedCollege}
              selectedFaculty={selectedFaculty}
              rank={rank}
            />
          </div>
        </div>
      </Hidden>
      <Hidden xsDown implementation="css">
        <div style={{ display: "flex" }}>
          <div style={{ width: "70%" }}>
            <MyChart
              selectedCollege={selectedCollege}
              selectedFaculty={selectedFaculty}
              rank={rank}
            />
          </div>
          <div style={{}}>
            <Search
              onPressEnter={onClickPredict}
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
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.paper}>
            <img
              width="20%"
              src={Barsvg}
              alt="bar chart svg"
            ></img>
          </div>
          <div className={classes.paper}>
            <Typography variant="h4">
              Prediction
            </Typography>
            <Typography variant="body1">
              BE Rank and Priority Analyser
            </Typography>
            <Typography variant="subtitle2">
              Year - 2077
            </Typography>
            <Search
              onPressEnter={onClickPredict}
              rank={rank}
              onRankChange={(data) => {
                setRank(data);
              }}
            />
            <Button className={classes.button}
              onClick={onClickPredict}
              variant="contained"
              color="primary"
              disabled={rank <= 0}
            >
              Predict
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>

  );
};
export default PredictionPage;
