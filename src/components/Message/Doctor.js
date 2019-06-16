import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Avatar, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 10,
  },
  textDoctor: {
    backgroundColor: 'white',
    padding: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderRadius: 12,
    boxShadow: `0 1px 3px ${theme.palette.shadow}`,
    maxWidth: '220px',
  },
}))

export default function DoctorMessage(props) {
  const { message } = props
  const classes = useStyles()
  return (
    <Grid container className={classes.root} justify='flex-end'>
      <Grid item>
        <Typography variant='body1' className={classes.textDoctor}>{message.text}</Typography>
      </Grid>
      <Grid item>
        <Avatar>{message.user}</Avatar>
      </Grid>
    </Grid>
  )
}