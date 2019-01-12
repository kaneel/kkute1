import React, { PureComponent } from 'react'
import styled from 'styled-components'

import { Header } from './'

export const StyledGroup = styled.div`
  height: 100%;
`

export const StyledGroupWrapper = styled.div`
  padding: 5px;
  margin: 1px;
  border: 1px solid #000;
  box-shadow: 0 0 0 2px #222;
`

export const StyledGroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

class Group extends PureComponent {
  render() {
    const { children, legend } = this.props
    return (
      <StyledGroup>
        <StyledGroupWrapper>
          <Header>{legend}</Header>
          <StyledGroupContainer>{children}</StyledGroupContainer>
        </StyledGroupWrapper>
      </StyledGroup>
    )
  }
}

export default Group
