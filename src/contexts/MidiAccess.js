import React, { Component, createContext } from 'react'
import { connect } from 'react-redux'

import { params } from '../data'
import { bitpad } from '../utils'
import { receiveParams } from '../actions'

const { Provider: MidiAccessProvider, Consumer: MidiAccessConsumer } = createContext({ access: null })

const mapStateToProps = state => ({
  ...state.settings,
  params: { ...state.params }
})

const mapDispatchToProps = dispatch => ({
  receiveParams: params => dispatch(receiveParams(params))
})

class MidiAccess extends Component {
  state = { access: null }

  componentDidMount() {
    const { MIDIIN } = this.props
    navigator.requestMIDIAccess({ sysex: true }).then(access => {
      this.setState({ access })
      if (MIDIIN) this.listenMIDIIN()
    })
  }

  componentDidUpdate(oldProps) {
    const { MIDIIN: oldIN } = oldProps
    const { MIDIIN } = this.props
    const { access } = this.state

    if (access && oldIN !== MIDIIN) {
      this.listenMIDIIN()
    }
  }

  clean() {
    this.state.access.inputs.forEach(entry => (entry.onmidimessage = null))
  }

  listenMIDIIN() {
    const { MIDIIN } = this.props
    const { access } = this.state
    const input = access.inputs.get(MIDIIN)
    this.clean()
    input.onmidimessage = this.receive
  }

  receive = ({ data }) => {
    if (!data) return null

    const { receiveParams } = this.props

    const infos = data.slice(0, 2).join('')
    const parameters = data.slice(8, data.length - 1)

    // check for possibly wrong machine or no sysex or unterminated SYSEX.
    if (infos !== '24064' && data.pop() !== 247) return null

    console.log(infos, parameters)

    const o = Object.values(paramsdata).reduce((acc, { id, source, mask = null }) => {
      if (typeof source === 'undefined') return acc
      let value
      if (typeof source !== 'function') value = parameters[source]
      else value = source(parameters)
      console.log(id, value)

      if (mask) {
        const splitMask = mask.split('')
        const newValue = []

        value = bitpad(value.toString(2)).split('')

        while (splitMask.length) {
          const curr = splitMask[0]
          if (curr === '_') value.shift()
          if (curr === 'X') newValue.push(value.shift())
          splitMask.shift()
        }
        value = newValue.join('')
        value = Number(`0b${value}`)
      }

      acc[id] = value
      return acc
    }, {})

    receiveParams(o)
  }

  send = message => {
    console.log(message)
    const { MIDIOUT } = this.props
    if (!MIDIOUT) return null
    const output = this.state.access.outputs.get(MIDIOUT)
    if (!output) return null
    output.send(message)
  }

  render() {
    const { value, children } = this.props
    const { access } = this.state

    return <MidiAccessProvider value={{ access, send: this.send }}>{children}</MidiAccessProvider>
  }
}

const MidiAccessWithSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(MidiAccess)

export { MidiAccessWithSettings, MidiAccess, MidiAccessProvider, MidiAccessConsumer }
