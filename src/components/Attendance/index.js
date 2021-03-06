import React, { useState, useEffect } from "react";
import { Paper, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Patient from "./Patient";
import Symptoms from "./Symptoms";
import Exams from "./Exams";
import Anamnese from "./Anamnese";

const useStyles = makeStyles({
  root: {
    padding: 10
  },
  divider: {
    margin: "15px 0"
  }
});

export default function Attendance() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Patient />
      <Divider variant="fullWidth" className={classes.divider} />
      <Symptoms />
      <Divider variant="fullWidth" className={classes.divider} />
      <Exams />
      <Divider variant="fullWidth" className={classes.divider} />
      <Anamnese />
    </Paper>
  );
}
