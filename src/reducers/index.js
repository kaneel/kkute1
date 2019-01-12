import { combineReducers } from 'redux'

import { default as synthparams } from './params'
import { default as GUI } from './GUI'
import { default as settings } from './settings'

const reducers = combineReducers({ synthparams, GUI, settings })

export default reducers
