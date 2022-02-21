import React from "react";
import { useState, useEffect } from "react";
import api from "../lib/api";

import { useTheme } from "@material-ui/core/styles";

import  DistrictMap  from "./District";

const Location = ({ setCurrentPage, selectedFaculty, selectedCollege }) => {
  useEffect(() => {
    setCurrentPage("location");
  }, []);
  const theme = useTheme();

  const styles = {
    bgColor: theme.palette.background.default,
    titleTextColor: theme.palette.text.primary,
    rowTitleColor: theme.palette.text.primary,
    rowContentColor: theme.palette.text.secondary,
    arrowColor: theme.palette.secondary.main,
  };



  const [districtData, setDistrictData] = useState([]);
  const [maxValue, setMaxValue] = useState(1);

  useEffect(() => {
    const data = new FormData();
    data.set("college", selectedCollege);
    data.set("faculty", selectedFaculty);

    api.post("/district/", data).then((res) => {
      // console.log(res.data);
      setDistrictData(res.data);
      setMaxValue(res.data[0].count);
    });
    
  }, [selectedCollege, selectedFaculty]);

  const transform = (districtData)=>{
    // Change array to dictionary
    let districtDict = {};
    districtData.forEach((district) => {
      districtDict[district.district__name.toLowerCase()] = district.count;
    })
    return districtDict
  }


  return (
    <div  style={{ maxWidth: '80%', margin: "auto" }} >
       <DistrictMap
        hoverColor='red'
        stroke='#000'
        strokeWidth={1}
        // onMapClick={(val) => console.log(val)}
        districtData={transform(districtData)}
        maxValue = {maxValue}
      />
    </div>
  );
};

export default Location;
