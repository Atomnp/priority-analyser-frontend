import "@blueprintjs/core/lib/css/blueprint.css";

import FirstChart from "../visualizations/TestChar";
import { createUseStyles } from "react-jss";
import api from "../lib/api";

const useStyles = createUseStyles({
  App: {
    // textAlign: "center",
  },
  chart: {
    width: "400px",
    height: "400px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "80px",
  },
});

const PredictionPage = () => {
  api.get("/posts").then((data) => {
    console.log(data);
  });

  const styles = useStyles();
  return (
    <div className={styles.App}>
      <div className={styles.chart}>
        <h1>This is prediction page</h1>
        <FirstChart />
      </div>
    </div>
  );
};
export default PredictionPage;
