import React, { PureComponent } from 'react'
import styled from 'styled-components'

import { DragMove, Label } from './'

const StyledListBox = styled.div`
  width: 100%;
  margin: 10px 0;
  > div {
    height: 25px;
  }
`

const StyledValueContainer = styled.div`
  border: 1px solid;
  margin: 0;
  box-shadow: 0 0 0 1px #555;
`

const StyledValueBackground = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: #222;
  box-shadow: inset 0 0 15px 0px #000;
`

const StyledSpan = styled.span`
  display: block;
  width: 100%;
  font-size: 0.8rem;
  text-align: center;
`

class ListBox extends PureComponent {
  onClick = () => this.props.update((this.props.value + 1) % this.props.items.length)

  onChange = value => {
    const { id, items, update, max_value, min_value } = this.props
    if (isNaN(value)) return null

    value = value >= 0 ? value % items.length : items.length - 1

    update(value)
  }

  render() {
    const { value, items, name } = this.props

    return (
      <StyledListBox onClick={this.onClick}>
        <DragMove threshold={20} onChange={this.onChange} {...this.props}>
          {onMouseDown => (
            <StyledValueContainer onMouseDown={onMouseDown}>
              <StyledValueBackground>
                <StyledSpan>{items[value]}</StyledSpan>
              </StyledValueBackground>
            </StyledValueContainer>
          )}
        </DragMove>
        <Label>{name}</Label>
      </StyledListBox>
    )
  }
}
export default ListBox
