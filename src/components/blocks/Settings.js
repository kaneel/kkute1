import React, { Component } from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { updateMidiIN, updateMidiOUT, closeSettings } from '../../actions'

const StyledAnimatedSettingsModal = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.backgroundColour};
  transform: translateY(-100%);
  display: flex;
  align-content: center;
  align-items: center;
  z-index: 1000;
`

const StyledCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`

const mapStateToProps = state => ({
  MIDIIN: state.settings.MIDIIN,
  MIDIOUT: state.settings.MIDIOUT,
  isOpen: state.GUI.settings
})

const mapDispatchToProps = dispatch => ({
  updateMidiIN: id => dispatch(updateMidiIN(id)),
  updateMidiOUT: id => dispatch(updateMidiOUT(id)),
  closeSettings: () => dispatch(closeSettings())
})

class Settings extends Component {
  static defaultProps = { isOpen: false }
  state = {
    inputs: [],
    outputs: [],
    error: null
  }

  refreshTimer = null
  access = null

  componentDidMount() {
    window.navigator.requestMIDIAccess().then(access => {
      this.access = access
      this.refreshMidi()
      access.onstatechange = () => {
        console.log('midi state changed')
        clearTimeout(this.refreshTimer)
        this.refreshTimer = setTimeout(this.refreshMidi, 1000)
      }
    })
  }

  componentDidCatch(e) {
    this.setState({ error: e })
  }

  componentDidUpdate(oldProps, nextState) {
    const { isOpen: oldShow } = oldProps
    const { isOpen: newShow } = this.props

    if (oldShow !== newShow && newShow) {
      this.refreshMidi()
    }
  }

  getPorts(type) {
    const ports = []
    for (let port of this.state[type].values()) ports.push(port)
    return ports
  }

  makeList(ports, selected, handler) {
    return ports.length ? (
      <select onChange={handler} value={selected ? selected : ''}>
        <option value="" />
        {ports.map((item, i) => (
          <option value={item.id} key={i}>
            {item.name}
          </option>
        ))}
      </select>
    ) : (
      <span>No input ports found!</span>
    )
  }

  setInput = ({ target: { value } }) => this.props.updateMidiIN(value)
  setOutput = ({ target: { value } }) => this.props.updateMidiOUT(value)

  refreshMidi = () => {
    if (!this.access) return null

    const inputs = this.access.inputs
    const outputs = this.access.outputs

    this.setState({ inputs, outputs })
  }

  render() {
    const { error, ports } = this.state
    const { isOpen, closeSettings, MIDIIN, MIDIOUT, store } = this.props
    const inputs = this.getPorts('inputs')
    const outputs = this.getPorts('outputs')

    return (
      <Spring native to={{ transform: isOpen ? 'translateY(0%)' : 'translateY(-100%)' }}>
        {props => (
          <StyledAnimatedSettingsModal style={props}>
            <StyledCloseButton onClick={closeSettings}>CLOSE</StyledCloseButton>
            {error && <div>{e.message}</div>}
            {!error && (
              <div>
                <p>
                  <label>Input</label>
                  {this.makeList(inputs, MIDIIN, this.setInput)}
                </p>
                <p>
                  <label>Output</label>
                  {this.makeList(outputs, MIDIOUT, this.setOutput)}
                </p>
                <p>
                  <button onClick={this.refreshMidi}>REFRESH</button>
                </p>
              </div>
            )}
          </StyledAnimatedSettingsModal>
        )}
      </Spring>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
