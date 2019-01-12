import React, { Component, createRef } from 'react'
import styled from 'styled-components'
import { Spring, animated } from 'react-spring/renderprops'

import { DragMove, Label } from './'

const StyledKnob = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  display: flex;
  padding-bottom: 5px;
  align-items: center;
  justify-content: center;
`

const StyledSVG = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;

  ${props => props.small && `width: 60px; height: 60px;`}
`

const StyledTrackBG = styled.path`
  fill: transparent;
  stroke: black;
  stroke-width: 9px;
`

const StyledTrack = styled(animated.path)`
  fill: transparent;
  stroke: ${props => props.theme.secondaryColour};
  stroke-width: 8px;
`

const StyledContainer = styled.p`
  margin: 0;
  padding: 0;
  text-align: center;
  line-height: 1;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledLabel = styled(Label)`
  position: absolute;
  left: 0;
  bottom: 0;
`

const StyledValue = styled.span`
  position: relative;
  font-size: 0.8rem;
  display: ${props => (props.visible ? 'block' : 'none')};
  z-index: 100;
  width: 100%;
  margin: 0 10px;
`

const StyledInput = styled.input`
  position: relative;
  width: 100%;
  border: none;
  font-size: 1rem;
  background: none;
  text-align: center;
  line-height: 0;
  color: ${props => props.theme.textColour};
  z-index: 100;
  display: ${props => (props.visible ? 'block' : 'none')};
  &:focus {
    outline: none;
  }
`

class Knob extends Component {
  static VIEWBOX_WIDTH = 100
  static HALF_WIDTH = 50
  static HALF_HEIGHT = 50

  static defaultProps = {
    small: false,
    track_radius: 30,
    track_width: 9,
    zero_at: 270.0, // [deg] (polar) the 0 degree will be at 270 polar degrees (6 o'clock).
    angle_min: 30.0, // [deg] Angle in knob coordinates (0 at 6 0'clock)
    angle_max: 330.0, // [deg] Angle in knob coordinates (0 at 6 0'clock)
    keyboard: []
  }

  state = {
    doAnimate: false,
    edit: false
  }

  constructor(props) {
    super(props)
    this.inputRef = createRef()
  }

  onChange = value => {
    const { id, update, max_value, min_value } = this.props
    if (isNaN(value)) return null
    if (value <= max_value && value >= min_value && value !== '') update(Number(value))
  }

  onBlur = e => {
    this.setState({ edit: false })
  }

  toggleEdit = e => {
    e.stopPropagation()
    this.setState(({ edit }) => ({
      edit: !edit
    }))
  }

  onInputKeyUp = e => {
    const key = e.key.toLowerCase()
    const { value } = this.props

    switch (key) {
      case 'enter':
        this.setState({ edit: false })
        this.onChange(e.target.value)
        break
      case 'escape':
        this.setState({ edit: false })
        break
    }
  }

  componentDidUpdate(_, nextState) {
    const { value } = this.props
    const { edit } = this.state
    const { edit: oldEdit } = nextState

    if (edit !== oldEdit && edit) {
      this.inputRef.current.focus()
      this.inputRef.current.value = value
    }
  }

  onDoubleClick = () => {
    this.setState({ doAnimate: true })
    this.props.update(this.props.default_value)
  }

  onMouseDown = () => this.setState({ doAnimate: false })

  onAnimationRest = () => {
    this.setState({ doAnimate: false })
  }

  knobToPolarAngle(angle) {
    const { zero_at } = this.props
    let a = zero_at - angle
    if (a < 0) a = a + 360.0
    return a
  }

  polarToKnobAngle(angle) {
    const { zero_at } = this.props
    return (zero_at - angle + 360.0) % 360.0 // we add 360 to handle negative values down to -360
  }

  getViewboxCoord(angle, radius) {
    const { track_radius } = this.props
    let a = (angle * Math.PI) / 180.0
    let r = radius === undefined ? track_radius : radius
    let x = Math.cos(a) * r
    let y = Math.sin(a) * r

    return {
      x: Knob.HALF_WIDTH + x,
      y: Knob.HALF_HEIGHT - y
    }
  }

  getArc(from_angle, to_angle, radius) {
    // SVG d: "A rx,ry xAxisRotate LargeArcFlag,SweepFlag x,y".
    // SweepFlag is either 0 or 1, and determines if the arc should be swept in a clockwise (1), or anti-clockwise (0) direction
    // ref: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d

    let a0 = this.knobToPolarAngle(from_angle)
    let a1 = this.knobToPolarAngle(to_angle)

    // little trick to force a full arc (360deg) when from=0 and to=360
    if (from_angle !== to_angle) {
      // with this we make sure that x1 will be different than x0 within the path definition
      a0 -= 0.0001
      a1 += 0.0001
    }

    let { x: x0, y: y0 } = this.getViewboxCoord(a0, radius)
    let { x: x1, y: y1 } = this.getViewboxCoord(a1, radius)

    let delta_angle = (a0 - a1 + 360.0) % 360.0

    let large_arc = delta_angle < 180.0 ? 0 : 1
    let arc_direction = 1

    let p = `M ${x0},${y0} A ${radius},${radius} 0 ${large_arc},${arc_direction} ${x1},${y1}`

    return p
  }

  getTrackPath(angle) {
    const { angle_min, track_radius } = this.props
    let p = null

    p = this.getArc(angle_min, angle < angle_min ? angle_min : angle, track_radius)

    return p
  }

  calculateModValue() {
    const { value, min_value, max_value, display_min_value, display_max_value } = this.props
    const rangeMove = display_max_value - max_value

    return value + rangeMove
  }

  render() {
    const { id, name, value, small, max_value, angle_min, angle_max, display_max_value, keyboard } = this.props
    const { edit, doAnimate } = this.state
    const htmlId = `knob-${id}`
    const modValue = !!display_max_value ? this.calculateModValue() : value

    const percentValue = value / max_value
    const percentAngle = (angle_max - angle_min) * percentValue + angle_min

    const finetune = !!~keyboard.keys.indexOf('ControlLeft')

    return (
      <DragMove finetune={finetune} onChange={this.onChange} {...this.props}>
        {onMouseDown => (
          <StyledKnob
            onMouseDown={e => {
              this.onMouseDown(e)
              onMouseDown(e)
            }}
            onDoubleClick={this.onDoubleClick}
          >
            <StyledSVG small={small} viewBox="0 0 100 100" width="1em" height="1em">
              <StyledTrackBG d={this.getTrackPath(angle_max)} />
              <Spring immediate={!doAnimate} to={{ progressValue: percentAngle }} native>
                {({ progressValue }) => <StyledTrack d={progressValue.interpolate(t => this.getTrackPath(t))} />}
              </Spring>
            </StyledSVG>
            <StyledContainer onDoubleClick={this.toggleEdit}>
              <StyledValue visible={!edit}>{modValue}</StyledValue>
              <StyledInput
                visible={edit}
                ref={this.inputRef}
                type="text"
                id={htmlId}
                onKeyUp={this.onInputKeyUp}
                onBlur={this.onBlur}
                defaultValue={value}
              />
            </StyledContainer>
            <StyledLabel htmlFor={htmlId}>{name}</StyledLabel>
          </StyledKnob>
        )}
      </DragMove>
    )
  }
}

export default Knob
