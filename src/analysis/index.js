import "@blueprintjs/core/lib/css/blueprint.css";
import OneCollegeOneFac from "./OneCollegeOneFac";
import AllCollegeOneFac from "./AllCollegeOneFac";
import OneCollegeAllFac from "./OneCollegeAllFac";

const AnalysisPage = ({ filterData }) => {
  return (
    <div>
      {/* filterData is a array in the form
        0: {name: "college", selected: "PUL"}
        1: {name: "year", selected: "All"}
        2: {name: "faculty", selected: "All"}
      */}
      {filterData[0]["selected"] === "All" &&
        filterData[2]["selected"] !== "All" && (
          <AllCollegeOneFac facultyName={filterData[2]["selected"]} />
        )}
      {filterData[0]["selected"] !== "All" &&
        filterData[2]["selected"] === "All" && (
          <OneCollegeAllFac collegeName={filterData[0]["selected"]} />
        )}
      {filterData[0]["selected"] !== "All" &&
        filterData[2]["selected"] !== "All" && <OneCollegeOneFac />}
    </div>
  );
};
export default AnalysisPage;
