import React, { useEffect, useState } from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import { Grid, Button } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

import Header from './components/Header'
import Chat from './components/Chat'

import AssistantCommandsManager from './utils/artyom'

import artyom from 'artyom.js'
const Assistant = new artyom()

const CommandsManager = new AssistantCommandsManager(Assistant)

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00BCD4'
    },
    shadow: '#aaa'
  }
})

const useStyles = makeStyles({
  grid: {
    width: '100%',
    height: '90vh',
    padding: theme.spacing(2),
  }
})

function App() {

  const startAssistant = () => {
    Assistant.initialize({
      lang: "pt-PT",
      continuous: true,
      listen: true,
      debug: true,
    }).then(() => {
      setAssistantStatus({...assistantStatus, active: true})
      CommandsManager.loadCommands()
    }).catch(() => {
      setAssistantStatus({...assistantStatus, active: false, error: true})      
    })

  }

  Assistant.redirectRecognizedTextOutput((text, isFinal) => {
    if (isFinal) {
      const newMessage = { text, user: 'D' }
      setMessages([...messages, newMessage])
    }
  })

  const [messages, setMessages] = useState([])
  const [assistantStatus, setAssistantStatus] = useState({ active: false, error: false })

  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <Header title='Novo Atendimento' />
      <Grid container className={classes.grid} spacing={2}>
        <Grid item xs={9}>
          <h1>Actions</h1>
        </Grid>
        <Grid item xs={3}>
          <Chat messages={messages} status={assistantStatus} start={startAssistant} />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App
