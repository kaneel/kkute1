import React, { Component } from 'react'
import styled from 'styled-components'

const StyledTabContainer = styled.div``
const StyledTabHeader = styled.ul`
  display: flex;
  align-items: flex-end;
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid;
`

const StyledTabHeaderItem = styled.li`
  position: relative;
  background: ${props => props.theme.backgroundColour};
  margin: 0;
  padding: 2px 10px;
  border: 1px solid;
  border-right-width: 0;
  border-bottom-width: 0;
  transform: translateY(0px);
  cursor: pointer;

  &:last-child {
    border-right-width: 1px;
  }

  ${props =>
    props.active &&
    `
    padding-top: 4px;
    padding-bottom: 4px;
    border-right-width: 1px;
    transform: translateY(1px);
  `}
`

const StyledTabWrapper = styled.div``
const StyledTabBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`

class TabHeader extends Component {
  onClick = () => this.props.onClick(this.props.index)

  render() {
    const { children } = this.props
    return <span onClick={this.onClick}>{children}</span>
  }
}

class TabContainer extends Component {
  state = { visible: 0 }
  swap = visible => this.setState({ visible })

  render() {
    const { items } = this.props
    const { visible } = this.state

    return (
      <StyledTabContainer>
        <StyledTabHeader>
          {items.map(({ header }, i) => (
            <StyledTabHeaderItem key={i} active={i === visible}>
              <TabHeader index={i} key={i} onClick={this.swap}>
                {header}
              </TabHeader>
            </StyledTabHeaderItem>
          ))}
        </StyledTabHeader>
        <StyledTabWrapper>
          {items.map(
            ({ Component }, i) =>
              visible === i && (
                <StyledTabBlock key={i}>
                  <Component />
                </StyledTabBlock>
              )
          )}
        </StyledTabWrapper>
      </StyledTabContainer>
    )
  }
}

export default TabContainer
