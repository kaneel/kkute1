import React from 'react'
import { connect } from 'react-redux'

import { updatePatchName } from '../../actions'
import { PatchName } from '../blocks'
import { ASCIIChars } from '../../data'

const mapStateToProps = state => ({
  value: new Array(10)
    .fill(0)
    .map((_, i) => ASCIIChars[state.synthparams[`name_${i}`]])
    .join('')
    .trimLeft()
    .trimRight()
})
const mapDispatchToProps = dispatch => ({
  update: value => dispatch(updatePatchName(value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatchName)
