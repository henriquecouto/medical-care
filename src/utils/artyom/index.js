export default class AssistantCommandsManager {
  constructor(assistantInstance) {
    this._assistant = assistantInstance
  }

  loadCommands() {
    let Assistant = this._assistant

    return Assistant.addCommands([
      {
        indexes: ['Assistente está aí', 'Assistente tá aí'],
        action: i => {
          Assistant.say('Olá, em que posso ajudar?')
        }
      },
    ])
  }
}


// import Artyom from 'artyom.js'

// const assistant = new Artyom()

// export function startArtyom(onSuccess, onError) {
//   assistant
//     .initialize({
//       lang: "pt-PT",
//       continuous: true,
//       listen: true,
//       debug: true,
//     })
//     .then(() => {
//       onSuccess()
//     })
//     .catch(() => onError)
// }

// export function stopArtyom() {
//   assistant.fatality()
// }

// assistant.addCommands([
//   {
//     indexes: ['Assistente está aí', 'Assistente tá aí'],
//     action: i => {
//       assistant.say('Para o senhor, sempre')
//     }
//   }
// ])

// export function getSayed(callback) {
//   assistant.redirectRecognizedTextOutput((text, isFinal) => {
//     if (isFinal) {
//       callback(text)
//     }
//   })
// }




