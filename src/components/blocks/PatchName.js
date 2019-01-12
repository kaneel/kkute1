import React, { Component } from 'react'
import styled from 'styled-components'

const StyledPatchName = styled.section`
  display: flex;
  align-items: center;
  width: 300px;
  margin: 10px 0;
`

const StyledPatchNameValue = styled.div`
  border: 1px solid;
  padding: 5px;
  min-width: 200px;
  width: 100%;

  span,
  input {
    display: block;
    padding: 0px;
    border: none;
    background: none;
    font-size: 20px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    color: currentColor;
    &:focus {
      outline: none;
    }
  }
`

const StyledPatchNameLabel = styled.label``

export default class PatchName extends Component {
  static defaultProps = { value: '', update: () => null }

  state = { edit: false }

  onBlur = ({ target }) => {
    const { update, characterList } = this.props
    let { value } = target
    this.setState({ edit: false })
    update(value)
  }

  onDoubleClick = () => this.setState({ edit: true })

  onInputKeyUp = e => {
    const key = e.key.toLowerCase()
    const { value, update } = this.props

    switch (key) {
      case 'enter':
        this.setState({ edit: false })
        update(e.target.value)
        break
      case 'escape':
        this.setState({ edit: false })
        break
    }
  }
  render() {
    const { edit } = this.state
    const { value } = this.props

    return (
      <StyledPatchName>
        <StyledPatchNameLabel onClick={this.onDoubleClick} htmlFor="patchname-input">
          Patch
        </StyledPatchNameLabel>
        <StyledPatchNameValue>
          {edit ? (
            <input
              autoFocus
              id="patchname-input"
              onBlur={this.onBlur}
              onKeyUp={this.onInputKeyUp}
              defaultValue={value.trimLeft().trimRight()}
            />
          ) : (
            <span onDoubleClick={this.onDoubleClick}>{value}</span>
          )}
        </StyledPatchNameValue>
      </StyledPatchName>
    )
  }
}
