import { useEffect } from "react";
import api from "../lib/api";
import Chart from "./chart";

const RangeFilter = ({ setCurrentPage, minRank, maxRank, selectedCollege }) => {
  setCurrentPage("new");

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
