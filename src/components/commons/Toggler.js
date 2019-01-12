import React, { PureComponent } from 'react'
import styled from 'styled-components'

import { Label, Button } from './'

const StyledToggler = styled.div`
  margin: 8px 0;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  label {
    cursor: ${props => (props.inactive ? 'default' : 'pointer')};
    display: block;
    padding: 5px;
  }

  input {
    display: none;
  }
`

class Toggler extends PureComponent {
  static defaultProps = {
    inactive: false
  }

  onChange = () => {
    const { id, value, inactive, update } = this.props
    if (inactive) return null
    update(value ? 0 : 1)
  }

  render() {
    const { inactive, id, value, name } = this.props

    return (
      <StyledToggler inactive={inactive}>
        <input id={`toggler-${id}`} onChange={this.onChange} type="checkbox" checked={value} />
        <label htmlFor={`toggler-${id}`}>
          <Button pressed={value} as="span" />
          <Label>{name}</Label>
        </label>
      </StyledToggler>
    )
  }
}

export default Toggler
