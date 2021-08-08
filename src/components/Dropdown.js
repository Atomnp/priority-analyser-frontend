import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2, 4),
  },
}));

export default function CustomizedSelects({
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
    <div style={{ width: "70%" }}>
      <FormControl
        fullWidth={true}
        className={classes.margin}
      >
        <InputLabel color="secondary" disableAnimation style={{ fontSize: "1.3rem" }}>
          {type.toUpperCase()}
        </InputLabel>
        <Select
          id="demo-customized-select-native"
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
