import React from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

import Header from './components/Header'
import Chat from './components/Chat'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00BCD4'
    },
    shadow: '#aaa'
  }
})

const useStyles = makeStyles({
  grid: {
    width: '100%',
    height: '90vh',
    padding: theme.spacing(2),
  }
})

function App() {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <Header title='Novo Atendimento' />
      <Grid container className={classes.grid} spacing={2}>
        <Grid item xs={9}>
          <h1>Actions</h1>
        </Grid>
        <Grid item xs={3}>
          <Chat />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App
