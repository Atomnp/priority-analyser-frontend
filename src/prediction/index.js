import React, { useEffect } from "react";
import { Typography, Button, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Barsvg from "../static/1final.svg";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import Search from "../components/search";
import MyChart from "../visualizations/BarChart";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "0.8rem 0",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1, 0, 0, 0),
    textAlign: "center",
  },
  image: {
    padding: theme.spacing(1, 0, 0, 0),
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      width: "60%",
    },
  },
}));

const PredictionPage = ({
  selectedCollege,
  selectedFaculty,
  rank,
  setRank,
  setShowResult,
  showResult,
  setIsAnalysisPage,
  setCurrentPage,
}) => {
  setIsAnalysisPage(false);
  useEffect(() => {
    setCurrentPage("predict");
  }, []);

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
              className={classes.image}
              width="20%"
              src={Barsvg}
              alt="bar chart svg"
            ></img>
          </div>
          <div className={classes.paper}>
            <Typography variant="h4">IOE Rank Predictor</Typography>
            <Container maxWidth="sm">
              <Typography variant="caption">
                BE Aspirants are required to enter their obtained/expected rank
                below. The prediction is based on the cutoff rank of IOE
                admission list of year 2077.
              </Typography>
            </Container>
            <Search
              onPressEnter={onClickPredict}
              rank={rank}
              onRankChange={(data) => {
                setRank(data);
              }}
            />
            <Button
              className={classes.button}
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
