import "@blueprintjs/core/lib/css/blueprint.css";
import { Button } from "@blueprintjs/core";
import { createUseStyles } from "react-jss";
import FirstChart from "./visualizations/TestChar";
import api from "./lib/api";

const useStyles = createUseStyles({
  App: {
    textAlign: "center",
  },
  chart: {
    width: "400px",
    height: "400px",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

function App() {
  api.get("/posts").then((data) => {
    console.log(data);
  });
  const styles = useStyles();
  return (
    <div className={styles.App}>
      <p>Hello World</p>
      <Button
        intent="success"
        text="Blueprintjs loaded sucessfully"
        onClick={() => {
          console.log("clickded");
        }}
      />
      {/* First Chart has the component that expects parent to have certain width and height so setting this using div tag */}
      <div className={styles.chart}>
        <FirstChart />
      </div>
    </div>
  );
}

export default App;
