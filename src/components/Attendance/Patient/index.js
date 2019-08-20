import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Typography, Avatar, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import StoreContext from '../../../utils/Contexts'

const useStyles = makeStyles({
  avatar: {
    // margin: 10,
    width: 150,
    height: 150,
    fontSize: 75,
  },
  item: {
    margin: '10px 40px 10px 0',
  },
  first: {
    minWidth: 400,
    maxWidth: 800,
  }
});

export default () => {

  const { attendance: { patient } } = useContext(StoreContext);

  const classes = useStyles()

  return (
    patient ? <Grid container>

      <Grid item className={classes.item}>
        {
          patient.avatar
            ? <Avatar alt={`avatar ${patient.name}`} src="/static/images/avatar/1.jpg" className={classes.avatar} />
            : <Avatar className={classes.avatar}> {patient.name[0]} </Avatar>
        }
      </Grid>

      <Grid item className={classes.item}>
        <Grid container alignItems='center'>
          <Typography variant='h4' className={classes.item + ' ' + classes.first}>{patient.name}</Typography>
          <Typography variant='body1' className={classes.item}> Data de nascimento: {patient.birthDate}</Typography>
        </Grid>
        <Grid container alignItems='center'>
          <Typography variant='body1' className={classes.item + ' ' + classes.first}>{patient.info1}</Typography>
          <Typography variant='body1' className={classes.item}> {patient.info2} </Typography>
        </Grid>
        <Grid container alignItems='center'>
          <Typography variant='body1' className={classes.item + ' ' + classes.first}>{patient.info3}</Typography>
          <Typography variant='body1' className={classes.item}> {patient.info4} </Typography>
        </Grid>
      </Grid>

    </Grid> : <Redirect to='/' />
  )
}