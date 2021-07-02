import React  from "react";

import { makeStyles } from "@material-ui/core/styles";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

// export default function CircularUnderLoad() {
//   return
// }

const useStyles = makeStyles((theme) => ({
  margin: {
    width: "90%",
    marginTop: "2rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function InputAdornments({ rank, onRankChange }) {
  const classes = useStyles();

  return (
    <div>
      <FormControl fullWidth className={classes.margin} variant="outlined">
        {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel> */}
        <OutlinedInput
          id="outlined-adornment-amount"
          value={rank}
          onChange={(event) => onRankChange(event.target.value)}
          startAdornment={
            <InputAdornment position="start">Rank</InputAdornment>
          }
          // labelWidth={60}
        />
      </FormControl>
    </div>
  );
}
