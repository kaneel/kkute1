const UPDATE_MIDIIN = 'UPDATE_MIDIIN'
const UPDATE_MIDIOUT = 'UPDATE_MIDIOUT'

const updateMidiIN = id => ({
  type: UPDATE_MIDIIN,
  id
})

const updateMidiOUT = id => ({
  type: UPDATE_MIDIOUT,
  id
})

export { UPDATE_MIDIIN, UPDATE_MIDIOUT, updateMidiIN, updateMidiOUT }
