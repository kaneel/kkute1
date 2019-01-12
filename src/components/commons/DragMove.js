import React, { PureComponent } from 'react'

class DragMove extends PureComponent {
  static defaultProps = {
    onChange: null,
    thresholds: [3, 30],
    finetune: false
  }

  mouseDown = false
  startY = 0

  onMouseMove = e => {
    e.preventDefault()
    if (!this.mouseDown) return null

    const { clientY } = e
    const { value, thresholds, finetune } = this.props
    const diff = clientY - this.startY
    const threshold = thresholds[finetune ? 1 : 0]

    if (Math.abs(diff) < threshold) return null

    this.props.onChange(value - Math.floor(diff / threshold))
    this.startY = clientY
  }

  onMouseDown = ({ clientY }) => {
    this.mouseDown = true
    this.startY = clientY
    this.prevValue = this.props.value
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('keyup', this.onKeyUp)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  onKeyUp = e => {
    const key = e.key.toLowerCase()

    switch (key) {
      case 'escape':
        this.onMouseUp()
        this.props.onChange(this.prevValue)
        break
    }
  }

  cleanEvents() {
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('keyup', this.onKeyUp)
    document.removeEventListener('mouseup', this.onMouseUp)
  }

  onMouseUp = () => {
    this.mouseDown = false
    this.cleanEvents()
  }

  componentWillUnmount() {
    this.cleanEvents()
  }

  render() {
    const { children } = this.props

    if (typeof children !== 'function') throw 'DragMove: Takes a function as children'

    return children(this.onMouseDown)
  }
}

export default DragMove
