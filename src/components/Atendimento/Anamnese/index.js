import React, { useContext } from "react";
import { Grid, Typography, Chip } from "@material-ui/core";

import AttendanceContext from "../../../utils/Contexts";

export default () => {
  const { anamnese } = useContext(AttendanceContext);

  return (
    <Grid container>
      <Grid item>
        <Typography variant="body1">Anamnese: </Typography>
      </Grid>
      <Grid item>
        <Typography>{anamnese}</Typography>
      </Grid>
    </Grid>
  );
};
