import React, { useEffect, useState } from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import { Grid, Button } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

import Header from './components/Header'
import Chat from './components/Chat'

import artyom from 'artyom.js'
import Atendimento from './components/Atendimento'
const Assistant = new artyom()

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

const pacientes = [
  {
    nome: 'henrique couto',
    idade: 20,
    info: 'Alguma informação relevante',
    info1: 'Alguma informação relevante',
    info2: 'Alguma informação relevante',
    info3: 'Alguma informação relevante',
  },
  {
    nome: 'richard souza',
    idade: 20,
    info: 'Alguma informação relevante',
    info1: 'Alguma informação relevante',
    info2: 'Alguma informação relevante',
    info3: 'Alguma informação relevante',
  },
  {
    nome: 'ítalo lima',
    idade: 20,
    info: 'Alguma informação relevante',
    info1: 'Alguma informação relevante',
    info2: 'Alguma informação relevante',
    info3: 'Alguma informação relevante',
  },
  {
    nome: 'andré magno',
    idade: 20,
    info: 'Alguma informação relevante',
    info1: 'Alguma informação relevante',
    info2: 'Alguma informação relevante',
    info3: 'Alguma informação relevante',
  }
]

const messages = []

function App() {

  const [lastMessage, setLastMessage] = useState(null)
  const [assistantStatus, setAssistantStatus] = useState({ active: false, error: false })
  const [sintomas, setSintomas] = useState([])
  const [paciente, setPaciente] = useState({})

  const classes = useStyles()

  const addMessage = (message) => {
    messages.push(message)
    setLastMessage(message)
  }

  const startAssistant = () => {
    Assistant.initialize({
      lang: "pt-PT",
      continuous: true,
      listen: true,
      debug: true,
      obeyKeyword: "assistente"
    }).then(() => {
      setAssistantStatus({ ...assistantStatus, active: true })
      Assistant.dontObey()
      // CommandsManager.loadCommands()
    }).catch(() => {
      setAssistantStatus({ ...assistantStatus, active: false, error: true })
    })
  }

  Assistant.redirectRecognizedTextOutput((text, isFinal) => {
    if (isFinal) {
      const newMessage = { text, user: 'D' }
      addMessage(newMessage)
    }
  })

  Assistant.on(['assistente está aí', 'assistente tá aí']).then(() => {
    const speech = `Olá, em que posso ajudar?`

    Assistant.dontObey()
    Assistant.say(speech)

    addMessage({ text: speech, user: 'A' })
  })

  Assistant.on(['assistente quero fazer *'], true).then((i, wildcard) => {
    const speech = `Estou preparando ${wildcard}, só um segundo`

    Assistant.dontObey()
    Assistant.say(speech)

    addMessage({ text: speech, user: 'A' })
  })

  Assistant.on(['assistente o paciente relatou *'], true).then(() => {
    const speech = `Só um segundo, estou anotando`

    Assistant.dontObey()
    Assistant.say(speech)

    addMessage({ text: speech, user: 'A' })
  })

  Assistant.on(['assistente selecione o paciente *'], true).then((i, wildcard) => {
    const speech = `Buscando paciente ${wildcard}, um momento...`
    Assistant.dontObey()

    Assistant.say(speech, {
      onStart: () => addMessage({ text: speech, user: 'A' }),
      onEnd: async () => {
        const search = await pacientes.filter(p => p.nome == wildcard)

        if (search[0] == undefined) {
          const speech = `Não encontrei o paciente ${wildcard}, poderia tentar novamente?`
          addMessage({ text: speech, user: 'A' })
          Assistant.say(speech)
        } else {
          const speech = `Paciente ${wildcard} encontrado!`

          Assistant.say(speech, {
            onStart: () => { addMessage({ text: speech, user: 'A' }); setPaciente(search[0]) }
          })

        }
      }
    })

  })

  return (
    <ThemeProvider theme={theme}>
      <Header title='Novo Atendimento' />
      <Grid container className={classes.grid} spacing={2}>
        <Grid item xs={9}>
          <Atendimento paciente={paciente} />
        </Grid>
        <Grid item xs={3}>
          <Chat messages={messages} status={assistantStatus} start={startAssistant} />
        </Grid>
        {/* {console.log(messages)} */}
      </Grid>
    </ThemeProvider>
  )
}

export default App
