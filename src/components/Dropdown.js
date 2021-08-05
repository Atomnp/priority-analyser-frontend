// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

// export default function SimpleSelect({
//   type,
//   options,
//   selected,
//   handleSelect,
// }) {
//   const classes = useStyles();

//   const handleChange = (event) => {
//     handleSelect(event.target.value);
//   };

//   return (
//     <div style={{ padding: "1.5rem" }}>
//       <FormControl className={classes.formControl}>
//         <InputLabel id="demo-simple-select-label">{type}</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={selected}
//           onChange={handleChange}
//         >
// {options.map((item_name) => {
//   return <MenuItem value={item_name}>{item_name}</MenuItem>;
// })}
//         </Select>
//       </FormControl>
//     </div>
//   );
// }

import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
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
        <NativeSelect
          // fullWidth={true}
          size
          id="demo-customized-select-native"
          value={selected}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {options.map((item_name) => {
            return <option value={item_name}>{item_name}</option>;
          })}
        </NativeSelect>
      </FormControl>
    </div>
  );
}
