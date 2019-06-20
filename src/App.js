import React, { useEffect, useState } from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import { Grid, Button } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

import Header from './components/Header'
import Chat from './components/Chat'

import { AttendanceProvider } from './utils/Contexts'

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

const patients = [
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


function App() {

  const [messages, setMessages] = useState([])
  const [assistantStatus, setAssistantStatus] = useState({ active: false, error: false })
  const [symptoms, setSymptoms] = useState([])
  const [patient, setPatient] = useState(null)
  const [anamnese, setAnamnese] = useState('')
  const [exams, setExams] = useState('')

  const attendance = {
    patient,
    symptoms,
    anamnese,
    exams
  }

  const classes = useStyles()

  function addMessage(newMessage) {
    setMessages(messages => [...messages, newMessage])
  }

  function addSymptom(symptom) {
    setSymptoms(symptoms => [...symptoms, symptom])
  }

  function handlePatient(p) {
    setPatient(patient => p)
  }

  function startAssistant() {
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

  // Componente montado
  useEffect(() => {
    Assistant.redirectRecognizedTextOutput((text, isFinal) => {
      if (isFinal) {
        const newMessage = { text, user: 'D' }
        addMessage(newMessage)
      }
    })

    Assistant.on(['assistente está aí', 'assistente tá aí']).then(() => {

      const speech = `Olá, em que posso ajudar?`

      Assistant.dontObey()
      Assistant.say(speech, {
        onStart: function () {
          addMessage({ text: speech, user: 'A' })
        }
      })

    })

    Assistant.on(['assistente quero fazer *'], true).then((i, wildcard) => {
      const speech = `Estou preparando ${wildcard}, só um segundo`

      Assistant.dontObey()
      Assistant.say(speech, {
        onStart: function () { addMessage({ text: speech, user: 'A' }) }
      })

    })

    Assistant.on(['assistente o paciente relatou *'], true).then(() => {
      const speech = `Só um segundo, estou anotando`

      Assistant.dontObey()
      Assistant.say(speech, {
        onStart: function () { addMessage({ text: speech, user: 'A' }) }
      })

    })

    Assistant.on(['assistente selecione o paciente *'], true).then((i, wildcard) => {
      const speech = `Buscando paciente ${wildcard}, um momento...`
      Assistant.dontObey()

      Assistant.say(speech, {
        onStart: function () { addMessage({ text: speech, user: 'A' }) },
        onEnd: async () => {
          const search = await patients.filter(p => p.nome == wildcard)

          if (search[0] == undefined) {
            const speech = `Não encontrei o paciente ${wildcard}, poderia tentar novamente?`
            Assistant.say(speech, {
              onStart: function () { addMessage({ text: speech, user: 'A' }) }
            })
          } else {
            const speech = `Paciente ${wildcard} encontrado!`

            Assistant.say(speech, {
              onStart: function () {
                addMessage({ text: speech, user: 'A' })
                handlePatient(search[0])
              }
            })

          }
        }
      })
    })

  }, [])

  useEffect(() => {
    Assistant.on(['assistente adicione o sintoma *', 'assistente adicione os sintomas *'], true).then((i, wildcard) => {
      Assistant.dontObey()
      let speech
      // if (paciente) {
      speech = i === 0 ? `anotando o sintoma ${wildcard}` : `anotando os sintomas ${wildcard}`
      const symptoms = wildcard.split(',')

      Assistant.say(speech, {
        onStart: function () { addMessage({ text: speech, user: 'A' }) },
        onEnd: function () {
          symptoms.forEach(s => {
            addSymptom(s)
          })
        }
      })
    })
  }, [patient])

  return (
    <ThemeProvider theme={theme}>
      <AttendanceProvider value={attendance}>

        <Header title='Novo Atendimento' />
        <Grid container className={classes.grid} spacing={2}>
          <Grid item xs={9}>
            <Atendimento />
          </Grid>
          <Grid item xs={3}>
            <Chat messages={messages} status={assistantStatus} start={startAssistant} />
          </Grid>
        </Grid>

      </AttendanceProvider>
    </ThemeProvider>
  )
}

export default App
