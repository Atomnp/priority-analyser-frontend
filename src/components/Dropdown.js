import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect({
  type,
  options,
  selected,
  handleSelect,
}) {
  const classes = useStyles();

  const handleChange = (event) => {
    handleSelect(event.target.value);
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{type}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected}
          onChange={handleChange}
        >
          {options.map((item_name) => {
            return <MenuItem value={item_name}>{item_name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
