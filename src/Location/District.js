import React from 'react'
import districtMapData from './metadata/districtMapData'
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
const defaultColor = '#f0ece1'
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
  randomSectorColor,
  sectorClassName,
  containerClassName,
  color,
  hoverColor,
  provinceColor,
  stroke,
  strokeWidth
}) {
  const handleMapClick = (item) => {
    if (onMapClick) {
      onMapClick({ name: item.name, zip: item.zip, province: item.province, area: item.area })
    }
  }


  

  const classes = useStyles();

  return (
    <div style={{ maxWidth: '100%' }} className={containerClassName || ''}>
      <svg viewBox='0 0 1026.077 519.136'>
        <g transform='translate(-52.379 -15.971)'>
          {districtMapData.map((item, index) => {
          
            return (
        
        <Tooltip classes={{ tooltip: classes.tooltip }} title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut expedita repellat? Delectus corrupti, minus iusto dolor magnam distinctio molestiae atque rerum fugit enim voluptatum quasi quis sed velit reprehenderit?" placement="top" arrow>
              <path
                className={sectorClassName || ''}
                style={{ cursor: 'pointer', fill: pathColor }}
                key={index}
                stroke={stroke || '#000'}
                strokeWidth={strokeWidth || '1px'}
                d={item.shape}
                onMouseOver={(event) => {
                  event.target.style.fill = hoverColor || defaultColor
                }}
                onClick={() => handleMapClick(item)}
                onMouseOut={(event) => {
                  event.target.style.fill = pathColor
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