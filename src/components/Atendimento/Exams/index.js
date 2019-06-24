import React, { useContext } from "react";
import { Grid, Typography, Chip } from "@material-ui/core";

import AttendanceContext from "../../../utils/Contexts";

export default () => {
  const { exams } = useContext(AttendanceContext);

  return (
    <Grid container>
      <Typography variant="body1">Exames: </Typography>
      {exams.map((v, k) => (
        <Chip key={k} label={v} />
      ))}
    </Grid>
  );
};
