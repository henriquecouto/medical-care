import React, { useContext } from "react";

import StoreContext from "../../utils/Contexts";
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
  card: {
    width: 350
  }
}));

export default function Patients() {
  const classes = useStyle();

  const { patients } = useContext(StoreContext);

  return (
    <Grid container spacing={2}>
      {patients.map(v => {
        return (
          <Grid item key={v.id}>
            <Card className={classes.card}>
              <CardHeader
                title={v.name.toUpperCase()}
                avatar={<Avatar>{v.name[0].toUpperCase()}</Avatar>}
              />
              <CardContent>
                <Typography>{v.info1}</Typography>
                <Typography>{v.info2}</Typography>
                <Typography>{v.info3}</Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
