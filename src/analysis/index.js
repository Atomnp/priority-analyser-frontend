import OneCollegeOneFac from "./OneCollegeOneFac";
import AllCollegeOneFac from "./AllCollegeOneFac";
import OneCollegeAllFac from "./OneCollegeAllFac";

const AnalysisPage = ({
  selectedCollege,
  selectedFaculty,
  setIsAnalysisPage,
}) => {
  setIsAnalysisPage(true);

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
