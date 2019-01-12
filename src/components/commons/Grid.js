import React, { Component } from 'react'
import styled from 'styled-components'

const Grid = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 100%;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export { Grid, Row, Col }
