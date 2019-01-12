import React, { Component } from 'react'
import styled from 'styled-components'

import { TabContainer } from './'

const StyledSource = styled.div`
  h1 {
    display: none;
  }
`

class SourceBlock extends Component {
  render() {
    const { children, legend } = this.props
    return (
      <StyledSource>
        <h1>{legend}</h1>
        {children}
      </StyledSource>
    )
  }
}

export default SourceBlock
