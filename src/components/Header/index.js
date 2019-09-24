import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

export default function Header({ title, logout }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
          <Button onClick={logout}>Sair</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
