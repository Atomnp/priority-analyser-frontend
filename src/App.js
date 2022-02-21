import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  lightBlue,
  blueGrey,
  deepOrange,
  orange
} from "@material-ui/core/colors";

import PredictionPage from "./prediction";
import AnalysisPage from "./analysis";
import Layout from "./components/Layout";
import api from "./lib/api";
import RangeFilter from "./new";
import FAQ from "./faq";
import Location from "./Location";

function App() {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? blueGrey[800] : lightBlue[800];
  const mainSecondaryColor = darkState ? deepOrange[400] : orange[800];
  const theme = createTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const [rank, setRank] = useState("");
  const [minRank, setMinRank] = useState("100");
  const [maxRank, setMaxRank] = useState("500");

  

  const [showresult, setShowresult] = useState(false);
  const [collegeList, setCollegeList] = useState([]);
  // const [yearList, setYearList] = useState([]);
  const [facultyList, setFacultyList] = useState([]);

  const [selectedCollege, setSelectedCollege] = useState("All");
  // const [selectedYear, setSelectedYear] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("All");

  const [isAnalysisPage, setIsAnalysisPage] = useState(false);
  // const [isNewPage, setIsNewPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(false);



  const handleCollegeSelect = (college) => {
    setSelectedFaculty("All");
    setSelectedCollege(college);
  };

  useEffect(() => {
    /* get the list of college from the backend */
    api.get("/colleges/").then(({ data }) => {
      data.unshift({ code: "All", name: "All" });
      setCollegeList(data);
      setSelectedCollege("All");
      // setSelectedFaculty("All");
    });
  }, []);

  useEffect(() => {
    if (selectedCollege === "All") {
      // if (true) {
      api.get("/programs/").then(({ data }) => {
        if (!isAnalysisPage) {
          data.unshift({ code: "All", name: "All" });
        }
        setFacultyList(data);
        setSelectedFaculty(data[0].code);
      });
    } else {
      api
        .get(`/collegeprogramslist/?college=${selectedCollege}`)
        .then(({ data }) => {
          // let unique = [...new Set(data)];
          let formated = data.map((program) => {
            return {
              code: program["programs"].code,
              name: program["programs"].name,
            };
          });
          if (!(isAnalysisPage && selectedCollege === "All")) {
            formated.unshift({ code: "All", name: "All" });
          }
          setFacultyList(formated);
        });
    }
  }, [selectedCollege, isAnalysisPage]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div>
          <Layout
            collegeList={collegeList}
            facultyList={facultyList}
            selectedCollege={selectedCollege}
            selectedFaculty={selectedFaculty}
            setSelectedCollege={handleCollegeSelect}
            setSelectedFaculty={setSelectedFaculty}
            setShowResult={setShowresult}
            showResult={showresult}
            darkState={darkState}
            handleThemeChange={handleThemeChange}
            currentPage={currentPage}
            minRank={minRank}
            maxRank={maxRank}
            onMinRankChange={setMinRank}
            onMaxRankChange={setMaxRank}
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
                  setIsAnalysisPage={setIsAnalysisPage}
                  setCurrentPage={setCurrentPage}
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
                  setIsAnalysisPage={setIsAnalysisPage}
                  setCurrentPage={setCurrentPage}
                />
              </Route>
              <Route path="/analyse" exact>
                <AnalysisPage
                  selectedCollege={selectedCollege}
                  selectedFaculty={selectedFaculty}
                  setIsAnalysisPage={setIsAnalysisPage}
                  setCurrentPage={setCurrentPage}
                />
              </Route>
              <Route path="/priority" exact>
                <RangeFilter
                  setCurrentPage={setCurrentPage}
                  minRank={minRank}
                  maxRank={maxRank}
                  selectedCollege={selectedCollege}
                />
              </Route>

              <Route path="/location" exact>
                <Location
                  setCurrentPage={setCurrentPage}
                  selectedCollege={selectedCollege}
                  selectedFaculty={selectedFaculty}
                />
              </Route>

              <Route path="/faq" exact>
                <FAQ
                  setCurrentPage={setCurrentPage}
                />
              </Route>
              <Route>
                <h1>404</h1>
              </Route>
            </Switch>
          </Layout>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
