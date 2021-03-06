import React, { useContext } from "react";
import { Grid, Typography, Chip } from "@material-ui/core";

import StoreContext from "../../../utils/Contexts";

export default () => {
  const { attendance: { symptoms } } = useContext(StoreContext);

  return (
    <Grid container>
      <Typography variant="body1">Sintomas: </Typography>
      {symptoms.map((v, k) => (
        <Chip key={k} label={v} />
      ))}
    </Grid>
  );
};
