import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import FaqIcon from "@material-ui/icons/LiveHelp";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "&$selected": {
      color: theme.palette.secondary.main,
    },
  },
  selected: {}, // do not remove this, otherwise will not work
}));

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        let path = "";
        if (newValue === 0) {
          path = "/predict";
        } else if (newValue === 1) {
          path = "/analyse";
        } else {
          path = "/faq";
        }
        // const path = newValue === 0 ? "/predict" : "/analyse";
        history.push(path);
      }}
      showLabels
    >
      <BottomNavigationAction
        classes={{
          root: classes.root,
          selected: classes.selected,
        }}
        showLabel={true}
        label="Predict"
        icon={<EmojiObjectsIcon />}
      />
      <BottomNavigationAction
        classes={{
          root: classes.root,
          selected: classes.selected,
        }}
        showLabel={true}
        label="Analyse"
        icon={<InsertChartIcon />}
      />
      <BottomNavigationAction
        classes={{
          root: classes.root,
          selected: classes.selected,
        }}
        showLabel={true}
        label="Help"
        icon={<FaqIcon />}
      />
    </BottomNavigation>
  );
}
