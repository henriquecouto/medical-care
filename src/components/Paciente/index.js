import React from 'react'
import { Typography, Avatar, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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

export default ({ info }) => {

  const classes = useStyles()

  return (
    <Grid container>
      <Grid item className={classes.item}>
        {
          info.avatar
            ? <Avatar alt={`avatar ${info.nome}`} src="/static/images/avatar/1.jpg" className={classes.avatar} />
            : <Avatar className={classes.avatar}> {info.nome[0]} </Avatar>
        }
      </Grid>

      <Grid item className={classes.item}>
        <Grid container alignItems='center'>
          <Typography variant='h4' className={classes.item + ' ' + classes.first}>{info.nome}</Typography>
          <Typography variant='body1' className={classes.item}> {info.idade} anos</Typography>
        </Grid>
        <Grid container alignItems='center'>
          <Typography variant='body1' className={classes.item + ' ' + classes.first}>{info.info}</Typography>
          <Typography variant='body1' className={classes.item}> {info.info2} </Typography>
        </Grid>
        <Grid container alignItems='center'>
          <Typography variant='body1' className={classes.item + ' ' + classes.first}>{info.info2}</Typography>
          <Typography variant='body1' className={classes.item}> {info.info3} </Typography>
        </Grid>
      </Grid>

    </Grid>
  )
}