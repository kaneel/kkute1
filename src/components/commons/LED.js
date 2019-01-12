import React from 'react'
import styled from 'styled-components'

import { Label } from './'

const StyledLED = styled.div`
  position: relative;
  padding: 20px 5px 0;
  width: 100%;
  box-sizing: border-box;
  text-align: center;

  &:before {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    content: '';
    background: ${props => (props.active ? props.theme.secondaryColour : '#222')};
  }
`

const LED = ({ children, ...props }) => (
  <StyledLED {...props}>
    <Label>{children}</Label>
  </StyledLED>
)

export default LED
