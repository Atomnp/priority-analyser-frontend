import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PredictionPage from "./prediction";
import AnalysisPage from "./analysis";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import BarChart from "./visualizations/BarChart";
import api from "./lib/api";

function App() {
  const [rank, setRank] = useState("");
  const [showresult, setShowresult] = useState(false);
  const [currentPage, setCurrentPage] = useState("predict");

  const [collegeList, setCollegeList] = useState([]);
  // const [yearList, setYearList] = useState([]);
  const [facultyList, setFacultyList] = useState([]);

  const [selectedCollege, setSelectedCollege] = useState("");
  // const [selectedYear, setSelectedYear] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");

  useEffect(() => {
    /* get the list of college from the backend */

    console.log("before requesting programs");
    api.get("/colleges/").then(({ data }) => {
      data.unshift({ code: "All", name: "All" });
      console.log("no array", data);
      setCollegeList(data);
      setSelectedCollege("All");
    });

    console.log("useEffect with empty dependency array");
  }, []);

  useEffect(() => {
    if (selectedCollege == "All") {
      // if (true) {
      api.get("/programs").then(({ data }) => {
        console.log("All selected");
        console.log(data);
        data.unshift({ code: "All", name: "All" });
        setFacultyList(data);
      });
    } else {
      api
        .get(`/collegeprogramslist/?college=${selectedCollege}`)
        .then(({ data }) => {
          // let unique = [...new Set(data)];
          console.log("selected college =", selectedCollege);
          console.log("data adsfasdf", data);
          let formated = data.map((program) => {
            return {
              code: program["programs"].code,
              name: program["programs"].name,
            };
          });
          formated.unshift({ code: "All", name: "All" });
          setFacultyList(formated);
        });
    }
    setSelectedFaculty("All");
  }, [selectedCollege]);

  return (
    <Router>
      <div>
        <Layout
          currentPage={currentPage}
          collegeList={collegeList}
          facultyList={facultyList}
          selectedCollege={selectedCollege}
          selectedFaculty={selectedFaculty}
          setSelectedCollege={setSelectedCollege}
          setSelectedFaculty={setSelectedFaculty}
          setShowResult={setShowresult}
          showResult={showresult}
        >
          <Switch>
            <Route path="/" exact>
              <PredictionPage
                selectedCollege={selectedCollege}
                selectedFaculty={selectedFaculty}
                rank={rank}
                setRank={setRank}
                setShowResult={setShowresult}
                showResult={showresult}
              />
            </Route>
            <Route path="/predict" exact>
              <PredictionPage
                selectedCollege={selectedCollege}
                selectedFaculty={selectedFaculty}
                rank={rank}
                setRank={setRank}
                setShowResult={setShowresult}
                showResult={showresult}
              />
            </Route>
            <Route path="/analyse" exact>
              <AnalysisPage
                selectedCollege={selectedCollege}
                selectedFaculty={selectedFaculty}
              />
            </Route>
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
