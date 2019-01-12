import { OPEN_SETTINGS, CLOSE_SETTINGS } from '../actions'

const initialState = { settings: true }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SETTINGS:
      return {
        ...state,
        settings: true
      }
    case CLOSE_SETTINGS:
      return {
        ...state,
        settings: false
      }
    default:
      return state
  }
}

export default reducer
