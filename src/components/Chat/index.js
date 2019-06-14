import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Paper, Input, Typography, Grid, Button } from '@material-ui/core'

import Message from '../Message';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    padding: theme.spacing(2, 2),
  },
  grid: {
    height: '100%'
  },
  listening: {
    ...theme.typography.button,
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(1),
    borderRadius: 3,
    marginTop: theme.spacing(1),
    textAlign: 'center',
  }
}))

function Chat(props) {
  const classes = useStyles()
  const { messages, status, start } = props

  return (
    <Paper className={classes.root}>
      <Grid
        container
        direction='column'
        justify='flex-end'
        className={classes.grid}
      >

        <Grid item>
          <Grid container direction='column'>
            {messages.map((m, k) => (
              <Message message={m} key={k} />
            ))}
          </Grid>
        </Grid>

        <Grid item>
          {status.active && <Typography className={classes.listening}>Ouvindo...</Typography>}
          {!status.active && <Button onClick={start} color='primary' variant='contained' fullWidth>Iniciar</Button>}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Chat