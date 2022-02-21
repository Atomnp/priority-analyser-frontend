import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(2, 4),
  },
  title:{
    fontSize: "1.1rem",
  },
  fields:{
    fontSize: "1.2rem",
    paddingTop:"0.5rem",
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
        className={classes.form}
      >
        <InputLabel color="secondary" disableAnimation className={classes.title}>
          {type.toUpperCase()}
        </InputLabel>
        <Select className={classes.fields}
          id="demo-customized-select-native"
          value={selected}
          onChange={handleChange}
        >
          {options.map((item_name) => {
            return <MenuItem key={item_name} value={item_name}>{item_name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
