import React, { Component } from 'react'
import styled from 'styled-components'
import { DragMove } from './'

export const StyledCharacter = styled.span`
  padding: 5px 0;
  margin: 0;
  width: 20px;
  font-size: 20px;
  font-family: 'Inconsolata';
  display: inline-block;
  vertical-align: baseline;
  text-align: center;

  span {
    width: 100%;
    height: 100%;
    display: inline-block;
  }

  input {
    padding: 0;
    width: 100%;
    background: none;
    border: none;
    text-align: center;
    color: currentColor;

    &:focus {
      outline: none;
    }
  }
`

export default class Character extends Component {
  static defaultProps = { finetune: false }
  state = { edit: false, lastKey: null }

  onChange = value => {
    const { id, update, list } = this.props
    update(Math.max(0, Math.min(value, list.length - 1)))
  }

  onInputKeyUp = e => {
    const key = e.key.toLowerCase()
    const { list } = this.props

    switch (key) {
      case 'enter':
        this.setState({ edit: false })
        // find key
        const keyIndex = list.indexOf(e.target.value)
        if (!!~keyIndex) this.onChange(keyIndex)
        break
      case 'escape':
        this.setState({ edit: false })
        break
    }
  }

  onInputBlur = () => this.setState({ edit: false })

  onInputChange = e => {
    this.setState({ lastKey: e.target.value[e.target.value.length - 1] })
  }

  onDoubleClick = () => this.setState({ edit: true })

  render() {
    const { value, finetune, list } = this.props
    const { edit, lastKey } = this.state

    return (
      <DragMove finetune={finetune} onChange={this.onChange} {...this.props}>
        {onMouseDown => (
          <StyledCharacter>
            {!edit ? (
              <span onDoubleClick={this.onDoubleClick} onMouseDown={onMouseDown} onClick={this.next}>
                {list[value]}
              </span>
            ) : (
              <input
                autoFocus
                onChange={this.onInputChange}
                onKeyUp={this.onInputKeyUp}
                type="text"
                value={lastKey || list[value]}
              />
            )}
          </StyledCharacter>
        )}
      </DragMove>
    )
  }
}
