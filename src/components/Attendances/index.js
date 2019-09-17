import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { firestore } from "../../utils/Firebase";
import Axios from "axios";
import { baseApiUrl } from "../../utils/urls";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

const TableItem = ({ value }) => {
  return (
    <TableRow>
      <TableCell>{value.patient.name.toUpperCase()}</TableCell>
      <TableCell>{value.symptoms.map(v => `${v} `)}</TableCell>
      <TableCell>{value.exams.map(v => `${v} `)}</TableCell>
      <TableCell>{value.anamnese}</TableCell>
    </TableRow>
  );
};

export default function Attendances() {
  const classes = useStyles();

  const [attendances, setAttendances] = useState([]);

  const loadAttendances = () => {
    Axios.get(`${baseApiUrl}/attendance`)
      .then(({ data: { result } }) => {
        const loadedAttendances = [];
        result.forEach(doc => {
          loadedAttendances.push({ id: doc._id.$oid, ...doc.data });
        });
        setAttendances(loadedAttendances);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadAttendances();
  }, []);

  useEffect(() => {
    return () => setAttendances([]);
  }, []);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Paciente</TableCell>
            <TableCell>Sintomas</TableCell>
            <TableCell>Exames</TableCell>
            <TableCell>Anamnese</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendances.map(v => (
            <TableItem value={v} key={v.id} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
