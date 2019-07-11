import React, { useContext } from "react";
import { Grid, Typography, Chip } from "@material-ui/core";

import StoreContext from "../../../utils/Contexts";

export default () => {
  const { attendance: { anamnese } } = useContext(StoreContext);

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
