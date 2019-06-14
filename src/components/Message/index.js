import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Avatar, Grid, Typography } from '@material-ui/core'

import Assistant from './Assistant'
import Doctor from './Doctor';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 10,
  },
}))

function Message(props) {
  const { message } = props
  const classes = useStyles()
  return (
    <>
      {message.user === 'A' && <Assistant message={message} />}
      {message.user === 'D' && <Doctor message={message} />}
    </>
  )
}

export default Message