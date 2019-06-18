import React from 'react'

export default function Atendimento (props) {
  return (
    <h1>{props.paciente && props.paciente.nome}</h1>
  )
}