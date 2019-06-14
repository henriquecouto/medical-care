import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
})

export default function Header(props) {
  const classes = useStyles()
  const { title } = props

  return (
    <div className={classes.root}>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <Typography variant='h6' color='inherit'>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
