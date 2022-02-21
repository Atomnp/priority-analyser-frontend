import React from 'react'
import districtMapData from './metadata/districtMapData'
import red from '@material-ui/core/colors/red';

import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
const defaultColor = 'green'
const pathColor = '#f0ece1'
const getRandomColor = () => { return '#f0ece1'}


const useStyles = makeStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 'inherit',
        borderRadius: '5px',
    }
  }));


export default function DistrictMap({
  onMapClick,
  sectorClassName,
  containerClassName,

  stroke,
  strokeWidth,
  districtData,
  maxValue
}) {
  const handleMapClick = (item) => {
    if (onMapClick) {
      onMapClick({ name: item.name, zip: item.zip, province: item.province, area: item.area })
    }
  }



  function camelize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const classes = useStyles();
  // console.log(districtData)
  return (
    <div style={{ maxWidth: '100%' }} className={containerClassName || ''}>
      <svg viewBox='0 0 1026.077 519.136'>
        <g transform='translate(-52.379 -15.971)'>
          {districtMapData.map((item, index) => {
          // red[districtData[item.name.toLowerCase()] * 1000 / maxValue]
            // console.log(`rgba(${districtData[item.name.toLowerCase()]/maxValue * 255}, ${255}, ${255}, 1)`)
            // console.log(districtData[item.name.toLowerCase()]/maxValue)
            // console.log(districtData)

            const numberOfStudents  = districtData.hasOwnProperty(item.name.toLowerCase()) ? districtData[item.name.toLowerCase()] : 0

            const normalized =  numberOfStudents/ maxValue * 80
            
            const color = `hsl(200, 100%, ${100-normalized}%)`

            return (
        
              <Tooltip key={item.zip} classes={{ tooltip: classes.tooltip }} title={camelize(item.name) + " " + numberOfStudents} placement="top" arrow>
              <path
                className={sectorClassName || ''}
                style={{ cursor: 'pointer', fill: color }}
                key={index}
                stroke={stroke || '#000'}
                strokeWidth={strokeWidth || '1px'}
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

            )
          })}
        </g>
      </svg>
    </div>
  )
}