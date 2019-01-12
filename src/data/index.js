import * as params from './params'
export { default as ASCIIChars } from './chars'
import { default as wavelist } from './wavelist'

Object.entries(params.allFreqs).forEach(([key, value]) => (params[key] = value))
Object.entries(params.allEnvs).forEach(([key, value]) => (params[key] = value))
Object.entries(params.allWaves).forEach(([key, value]) => (params[key] = value))
Object.entries(params.allCharacters).forEach(([key, value]) => (params[key] = value))

export { params, wavelist }
