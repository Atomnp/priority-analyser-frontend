import React from "react";
import { Typography, Button, Hidden } from "@material-ui/core";
// import Barsvg from "../static";
// import Barsvg from "../static/3dchart.png";
import { makeStyles } from "@material-ui/core/styles";

import Search from "../components/search";
import MyChart from "../visualizations/BarChart";

// const useStyles = createUseStyles({
//   App: {
//     padding: "1rem 0",
//     // marginLeft: "auto",
//     // marginRight: "auto",
//     // textAlign: "center",
//   },
// });
const useStyles = makeStyles((theme) => {
  return {
    App: {
      padding: "1rem 0",
      // marginLeft: "auto",
      // marginRight: "auto",
      // textAlign: "center",
    },
    primaryColor: {
      color: theme.palette.primary.main,
    },
  };
});
// const theme = createTheme({
//   typography: {
//     fontFamily: ['"Segoe UI Symbol"'].join(","),
//   },
// });

const PredictionPage = ({
  selectedCollege,
  selectedFaculty,
  rank,
  setRank,
  setShowResult,
  showResult,
  setIsAnalysisPage,
}) => {
  // const [showResult, setShowResult] = useState(false);
  const classes = useStyles();

  const onClickPredict = () => {
    if (rank > 0) {
      setShowResult(true);
    }
  };
  setIsAnalysisPage(false);
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
    <div className={classes.App}>
      <div style={{ textAlign: "center" }}>
        {/* <img
          style={{ margin: "0 auto" }}
          width="40%"
          src={Barsvg}
          alt="bar chart svg"
        ></img> */}
      </div>
      {/* <ThemeProvider theme={theme}> */}
      <Typography
        style={{ paddingTop: "4rem" }}
        className={classes.primaryColor}
        align="center"
        variant="h5"
      >
        Decide fast, Decide smart
        <Search
          onPressEnter={onClickPredict}
          rank={rank}
          onRankChange={(data) => {
            setRank(data);
          }}
        />
        <div>
          <Button
            onClick={onClickPredict}
            variant="contained"
            color="primary"
            disabled={rank <= 0}
            style={{ marginTop: "2rem" }}
          >
            Predict
          </Button>
        </div>
      </Typography>
      {/* </ThemeProvider> */}
    </div>
  );
};
export default PredictionPage;
