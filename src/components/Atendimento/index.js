import React, { useState, useEffect } from 'react'
import { Paper, Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Paciente from '../Paciente'
import Sintomas from '../Sintomas';

const useStyles = makeStyles({
  root: {
    padding: 10
  },
  divider: {
    margin: '15px 0'
  }
})

export default function Atendimento({ paciente, sintomas }) {

  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      {paciente && <Paciente info={paciente} />}
      <Divider variant='fullWidth' className={classes.divider} />
      <Sintomas info={sintomas} />
    </Paper>
  )
}