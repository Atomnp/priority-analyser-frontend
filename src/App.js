import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PredictionPage from "./prediction";
import AnalysisPage from "./analysis";
import Layout from "./components/Layout";
import { useState } from "react";
import BarChart from "./visualizations/BarChart";

function App() {
  const getSelected = (filters) => {
    let selected = [];
    Object.entries(filters).forEach(([key, value]) => {
      selected.push({ name: key, selected: value["selected"] });
    });
    return selected;
  };

  const [rank, setRank] = useState("");
  const [currentPage, setCurrentPage] = useState("predict");
  const [filters, setFilters] = useState({
    college: {
      list: ["All", "PUL", "PUR"],
      selected: "All",
      handleSelect: (college) => {
        let filtersnew = { ...filters };
        filtersnew["college"]["selected"] = college;
        setFilters(filtersnew);
      },
    },
    year: {
      list: ["All", "2077", "2076"],
      selected: "All",
      handleSelect: (year) => {
        let filtersnew = { ...filters };
        filtersnew["year"]["selected"] = year;
        setFilters(filtersnew);
      },
    },
    faculty: {
      list: ["All", "BCT", "BCE", "BEX", "BEL"],
      selected: "All",
      handleSelect: (faculty) => {
        let filtersnew = { ...filters };
        filtersnew["faculty"]["selected"] = faculty;
        setFilters(filtersnew);
      },
    },
  });
  // const path = useRouteMatch();
  // console.log("path = ", path);
  return (
    <Router>
      <div>
        <Layout currentPage={currentPage} filters={filters}>
          <Switch>
            <Route path="/" exact>
              <PredictionPage
                filterData={getSelected(filters)}
                rank={rank}
                setRank={setRank}
              />
            </Route>
            <Route path="/predict" exact>
              <PredictionPage
                filterData={getSelected(filters)}
                rank={rank}
                setRank={setRank}
              />
            </Route>
            <Route path="/analyse" exact>
              <AnalysisPage filterData={getSelected(filters)} />
            </Route>
            <Route path="/result" exact>
              <BarChart filterData={getSelected(filters)} rank={rank} />
            </Route>
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
