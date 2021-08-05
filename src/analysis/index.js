import "@blueprintjs/core/lib/css/blueprint.css";
import OneCollegeOneFac from "./OneCollegeOneFac";
import AllCollegeOneFac from "./AllCollegeOneFac";
import OneCollegeAllFac from "./OneCollegeAllFac";

const AnalysisPage = ({ selectedCollege, selectedFaculty }) => {
  return (
    <div>
      {selectedCollege === "All" && selectedFaculty !== "All" && (
        <AllCollegeOneFac facultyName={selectedFaculty} />
      )}
      {selectedCollege !== "All" && selectedFaculty === "All" && (
        <OneCollegeAllFac collegeName={selectedCollege} />
      )}
      {selectedCollege !== "All" && selectedFaculty !== "All" && (
        <OneCollegeOneFac
          selectedFaculty={selectedFaculty}
          selectedCollege={selectedCollege}
        />
      )}
    </div>
  );
};
export default AnalysisPage;
