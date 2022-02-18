import React from "react";

import { lightBlue, grey } from "@material-ui/core/colors";
import { useTheme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

// import {ZonalMap, DistrictMap } from 'react-nepal-map'

import  DistrictMap  from "./District";

const Location = ({ setCurrentPage }) => {
  setCurrentPage("location");
  const theme = useTheme();

  const styles = {
    bgColor: theme.palette.background.default,
    titleTextColor: theme.palette.text.primary,
    rowTitleColor: theme.palette.text.primary,
    rowContentColor: theme.palette.text.secondary,
    arrowColor: theme.palette.secondary.main,
  };
  return (
    <div  style={{ maxWidth: '80%', margin: "auto" }} >
       <DistrictMap
        hoverColor='red'
        stroke='#000'
        strokeWidth={1}
        onMapClick={(val) => console.log(val)}
      />
      {/* <ZonalMap
        hoverColor='red'
        stroke='#000'
        strokeWidth={1}
        onMapClick={(val) => console.log(val)}
      /> */}
    </div>
  );
};

export default Location;
