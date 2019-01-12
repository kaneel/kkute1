import React, { Component } from 'react'
import { connect } from 'react-redux'

import { MidiAccessWithSettings, withKeyboardContext } from '../../contexts'
import { updateParam } from '../../actions'
import { params as paramsdata } from '../../data/'
import { Knob, List, ListBox, Toggler } from '../commons'

const KnobWithKeyboardContext = withKeyboardContext(Knob)

const mapStateToProps = (state, ownProps) => ({
  value: state.synthparams[ownProps.id]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  update: value => dispatch(updateParam(ownProps.id, value))
})

class UIItem extends Component {
  static defaultProps = {
    id: 'uiitem',
    index: 0
  }

  static types = { List, ListBox, Toggler, Knob: KnobWithKeyboardContext }

  render() {
    const { id, params, index, value, update, ...props } = this.props
    const { type, ...restParams } = paramsdata[id]
    const Component = UIItem.types[type]

    return <Component key={`${id}-${index}`} value={value} update={update} {...restParams} {...props} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UIItem)
