import React, { useEffect, useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid } from "@material-ui/core";
import api from "../lib/api.js"


function createPredictionData(calculation, score, remarks) {
  return { calculation, score, remarks };
}

const prows = [
  createPredictionData('rank < cut_off -  40% of total_seat', 5, 'very high chance'),
  createPredictionData('rank < cut_off -  10% of total_seat', 4, 'high chance'),
  createPredictionData('rank < cut_off +- 10% of total_seat', 3, 'Critical'),
  createPredictionData('rank < cut_off +  30% of total_seat', 2, 'low'),
  createPredictionData('ELSE', 1, 'very low'),
];

export function PredictionTable() {
  return (
    <Grid style={{ margin: "0 auto" }} item xs={10} md={12}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Calculation</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prows.map((row) => (
              <TableRow key={row.calculation}>
                <TableCell component="th" scope="row">
                  {row.calculation}
                </TableCell>
                <TableCell align="right">{row.score}</TableCell>
                <TableCell align="right">{row.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}


function createCollegeData(calculation, score, remarks) {
  return { calculation, score, remarks };
}

const rows = [
  createCollegeData('rank < cut_off -  40% of total_seat', 5, 'very high chance'),
  createCollegeData('rank < cut_off -  10% of total_seat', 4, 'high chance'),
  createCollegeData('rank < cut_off +- 10% of total_seat', 3, 'Critical'),
  createCollegeData('rank < cut_off +  30% of total_seat', 2, 'low'),
  createCollegeData('ELSE', 1, 'very low'),
];

export function BasicTable({college}) {
  const [collegeList, setCollegeList] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  useEffect(() => {
    api.get("/colleges/").then(({ data }) => {
      setCollegeList(data);
    });
  }, []);
  useEffect(() => {
    api.get("/programs/").then(({ data }) => {
      setFacultyList(data);
    });
  }, []);

  return (
    <Grid style={{ margin: "0 auto" }} item xs={10} md={12}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell align="left">Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {college && collegeList.map((row) => (
              <TableRow key={row.code}>
                <TableCell component="th" scope="row">
                  {row.code}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
              </TableRow>
            ))}
            {!college && facultyList.map((row) => (
              <TableRow key={row.code}>
                <TableCell component="th" scope="row">
                  {row.code}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
