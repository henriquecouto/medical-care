import React from 'react'
import { Grid, Typography, Chip } from '@material-ui/core'

export default ({ info }) => {
  return (
    <Grid container>
      {info.map((v, k) => <Chip key={k} label={v} />)}
    </Grid>
  )
} 