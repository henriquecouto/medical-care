import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { loginUser } from "../../utils/firebase";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    padding: theme.spacing(5)
  },
  paper: {
    padding: theme.spacing(3)
  },
  top: {
    height: 100
  },
  textField: {
    width: "100%"
  },
  container: {
    width: "100%"
  },
  button: {
    width: "100%",
    marginTop: 5
  }
}));

export default function LoginScreen({ makeLogin }) {
  const classes = useStyles();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const { user } = await loginUser(form.email, form.password);
      makeLogin(user.email);
    } catch (err) {
      console.log("erro: ", err);
    }
  };

  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Grid container className={classes.top} alignItems="center">
                <Typography variant="h4">Entrar no Medical Care</Typography>
              </Grid>
              <Divider />
            </Grid>
            <TextField
              id="outlined-email-input"
              label="Email"
              className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              value={form.email}
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              name="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              value={form.password}
            />

            <Button
              className={classes.button}
              style={{ marginTop: 20 }}
              variant="contained"
              color="primary"
              onClick={login}
            >
              Entrar
            </Button>

            <Button className={classes.button} color="primary">
              Esqueci a senha
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
