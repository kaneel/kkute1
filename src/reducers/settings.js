import { UPDATE_MIDIIN, UPDATE_MIDIOUT } from '../actions'

const initialState = {
  MIDIIN: null,
  MIDIOUT: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MIDIIN:
      return {
        ...state,
        MIDIIN: action.id
      }
    case UPDATE_MIDIOUT:
      return {
        ...state,
        MIDIOUT: action.id
      }
    default:
      return state
  }
}

export default reducer
