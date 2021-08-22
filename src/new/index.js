import Chart from "./chart";
import { useEffect } from "react";

const RangeFilter = ({ setCurrentPage, minRank, maxRank, selectedCollege }) => {
  // setCurrentPage("new");
  useEffect(() => {
    setCurrentPage("priority");
  }, []);

  return (
    <div>
      <Chart
        minRank={minRank}
        maxRank={maxRank}
        selectedCollege={selectedCollege}
      />
    </div>
  );
};

export default RangeFilter;
