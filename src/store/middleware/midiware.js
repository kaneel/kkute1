import { UPDATE_MIDIIN, UPDATE_MIDIOUT, UPDATE_PARAM, receiveParams } from '../../actions'
import { params as paramsdata } from '../../data/'
import { bitpad } from '../../utils'

class MidiAccess {
  #_MIDIIN = null
  #_MIDIOUT = null
  onreceive = null

  constructor() {
    this.access = navigator.requestMIDIAccess({ sysex: true })
  }

  set MIDIIN(id) {
    this._MIDIIN = id
    this.access.then(access => {
      // get current input
      const input = access.inputs.get(id)
      if (!input) return null

      // clean
      access.inputs.forEach(entry => (entry.onmidimessage = null))

      // pass it the handler
      input.onmidimessage = this.receive
    })
  }

  set MIDIOUT(id) {
    this._MIDIOUT = id
  }

  get MIDIIN() {
    return this._MIDIIN
  }
  get MIDIOUT() {
    return this._MIDIOUT
  }

  receive = ({ data }) => {
    if (!data) return null

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

    console.log('received', o)
    if (this.onreceive) this.onreceive(o)
  }

  async send(message) {
    if (!this.MIDIOUT) return null
    const output = await this.access.then(access => access.outputs.get(this.MIDIOUT))
    if (!output) return null
    console.log(message, 'sent to', output)
    output.send(message)
  }
}

const middleware = store => {
  const midiAccess = new MidiAccess()
  midiAccess.onreceive = params => store.dispatch(receiveParams(params))
  console.log(midiAccess)

  return next => action => {
    const { type } = next(action)
    console.log(type)
    switch (type) {
      case UPDATE_MIDIIN:
        // update MidiAdapter
        midiAccess.MIDIIN = action.id
        break
      case UPDATE_MIDIOUT:
        // update MidiAdapter
        midiAccess.MIDIOUT = action.id
        break
      case UPDATE_PARAM:
        // send midi message
        const { key, value } = action
        const { sysex, format = null } = paramsdata[key]

        let message = null

        if (format) {
          message = format(value)
        } else {
          message = sysex.replace('vv', value)
        }

        message = message
          .replace('cc', 0)
          .split(' ')
          .map(string => Number(string))

        if (message) midiAccess.send(message)

        break
    }
  }
}

export default middleware
