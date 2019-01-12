import { createStore, compose, applyMiddleware } from 'redux'
import { default as reducers } from '../reducers'
import { Midiware } from './middleware'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancer(applyMiddleware(Midiware)))

export default store
