import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import PredictionPage from "./prediction";
import AnalysisPage from "./analysis";
import MyDrawer from "./components/Drawer";
import { useState } from "react";
import { Icon } from "@blueprintjs/core";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <Router>
      <div style={{ display: "flex" }}>
        {!isDrawerOpen && (
          <Icon
            icon="menu"
            onClick={() => {
              setIsDrawerOpen(!isDrawerOpen);
            }}
          ></Icon>
        )}
        {isDrawerOpen && (
          <MyDrawer
            setIsDrawerOpen={setIsDrawerOpen}
            toggleDrawer={toggleDrawer}
            isDrawerOpen={isDrawerOpen}
          />
        )}
        <Switch>
          <Route path="/" exact>
            <PredictionPage />
          </Route>
          <Route path="/analyze" exact>
            {/* <TestDrawer /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
