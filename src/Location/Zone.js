import React from "react";
import zoneMapData from "./metadata/zoneMapData";
import red from "@material-ui/core/colors/red";

import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
const defaultColor = "green";
const pathColor = "#f0ece1";
const getRandomColor = () => {
  return "#f0ece1";
};

const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: "inherit",
    borderRadius: "5px",
  },
}));

export default function ZoneMap({
  onMapClick,
  sectorClassName,
  containerClassName,

  stroke,
  strokeWidth,
  zoneData,
  maxValue,
}) {
  const handleMapClick = (item) => {
    if (onMapClick) {
      onMapClick({
        name: item.name,
        code: item.code,
      });
    }
  };

  function camelize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const classes = useStyles();
  // console.log(districtData)
  return (
    <div style={{ maxWidth: "100%" }} className={containerClassName || ""}>
      <svg viewBox="0 0 799.861 460.414">
        <g transform="translate(-0.251 6.456)">
          {zoneMapData.map((item, index) => {
            // red[districtData[item.name.toLowerCase()] * 1000 / maxValue]
            // console.log(`rgba(${districtData[item.name.toLowerCase()]/maxValue * 255}, ${255}, ${255}, 1)`)
            // console.log(districtData[item.name.toLowerCase()]/maxValue)
            // console.log(districtData)

            const numberOfStudents = zoneData.hasOwnProperty(
              item.name.toLowerCase()
            )
              ? zoneData[item.name.toLowerCase()]
              : 0;

            const normalized = (numberOfStudents / maxValue) * 80;

            const color = `hsl(200, 100%, ${100 - normalized}%)`;

            return (
              <Tooltip
                key={item.zip}
                classes={{ tooltip: classes.tooltip }}
                title={camelize(item.name) + " " + numberOfStudents}
                placement="top"
                arrow
              >
                <path
                  className={sectorClassName || ""}
                  style={{ cursor: "pointer", fill: color }}
                  key={index}
                  transform={item.code === "MA" ? "translate(597 306.286)" : ""}
                  stroke={stroke || "#000"}
                  strokeWidth={strokeWidth || "1px"}
                  d={item.shape}
                  onClick={() => handleMapClick(item)}
                  onMouseOver={(event) => {
                    // event.target.style.fill = hoverColor || defaultColor
                  }}
                  onMouseOut={(event) => {
                    // event.target.style.fill = pathColor
                  }}
                ></path>
              </Tooltip>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
