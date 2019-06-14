import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Paper, Input, Typography, Grid } from '@material-ui/core'

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
    marginTop: theme.spacing(1)
  }
}))

function Chat(props) {
  const classes = useStyles()
  const { startArtyom } = props

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
            <Message message={{ text: 'Esse é um exemplo de mensagem enviada pelo assistente', user: 'A' }} />
            <Message message={{ text: 'Esse é um exemplo de mensagem enviada pelo Doctor', user: 'D' }} />
          </Grid>
        </Grid>

        <Grid item>
          <Typography className={classes.listening}>Ouvindo...</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Chat