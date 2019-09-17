import React, { useContext } from "react";

import StoreContext from "../../utils/Contexts";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// import { getDate } from "../../utils/date";

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
      <TableCell>{value.name.toUpperCase()}</TableCell>
      <TableCell>{value.gender === "m" ? "MASCULINO" : "FEMININO"}</TableCell>
      <TableCell>{value.birthDate}</TableCell>
      <TableCell>{value.profession.toUpperCase()}</TableCell>
    </TableRow>
  );
};

export default function Patients() {
  const classes = useStyles();
  const { patients } = useContext(StoreContext);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Sexo</TableCell>
            <TableCell>Data de Nascimento</TableCell>
            <TableCell>Profissão</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map(v => (
            <TableItem value={v} key={v.id} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
