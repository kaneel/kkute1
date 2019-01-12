import { default as wavelist } from './wavelist'
import { default as ASCIIChars } from './chars'
import { bitpad } from '../utils'

const toObject = arr =>
  arr.reduce((acc, item) => {
    acc[item.id] = item
    return acc
  }, {})

export const common_volume = {
  id: 'common_volume',
  type: 'Knob',
  name: 'Volume',
  min_value: 0,
  max_value: 99,
  display_min_value: 1,
  display_max_value: 100,
  default_value: 99,
  source: 10,
  mask: null,
  sysex: '0xF0 0x40 cc 0x10 0x00 0x03 0x03 0x00 vv 0xF7'
}

export const common_poly_mode = {
  id: 'common_poly_mode',
  type: 'ListBox',
  name: 'Poly mode',
  items: ['PL1', 'PL2', 'SOLO'],
  default_value: 0,
  source: 11,
  mask: '_____XX',
  sysex: '0xF0 0x40 cc 0x10 0x00 0x03 0x1B 0x00 vv 0xF7'
}

export const common_sources = {
  id: 'common_sources',
  type: 'ListBox',
  name: 'Source 2/4',
  items: ['2', '4'],
  default_value: 0,
  source: 11,
  mask: '____X__',
  sysex: '0xF0 0x40 cc 0x10 0x00 0x03 0x0E 0x00 vv 0xF7'
}

export const common_am_1 = {
  id: 'common_am_1',
  type: 'ListBox',
  name: 'AM S1.S2',
  items: ['Off', '2->1', 'REV'],
  default_value: 0,
  source: 11,
  mask: '__XX___',
  sysex: '0xF0 0x40 cc 0x10 0x00 0x03 0x24 0x00 vv 0xF7'
}

export const common_am_2 = {
  id: 'common_am_2',
  type: 'ListBox',
  name: 'AM S3.S4',
  items: ['Off', '4->3', 'REV'],
  default_value: 0,
  source: 11,
  mask: 'XX_____',
  sysex: '0xF0 0x40 cc 0x10 0x00 0x03 0x25 0x00 vv 0xF7'
}

export const common_prs_freq = {
  id: 'common_prs_freq',
  type: 'Knob',
  name: 'Prs ➝ Freq',
  display_min_value: -50,
  display_max_value: 50,
  min_value: 0,
  max_value: 100,
  default_value: 50,
  source: 12,
  sysex: '0xF0 0x40 cc 0x10 0x00 0x03 0x18 0x00 vv 0xF7'
}

export const common_vibrato_depth = {
  id: 'common_vibrato_depth',
  type: 'Knob',
  name: 'depth',
  min_value: 0,
  max_value: 100,
  display_min_value: -50,
  display_max_value: 50,
  default_value: 50,
  source: 13,
  sysex: '0xF0 0x40 cc 0x10 0x00 0x03 0x0F 0x00 vv 0xF7'
}

export const common_vibrato_prs_depth = {
  id: 'common_vibrato_prs_depth',
  type: 'Knob',
  name: 'prs ➝ depth',
  min_value: 0,
  max_value: 100,
  display_min_value: -50,
  display_max_value: 50,
  default_value: 50,
  source: 14,
  sysex: '0xF0 0x40 cc 0x10 0x00 0x03 0x12 0x00 vv 0xF7'
}

export const common_pitch_bend = {
  id: 'common_pitch_bend',
  type: 'Knob',
  name: 'Pitch bend',
  min_value: 0,
  max_value: 12,
  default_value: 2,
  source: 15,
  sysex: '0xF0 0x40 cc 0x10 0x00 0x03 0x19 0x00 vv 0xF7'
}

export const common_vibrato_speed = {
  id: 'common_vibrato_speed',
  type: 'Knob',
  name: 'speed',
  min_value: 0,
  max_value: 100,
  default_value: 0,
  source: 16,
  sysex: '0xF0 0x40 cc 0x10 0x00 0x03 0x10 0x00 vv 0xF7'
}

export const common_vibrato_shape = {
  id: 'common_vibrato_shape',
  type: 'ListBox',
  name: 'shape',
  items: ['tri', 'saw', 'square', 'random'],
  default_value: 0,
  source: 17,
  mask: '_____XX',
  sysex: '0xF0 0x40 cc 0x10 0x00 0x03 0x11 0x00 vv 0xF7'
}

export const common_ks_curve = {
  id: 'common_ks_curve',
  type: 'ListBox',
  name: 'KS curve',
  default_value: 0,
  items: [1, 2, 3, 4, 5],
  source: 17,
  mask: '__XXX__',
  sysex: '0xF0 0x40 cc 0x10 0x00 0x03 0x1A 0x00 vv 0xF7'
}

export const common_vibrato_wheel = {
  id: 'common_vibrato_wheel',
  type: 'ListBox',
  name: 'wheel',
  items: ['depth', 'speed'],
  default_value: 0,
  source: 17,
  mask: 'XX_____',
  sysex: '0xF0 0x40 cc 0x10 0x00 0x03 0x13 0x00 vv 0xF7'
}

export const common_auto_bend_depth = {
  id: 'common_auto_bend_depth',
  type: 'Knob',
  name: 'depth',
  display_min_value: -50,
  display_max_value: 50,
  min_value: 0,
  max_value: 100,
  default_value: 50,
  source: 18,
  sysex: '0xF0 0x40 cc 0x10 0x00 0x03 0x14 0x00 vv 0xF7'
}

export const common_auto_bend_time = {
  id: 'common_auto_bend_time',
  type: 'Knob',
  name: 'time',
  min_value: 0,
  max_value: 100,
  default_value: 0,
  source: 19,
  sysex: '0xF0 0x40 cc 0x10 0x00 0x03 0x15 0x00 vv 0xF7'
}

export const common_auto_vel_dep = {
  id: 'common_auto_vel_dep',
  type: 'Knob',
  name: 'Vel ➝ Depth',
  min_value: 0,
  max_value: 100,
  display_min_value: -50,
  display_max_value: 50,
  default_value: 50,
  source: 20,
  sysex: '0xF0 0x40 cc 0x10 0x00 0x03 0x16 0x00 vv 0xF7'
}

export const common_auto_ks_time = {
  id: 'common_auto_ks_time',
  type: 'Knob',
  name: 'ks ➝ time',
  min_value: 0,
  max_value: 100,
  display_min_value: -50,
  display_max_value: 50,
  default_value: 50,
  source: 21,
  sysex: '0xF0 0x40 cc 0x10 0x00 0x03 0x17 0x00 vv 0xF7'
}

export const s1_mute = {
  id: 's1_mute',
  type: 'Toggler',
  name: 'SOURCE 1',
  inactive: true,
  min_value: 0,
  max_value: 1,
  default_value: 1,
  source: 22,
  mask: '______X'
}

export const s2_mute = {
  id: 's2_mute',
  type: 'Toggler',
  name: 'SOURCE 2',
  inactive: true,
  min_value: 0,
  max_value: 1,
  default_value: 1,
  source: 22,
  mask: '_____X_'
}

export const s3_mute = {
  id: 's3_mute',
  type: 'Toggler',
  inactive: true,
  name: 'SOURCE 3',
  min_value: 0,
  max_value: 1,
  default_value: 1,
  source: 22,
  mask: '____X__'
}

export const s4_mute = {
  id: 's4_mute',
  type: 'Toggler',
  name: 'SOURCE 4',
  inactive: true,
  min_value: 0,
  max_value: 1,
  default_value: 1,
  source: 22,
  mask: '___X___'
}

export function makePatchName() {
  return Array.from(new Array(10), (_, i) => {
    return {
      id: `name_${i}`,
      name: `name_${i}`,
      type: 'Character',
      default_value: 0,
      min_value: 0,
      max_value: ASCIIChars.length,
      list: ASCIIChars,
      source: arr => {
        return arr[i] - 32
      },
      format: value => {
        return `0xF0 0x40 cc 0x10 0x00 0x03 0x${i + 4} 0x00 ${value + 32} 0xF7`
      }
    }
  })
}

export function makeFreq(n) {
  return [
    {
      id: `freq_key_track_${n}`,
      type: 'Toggler',
      name: 'Key track',
      items: ['Off', 'On'],
      default_value: 0,
      source: 35 + n,
      mask: '_____X_',
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x1F 0x${n * 2} vv 0xF7`
    },
    {
      id: `freq_coarse_${n}`,
      name: 'Coarse',
      type: 'Knob',
      min_value: 60,
      max_value: 108,
      display_min_value: -24,
      display_max_value: 24,
      default_value: 84,
      source: 27 + n,
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x1C 0x${n * 2} vv 0xF7`
    },
    {
      id: `freq_fixed_${n}`,
      name: 'Fixed Freq',
      type: 'Knob',
      min_value: 0,
      max_value: 127,
      default_value: 64,
      source: 27 + n,
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x1D 0x${n * 2} vv 0xF7`
    },
    {
      id: `freq_fine_${n}`,
      name: 'Fine',
      type: 'Knob',
      min_value: 0,
      max_value: 100,
      display_min_value: -50,
      display_max_value: 50,
      default_value: 50,
      source: 23 + n,
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x1E 0x${n * 2} vv 0xF7`
    },
    {
      id: `freq_vibrato_autobend_${n}`,
      name: 'Vibrato / Auto bend',
      type: 'Toggler',
      items: ['Off', 'On'],
      default_value: 0,
      source: 35 + n,
      mask: '____X__',
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x20 0x${n * 2} vv 0xF7`
    },
    {
      id: `freq_prs_freq_${n}`,
      name: 'Prs ➝ Freq',
      type: 'Toggler',
      items: ['Off', 'On'],
      default_value: 0,
      source: 35 + n,
      mask: '___X___',
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x21 0x${n * 2} vv 0xF7`
    },
    {
      id: `freq_ks_freq_${n}`,
      name: 'Ks ➝ Freq',
      type: 'Knob',
      min_value: 0,
      max_value: 100,
      display_min_value: -50,
      display_max_value: 50,
      default_value: 50,
      source: 83 + n,
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x22 0x${n * 2} vv 0xF7`
    }
  ]
}

export function makeEnv(n) {
  return [
    {
      id: `env_level_${n}`,
      name: 'Level',
      type: 'Knob',
      min_value: 0,
      max_value: 100,
      default_value: 100,
      source: 39 + n,
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x29 0x${n * 2} vv 0xF7`
    },
    {
      id: `env_delay_${n}`,
      name: 'Delay',
      type: 'Knob',
      min_value: 0,
      max_value: 100,
      default_value: 0,
      source: 43 + n,
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x2A 0x${n * 2} vv 0xF7`
    },
    {
      id: `env_attack_${n}`,
      name: 'Attack',
      type: 'Knob',
      min_value: 0,
      max_value: 100,
      default_value: 10,
      source: 47 + n,
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x2B 0x${n * 2} vv 0xF7`
    },
    {
      id: `env_decay_${n}`,
      name: 'Decay',
      type: 'Knob',
      min_value: 0,
      max_value: 100,
      default_value: 20,
      source: 51 + n,
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x2C 0x${n * 2} vv 0xF7`
    },
    {
      id: `env_sustain_${n}`,
      name: 'Sustain',
      type: 'Knob',
      min_value: 0,
      max_value: 100,
      default_value: 100,
      source: 55 + n,
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x2D 0x${n * 2} vv 0xF7`
    },
    {
      id: `env_release_${n}`,
      name: 'Release',
      type: 'Knob',
      min_value: 0,
      max_value: 100,
      default_value: 20,
      source: 59 + n,
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x2E 0x${n * 2} vv 0xF7`
    },
    {
      id: `env_vel_curve_${n}`,
      name: 'Vel curve',
      type: 'Knob',
      min_value: 0,
      max_value: 7,
      default_value: 0,
      source: 35 + n,
      mask: 'XXX____',
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x2F 0x${n * 2} vv 0xF7`
    },
    {
      id: `env_level_mod_vel_env_${n}`,
      name: 'Vel ➝ Env',
      type: 'Knob',
      min_value: 0,
      max_value: 100,
      display_min_value: -50,
      display_max_value: 50,
      default_value: 50,
      source: 63 + n,
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x30 0x${n * 2} vv 0xF7`
    },
    {
      id: `env_level_mod_prs_env_${n}`,
      name: 'Prs ➝ Env',
      type: 'Knob',
      min_value: 0,
      max_value: 100,
      display_min_value: -50,
      display_max_value: 50,
      default_value: 50,
      source: 67 + n,
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x31 0x${n * 2} vv 0xF7`
    },
    {
      id: `env_level_mod_ks_env_${n}`,
      name: 'Ks ➝ Env',
      type: 'Knob',
      min_value: 0,
      max_value: 100,
      display_min_value: -50,
      display_max_value: 50,
      default_value: 50,
      source: 71 + n,
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x32 0x${n * 2} vv 0xF7`
    },
    {
      id: `env_time_mod_vel_env_${n}`,
      name: 'Vel ➝ Env time',
      type: 'Knob',
      display_min_value: -50,
      display_max_value: 50,
      min_value: 0,
      max_value: 100,
      default_value: 0,
      source: 75 + n,
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x33 0x${n * 2} vv 0xF7`
    },
    {
      id: `env_time_mod_ks_env_${n}`,
      name: 'Ks ➝ Env time',
      type: 'Knob',
      display_min_value: -50,
      display_max_value: 50,
      min_value: 0,
      max_value: 100,
      default_value: 0,
      source: 79 + n,
      sysex: `0xF0 0x40 cc 0x10 0x00 0x03 0x34 0x${n * 2} vv 0xF7`
    }
  ]
}

export function makeWave(n) {
  return [
    {
      id: `wave_select_${n}`,
      name: 'Wave Select',
      items: wavelist,
      type: 'List',
      default_value: 0,
      source: arr => {
        let bit = bitpad(arr[35 + n].toString(2))
        let msb = Number(bit.substring(bit.length - 1))
        let value = arr[31 + n]

        if (msb) {
          value = value + 127
        }

        return value
      },
      format: value => {
        let nn = n * 2

        if (value > 127) {
          nn = nn + 1
          value = value - 128
        }

        return `0xF0 0x40 cc 0x10 0x00 0x03 0x23 0x${nn} ${value} 0xF7`
      }
    }
  ]
}

const allFreqs = toObject(
  []
    .concat(makeFreq(0))
    .concat(makeFreq(1))
    .concat(makeFreq(2))
    .concat(makeFreq(3))
)

const allEnvs = toObject(
  []
    .concat(makeEnv(0))
    .concat(makeEnv(1))
    .concat(makeEnv(2))
    .concat(makeEnv(3))
)

const allWaves = toObject(
  []
    .concat(makeWave(0))
    .concat(makeWave(1))
    .concat(makeWave(2))
    .concat(makeWave(3))
)

const allCharacters = toObject(makePatchName())

export { allFreqs, allEnvs, allWaves, allCharacters }
