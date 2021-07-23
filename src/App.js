import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PredictionPage from "./prediction";
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

  return (
    <Router>
      <div>
        <Layout filters={filters}>
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
              <h1>I am analysis page</h1>
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
