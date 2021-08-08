import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(4),
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
    <div style={{ width: "90%" }}>
      <FormControl
        fullWidth={true}
        style={{ paddingRight: "3rem" }}
        // size="medium"
        className={classes.margin}
      >
        <InputLabel style={{ fontSize: "1.3rem" }}>
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
