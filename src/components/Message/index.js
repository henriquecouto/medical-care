import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Avatar, Grid, Typography } from '@material-ui/core'

import Assistant from './Assistant'
import Doctor from './Doctor';

function Message(props) {
  const { message } = props
  return (
    <>
      {message.user === 'A' && <Assistant message={message} />}
      {message.user === 'D' && <Doctor message={message} />}
    </>
  )
}

export default Message