import { UPDATE_PARAM, UPDATE_PATCHNAME, RECEIVE_PARAMS } from '../actions'
import { params, ASCIIChars } from '../data'

import { fillArray } from '../utils'

const initialState = Object.values(params).reduce(
  (acc, curr) =>
    curr.default_value !== 'Object' && typeof curr.default_value !== 'undefined'
      ? {
          ...acc,
          [curr.id]: curr.default_value
        }
      : acc,
  {}
)

const swapSources = (state, s1, s2) =>
  [s1, s2]
    .map(n => {
      const w = params.makeWave(n)
      const f = params.makeFreq(n)
      const e = params.makeEnv(n)

      return w
        .concat(f)
        .concat(e)
        .map(item => ({
          [item.id.replace(/_(\d)/, `_${n === s1 ? s2 : s1}`)]: state[item.id]
        }))
    })
    .reduce((acc, curr) => acc.concat(curr), [])
    .reduce(
      (acc, curr) => ({
        ...acc,
        ...curr
      }),
      {}
    )

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PARAM: {
      const { key, value } = action

      let sideEffect = {}

      switch (key) {
        case 'common_am_1': {
          const prev = state.common_am_1
          if (value === 2 && prev !== 2) sideEffect = swapSources(state, 0, 1)
          else if (value !== 2 && prev === 2) sideEffect = swapSources(state, 1, 0)
          break
        }
        case 'common_am_2': {
          const prev = state.common_am_2
          if (value === 2) sideEffect = swapSources(state, 2, 3)
          else if (value !== 2 && prev === 2) sideEffect = swapSources(state, 3, 2)
          break
        }
      }

      return {
        ...state,
        ...sideEffect,
        [action.key]: action.value
      }
    }
    case UPDATE_PATCHNAME: {
      const { value } = action
      const o = fillArray(value.substr(0, 10).split(''), 10, 0).reduce((acc, curr, i) => {
        let value = ASCIIChars.indexOf(curr)

        if (value === -1) value = 0

        acc[`name_${i}`] = value
        return acc
      }, {})

      return {
        ...state,
        ...o
      }
    }

    case RECEIVE_PARAMS:
      return {
        ...action.params
      }

    default:
      return state
  }
}
export default reducer
