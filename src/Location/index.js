import React from "react";
import api from "../lib/api";
import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
  makeStyles,
  Box,
} from "@material-ui/core";

// import { useTheme } from "@material-ui/core/styles";

import DistrictMap from "./District";
import ZoneMap from "./Zone";

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    primaryColor: {
      // color: theme.palette.text.primary,
      color: theme.palette.primary.light,
      fontSize: theme.breakpoints.xs,
    },
  };
});

const theme = createTheme();
theme.typography.h4 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.8rem",
  },
};

const Location = ({ setCurrentPage, selectedFaculty, selectedCollege }) => {
  useEffect(() => {
    setCurrentPage("location");
  }, []);
  // const theme = useTheme();
  const classes = useStyles();

  const styles = {
    bgColor: theme.palette.background.default,
    titleTextColor: theme.palette.text.primary,
    rowTitleColor: theme.palette.text.primary,
    rowContentColor: theme.palette.text.secondary,
    arrowColor: theme.palette.secondary.main,
  };

  const [districtData, setDistrictData] = useState([]);
  const [zoneData, setZoneData] = useState([]);
  const [collegeData, setCollegeData] = useState("All Colleges");
  const [programData, setProgramData] = useState("All Programs");
  const [maxValue, setMaxValue] = useState(1);

  useEffect(() => {
    const data = new FormData();
    data.set("college", selectedCollege);
    data.set("faculty", selectedFaculty);

    api.post("/district/", data).then((res) => {
      console.log(res.data);
      setCollegeData(res.data[0]["college"]);
      setProgramData(res.data[1]["program"]);
      setDistrictData(res.data[2]["location"]);
      setMaxValue(res.data[2]["location"][0].count);
    });
  }, [selectedCollege, selectedFaculty]);

  const transformDistrict = (districtData) => {
    // Change array to dictionary
    let districtDict = {};
    districtData.forEach((district) => {
      districtDict[district.district__name.toLowerCase()] = district.count;
    });
    return districtDict;
  };

  useEffect(() => {
    const data = new FormData();
    data.set("college", selectedCollege);
    data.set("faculty", selectedFaculty);

    api.post("/zone/", data).then((res) => {
      console.log(res.data);
      // setCollegeData(res.data[0]["college"]);
      // setProgramData(res.data[1]["program"]);
      setZoneData(res.data);
      setMaxValue(res.data[0].count);
    });
  }, [selectedCollege, selectedFaculty]);

  const transformZone = (zoneData) => {
    // Change array to dictionary
    let zoneDict = {};
    zoneData.forEach((zone) => {
      zoneDict[zone.district__zone__name.toLowerCase()] = zone.count;
    });
    return zoneDict;
  };

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Typography
          style={{ marginBottom: 6 }}
          align="center"
          className={classes.primaryColor}
          variant="h4"
        >
          {collegeData}
        </Typography>
        <Typography
          align="center"
          className={classes.primaryColor}
          variant="h5"
        >
          {programData}
        </Typography>
      </ThemeProvider>
      <Grid style={{ maxWidth: "80%", margin: "auto" }}>
        <DistrictMap
          hoverColor="red"
          stroke="#000"
          strokeWidth={1}
          // onMapClick={(val) => console.log(val)}
          districtData={transformDistrict(districtData)}
          maxValue={maxValue}
        />

        <ZoneMap
          hoverColor="red"
          stroke="#000"
          strokeWidth={1}
          // onMapClick={(val) => console.log(val)}
          zoneData={transformZone(zoneData)}
          maxValue={maxValue}
        />
      </Grid>
    </Box>
  );
};

export default Location;
