import React, { useEffect, useState } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import { Grid, Button } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import AssistantScreen from "./screens/Assistant";
import LoginScreen from "./screens/Login";
import { isLogged, signOut } from "./utils/firebase";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00BCD4"
    },
    shadow: "#aaa"
  }
});

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const makeLogin = async user => {
    setUser({ user });
  };

  const verifyIsLogged = async () => {
    isLogged(user => {
      if (user) {
        setUser({ user: user.email });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  };

  const logout = () => {
    signOut();
  };

  useEffect(() => {
    verifyIsLogged();
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        {user ? (
          <Route
            path="/"
            render={props => (
              <AssistantScreen {...props} logout={logout} doctor={user} />
            )}
          />
        ) : (
          <Route
            path="/"
            render={() => <LoginScreen makeLogin={makeLogin} />}
          />
        )}
      </ThemeProvider>
    </Router>
  );
}

export default App;
