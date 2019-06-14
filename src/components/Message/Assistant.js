import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Avatar, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 10,
  },
  textAssistant: {
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderRadius: 12,
    boxShadow: `0 1px 3px ${theme.palette.shadow}`,
    maxWidth: '250px',
  },
}))

export default function AssistantMessage(props) {
  const { message } = props
  const classes = useStyles()
  return (
    <Grid container className={classes.root}>    
      <Grid item>
        <Avatar>{message.user}</Avatar>
      </Grid>
      <Grid item xs={9}>
        <Typography variant='body1' className={classes.textAssistant}>{message.text}</Typography>
      </Grid>
    </Grid>
  )
}