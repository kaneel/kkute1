import React from 'react'
import { connect } from 'react-redux'

import { UIItem } from '../containers'

const mapStateToProps = (state, ownProps) => ({
  value: state.synthparams[`freq_key_track_${ownProps.index}`]
})

const FreqKnob = ({ value, index }) =>
  !value ? <UIItem id={`freq_coarse_${index}`} /> : <UIItem id={`freq_fixed_${index}`} />

export default connect(mapStateToProps)(FreqKnob)
