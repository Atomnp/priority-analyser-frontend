import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import api from "../lib/api";
import Grid from "@material-ui/core/Grid";
import SeatPieChart from "../visualizations/PieChart";

const useStyles = makeStyles({
  // table: {
  //   minWidth: 400,
  // },
});

const transform = (data) => {
  let result = [];
  result.push({ type: "Regular", seats: data[1]["seats"], fill: "#441DCE" });
  if (data.length === 2) {
    result.push({ type: "Full Fee", seats: data[0]["seats"], fill: "#7859E7" });
  }
  return result;
};
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
export default function CustomizedTables({ selectedCollege, selectedFaculty }) {
  const classes = useStyles();
  const [regularData, setRegularData] = useState();
  const [payingData, setPayingData] = useState();
  const [pieChartData, setPieChartData] = useState();
  const [hasRegular, setHasRegular] = useState(false);

  useEffect(() => {
    api
      .get(
        `/collegeprograms/?college=${selectedCollege}&program=${selectedFaculty}`
      )
      .then(({ data }) => {
        setPayingData(data[0]);

        if (data.length === 2) {
          setRegularData(data[1]);
          setPieChartData(transform(data));
          setHasRegular(true);
        } else {
          setRegularData("");
          setHasRegular(false);
        }
      });
  }, [selectedFaculty, selectedCollege]);

  return (
    <Grid spacing={5} justify="center" container>
      <Grid style={{ margin: "0 auto" }} item xs={10} md={4}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Properties</StyledTableCell>
                {hasRegular && <StyledTableCell>Regular</StyledTableCell>}
                <StyledTableCell>Paying</StyledTableCell>
              </TableRow>
            </TableHead>
            {payingData && (
              <TableBody>
                {/* we always have paying data but regular data chai gov college ko lagi matra hunxa so mapping through payingData */}
                {Object.keys(payingData).map((key) => {
                  return (
                    <StyledTableRow key={key}>
                      <TableCell component="th" scope="row">
                        {key}
                      </TableCell>
                      {hasRegular && <TableCell>{regularData[key]}</TableCell>}
                      <TableCell>{payingData[key]}</TableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={10} md={7}>
        {hasRegular && (
          <SeatPieChart currentFrame={pieChartData} yaxis_data="type" />
        )}
      </Grid>
    </Grid>
  );
}
