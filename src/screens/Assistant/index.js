import React, { useEffect, useState } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import { Grid, Button } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Header from "../../components/Header";
import Chat from "../../components/Chat";

import { StoreProvider } from "../../utils/Contexts";

import artyom from "artyom.js";
import Attendance from "../../components/Attendance";
import Patients from "../../components/Patients";

import Attendances from "../../components/Attendances";
import { baseApiUrl } from "../../utils/urls";
import Axios from "axios";

const Assistant = new artyom();

const useStyles = makeStyles(theme => ({
  grid: {
    width: "100%",
    height: "90vh",
    padding: theme.spacing(2)
  }
}));

export default function AssistantScreen({ match, logout, doctor }) {
  const [messages, setMessages] = useState([]);
  const [assistantStatus, setAssistantStatus] = useState({
    active: false,
    error: false
  });
  const [position, setPosition] = useState("Pacientes");
  const [patients, setPatients] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [patient, setPatient] = useState(null);
  const [anamnese, setAnamnese] = useState("");
  const [exams, setExams] = useState([]);
  const [redirect, setRedirect] = useState({ state: false });

  const store = {
    attendance: {
      patient,
      doctor,
      symptoms,
      anamnese,
      exams
    },
    patients
  };

  const classes = useStyles();

  function addMessage(newMessage) {
    setMessages(messages => [...messages, newMessage]);
  }

  function addSymptom(symptom) {
    setSymptoms(symptoms => [...symptoms, symptom]);
  }

  function addExam(exam) {
    setExams(exams => [...exams, exam]);
  }

  function finalize() {
    const data = store.attendance;
    data.patient = store.attendance.patient.id;
    console.log(data);

    Axios.post(`${baseApiUrl}/attendance/register`, data)
      .then(() => {
        const speech = "Atendimento finalizado com sucesso!";
        Assistant.say(speech, {
          onStart: function() {
            addMessage({ text: speech, user: "A" });
          },
          onEnd: function() {
            setPosition("Consultas");
            handleRedirect(true, "/atendimentos");
          }
        });
      })
      .catch(err => console.log(err));
  }

  function handleAnamnese(text) {
    setAnamnese(anamnese => `${anamnese} ${text}`);
  }

  function searchPatient(info, onSuccess, onError) {
    Axios.post(`${baseApiUrl}/patient/search`, { name: info })
      .then(({ data: { result } }) => {
        console.log(result);
        if (result) {
          const findedPatient = { id: result._id.$oid, ...result.data };
          setPatient(findedPatient);
          onSuccess();
        } else {
          onError();
        }
      })
      .catch(err => console.log(err));
  }

  function startAssistant() {
    Assistant.initialize({
      lang: "pt-PT",
      continuous: true,
      listen: true,
      debug: true,
      obeyKeyword: "assistente"
    })
      .then(() => {
        setAssistantStatus({ ...assistantStatus, active: true });
        Assistant.dontObey();
        // CommandsManager.loadCommands()
      })
      .catch(() => {
        setAssistantStatus({ ...assistantStatus, active: false, error: true });
      });
  }

  function loadPatients() {
    Axios.get(`${baseApiUrl}/patient/`)
      .then(({ data: { result } }) => {
        const loadedPatients = [];
        result.forEach(doc => {
          loadedPatients.push({ id: doc._id.$oid, ...doc.data });
        });
        setPatients(loadedPatients);
      })
      .catch(err => console.log(err));
  }

  function handleRedirect(state, path) {
    setRedirect({ state, path });
  }

  useEffect(() => {
    loadPatients();
  }, []);

  useEffect(() => {
    Assistant.on(["assistente finalize o aten*"], true).then(() => {
      Assistant.dontObey();

      let speech = "Finalizando atendimento...";

      Assistant.say(speech, {
        onStart: function() {
          addMessage({ text: speech, user: "A" });
        },
        onEnd: function() {
          document.getElementById("finalize").click();
        }
      });
    });

    Assistant.on(
      [
        "assistente prepare um atendimento para o paciente *",
        "assistente prepara um atendimento para o paciente *",
        "assistente inicie um atendimento para o paciente *",
        "assistente inicia um atendimento para o paciente *",
        "assistente inicie o atendimento do paciente *",
        "assistente inicia o atendimento do paciente *"
      ],
      true
    ).then((i, wildcard) => {
      let speech = `Preparando atendimento, um momento...`;
      Assistant.dontObey();

      Assistant.say(speech, {
        onStart: function() {
          addMessage({ text: speech, user: "A" });
        },
        onEnd: () => {
          const onSuccess = () => {
            const speech = `Atendimento de ${wildcard} iniciado!`;
            Assistant.say(speech, {
              onStart: function() {
                addMessage({ text: speech, user: "A" });
                handleRedirect(true, "/atendimento");
                setPosition(() => "Novo atendimento");
              },
              onEnd: function() {
                handleRedirect(false);
              }
            });
          };

          const onError = () => {
            const speech = `Não encontrei o paciente ${wildcard}, poderia tentar novamente?`;
            Assistant.say(speech, {
              onStart: function() {
                addMessage({ text: speech, user: "A" });
              }
            });
          };

          searchPatient(wildcard, onSuccess, onError);
        }
      });
    });

    Assistant.on(
      [
        "assistente * atendimentos já realizados",
        "assistente * atendimentos realizados",
        "assistente * atendimentos"
      ],
      true
    ).then(() => {
      Assistant.dontObey();
      let speech = "Estou verificando. Um momento...";
      Assistant.say(speech, {
        onStart: function() {
          addMessage({ text: speech, user: "A" });
        },
        onEnd: function() {
          setPosition("Consultas");
          handleRedirect(true, "/atendimentos");
        }
      });
    });

    Assistant.on(
      ["assistente * pacientes", "assistente * pacientes disponíveis"],
      true
    ).then(() => {
      Assistant.dontObey();
      let speech = "Estou verificando. Um momento...";
      Assistant.say(speech, {
        onStart: function() {
          addMessage({ text: speech, user: "A" });
        },
        onEnd: function() {
          setPosition("Pacientes");
          handleRedirect(true, "/");
        }
      });
    });

    Assistant.redirectRecognizedTextOutput((text, isFinal) => {
      if (isFinal) {
        const newMessage = { text, user: "D" };
        addMessage(newMessage);
      }
    });

    Assistant.on(["assistente o paciente relatou *"], true).then(
      (i, wildcard) => {
        const speech = `Só um segundo, estou anotando`;

        Assistant.dontObey();
        Assistant.say(speech, {
          onStart: function() {
            addMessage({ text: speech, user: "A" });
          },
          onEnd: () => {
            handleAnamnese(wildcard);
          }
        });
      }
    );

    Assistant.on(
      ["assistente adicione o sintoma *", "assistente adicione os sintomas *"],
      true
    ).then((i, wildcard) => {
      Assistant.dontObey();
      let speech;
      // if (paciente) {
      speech =
        i === 0
          ? `anotando o sintoma ${wildcard}`
          : `anotando os sintomas ${wildcard}`;
      const symptoms = wildcard.split(",");

      Assistant.say(speech, {
        onStart: function() {
          addMessage({ text: speech, user: "A" });
        },
        onEnd: function() {
          symptoms.forEach(s => {
            addSymptom(s);
          });
        }
      });
    });
  }, []);

  useEffect(() => {
    Assistant.on(
      ["assistente adicione o exame *", "assistente adicione os exames *"],
      true
    ).then((i, wildcard) => {
      Assistant.dontObey();
      let speech;
      // if (paciente) {
      speech =
        i === 0
          ? `anotando o exame ${wildcard}`
          : `anotando os exames ${wildcard}`;
      const exams = wildcard.split(",");

      Assistant.say(speech, {
        onStart: function() {
          addMessage({ text: speech, user: "A" });
        },
        onEnd: function() {
          exams.forEach(s => {
            addExam(s);
          });
        }
      });
    });

    Assistant.on(["*"], true).then(() => {
      Assistant.dontObey();
      let speech;
      speech = `Comando não reconhecido`;

      Assistant.say(speech, {
        onStart: function() {
          addMessage({ text: speech, user: "A" });
        },
        onEnd: function() {
          exams.forEach(s => {
            addExam(s);
          });
        }
      });
    });
  }, [exams]);

  return (
    <StoreProvider value={store}>
      <Header title={position} logout={logout} />
      <Grid container className={classes.grid} spacing={2}>
        <Grid item xs={9}>
          {redirect.state && <Redirect to={redirect.path} />}
          <Route exact path={`/`} component={Patients} />
          <Route exact path={`/atendimento`} component={Attendance} />
          <Route exact path={`/atendimentos`} component={Attendances} />
        </Grid>
        <Grid item xs={3}>
          <Chat
            messages={messages}
            status={assistantStatus}
            start={startAssistant}
          />
          <Button onClick={finalize} id="finalize" style={{ display: "none" }}>
            Finalizar
          </Button>
        </Grid>
      </Grid>
    </StoreProvider>
  );
}
