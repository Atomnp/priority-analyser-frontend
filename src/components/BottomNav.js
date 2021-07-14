import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {},
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        console.log(newValue)
        const path = newValue == 0 ? "/predict":"/analyse";
        history.push(path);
      }}
      showLabels
      className={classes.root}
    >
     
    <BottomNavigationAction showLabel="true" label="Predict" icon={<EmojiObjectsIcon />} />   
    <BottomNavigationAction showLabel="true" label="Analyse" icon={<InsertChartIcon />} />

    </BottomNavigation>
  );
}
